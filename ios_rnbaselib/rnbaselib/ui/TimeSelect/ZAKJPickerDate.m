//
//  VVPickerDate.m
//  有截止时间或起始时间的日期选择器
//
//  Created by iosDev on 16/6/29.
//  Copyright © 2016年 iosDev. All rights reserved.
//

#import "ZAKJPickerDate.h"
#import "ZAKJToolBar.h"
#import "UIView+ZAKJ.h"
#import "ZAKJConstant.h"
#import "NSCalendar+ZAKJ.h"
#import "ZAKJUtils.h"

#define RGBA(r, g, b, a) [UIColor colorWithRed:r/255.0f green:g/255.0f blue:b/255.0f alpha:a]
#define RGB(r, g, b) RGBA(r, g, b, 1.0f)
#define STWeakSelf __weak typeof(self) weakSelf = self;

static CGFloat const PickerViewHeight = 230;
static CGFloat const PickerViewLabelWeight = 33;

static NSInteger const yearSum = 20;

@interface ZAKJPickerDate()<UIPickerViewDataSource, UIPickerViewDelegate>

@property(nonatomic, strong) NSDate *curDate;
@property(nonatomic, strong) NSDate *beginDate;
@property(nonatomic, strong) NSDate *endDate;
@property (nonatomic, assign) NSInteger yearMin ;
@property (nonatomic, assign) NSInteger monthMin ;

@property (nonatomic, strong, nullable)UIPickerView *pickerView;

@property (nonatomic, strong, nullable)ZAKJToolBar *toolbar;

@property (nonatomic, strong, nullable)UIView *lineView;

/** 开始年*/
@property (nonatomic, assign)NSInteger year;
/** 结束年*/
@property (nonatomic, assign)NSInteger endYear;

@property (nonatomic, assign)NSInteger month;

@property (nonatomic, assign)NSInteger day;

@property (nonatomic,assign)ZAKJDatePickerMode pickMode;

@end



@implementation ZAKJPickerDate

#pragma mark - --- init 视图初始化 ---

- (instancetype)initWithDelegate:(id)delegate
{
    self = [self init];
    [self setupUI];
    self.delegate = delegate;
    self.yearMin = 1990;
    [self loadData];
    return self;
}

- (instancetype)initWithDelegate:(id)delegate date:(NSDate *)date beginDate:(NSDate *)beginDate mode:(ZAKJDatePickerMode)pickMode {
    
    self.pickMode = pickMode;
    return [self initWithDelegate:delegate date:date beginDate:beginDate endDate:nil mode:pickMode];
}

- (instancetype)initWithDelegate:(id)delegate date:(NSDate *)date endDate:(NSDate *)endDate  mode:(ZAKJDatePickerMode)pickMode{
    
    self.pickMode = pickMode;
    return [self initWithDelegate:delegate date:date beginDate:nil endDate:endDate mode:pickMode];
}

- (instancetype) initWithDelegate:(id)delegate date:(NSDate *)date beginDate:(NSDate *)beginDate endDate:(NSDate *)endDate mode:(ZAKJDatePickerMode)pickMode{
    
    self = [self init];
    self.pickMode = pickMode;
    [self setupUI];
    self.delegate = delegate;
    self.curDate = date;
    self.beginDate = beginDate;
    
    if (self.pickMode == ZAKJDatePickerModeDate) {
        if (self.beginDate) {
            self.yearMin  = [NSCalendar currentYear:self.beginDate];
        } else {
            NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
            [formatter setDateFormat:@"yyyy"];
            NSInteger curyear = [[formatter stringFromDate:endDate] intValue];
            self.yearMin = curyear-100;
        }
    }else{
        if (self.beginDate) {
            self.yearMin  = [NSCalendar currentYear:self.beginDate];
        } else {
            NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
            [formatter setDateFormat:@"yyyy"];
            NSInteger curyear = [[formatter stringFromDate:endDate] intValue];
            self.yearMin = curyear-100;
        }
    }

    self.endDate = endDate;
    [self loadData];
    return self;
    
}

