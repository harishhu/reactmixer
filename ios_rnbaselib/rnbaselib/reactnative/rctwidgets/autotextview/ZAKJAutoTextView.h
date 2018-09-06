//
//  ZAKJCycleScrollView.h
//  saadtw
//
//  Created by tet-cjx on 2018/4/28.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "SDCycleScrollView.h"
#import <React/RCTViewManager.h>

@interface ZAKJAutoTextView : UIView<SDCycleScrollViewDelegate>

@property (nonatomic, copy) RCTBubblingEventBlock onChange;
@property (nonatomic, assign) CGFloat autoScrollTimeInterval;
@property (nonatomic, strong) NSArray *textData;
@property (nonatomic, strong) SDCycleScrollView *cycleScrollView;
@end
