//
//  VVPickerDate.h
//  有截止时间或起始时间的日期选择器
//
//  Created by iosDev on 16/6/29.
//  Copyright © 2016年 iosDev. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger,ZAKJDatePickerMode) {
    ZAKJDatePickerModeDate,     // Displays month, day, and year depending on the locale setting (e.g. November | 15 | 2007)
    ZAKJDatePickerModeYearAndMonth, // Displays Year, Month,  designation depending on the locale setting (e.g. November | 2007)
    ZAKJDatePickerModeYear
};

@class ZAKJPickerDate;
@protocol ZAKJPickerDateDelegate<NSObject>
- (void)pickerDate:(ZAKJPickerDate *_Nullable)pickerDate year:(NSInteger)year month:(NSInteger)month day:(NSInteger)day;

@optional
-(void)datePickerDidCancel;

@end

@interface ZAKJPickerDate : UIButton

@property(nonatomic, weak)id <ZAKJPickerDateDelegate>delegate ;

- (instancetype)initWithDelegate:(nullable id /*<ZAKJPickerDateDelegate>*/)delegate;

- (instancetype)initWithDelegate:(nullable id /*<ZAKJPickerDateDelegate>*/)delegate date:(NSDate *)date beginDate:(NSDate *)beginDate mode:(ZAKJDatePickerMode)pickMode;

- (instancetype)initWithDelegate:(nullable id /*<ZAKJPickerDateDelegate>*/)delegate date:(NSDate *)date endDate:(NSDate *)endDate mode:(ZAKJDatePickerMode)pickMode;
- (instancetype)initWithDelegate:(id)delegate date:(NSDate *)date beginDate:(NSDate *)beginDate endDate:(NSDate *)endDate mode:(ZAKJDatePickerMode)pickMode;

- (void)show;

@end
