//
//  ZAKJRCTCycleScrollManager.m
//  saadtw
//
//  Created by tet-cjx on 2018/4/28.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "ZAKJRCTCycleScrollManager.h"
#import "ZAKJCycleScrollView.h"

@interface ZAKJRCTCycleScrollManager()

@end

@implementation ZAKJRCTCycleScrollManager
RCT_EXPORT_MODULE(ZAKJRCTCycleScroll)

RCT_EXPORT_VIEW_PROPERTY(autoScrollTimeInterval, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(pageControlBottomOffset, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(placeholderImage, UIImage);
RCT_EXPORT_VIEW_PROPERTY(imageURLStringsGroup, NSArray);
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)

- (UIView *)view{
  ZAKJCycleScrollView *cycleView = [[ZAKJCycleScrollView alloc] init];
  return cycleView;
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

@end