- (void)setupUI{
    self.bounds = [UIScreen mainScreen].bounds;
    self.backgroundColor = RGBA(0, 0, 0, 102.0/255);
    [self.layer setOpaque:0.0];
    [self addSubview:self.pickerView];
    [self.pickerView addSubview:self.lineView];
    [self addSubview:self.toolbar];
    [self addTarget:self action:@selector(remove) forControlEvents:UIControlEventTouchUpInside];
}

- (void)loadData{
    
    if (self.pickMode == ZAKJDatePickerModeDate) {
        if (self.beginDate) {
            _year  = [NSCalendar currentYear:self.beginDate];
            _month = [NSCalendar currentMonth:self.beginDate];
            _day   = [NSCalendar currentDay:self.beginDate];
            [self.pickerView selectRow:(2100 - self.yearMin) inComponent:0 animated:NO];
            [self.pickerView selectRow:0 inComponent:0 animated:NO];
            [self.pickerView reloadComponent:1];
            [self.pickerView selectRow:0 inComponent:1 animated:NO];
            [self.pickerView reloadComponent:2];
            [self.pickerView selectRow:0 inComponent:2 animated:NO];
        } else if (self.endDate) {
            _year  = [NSCalendar currentYear:self.endDate];
            _month = [NSCalendar currentMonth:self.endDate];
            _day   = [NSCalendar currentDay:self.endDate];
            [self.pickerView selectRow:(1980-self.yearMin) inComponent:0 animated:NO];//(_year - self.yearMin )
            [self.pickerView reloadComponent:1];
            [self.pickerView selectRow:0 inComponent:1 animated:NO];//(_month - 1)
            [self.pickerView reloadComponent:2];
            [self.pickerView selectRow:0 inComponent:2 animated:NO];//(_day - 1)
        }
    }else if(self.pickMode == ZAKJDatePickerModeYear){
      if (self.beginDate) {
        _year  = [NSCalendar currentYear:self.beginDate];
        _endYear  = [NSCalendar currentYear:self.endDate];
        [self.pickerView selectRow:(2100 - self.yearMin) inComponent:0 animated:NO];
        [self.pickerView selectRow:0 inComponent:0 animated:NO];
      } else {
        _year  = [NSCalendar currentYear:self.endDate];
        [self.pickerView selectRow:(1980-self.yearMin) inComponent:0 animated:NO];//(_year - self.yearMin )
      }
    }else{
      if (self.beginDate) {
        _year  = [NSCalendar currentYear:self.beginDate];
        _endYear  = [NSCalendar currentYear:self.endDate];
        _month = [NSCalendar currentMonth:self.beginDate];
        [self.pickerView selectRow:(2100 - self.yearMin) inComponent:0 animated:NO];
        [self.pickerView selectRow:0 inComponent:0 animated:NO];
        [self.pickerView reloadComponent:1];
        [self.pickerView selectRow:0 inComponent:1 animated:NO];
      } else {
        _year  = [NSCalendar currentYear:self.endDate];
        _month = [NSCalendar currentMonth:self.endDate];
        [self.pickerView selectRow:(1980-self.yearMin) inComponent:0 animated:NO];//(_year - self.yearMin )
        [self.pickerView reloadComponent:1];
        [self.pickerView selectRow:0 inComponent:1 animated:NO];//(_month - 1)
        
      }
    }


}


#pragma mark - --- delegate 视图委托 ---
- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView
{
    switch (self.pickMode) {
        case ZAKJDatePickerModeDate:
            return 3;
            break;
        case ZAKJDatePickerModeYearAndMonth:
            return 2;
            break;
        case ZAKJDatePickerModeYear:
        return 1;
        break;
            
        default:
            break;
    }
    
}

- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component
{
   
    if (self.pickMode == ZAKJDatePickerModeDate) {
        
        if (component == 0) {
            if (self.beginDate) {
                return 2048 - _year;
            }
            if (self.endDate) {
                return _year + 1 - self.yearMin;
            }
            return yearSum;
        }else if(component == 1) {
            if (self.beginDate) {//有起始时间的情况下
                NSInteger yearSelected = [pickerView selectedRowInComponent:0] + self.yearMin ;
                if (yearSelected == [NSCalendar currentYear:self.beginDate]) {
                    return 13 - [NSCalendar currentMonth:self.beginDate];
                } else {
                    return 12;
                }
            }
            if (self.endDate) {//有结束时间的情况下
                NSInteger yearSelected = [pickerView selectedRowInComponent:0] + self.yearMin ;
                if (yearSelected == [NSCalendar currentYear:self.endDate]) {
                    return [NSCalendar currentMonth:self.endDate];
                } else {
                    return 12;
                }
            }
            return 12;
        }else {
            if (self.beginDate) {//有起始时间的情况下
                NSInteger yearSelected = [pickerView selectedRowInComponent:0] + self.yearMin ;
                if (yearSelected == [NSCalendar currentYear:self.beginDate]) {
                    NSInteger monthSelected = [pickerView selectedRowInComponent:1] + [NSCalendar currentMonth:self.beginDate];
                    if ([pickerView selectedRowInComponent:1] == 0) {
                        return [NSCalendar getDaysWithYear:yearSelected month:monthSelected] - [NSCalendar currentDay:self.beginDate] + 1;
                    } else {
                        return [NSCalendar getDaysWithYear:yearSelected month:monthSelected];
                    }
                } else {
                    NSInteger monthSelected = [pickerView selectedRowInComponent:1] + 1;
                    return  [NSCalendar getDaysWithYear:yearSelected month:monthSelected];
                }
            }
            if (self.endDate) {//有结束时间的情况下
                NSInteger yearSelected = [pickerView selectedRowInComponent:0] + self.yearMin ;
                if (yearSelected == [NSCalendar currentYear:self.endDate]) {
                    NSInteger monthSelected = [pickerView selectedRowInComponent:1] + 1;
                    if (monthSelected == [NSCalendar currentMonth:self.endDate]) {
                        return [NSCalendar currentDay:self.endDate];
                    } else {
                        return [NSCalendar getDaysWithYear:yearSelected month:monthSelected];
                    }
                } else {
                    NSInteger monthSelected = [pickerView selectedRowInComponent:1] + 1;
                    return  [NSCalendar getDaysWithYear:yearSelected month:monthSelected];
                }
            }
            NSInteger yearSelected = [pickerView selectedRowInComponent:0] + self.yearMin ;
            NSInteger monthSelected = [pickerView selectedRowInComponent:1] + 1;
            return  [NSCalendar getDaysWithYear:yearSelected month:monthSelected];
        }
        
    }else if (self.pickMode == ZAKJDatePickerModeYear){
      if (self.beginDate && self.endDate) {
        return _endYear - _year + 1;
      }
      if (self.beginDate) {
        return 2048 - _year;
      }
      if (self.endDate) {
        return _year + 1 - self.yearMin;
      }
      return yearSum;
    }else{
        if (component == 0) {
            if (self.beginDate && self.endDate) {
                return _endYear - _year + 1;
            }
            if (self.beginDate) {
                return 2048 - _year;
            }
            if (self.endDate) {
                return _year + 1 - self.yearMin;
            }
            return yearSum;
        }else {
            
            if (self.beginDate && self.endDate) {//有起始时间的情况下
                NSInteger yearSelected = [pickerView selectedRowInComponent:0] + self.yearMin ;
                if (yearSelected == [NSCalendar currentYear:self.beginDate]) {
                    return 13 - [NSCalendar currentMonth:self.beginDate];
                } else if (yearSelected == [NSCalendar currentYear:self.endDate]){
                    return [NSCalendar currentMonth:self.endDate];
                }else{
                    return 12;
                }
            }
            
            if (self.beginDate) {//有起始时间的情况下
                NSInteger yearSelected = [pickerView selectedRowInComponent:0] + self.yearMin ;
                if (yearSelected == [NSCalendar currentYear:self.beginDate]) {
                    return 13 - [NSCalendar currentMonth:self.beginDate];
                } else {
                    return 12;
                }
            }
            if (self.endDate) {//有结束时间的情况下
                NSInteger yearSelected = [pickerView selectedRowInComponent:0] + self.yearMin ;
                if (yearSelected == [NSCalendar currentYear:self.endDate]) {
                    return [NSCalendar currentMonth:self.endDate];
                } else {
                    return 12;
                }
            }
            return 12;
        }
    }
}


