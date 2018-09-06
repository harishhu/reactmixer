//
//  ZAKJRCTCycleScrollManager.m
//  saadtw
//
//  Created by tet-cjx on 2018/4/28.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "ZAKJRCTAutoTextViewManager.h"
#import "ZAKJAutoTextView.h"

@interface ZAKJRCTAutoTextViewManager()
@end

@implementation ZAKJRCTAutoTextViewManager
RCT_EXPORT_MODULE(ZAKJRCTAutoTextView)

RCT_EXPORT_VIEW_PROPERTY(autoScrollTimeInterval, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(textData, NSArray);
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)

- (UIView *)view{
  ZAKJAutoTextView *autotextview = [[ZAKJAutoTextView alloc] init];
  return autotextview;
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

@end
