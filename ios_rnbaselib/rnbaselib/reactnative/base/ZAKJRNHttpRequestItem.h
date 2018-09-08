//
//  RNHttpRequestItem.h
//  rnbaselib
//
//  Created by harishhu on 2018/4/25.
//  Copyright © 2018年   ReactMixer. All rights reserved.
//

#import "ZAKJRequestItemBase.h"

@interface ZAKJRNHttpRequestItem : ZAKJRequestItemBase
@property(nonatomic, strong) NSDictionary *bodyDic;
@property(nonatomic, strong) NSDictionary *httpHeaders;
@end

