//
//  RNHttpRequestItem.h
//  rnbaselib
//
//  Created by 胡付义 on 2018/4/25.
//  Copyright © 2018年 众安科技. All rights reserved.
//

#import "ZAKJRequestItemBase.h"

@interface ZAKJRNHttpRequestItem : ZAKJRequestItemBase
@property(nonatomic, strong) NSDictionary *bodyDic;
@property(nonatomic, strong) NSDictionary *httpHeaders;
@end

