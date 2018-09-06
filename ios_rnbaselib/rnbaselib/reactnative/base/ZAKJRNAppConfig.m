//
//  ZAKJRNAppConfig.m
//  rnbaselib
//
//  Created by 胡付义 on 2018/6/19.
//  Copyright © 2018年 众安科技. All rights reserved.
//

#import "ZAKJRNAppConfig.h"
#import "ZAKJDeviceInfo.h"

@implementation ZAKJRNAppConfig{
    NSMutableDictionary *configMap;
}

-(instancetype)init
{
    self = [super init];
    if (self) {
        configMap = [NSMutableDictionary dictionaryWithCapacity:10];
        [self initDefault];
    }
    return self;
}

-(void)initDefault{
    ZAKJDeviceInfo *deviceinfo = [ZAKJDeviceInfo currentDeviceInfo];

    [configMap setValue:@"ios" forKey:@"osType"];
    [configMap setValue:deviceinfo.v forKey: @"appVersion"];
    [configMap setValue:deviceinfo.deviceId forKey:@"deviceID"];
    
    // (statusbar)
    CGRect rectOfStatusbar = [[UIApplication sharedApplication] statusBarFrame];
    //NSLog(@"statusbar height: %f", rectOfStatusbar.size.height); // 高度
    
    [configMap setValue:[NSString stringWithFormat:@"%d", (int)rectOfStatusbar.size.height] forKey:@"statusBarHeight"];
}

-(NSString *)getConfig:(NSString *)key{
    return [configMap valueForKey:key];
}

-(void)putConfig:(NSString *)v forKey:(NSString *)key{
    [configMap setValue:v forKey:key];
}

-(NSDictionary *)getAllConfigs{
    return configMap;
}
@end
