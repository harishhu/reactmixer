//
//  SADatePicker.h
//  saadtw
//
//  Created by tet-cjx on 2018/2/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
typedef NS_ENUM(NSInteger, ZAKJDatePickerType) {
  ZAKJDatePickerTypeTime,
  ZAKJDatePickerTypeDate,
  ZAKJDatePickerTypeDateAndTime,
};
@interface ZAKJDatePicker : UIButton

@property (nonatomic, assign) ZAKJDatePickerType hqDatePickerType;

@end
