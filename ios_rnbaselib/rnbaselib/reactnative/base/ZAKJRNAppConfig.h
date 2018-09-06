//
//  ZAKJRNAppConfig.h
//  rnbaselib
//
//  Created by 胡付义 on 2018/6/19.
//  Copyright © 2018年 众安科技. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ZAKJRNAppConfig : NSObject
-(instancetype)init;
-(NSString *)getConfig: (NSString *)key;
-(void)putConfig: (NSString *)v forKey: (NSString *)key;
-(NSDictionary *)getAllConfigs;
@end
