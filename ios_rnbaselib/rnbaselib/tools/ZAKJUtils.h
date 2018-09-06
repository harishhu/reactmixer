//
//  CommonAction.h
//  saadtw
//
//  Created by 姚志飞 on 2017/12/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface ZAKJUtils : NSObject

/** 获取年月日,year,month,day*/
+ (NSInteger)getCurrentTime:(NSString *)check;

/** 根据时间格式获取当前日期*/
+ (NSString *)getCurrentDate:(NSString *)formart;
/** 加几小时 */
+ (NSDate *)dateByAddingHour:(NSInteger)hour toDate:(NSDate *)date;
/** 获取指定日期指定格式*/
+(NSString *)getDateString:(NSDate *)date theFormart:(NSString *)formart;
+(NSString *)getDateStringByStr:(NSString *)string theFormart:(NSString *)formart;

/** 将long类型时间转换为字符串时间*/
+(NSString *)switchTimeBy:(NSString *)longTime theFormart:(NSString *)formart;

+(NSDate *)getDateBy:(NSString *)longTime;

+(NSString *)switchTimeByLong:(NSTimeInterval)longTime theFormart:(NSString *)formart;

/** 时间计算*/
+(NSString *)updateTimeByServerTime:(NSTimeInterval)timeLong;
/** 判断某个时间是否在时间段内 */
+ (BOOL)validateWithNowTime:(NSString *)nowTime startTime:(NSString *)startTime expireTime:(NSString *)expireTime;
/**任意两天相差天数*/
+ (NSInteger)getCountDaysWithBeginDate:(NSString *)beginDate endDate:(NSString *)endDate;
// 获取当前周的周一的时间
+ (NSString *)getMondayTimeWithDate:(NSDate *)date;
+ (NSString *)getWeekTime;
//获取n周前后的周一时间
+ (NSString *)getDayWithNWeek:(NSInteger)n;
+ (NSString *)getDayWithAnyMonday:(NSString *)monday n:(NSInteger)n;
//获取n天后的时间
+ (NSString *)getNDay:(NSString *)day n:(NSInteger)n;
//从一种格式转换为另一种格式
+ (NSString *)formDateString:(NSString *)str toDateString:(NSString *)formart;
//有分钟的从一种格式转换为另一种格式
+ (NSString *)formHasMinute:(NSString *)str toDateString:(NSString *)formart;
//判断是周几
+ (NSString*)weekdayStringFromFormat:(NSString*)format;
//时间转时间戳
+ (NSString *)getLongtimeFrom:(NSString *)str;
//NSString +> NSDate
+(NSDate*)dateFromString:(NSString*)dateString format:(NSString *)format;

//NSDate +> long long
+(long long)longLongFromDate:(NSDate*)date;


//获取指定时间与现在的时间差
+ (NSInteger)getDifferenceByDate:(NSTimeInterval)dateLong;

#pragma mark + 根据格式获取上个月的信息
/** 根据格式获取上个月的信息*/
+ (NSString *)getUpMonthByFormatter:(NSString *)formatter;
+ (NSDate *)getUpMonthDateFormatter;

/** 比较两个时间的大小,yes:大于上班时间，no：小于上班时间*/
+ (BOOL)compareDate:(NSTimeInterval)aDate withDate:(NSTimeInterval)bDate;

#pragma mark + 判断是星期几
+ (NSString*)weekdayStringFromDate:(NSString*)inputString;

#pragma mark + 创建lab
+(UILabel *)setLableText:(NSString *)text textColor:(UIColor *)textColor theFont:(UIFont *)fontSize textAlignment:(NSTextAlignment)alignment;

+(CGFloat)getWidth:(CGFloat)uiWidth;
+(CGFloat)getHeight:(CGFloat)uiHeight;

#pragma mark + 自定义提示信息
//
//创建一个UILabel
+(UILabel*)createLabeLwithFrame:(CGRect)frame
                           font:(UIFont*)font
                           text:(NSString*)text
                      textColor:(UIColor*)textColor
                  textAlignment:(NSTextAlignment)alignment;
