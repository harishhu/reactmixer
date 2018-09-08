//
//  ZAKJRNAppConfig.h
//  rnbaselib
//
//  Created by harishhu on 2018/6/19.
//  Copyright © 2018年   ReactMixer. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ZAKJRNAppConfig : NSObject
-(instancetype)init;
-(NSString *)getConfig: (NSString *)key;
-(void)putConfig: (NSString *)v forKey: (NSString *)key;
-(NSDictionary *)getAllConfigs;
@end
