//
//  ReactNativeBaseViewController.h
//  saadtw
//
//  Created by harishhu on 2018/1/2.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ZAKJReactNativeProtocol.h"

@class ZAKJRCTInterface;
@class ZAKJRNAppConfig;
@class ZAKJRNAppletManager;
@interface ZAKJReactNative : NSObject
#pragma properties
@property (nonatomic, assign) BOOL isDebugMode;

#pragma methods
+ (ZAKJReactNative *)instance;

-(ZAKJRNAppConfig *)getRNAppConfig;
-(ZAKJRNAppletManager *)getRNAppletManager;

-(instancetype)startModule: (NSString *)modulename inSuper:(UIViewController *)superViewController launchData:(NSDictionary *)launchData;

-(BOOL)handleEventFromJS: (NSString *)cmdCallbackID commandData: (NSString *)cmdObj;
-(void)setAttachedRCTInterface:(ZAKJRCTInterface *)interf;

//export for client application
-(void)initReactNativeEnv: (BOOL)debug;
-(void)setJSLocationHost: (NSString *)host;
-(UINavigationController *)getAttachNavigator;
-(void)invokeCallback: (NSString *)callbackid params:(id)data;
-(void)setEventHandlerDelegate: (id<ZAKJReactNativeProtocol>)handler;
@end
