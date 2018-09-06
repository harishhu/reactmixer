//
//  ZAHttpResult.h
//  hengqinlifeapp
//
//  Created by 胡付义 on 2017/4/1.
//  Copyright © 2017年 横琴人寿. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ZAKJBaseDataModel.h"

@interface ZAKJHttpResult : ZAKJBaseDataModel
@property(nonatomic, assign) NSInteger returnCode;
@property(nonatomic, copy) NSString* returnMsg;

@property(nonatomic, retain) id body;
@end
