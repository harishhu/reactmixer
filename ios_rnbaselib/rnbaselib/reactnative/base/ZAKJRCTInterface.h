//
//  RCTInterface.h
//  saadtw
//
//  Created by harishhu on 2017/12/31.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface ZAKJRCTInterface : RCTEventEmitter
-(void)invokeCallback:(NSString *)cmdCallbackID Parameters: (NSString *)params;
@end
