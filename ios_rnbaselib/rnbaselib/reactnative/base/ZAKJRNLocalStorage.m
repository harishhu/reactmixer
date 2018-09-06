//
//  RNLocalStorage.m
//  saadtw
//
//  Created by 胡付义 on 2018/3/28.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "ZAKJRNLocalStorage.h"
#import "ZAKJFileCacheManager.h"
#import "ZAKJReactNative.h"

@implementation ZAKJRNLocalStorage
+(void)handleEvent:(NSString *)type Key:(NSString *)key Data:(id)data
         callbackid: (NSString *)callbackid responser:(id)responser{
  if([type isEqualToString:@"put"]){
    [ZAKJFileCacheManager saveObject:data forKey: key];
  }else if([type isEqualToString:@"get"]){
    ZAKJReactNative *proxy = responser;
    id resdata = [ZAKJFileCacheManager objectForKey:key];
    
    [proxy invokeCallback: callbackid params: resdata];
  }
}
@end
