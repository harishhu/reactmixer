//
//  RNLocalStorage.h
//  saadtw
//
//  Created by harishhu on 2018/3/28.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ZAKJRNLocalStorage : NSObject
+(void)handleEvent: (NSString *) type Key:(NSString *)key Data: (id)data
        callbackid: (NSString *)callbackid responser: (id) responser;
@end
