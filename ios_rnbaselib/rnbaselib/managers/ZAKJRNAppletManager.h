//
//  ZAKJRNAppletManager.h
//  rnbaselib
//
//  Created by harishhu on 2018/8/6.
//  Copyright © 2018年   ReactMixer. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ZAKJRNAppletManager : NSObject
-(void)installPrebuiltApplets;
-(NSString*)composeRNRootDir;

-(void)installApplet: (NSString *)path;

-(NSArray *)getInstalledApplets;
@end
