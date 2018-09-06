//
//  RNHttpRequestItem.m
//  rnbaselib
//
//  Created by 胡付义 on 2018/4/25.
//  Copyright © 2018年 众安科技. All rights reserved.
//

#import "ZAKJRNHttpRequestItem.h"
#import "ZAKJUtils.h"

@implementation ZAKJRNHttpRequestItem
-(NSString *)buildTargetUrl:(NSString *)host{
    return self.targetUrl;
}

-(void)buildHttpParams:(NSDictionary *)params{
    [super buildHttpParams:params];
    
    if (_bodyDic) {
        for (NSString *key in _bodyDic.allKeys ) {
            [params setValue:[_bodyDic valueForKey:key] forKey:key];
        }
    }
}

-(void)parseHttpResult:(ZAKJHttpResult *)result{
}

-(void)buildHttpHeaders:(NSDictionary *)headers{
    if (_httpHeaders && _httpHeaders.count > 0) {
        for (NSString *key in _httpHeaders) {
            NSString *value = _httpHeaders[key];
            
            if (![ZAKJUtils isEmptyString:value]) {
                [headers setValue:value forKey:key];
            }
        }
    }
}

@end