- (CGFloat)pickerView:(UIPickerView *)pickerView rowHeightForComponent:(NSInteger)component
{
    return PickerViewLabelWeight;
}

- (void)pickerView:(UIPickerView *)pickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component
{
    
    if (self.pickMode == ZAKJDatePickerModeDate) {
        
        
        switch (component) {
            case 0:
                [pickerView reloadComponent:1];
                [pickerView reloadComponent:2];
                //[pickerView selectRow:(12 - [NSCalendar currentMonth:self.beginDate]) inComponent:1 animated:NO];
                [pickerView selectRow:0 inComponent:1 animated:NO];
                [pickerView reloadComponent:1];
                [pickerView reloadComponent:2];
                [pickerView selectRow:0 inComponent:2 animated:NO];
                self.year  = [self.pickerView selectedRowInComponent:0] + self.yearMin;
                if (self.beginDate) {
                    if (self.year == self.yearMin) {
                        self.month = [NSCalendar currentMonth:self.beginDate];
                        self.day = [NSCalendar currentDay:self.beginDate];
                    } else {
                        self.month = 1;
                        self.day = 1;
                    }
                } else {
                    self.month = 1;
                    self.day = 1;
                }
                [pickerView reloadComponent:1];
                [pickerView reloadComponent:2];
                break;
            case 1:
                [pickerView selectRow:0 inComponent:2 animated:NO];
                if (self.beginDate) {
                    if (self.year == self.yearMin) {
                        self.month = [self.pickerView selectedRowInComponent:1] + [NSCalendar currentMonth:self.beginDate];
                        if ([self.pickerView selectedRowInComponent:1] == 0) {
                            self.day = [NSCalendar currentDay:self.beginDate];
                        } else {
                            self.day = 1;
                        }
                    } else {
                        self.month = [self.pickerView selectedRowInComponent:1] + 1;
                        self.day = 1;
                    }
                } else {
                    self.month = [self.pickerView selectedRowInComponent:1] + 1;
                    self.day = 1;
                }
                [pickerView reloadComponent:1];
                [pickerView reloadComponent:2];
                
            default:
                if (self.beginDate) {
                    if (self.year == self.yearMin) {
                        if (self.month == [NSCalendar currentMonth:self.beginDate]) {
                            self.day = [self.pickerView selectedRowInComponent:2] + [NSCalendar currentDay:self.beginDate];
                        } else {
                            self.day = [self.pickerView selectedRowInComponent:2] + 1;
                        }
                    } else {
                        self.day = [self.pickerView selectedRowInComponent:2] + 1;
                    }
                }else {
                    self.day = [self.pickerView selectedRowInComponent:2] + 1;
                }
                break;
        }
        
    }else if (self.pickMode == ZAKJDatePickerModeYear){
       self.year  = [self.pickerView selectedRowInComponent:0] + self.yearMin;
    }else{
        switch (component) {
            case 0:
                [pickerView reloadComponent:1];
                //[pickerView selectRow:(12 - [NSCalendar currentMonth:self.beginDate]) inComponent:1 animated:NO];
                [pickerView selectRow:0 inComponent:1 animated:NO];
                [pickerView reloadComponent:1];
                self.year  = [self.pickerView selectedRowInComponent:0] + self.yearMin;
                if (self.beginDate) {
                    if (self.year == self.yearMin) {
                        self.month = [NSCalendar currentMonth:self.beginDate];
                    } else {
                        self.month = 1;
                    }
                } else {
                    self.month = 1;
                   
                }
                [pickerView reloadComponent:1];
               
                break;
            case 1:
                
                if (self.beginDate) {
                    if (self.year == self.yearMin) {
                        self.month = [self.pickerView selectedRowInComponent:1] + [NSCalendar currentMonth:self.beginDate];
                      
                    } else {
                        self.month = [self.pickerView selectedRowInComponent:1] + 1;
                        
                    }
                } else {
                    
                    self.month = [self.pickerView selectedRowInComponent:1] + 1;
                    
                }
                [pickerView reloadComponent:1];
                
            default:
                break;
        }
    }
    
    [self reloadData];
}

