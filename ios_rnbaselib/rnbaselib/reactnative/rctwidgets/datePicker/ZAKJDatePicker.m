//
//  SADatePicker.m
//  saadtw
//
//  Created by tet-cjx on 2018/2/7.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "ZAKJDatePicker.h"
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import <React/RCTViewManager.h>
#import "ZAKJPickerDate.h"
#import "ZAKJUtils.h"
#import "UIColor+ZAKJHex.h"

@interface ZAKJDatePicker()<ZAKJPickerDateDelegate>

@property (nonatomic, strong) NSString *currentDate;
/** 时间选择 */
@property (nonatomic, strong) UIDatePicker *datePicker;
/** 背景 */
@property (nonatomic, strong) UIView *backView;
@property(nonatomic, copy) RCTBubblingEventBlock onChange;
@property (nonatomic, strong) NSString *mode;

@end

@implementation ZAKJDatePicker

- (instancetype)initWithFrame:(CGRect)frame {
  self = [super initWithFrame:frame];
  if (self) {
    _datePicker = [[UIDatePicker alloc] init];
//    self.frame = CGRectMake(0, 0, UIScreenWidth, UIScreenHeight);
    self.backgroundColor = [UIColor blackColor];
    [self addTarget:self action:@selector(remove) forControlEvents:UIControlEventTouchUpInside];
  }
  return self;
}
- (void)remove {
  self.onChange(nil);
}
- (void)setMode:(NSString *)mode {
  _mode = mode;
  if ([mode isEqualToString:@"time"]) {
    _datePicker.datePickerMode = UIDatePickerModeTime;
    [self creatView];
  } else if ([mode isEqualToString:@"date"]) {
    _datePicker.datePickerMode = UIDatePickerModeDate;
    [self creatView];
  } else if ([mode isEqualToString:@"yearmonth"]){
    ZAKJPickerDate *pick =   [[ZAKJPickerDate alloc]initWithDelegate:self date:[NSDate date] beginDate:[ZAKJUtils dateFromString:@"2016-01-01" format:@"YYYY-MM-dd"] endDate:[NSDate date] mode:ZAKJDatePickerModeYearAndMonth];
    [pick show];
  }else if ([mode isEqualToString:@"year"]){
    ZAKJPickerDate *pick =   [[ZAKJPickerDate alloc]initWithDelegate:self date:[NSDate date] beginDate:[ZAKJUtils dateFromString:@"2016-01-01" format:@"YYYY-MM-dd"] endDate:[NSDate date] mode:ZAKJDatePickerModeYear];
    [pick show];
  }
  else {
    _datePicker.datePickerMode = UIDatePickerModeDateAndTime;
    [self creatView];
  }
  
}

- (void)creatView {
  
  _datePicker.frame = CGRectMake(0, 35, UIScreenWidth, 260);
  if (![ZAKJUtils isSimplifiedLanguages]) {
    _datePicker.calendar = [NSCalendar calendarWithIdentifier:NSCalendarIdentifierRepublicOfChina];
//    NSLocale *locale = [[NSLocale alloc] initWithLocaleIdentifier:@"zh-Hant"];
//    _datePicker.locale = locale;
  }
  if (self.currentDate) {
    _datePicker.date = [ZAKJUtils getDateBy:_currentDate];
  }
  UIView *topView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, UIScreenWidth, 40)];
  topView.backgroundColor = COLOR(@"f5f5f5");
  [self addSubview:self.backView];
  [self.backView addSubview:topView];
  //添加底部button
  UIButton *cancelBtn = [UIButton buttonWithType:UIButtonTypeCustom];
  cancelBtn.frame = CGRectMake(10, 5, 60, 30);
  [cancelBtn setTitleColor:[UIColor grayColor] forState:UIControlStateNormal];
  [cancelBtn setTitle:@"取消" forState:UIControlStateNormal];
  [cancelBtn setTitleColor:[UIColor colorWithHexString:@"00ACFF"] forState:UIControlStateNormal];
  [cancelBtn addTarget:self action:@selector(cancelBtn:) forControlEvents:UIControlEventTouchUpInside];
  [self.backView addSubview:cancelBtn];
  //确定按钮
  UIButton *makeSureBtn = [UIButton buttonWithType:UIButtonTypeCustom];
  makeSureBtn.frame = CGRectMake(UIScreenWidth - 70 , 5, 60, 30);
  [makeSureBtn setTitle:@"确认" forState:UIControlStateNormal];
  [makeSureBtn setTitleColor:[UIColor colorWithHexString:@"00ACFF"] forState:UIControlStateNormal];
  [makeSureBtn addTarget:self action:@selector(makeSureBtn:) forControlEvents:UIControlEventTouchUpInside];
  [self.backView addSubview:makeSureBtn];
  [self.backView addSubview:self.datePicker];

}
//取消
-(void)cancelBtn:(UIButton *)cancelBtn {
  self.onChange(nil);
}

-(void)makeSureBtn:(UIButton *)makeSureBtn {
  NSDate *theDate = _datePicker.date;
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
  if (![ZAKJUtils isSimplifiedLanguages]) {
    dateFormatter.calendar = [NSCalendar calendarWithIdentifier:NSCalendarIdentifierRepublicOfChina];
    if ([_mode isEqualToString:@"date"]) {
      dateFormatter.dateFormat = @"民國yyy年MM月dd日";
    } else {
      dateFormatter.dateFormat = @"民國yyy年MM月dd日 HH:mm:ss";
    }
  } else {
    dateFormatter.dateFormat = @"yyyy年MM月dd日";
  }
  NSString *date = [dateFormatter stringFromDate:theDate];
  NSLog(@"%@",date);
  self.onChange(@{@"date": date});
}

- (void)pickerDate:(ZAKJPickerDate *_Nullable)pickerDate year:(NSInteger)year month:(NSInteger)month day:(NSInteger)day{
  NSString *monthStr;
  
  if (month < 10) {
    monthStr = [NSString stringWithFormat:@"0%ld",(long)month];
  }else
    monthStr = [NSString stringWithFormat:@"%ld",(long)month];
  
  NSString *dayStr;
  
  if (day < 10) {
    dayStr = [NSString stringWithFormat:@"0%ld",(long)day];
  }else
    dayStr = [NSString stringWithFormat:@"%ld",(long)day];
  
  NSString *date = @"";
  if ([_mode isEqualToString:@"yearmonth"]) {
    date = [NSString stringWithFormat:@"%@%@%ld%@",[ZAKJUtils changeYearByLanguages:year], @"年",(long)month, @"月"];
  }else if(([_mode isEqualToString:@"year"])){
    date = [NSString stringWithFormat:@"%@%@",[ZAKJUtils changeYearByLanguages:year], @"年"];
  }
  self.onChange(@{@"date": date});
}

- (void)datePickerDidCancel{
  self.onChange(nil);
}

- (UIView *)backView {
  if (!_backView) {
    _backView = [[UIView alloc] init];
    _backView.backgroundColor = [UIColor whiteColor];
    _backView.frame = CGRectMake(0, UIScreenHeight - 300, UIScreenWidth, 300);
  }
  return _backView;
}

@end
