//
//  ZAKJRNAppletManager.m
//  rnbaselib
//
//  Created by harishhu on 2018/8/6.
//  Copyright © 2018年   ReactMixer. All rights reserved.
//

#import "ZAKJRNAppletManager.h"
#import "SSZipArchive.h"
#import "ZAKJUtils.h"

#define DEFAULT_PLATFORM_FILEPATH @"reactnative/platform/reactnative.zip"
#define DEFAULT_APPLETS_FILEPATH @"reactnative/applets"
#define ZIPDONE_FILENAME @".zipdone"

@implementation ZAKJRNAppletManager{
    NSString * rootDir;
    NSString * appletDir;
    
    NSFileManager * fileManager;
    NSMutableArray * installedApplets;
}

-(id)init{
    self = [super init];
    
    if(self){
        [self composeRNRootDir];
        [self composeRNAppletDir];
        
        fileManager = [NSFileManager defaultManager];
    }
    
    return self;
}

-(NSDictionary *)getAppletInfo: (NSString *)packagefile{
    NSData *data = [fileManager contentsAtPath:packagefile];
    NSString *info = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    
    NSLog(@"root - getapplet info = %@", info);
    return [ZAKJUtils dictionaryWithJsonString: info];
}

-(NSArray *)getInstalledApplets{
    if (installedApplets) {
        return installedApplets;
    }
    
    installedApplets = [NSMutableArray arrayWithCapacity:10];
    NSArray *fileList = [fileManager contentsOfDirectoryAtPath:appletDir error: nil];
    
    BOOL isDir = NO;
    //在上面那段程序中获得的fileList中列出文件夹名
    for (NSString *file in fileList) {
        NSString *path = [appletDir stringByAppendingPathComponent:file];
        [fileManager fileExistsAtPath:path isDirectory:(&isDir)];
        if (isDir) {
            NSLog(@"root - get installed applets name = %@", file);
            NSDictionary *appletinfo = [self getAppletInfo:[path stringByAppendingPathComponent:@"package.json"]];
            if (appletinfo) {
                [appletinfo setValue:path forKey:@"path"];
                [installedApplets addObject:appletinfo];
            }
        }
        
        isDir = NO;
    }
    
    return installedApplets;
}

-(NSString *)getPresentTimeStamp{
    NSDate *date = [NSDate date];
    long timeStamp = [date timeIntervalSince1970];
    
    return [NSString stringWithFormat:@"%ld", timeStamp];
}

-(NSString*)composeRNRootDir{
    if (rootDir) {
        return rootDir;
    }
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES);
    NSString *cachesDir = [paths objectAtIndex:0];
    
    rootDir = [NSString stringWithFormat:@"%@/%@", cachesDir, @"reactnative"];
    NSLog(@"compose rn root dir = %@", rootDir);
    return rootDir;
}

-(NSString *)composeRNAppletDir{
    if (appletDir) {
        return appletDir;
    }
    
    NSString * dir = [self composeRNRootDir];
    appletDir = [NSString stringWithFormat:@"%@/%@", dir, @"applets"];
    
    NSLog(@"compose rn root applets dir = %@", appletDir);
    return appletDir;
}

-(BOOL)isAlreadyZipDone: (NSString *)dir{
    NSString *filepath = [NSString stringWithFormat:@"%@/%@", dir, ZIPDONE_FILENAME];
    
    if ([fileManager fileExistsAtPath:filepath]) {
        return TRUE;
    }
    
    return FALSE;
}

-(void)makeZipDone: (NSString *)dir{
    if (![self isAlreadyZipDone:dir]) {
        NSString *filepath = [NSString stringWithFormat:@"%@/%@", dir, ZIPDONE_FILENAME];
        [fileManager createFileAtPath:filepath contents:nil attributes:nil];
    }
}

