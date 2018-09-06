//
//  RCTPickerManager.m
//  saadtw
//
//  Created by 胡付义 on 2018/1/15.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "ZAKJRCTPickerManager.h"
#import <UIKit/UIKit.h>
#import "ZAKJPickerView.h"

@implementation ZAKJRCTPickerManager
RCT_EXPORT_MODULE(ZAKJRCTPicker)

RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(items, NSArray);
RCT_EXPORT_VIEW_PROPERTY(defaultIndex, NSInteger);

-(UIView *)view{
  NSLog(@"create sa rect picker view");
  ZAKJPickerView *temp = [[ZAKJPickerView alloc] init];
  return temp;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

@end
