//
//  SARCTDatePickerManager.m
//  saadtw
//
//  Created by tet-cjx on 2018/2/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "ZAKJRCTDatePickerManager.h"
#import "ZAKJDatePicker.h"
@implementation ZAKJRCTDatePickerManager
RCT_EXPORT_MODULE(ZAKJRCTDatePicker)

RCT_EXPORT_VIEW_PROPERTY(currentDate, NSString);
RCT_EXPORT_VIEW_PROPERTY(mode, NSString);
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)


-(UIView *)view{
  ZAKJDatePicker *temp = [[ZAKJDatePicker alloc] init];
  return temp;
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

@end