-(NSString *)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component {
    NSString *text;
    
    if (self.pickMode == ZAKJDatePickerModeDate) {
        
        
        if (component == 0) {
            if (self.beginDate) {
                text =  [NSString stringWithFormat:@"%zd", row + [NSCalendar currentYear:self.beginDate]];
            } else {
                text =  [NSString stringWithFormat:@"%zd", row + self.yearMin ];
            }
        }else if (component == 1){
            if (self.beginDate) {
                if (self.year == self.yearMin ) {
                    text = [NSString stringWithFormat:@"%zd", row + [NSCalendar currentMonth:self.beginDate]];
                } else {
                    //text = [NSString stringWithFormat:@"%zd", row + 1];
                    text =  [self changeMonth:row + 1];
                }
            } else {
                //text = [NSString stringWithFormat:@"%zd", row + 1];
                text = [self changeMonth:row + 1];
            }
        }else{
            if (self.beginDate) {
                if (self.year == self.yearMin ) {
                    if (self.month == [NSCalendar currentMonth:self.beginDate]) {
                        text = [NSString stringWithFormat:@"%zd", row + [NSCalendar currentDay:self.beginDate]];
                    } else {
                        //text = [NSString stringWithFormat:@"%zd", row + 1];
                        text = [self changeMonth:row + 1];
                    }
                } else {
                    //text = [NSString stringWithFormat:@"%zd", row + 1];
                    text = [self changeMonth:row + 1];
                }
            } else {
                //text = [NSString stringWithFormat:@"%zd", row + 1];
                text = [self changeMonth:row + 1];
            }
        }
        
    }else if (self.pickMode == ZAKJDatePickerModeYear){
      if (self.beginDate) {
        text =  [NSString stringWithFormat:@"%zd", row + [NSCalendar currentYear:self.beginDate]];
      } else {
        text =  [NSString stringWithFormat:@"%zd", row + self.yearMin ];
      }
    }else{
        if (component == 0) {
            if (self.beginDate) {
                text =  [NSString stringWithFormat:@"%zd", row + [NSCalendar currentYear:self.beginDate]];
            } else {
                text =  [NSString stringWithFormat:@"%zd", row + self.yearMin ];
            }
        }else if (component == 1){
            if (self.beginDate) {
                if (self.year == self.yearMin ) {
                    //text = [NSString stringWithFormat:@"%zd", row + [NSCalendar currentMonth:self.beginDate]];
                    text = [self changeMonth:row + [NSCalendar currentMonth:self.beginDate]];
                } else {
                    //text = [NSString stringWithFormat:@"%zd", row + 1];
                    text = [self changeMonth:row + 1];
                }
            } else {
                //text = [NSString stringWithFormat:@"%zd", row + 1];
                text = [self changeMonth:row + 1];
            }
        }
    }
  if (component == 0) {
    text = [ZAKJUtils changeYearByLanguages:[text integerValue]];
  }

    return text;
}

#pragma mark - --- event response 事件相应 ---

- (void)selectedOk
{
    
    if ([self.delegate respondsToSelector:@selector(pickerDate:year:month:day:)]) {
        [self.delegate pickerDate:self year:self.year month:self.month day:self.day];
        
    }
    
    [self remove];
}

- (void)selectedCancel
{
    [self remove];
}

