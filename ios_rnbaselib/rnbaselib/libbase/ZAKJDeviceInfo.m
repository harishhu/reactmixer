//
//  HQDeviceInfo.m
//  saadtw
//
//  Created by harishhu on 2017/12/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//
#import <UIKit/UIKit.h>
#import "ZAKJDeviceInfo.h"
#import <sys/utsname.h>
@interface ZAKJDeviceInfo()

@property(nonatomic,copy,readwrite)NSString *v;
@property(nonatomic,copy,readwrite)NSString *t;
@property(nonatomic,copy,readwrite)NSString *osVersion;
@property(nonatomic,copy,readwrite)NSString *osDevice;
@property(nonatomic,copy,readwrite)NSString *deviceId;
@property(nonatomic,copy,readwrite)NSString *tocken;

@end
@implementation ZAKJDeviceInfo
-(instancetype)init
{
  if (self = [super init]) {
    [self initProperties];
  }
  return self;
}

+(ZAKJDeviceInfo *)currentDeviceInfo
{
  static ZAKJDeviceInfo *currentDeviceInfo;
  static dispatch_once_t once;
  dispatch_once(&once, ^{
    currentDeviceInfo = [[ZAKJDeviceInfo alloc]init];
  });
  return currentDeviceInfo;
}

-(void)initProperties
{
  self.deviceId = [[UIDevice currentDevice].identifierForVendor UUIDString];
  self.osDevice = [self iphoneType];
  self.t=[[UIDevice currentDevice]model];
  self.v = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
  UIDevice *dev = [UIDevice currentDevice];
  self.osVersion = [dev.systemName stringByAppendingFormat:@" %@", dev.systemVersion];
}

- (NSString *)iphoneType {
  
  struct utsname systemInfo;
  
  uname(&systemInfo);
  
  NSString *platform = [NSString stringWithCString:systemInfo.machine encoding:NSASCIIStringEncoding];
  
  if ([platform isEqualToString:@"iPhone1,1"]) return @"iPhone 2G";
  
  if ([platform isEqualToString:@"iPhone1,2"]) return @"iPhone 3G";
  
  if ([platform isEqualToString:@"iPhone2,1"]) return @"iPhone 3GS";
  
  if ([platform isEqualToString:@"iPhone3,1"]) return @"iPhone 4";
  
  if ([platform isEqualToString:@"iPhone3,2"]) return @"iPhone 4";
  
  if ([platform isEqualToString:@"iPhone3,3"]) return @"iPhone 4";
  
  if ([platform isEqualToString:@"iPhone4,1"]) return @"iPhone 4S";
  
  if ([platform isEqualToString:@"iPhone5,1"]) return @"iPhone 5";
  
  if ([platform isEqualToString:@"iPhone5,2"]) return @"iPhone 5";
  
  if ([platform isEqualToString:@"iPhone5,3"]) return @"iPhone 5c";
  
  if ([platform isEqualToString:@"iPhone5,4"]) return @"iPhone 5c";
  
  if ([platform isEqualToString:@"iPhone6,1"]) return @"iPhone 5s";
  
  if ([platform isEqualToString:@"iPhone6,2"]) return @"iPhone 5s";
  
  if ([platform isEqualToString:@"iPhone7,1"]) return @"iPhone 6 Plus";
  
  if ([platform isEqualToString:@"iPhone7,2"]) return @"iPhone 6";
  
  if ([platform isEqualToString:@"iPhone8,1"]) return @"iPhone 6s";
  
  if ([platform isEqualToString:@"iPhone8,2"]) return @"iPhone 6s Plus";
  
  if ([platform isEqualToString:@"iPhone8,4"]) return @"iPhone SE";
  
  if ([platform isEqualToString:@"iPhone9,1"]) return @"iPhone 7";
  
  if ([platform isEqualToString:@"iPhone9,2"]) return @"iPhone 7 Plus";
  
  if ([platform isEqualToString:@"iPhone10,1"]) return @"iPhone 8";
  
  if ([platform isEqualToString:@"iPhone10,4"]) return @"iPhone 8";
  
  if ([platform isEqualToString:@"iPhone10,2"]) return @"iPhone 8 Plus";
  
  if ([platform isEqualToString:@"iPhone10,5"]) return @"iPhone 8 Plus";
  
  if ([platform isEqualToString:@"iPhone10,3"]) return @"iPhone X";
  
  if ([platform isEqualToString:@"iPhone10,6"]) return @"iPhone X";
  
  if ([platform isEqualToString:@"iPod1,1"]) return @"iPod Touch 1G";
  
  if ([platform isEqualToString:@"iPod2,1"]) return @"iPod Touch 2G";
  
  if ([platform isEqualToString:@"iPod3,1"]) return @"iPod Touch 3G";
  
  if ([platform isEqualToString:@"iPod4,1"]) return @"iPod Touch 4G";
  
  if ([platform isEqualToString:@"iPod5,1"]) return @"iPod Touch 5G";
  
  if ([platform isEqualToString:@"iPad1,1"]) return @"iPad 1G";
  
  if ([platform isEqualToString:@"iPad2,1"]) return @"iPad 2";
  
  if ([platform isEqualToString:@"iPad2,2"]) return @"iPad 2";
  
  if ([platform isEqualToString:@"iPad2,3"]) return @"iPad 2";
  
  if ([platform isEqualToString:@"iPad2,4"]) return @"iPad 2";
  
  if ([platform isEqualToString:@"iPad2,5"]) return @"iPad Mini 1G";
  
  if ([platform isEqualToString:@"iPad2,6"]) return @"iPad Mini 1G";
  
  if ([platform isEqualToString:@"iPad2,7"]) return @"iPad Mini 1G";
  
  if ([platform isEqualToString:@"iPad3,1"]) return @"iPad 3";
  
  if ([platform isEqualToString:@"iPad3,2"]) return @"iPad 3";
  
  if ([platform isEqualToString:@"iPad3,3"]) return @"iPad 3";
  
  if ([platform isEqualToString:@"iPad3,4"]) return @"iPad 4";
  
  if ([platform isEqualToString:@"iPad3,5"]) return @"iPad 4";
  
  if ([platform isEqualToString:@"iPad3,6"]) return @"iPad 4";
  
  if ([platform isEqualToString:@"iPad4,1"]) return @"iPad Air";
  
  if ([platform isEqualToString:@"iPad4,2"]) return @"iPad Air";
  
  if ([platform isEqualToString:@"iPad4,3"]) return @"iPad Air";
  
  if ([platform isEqualToString:@"iPad4,4"]) return @"iPad Mini 2G";
  
  if ([platform isEqualToString:@"iPad4,5"]) return @"iPad Mini 2G";
  
  if ([platform isEqualToString:@"iPad4,6"]) return @"iPad Mini 2G";
  
  if ([platform isEqualToString:@"i386"]) return @"iPhone Simulator";
  
  if ([platform isEqualToString:@"x86_64"]) return @"iPhone Simulator";
  
  return platform;
  
}
@end
