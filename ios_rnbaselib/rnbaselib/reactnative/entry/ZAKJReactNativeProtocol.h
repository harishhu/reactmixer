//
//  ZAKJReactNativeProtocal.h
//  rnbaselib
//
//  Created by 胡付义 on 2018/4/26.
//  Copyright © 2018年 众安科技. All rights reserved.
//

#ifndef ZAKJReactNativeProtocal_h
#define ZAKJReactNativeProtocal_h

@protocol ZAKJReactNativeProtocol<NSObject>

-(BOOL)handleReactNativeEvent: (NSString *)cmdID cmdParams: (NSString *)cmdParams cmdCallbackID: (NSString *)cmdCallbackID;

@end

#endif /* ZAKJReactNativeProtocal_h */
