//
//  ZAKJRNAppletManager.h
//  rnbaselib
//
//  Created by 胡付义 on 2018/8/6.
//  Copyright © 2018年 众安科技. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ZAKJRNAppletManager : NSObject
-(void)installPrebuiltApplets;
-(NSString*)composeRNRootDir;

-(void)installApplet: (NSString *)path;

-(NSArray *)getInstalledApplets;
@end