#pragma mark - --- private methods 私有方法 ---

- (void)reloadData
{
    switch (self.pickMode) {
        case ZAKJDatePickerModeDate:
//            self.toolbar.title = [NSString stringWithFormat:@"%zd年%zd月%zd日", self.year, self.month, self.day];
            self.toolbar.title = [NSString stringWithFormat:@"%zd年%@月%zd日", self.year, [self changeMonth:self.month], self.day];
            break;
        case ZAKJDatePickerModeYearAndMonth:
//            self.toolbar.title = [NSString stringWithFormat:@"%zd年%zd月", self.year, self.month];
            self.toolbar.title = [NSString stringWithFormat:@"%zd年%@月", self.year, [self changeMonth:self.month]];
            break;
      case ZAKJDatePickerModeYear:
        self.toolbar.title = [NSString stringWithFormat:@"%@%@",[ZAKJUtils changeYearByLanguages:self.year],NSLocalizedString(@"年", nil)];
        break;
            
        default:
            break;
    }
    
}

- (void)show
{
    [[UIApplication sharedApplication].keyWindow addSubview:self];
    [self setCenter:[UIApplication sharedApplication].keyWindow.center];
    [[UIApplication sharedApplication].keyWindow bringSubviewToFront:self];
    
    CGRect frameTool = self.toolbar.frame;
    frameTool.origin.y -= PickerViewHeight;
    
    CGRect framePicker =  self.pickerView.frame;
    framePicker.origin.y -= PickerViewHeight;
    [UIView animateWithDuration:0.2 animations:^{
        [self.layer setOpacity:1];
        self.toolbar.frame = frameTool;
        self.pickerView.frame = framePicker;
    } completion:^(BOOL finished) {
        if (self.curDate) {
            
            if (self.pickMode == ZAKJDatePickerModeDate) {

            
                if (self.beginDate) {
                    if ([self.curDate compare:self.beginDate] == NSOrderedDescending) {
                        _year  = [NSCalendar currentYear:self.curDate];
                        _month = [NSCalendar currentMonth:self.curDate];
                        _day   = [NSCalendar currentDay:self.curDate];
                        [self.pickerView selectRow:(_year - self.yearMin ) inComponent:0 animated:NO];
                        [self.pickerView reloadComponent:1];
                        if (_year == [NSCalendar currentYear:self.beginDate]) {
                            [self.pickerView selectRow:(_month - [NSCalendar currentMonth:self.beginDate]) inComponent:1 animated:NO];
                            [self.pickerView reloadComponent:2];
                            if (_month == [NSCalendar currentMonth:self.beginDate]) { //同年同月
                                [self.pickerView selectRow:(_day - [NSCalendar currentDay:self.beginDate]) inComponent:2 animated:NO];
                            } else { //同年不同月
                                [self.pickerView selectRow:(_day - 1) inComponent:2 animated:NO];
                            }
                            
                        }else {
                            [self.pickerView selectRow:(_month - 1) inComponent:1 animated:NO];
                            [self.pickerView reloadComponent:2];
                            [self.pickerView selectRow:(_day - 1) inComponent:2 animated:NO];
                        }
                    }
                } else {
                    _year  = [NSCalendar currentYear:self.curDate];
                    _month = [NSCalendar currentMonth:self.curDate];
                    _day   = [NSCalendar currentDay:self.curDate];
                    [self.pickerView selectRow:(_year - self.yearMin ) inComponent:0 animated:NO];
                    [self.pickerView reloadComponent:1];
                    [self.pickerView selectRow:(_month - 1) inComponent:1 animated:NO];
                    [self.pickerView reloadComponent:2];
                    [self.pickerView selectRow:(_day - 1) inComponent:2 animated:NO];
                }
                
            }else if (self.pickMode == ZAKJDatePickerModeYear){
              if (self.beginDate) {
                if ([self.curDate compare:self.beginDate] == NSOrderedDescending) {
                  _year  = [NSCalendar currentYear:self.curDate];
                  [self.pickerView selectRow:(_year - self.yearMin ) inComponent:0 animated:NO];
                }
              } else {
                _year  = [NSCalendar currentYear:self.curDate];
                [self.pickerView selectRow:(_year - self.yearMin ) inComponent:0 animated:NO];
              }
            }else{
                if (self.beginDate) {
                    if ([self.curDate compare:self.beginDate] == NSOrderedDescending) {
                        _year  = [NSCalendar currentYear:self.curDate];
                        _month = [NSCalendar currentMonth:self.curDate];
                        _day   = [NSCalendar currentDay:self.curDate];
                        [self.pickerView selectRow:(_year - self.yearMin ) inComponent:0 animated:NO];
                        [self.pickerView reloadComponent:1];
                        if (_year == [NSCalendar currentYear:self.beginDate]) {
                            [self.pickerView selectRow:(_month - [NSCalendar currentMonth:self.beginDate]) inComponent:1 animated:NO];
    
                        }else {
                            [self.pickerView selectRow:(_month - 1) inComponent:1 animated:NO];

                        }
                    }
                } else {
                    _year  = [NSCalendar currentYear:self.curDate];
                    _month = [NSCalendar currentMonth:self.curDate];
                    [self.pickerView selectRow:(_year - self.yearMin ) inComponent:0 animated:NO];
                    [self.pickerView reloadComponent:1];
                    [self.pickerView selectRow:(_month - 1) inComponent:1 animated:NO];
                }
            }
        }
    }];
}

