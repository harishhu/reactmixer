//
//  HQDeviceInfo.h
//  saadtw
//
//  Created by 姚志飞 on 2017/12/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ZAKJDeviceInfo : NSObject
/**
 *  客户端版本 Bundle version
 */
@property(nonatomic,copy,readonly)NSString *v;
/**
 *  设备型号 iOS或者android ，ipad
 */
@property(nonatomic,copy,readonly)NSString *t;
/**
 *  系统版本
 */
@property(nonatomic,copy,readonly)NSString *osVersion;
/**
 *  设备名 iPhone4s ，6，7
 */
@property(nonatomic,copy,readonly)NSString *osDevice;
/**
 *  设备唯一标识符 UUID
 */
@property(nonatomic,copy,readonly)NSString *deviceId;

/**
 *  用户登录令牌
 */
@property(nonatomic,copy,readonly)NSString *tocken;

+(ZAKJDeviceInfo *)currentDeviceInfo;
@end