//创建一个不同颜色UILabel
+(UILabel *)createColorLabeLwithFrame:(CGRect)frame
                                 font:(UIFont *)font
                                 text:(NSString *)text
                            colorText:(NSString *)colorText
                            textColor:(UIColor *)textColor colorTextColor:(UIColor *)colorTextColor
                        textAlignment:(NSTextAlignment)alignment;

+(UITextField*)createTextFieldWithFrame:(CGRect)frame
                              layerWith:(CGFloat)layer
                                   font:(UIFont*)font
                            placeholder:(NSString*)holdStr;
+(UIButton*)createButtonWithFrame:(CGRect)frame
                             font:(UIFont*)font
                        textColor:(UIColor*)textColor
                             text:(NSString*)text
                  backgroundColor:(UIColor*)bdColor;
//loginview 定制的uitextfield
+(UITextField*)getTextFieldWithLoginView:(CGRect)frame font:(UIFont*)font layerWith:(CGFloat)layer placehoder:(NSString*)holdtext;
//密码规则
+(NSString *)confimPassWord:(NSString*)password;
//uitextfield 输入判断空
+(NSString*)currentUITextFieldString:(NSString*)text andString:(NSString*)string;

#pragma mark + 限制输入字数
+(void)CommontextFiledEditChanged:(NSNotification *)obj TheLength:(NSInteger)length;

#pragma mark + 在指定view展示加载loding
+(void)showHud:(NSString *)msg withParentView:(UIView*) parentView;
+(void)hideHud:(UIView*) parentView;

+ (NSString *)toJSONData:(id)theData;
#pragma mark +  字典转json字符串方法
+(NSString *)convertToJsonData:(NSDictionary *)dict;
#pragma mark +  json字符串转字典方法
+(NSDictionary *)dictionaryWithJsonString:(NSString *)jsonString;
#pragma mark +  json字符串转数组方法
+(NSArray *)ArrayWithJsonString:(NSString *)jsonString;

#pragma mark + 压缩图片到指定文件大小
/** 压缩图片尺寸*/
+ (UIImage*)imageWithImageSimple:(UIImage*)image scaledToSize:(CGSize)newSize;

+ (NSData *)getImageWithImageSimple:(UIImage *)image;

+(BOOL)checkObjectNoRelease:(id)obj;

#pragma mark + 金额三位数添加,分割
/** 金额三位数添加,分割*/
+ (NSString *)strmethodComma:(NSString *)str;

/**  计算UILabel的高度(带有行间距的情况)*/
+(CGFloat)getSpaceLabelHeight:(NSString*)str withFont:(UIFont*)font withWidth:(CGFloat)width lineSpace:(float)space;

#pragma mark + 刷新指定区
+ (void)reloadTableView:(UITableView *)table TheSection:(NSInteger)section;
#pragma mark + 刷新指定行
+ (void)reloadTableView:(UITableView *)table TheSection:(NSInteger)section TheRow:(NSInteger)row;
/** 相机权限设置*/
+(void)openCamera:(UIViewController *)viewController;
/** 相册权限设置*/
+(void)openPhoto:(UIViewController *)viewController;

/** 判断是否为iPhone X*/
+ (BOOL)isIPhoneXMobile;
+ (CGFloat)setNavHeight;
+ (CGFloat)setTabbarHeight;

#pragma mark + 设置lab行间距
+ (void)setLabLineSpace:(UILabel *)lable Lineheight:(CGFloat)lineHeight;

#pragma mark + 根据银行代码找出银行名称
+ (NSString *)getBankNameWithCode:(NSString *)code;

#pragma mark + 判断本机当前使用的语言
+ (BOOL)isSimplifiedLanguages;

#pragma mark +根据当前语言转换年格式
+ (NSString *)changeYearByLanguages:(NSInteger)year;

#pragma mark + 截屏并保存图片
+ (void)captureScreen;

+(BOOL)isEmptyString:(NSString *)str;

@end