- (void)remove
{
    
    CGRect frameTool = self.toolbar.frame;
    frameTool.origin.y += PickerViewHeight;
    
    CGRect framePicker =  self.pickerView.frame;
    framePicker.origin.y += PickerViewHeight;
    [UIView animateWithDuration:0.33 animations:^{
        [self.layer setOpacity:0];
        self.toolbar.frame = frameTool;
        self.pickerView.frame = framePicker;
    } completion:^(BOOL finished) {
        [self removeFromSuperview];
    }];
    if (self.delegate && [self.delegate respondsToSelector:@selector(datePickerDidCancel)])   {
    [self.delegate datePickerDidCancel];
    }
}

#pragma mark - --- setters 属性 ---

#pragma mark - --- getters 属性 ---

- (UIPickerView *)pickerView
{
    if (!_pickerView) {
        CGFloat pickerW = [UIScreen mainScreen].bounds.size.width;
        CGFloat pickerH = PickerViewHeight - VVControlSystemHeight;
        CGFloat pickerX = 0;
        CGFloat pickerY = [UIScreen mainScreen].bounds.size.height + VVControlSystemHeight;
        _pickerView = [[UIPickerView alloc]initWithFrame:CGRectMake(pickerX, pickerY, pickerW, pickerH)];
        [_pickerView setBackgroundColor:[UIColor whiteColor]];
        [_pickerView setDataSource:self];
        [_pickerView setDelegate:self];
    }
    return _pickerView;
}

- (ZAKJToolBar *)toolbar
{
    if (!_toolbar) {
        _toolbar = [[ZAKJToolBar alloc]initWithTitle:@"请选择日期"
                                 cancelButtonTitle:@"取消"
                                     okButtonTitle:@"确定"
                                         addTarget:self
                                      cancelAction:@selector(selectedCancel)
                                          okAction:@selector(selectedOk)];
        _toolbar.x = 0;
        _toolbar.y = [UIScreen mainScreen].bounds.size.height;
    }
    return _toolbar;
}

- (UIView *)lineView
{
    if (!_lineView) {
        _lineView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, 0.5)];
        [_lineView setBackgroundColor:RGB(205, 205, 205)];
    }
    return _lineView;
}

- (NSString *)changeMonth:(NSInteger)monthInt{
    NSString *monthStr = [NSString stringWithFormat:@"%zd", monthInt];
    if (monthStr.length < 2) {
        monthStr = [NSString stringWithFormat:@"0%@", monthStr];
    }
    return monthStr;
}


@end
