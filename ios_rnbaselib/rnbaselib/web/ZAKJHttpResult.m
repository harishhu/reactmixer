//
//  ZAHttpResult.m
//  hengqinlifeapp
//
//  Created by 胡付义 on 2017/4/1.
//  Copyright © 2017年 横琴人寿. All rights reserved.
//

#import "ZAKJHttpResult.h"

@implementation ZAKJHttpResult

-(instancetype)init{
    self = [super init];
    if (self) {
        _returnCode = 0;
        _returnMsg = @"";
    }
    
    return self;
}

@end