-(void)installPrebuiltApplets{
    NSString *dicFilePath = [[NSBundle mainBundle].bundleURL
                             URLByAppendingPathComponent:DEFAULT_PLATFORM_FILEPATH
                             isDirectory:NO].path;
    NSLog(@"dic file path = %@", dicFilePath);
    
    if (![fileManager fileExistsAtPath:dicFilePath]) {
        return;
    }
    
    NSString * targetPath = [self composeRNRootDir];
    
    if (![self isAlreadyZipDone:targetPath]) {
        BOOL suc = [SSZipArchive unzipFileAtPath:dicFilePath toDestination: targetPath];
        
        if (suc) {
            [self makeZipDone:targetPath];
            NSLog(@"un zip file success");
        }
    }else{
        NSLog(@"root - platform already un zipped, ignore.....");
    }
    
    NSString * targetAppletDir = [self composeRNAppletDir];
    if (![fileManager fileExistsAtPath:targetAppletDir]) {
        [fileManager createDirectoryAtPath:targetAppletDir withIntermediateDirectories:YES attributes:nil error:nil];
    }
    
    if (![self isAlreadyZipDone:targetAppletDir]) {
        NSString *appletsDir = [[NSBundle mainBundle].bundleURL
                                URLByAppendingPathComponent:DEFAULT_APPLETS_FILEPATH
                                isDirectory:YES].path;
        NSLog(@"appletsDir path = %@", appletsDir);
        
        NSDirectoryEnumerator *direnmu = [fileManager enumeratorAtPath:appletsDir];
        NSString *appletpath = nil;
        while (appletpath = [direnmu nextObject]) {
            NSLog(@"applet dir name = %@", appletpath);
            [self installApplet:[NSString stringWithFormat:@"%@/%@", appletsDir, appletpath]];
        }
        
        [self makeZipDone:targetAppletDir];
    }else{
        NSLog(@"root - applets already un zipped, ignore.....");
    }
}

-(void)installApplet: (NSString *) path{
    NSString * targetAppletDir = [NSString stringWithFormat:@"%@/%@", [self composeRNAppletDir], [self getPresentTimeStamp]];
    if (![fileManager fileExistsAtPath:targetAppletDir]) {
        [fileManager createDirectoryAtPath:targetAppletDir withIntermediateDirectories:YES attributes:nil error:nil];
    }
    
    BOOL suc = [SSZipArchive unzipFileAtPath:path toDestination: targetAppletDir];
    
    if (suc) {
        NSLog(@"root - unzip applet file success");
        NSDictionary *appletinfo = [self getAppletInfo:[NSString stringWithFormat:@"%@/%@", targetAppletDir, @"package.json"]];
        
        if (appletinfo) {
            NSString * appletname = [appletinfo valueForKey:@"name"];
            NSString * newdirname = [NSString stringWithFormat:@"%@/%@", [self composeRNAppletDir], appletname];
            [fileManager moveItemAtPath:targetAppletDir toPath:newdirname error:nil];
            
            NSString *resDir = [newdirname stringByAppendingPathComponent:@"res"];
            if ([fileManager fileExistsAtPath:resDir]) {
                [self copyAppletRes:resDir toDir:[rootDir stringByAppendingPathComponent:@"assets"]];
            }
        }
    }else{
        NSLog(@"root - unzip applet file failed, %@", path);
    }
}

-(BOOL)isImageFile: (NSString *)path{
    NSString *ext = [path pathExtension];
    
    if (!ext) {
        return FALSE;
    }
    
    if ([ext isEqualToString:@"png"] || [ext isEqualToString:@"jpg"]) {
        return TRUE;
    }
    
    return FALSE;
}

-(void)copyAppletRes: (NSString *) fromDir toDir: (NSString *)toDir{
    NSArray *fileList = [fileManager contentsOfDirectoryAtPath:fromDir error: nil];
    
    for (NSString *file in fileList) {
        if (![self isImageFile:file]) {
            continue;
        }
        
        NSArray *array = [file componentsSeparatedByString:@"#"];
        NSString * resfilename = array[array.count - 1];
        NSString * resdir = @"";
        for (int index = 0; index < array.count - 1; index++) {
            resdir = [resdir stringByAppendingPathComponent:array[index]];
        }
        
        NSString *finalResDir = [toDir stringByAppendingPathComponent:resdir];
        [fileManager createDirectoryAtPath:finalResDir withIntermediateDirectories:YES attributes:nil error:nil];
        finalResDir = [finalResDir stringByAppendingPathComponent:resfilename];
        
        NSString *fromrrespath = [fromDir stringByAppendingPathComponent:file];
        [fileManager moveItemAtPath:fromrrespath toPath:finalResDir error:nil];
        //NSLog(@"root final res dir = %@", finalResDir);
        //NSString *path = [fromDir stringByAppendingPathComponent:file];
    }
}

@end
