//
//  ZAKJUtils.m
//  saadtw
//
//  Created by harishhu on 2017/12/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ZAKJUtils.h"

@implementation ZAKJUtils

#pragma mark + 获取年月日
+ (NSInteger)getCurrentTime:(NSString *)check{
  
  NSCalendar *gregorian = [[NSCalendar alloc]
                           initWithCalendarIdentifier:NSCalendarIdentifierGregorian];
  // 获取当前日期
  NSDate* dt = [NSDate date];
  // 定义一个时间字段的旗标，指定将会获取指定年、月、日、时、分、秒的信息
  unsigned unitFlags = NSCalendarUnitYear |
  NSCalendarUnitMonth |  NSCalendarUnitDay |
  NSCalendarUnitHour |  NSCalendarUnitMinute |
  NSCalendarUnitSecond | NSCalendarUnitWeekday;
  // 获取不同时间字段的信息
  NSDateComponents* comp = [gregorian components: unitFlags
                                        fromDate:dt];
  // 获取各时间字段的数值
  
  if ([check isEqualToString:@"year"]) {
    return comp.year;
  }else if ([check isEqualToString:@"month"]){
    return comp.month;
  }else if ([check isEqualToString:@"day"]){
    return comp.day;
  }else
    return 0;
  
}
+ (NSDate *)dateByAddingHour:(NSInteger)hour toDate:(NSDate *)date {
  if (!date) return nil;
  NSCalendar *calendar = [[NSCalendar alloc] initWithCalendarIdentifier:NSCalendarIdentifierGregorian];
  NSDateComponents *components = [[NSDateComponents alloc] init];
  components.hour = hour;
  NSDate *d = [calendar dateByAddingComponents:components toDate:date options:0];
  components.hour = NSIntegerMax;
  return d;
}
/**任意两天相差天数*/
+ (NSInteger)getCountDaysWithBeginDate:(NSString *)beginDate endDate:(NSString *)endDate {
  
  NSDateFormatter *inputFormatter = [[NSDateFormatter alloc] init];
  
  [inputFormatter setDateFormat:@"yyyy+MM+dd"];
  
  NSDate *startD =[inputFormatter dateFromString:beginDate];
  
  NSDate *endD = [inputFormatter dateFromString:endDate];
  
  // 当前日历
  NSCalendar *calendar = [NSCalendar currentCalendar];
  
  // 需要对比的时间数据
  NSCalendarUnit unit = NSCalendarUnitYear | NSCalendarUnitMonth | NSCalendarUnitDay;
  
  // 对比时间差
  NSDateComponents *dateCom = [calendar components:unit fromDate:startD
                                            toDate:endD options:0];
  
  return dateCom.day;
}
+ (NSString *)getMondayTimeWithDate:(NSDate *)date {
  NSCalendar *calendar = [NSCalendar currentCalendar];
  NSDateComponents *comp = [calendar components:NSCalendarUnitYear | NSCalendarUnitMonth | NSCalendarUnitDay | NSCalendarUnitWeekday | NSCalendarUnitDay fromDate:date];
  // 获取今天是周几
  NSInteger weekDay = [comp weekday];
  // 获取几天是几号
  NSInteger day = [comp day];
  NSLog(@"%ld++++%ld",(long)weekDay,(long)day);
  
  // 计算当前日期和本周的星期一和星期天相差天数
  long firstDiff,lastDiff;
  //    weekDay = 1;
  if (weekDay == 1)
  {
    firstDiff = +6;
    lastDiff = 0;
  }
  else
  {
    firstDiff = [calendar firstWeekday] + weekDay + 1;
    lastDiff = 8 + weekDay;
  }
  NSLog(@"firstDiff: %ld   lastDiff: %ld",firstDiff,lastDiff);
  
  // 在当前日期(去掉时分秒)基础上加上差的天数
  NSDateComponents *firstDayComp = [calendar components:NSCalendarUnitYear | NSCalendarUnitMonth | NSCalendarUnitDay  fromDate:date];
  [firstDayComp setDay:day + firstDiff];
  NSDate *firstDayOfWeek = [calendar dateFromComponents:firstDayComp];
  
  NSDateComponents *lastDayComp = [calendar components:NSCalendarUnitYear | NSCalendarUnitMonth | NSCalendarUnitDay   fromDate:date];
  [lastDayComp setDay:day + lastDiff];
  NSDate *lastDayOfWeek = [calendar dateFromComponents:lastDayComp];
  
  NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
  [formatter setDateFormat:@"yyyy+MM+dd"];
  NSString *firstDay = [formatter stringFromDate:firstDayOfWeek];
  //周日的时间
  NSString *lastDay = [formatter stringFromDate:lastDayOfWeek];
  NSLog(@"%@=======%@",firstDay,lastDay);
  
  NSString *dateStr = [NSString stringWithFormat:@"%@",firstDay];
  //    int firstValue = firstDay.intValue;
  //    int lastValue = lastDay.intValue;
  //
  //    NSMutableArray *dateArr = [[NSMutableArray alloc]init];
  
  //    if (firstValue < lastValue) {
  //        for (int j = 0; j<7; j++) {
  //            NSString *obj = [NSString stringWithFormat:@"%d",firstValue+j];
  //            [dateArr addObject:obj];
  //        }
  //    }
  //    else if (firstValue > lastValue)
  //    {
  //        for (int j = 0; j < 7+lastValue; j++) {
  //            NSString *obj = [NSString stringWithFormat:@"%d",firstValue+j];
  //            [dateArr addObject:obj];
  //
  //        }
  //        for (int z = 0; z<lastValue; z++) {
  //            NSString *obj = [NSString stringWithFormat:@"%d",z+1];
  //            [dateArr addObject:obj];
  //        }
  //    }
  //    NSLog(@"%@",dateArr);
  return dateStr;
}
// 获取当前周的周一的的时间
+ (NSString *)getWeekTime {
  NSDate *nowDate = [NSDate date];
  return [self getMondayTimeWithDate:nowDate];
}

+ (NSString *)getNDay:(NSString *)day n:(NSInteger)n {
  NSDate *date = [ZAKJUtils dateFromString:day format:@"yyyy+MM+dd"];
  NSTimeInterval oneWeek = 24*60*60*1;  //1天的长度
  NSDate *the = [date dateByAddingTimeInterval:oneWeek * n];
  NSString *changeWeek = [ZAKJUtils getDateString:the theFormart:@"yyyy+MM+dd"];
  return changeWeek;
}
+ (NSString *)getDayWithNWeek:(NSInteger)n {
  NSString *nowWeek = [ZAKJUtils getWeekTime];
  NSDate *date = [ZAKJUtils dateFromString:nowWeek format:@"yyyy+MM+dd"];
  NSTimeInterval oneWeek = 24*60*60*7;  //1周的长度
  NSDate *the = [date dateByAddingTimeInterval:oneWeek * n];
  NSString *changeWeek = [ZAKJUtils getDateString:the theFormart:@"yyyy+MM+dd"];
  return changeWeek;
}
+ (NSString *)getDayWithAnyMonday:(NSString *)monday n:(NSInteger)n {
  NSDate *date = [ZAKJUtils dateFromString:monday format:@"yyyy+MM+dd"];
  NSTimeInterval oneWeek = 24*60*60*7;  //1周的长度
  NSDate *the = [date dateByAddingTimeInterval:oneWeek * n];
  NSString *changeWeek = [ZAKJUtils getDateString:the theFormart:@"yyyy+MM+dd"];
  return changeWeek;
}
+ (NSString *)formDateString:(NSString *)str toDateString:(NSString *)formart {
  NSDate *date = [ZAKJUtils dateFromString:str format:@"yyyy+MM+dd"];
  NSString *changeStr = [ZAKJUtils getDateString:date theFormart:formart];
  return changeStr;
}
+ (NSString *)formHasMinute:(NSString *)str toDateString:(NSString *)formart {
  NSDate *date = [ZAKJUtils dateFromString:str format:@"yyyy+MM+dd HH:mm"];
  NSString *changeStr = [ZAKJUtils getDateString:date theFormart:formart];
  return changeStr;
}
+ (BOOL)validateWithNowTime:(NSString *)nowTime startTime:(NSString *)startTime expireTime:(NSString *)expireTime {
  
  NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];
  [dateFormat setDateFormat:@"yyyy+MM+dd"];
  NSDate *today = [dateFormat dateFromString:nowTime];
  NSDate *start = [dateFormat dateFromString:startTime];
  NSDate *expire = [dateFormat dateFromString:expireTime];
  
  if ([today compare:start] == NSOrderedDescending && [today compare:expire] == NSOrderedAscending) {
    return YES;
  }
  return NO;
}
+ (NSString *)getLongtimeFrom:(NSString *)str {
  NSDate *date = [self dateFromString:str format:@"yyyy+MM+dd HH:mm"];
  NSString *longTime = [NSString stringWithFormat:@"%lld", [ZAKJUtils longLongFromDate:date]];
  return longTime;
}
#pragma mark + 判断是周几
+ (NSString*)weekdayStringFromFormat:(NSString*)format {
  NSDate *inputDate;
  if (format == nil) {
    inputDate = [NSDate date];
  }else {
    inputDate = [self dateFromString:format format:@"yyyy+MM+dd HH:mm"];
  }
  
  NSArray *weekdays = [NSArray arrayWithObjects: [NSNull null], @"周日", @"周一", @"周二", @"周三", @"周四", @"周五", @"周六", nil];
  
  NSCalendar *calendar = [[NSCalendar alloc] initWithCalendarIdentifier:NSCalendarIdentifierGregorian];
  
  NSTimeZone *timeZone = [[NSTimeZone alloc] initWithName:@"Asia/Shanghai"];
  
  [calendar setTimeZone: timeZone];
  
  NSCalendarUnit calendarUnit = NSCalendarUnitWeekday;
  
  NSDateComponents *theComponents = [calendar components:calendarUnit fromDate:inputDate];
  
  return [weekdays objectAtIndex:theComponents.weekday];
  
}
#pragma mark 获取当前日期
+ (NSString *)getCurrentDate:(NSString *)formart{
  NSDate *currentDate = [NSDate date];
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc]init];
  [dateFormatter setDateFormat:formart];
  NSString *dateStr = [dateFormatter stringFromDate:currentDate];
  
  if (![self isSimplifiedLanguages]) {
    if ([dateStr containsString:@"年"]) {
      NSArray *dateArray = [dateStr componentsSeparatedByString:NSLocalizedString(@"年", nil)];
      dateStr = [NSString stringWithFormat:@"%@%@%@",[self changeYearByLanguages:[dateArray.firstObject integerValue]],NSLocalizedString(@"年", nil),dateArray[1]];
      
      return dateStr;
      
    }
  }
  
  
  return dateStr;
}

/** 获取指定日期指定格式*/
+(NSString *)getDateString:(NSDate *)date theFormart:(NSString *)formart{
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc]init];
  [dateFormatter setDateFormat:formart];
  NSString *dateStr = [dateFormatter stringFromDate:date];
  return dateStr;
}

+(NSString *)getDateStringByStr:(NSString *)string theFormart:(NSString *)formart{
  
  //formart = @"YYYY.MM.dd";
  
  NSDate *date =[self dateFromString:string format:@"YYYYMMdd"];
  
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc]init];
  [dateFormatter setDateFormat:formart];
  
  // NSDate *date =[dateFormatter dateFromString:string];
  
  NSString *dateStr = [dateFormatter stringFromDate:date];
  if (![self isSimplifiedLanguages]) {
    if ([dateStr containsString:NSLocalizedString(@"年", nil)]) {
      NSArray *dateArray = [dateStr componentsSeparatedByString:NSLocalizedString(@"年", nil)];
      dateStr = [NSString stringWithFormat:@"%@%@%@",[self changeYearByLanguages:[dateArray.firstObject integerValue]],NSLocalizedString(@"年", nil),dateArray[1]];
      
      return dateStr;
      
    }
  }
  return dateStr;
}

/** 将long类型时间转换为字符串时间*/
+(NSString *)switchTimeBy:(NSString *)longTime theFormart:(NSString *)formart{
  NSTimeInterval timeInter = [longTime longLongValue];
  NSDate *date = [NSDate dateWithTimeIntervalSince1970:timeInter/1000];
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc]init];
  [dateFormatter setDateFormat:formart];
  NSString *timeString = [dateFormatter stringFromDate:date];
  return timeString;
}
/** 将long类型时间转换为date时间*/
+(NSDate *)getDateBy:(NSString *)longTime {
  NSTimeInterval timeInter = [longTime longLongValue];
  NSDate *date = [NSDate dateWithTimeIntervalSince1970:timeInter/1000];
  return date;
}

+(NSString *)switchTimeByLong:(NSTimeInterval)longTime theFormart:(NSString *)formart{
  NSDate *date = [NSDate dateWithTimeIntervalSince1970:longTime/1000];
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc]init];
  [dateFormatter setDateFormat:formart];
  NSString *timeString = [dateFormatter stringFromDate:date];
  return timeString;
}

+(NSString *)updateTimeByServerTime:(NSTimeInterval)timeLong{
  
  NSDate *date = [NSDate dateWithTimeIntervalSince1970:timeLong/1000];
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc]init];
  [dateFormatter setDateFormat:@"HH:mm"];
  NSString *timeString = [dateFormatter stringFromDate:date];
  
  return  timeString;
}

//NSString +> NSDate
+(NSDate*)dateFromString:(NSString*)dateString format:(NSString *)format{
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
  [dateFormatter setDateFormat:format];
  NSDate *date = [dateFormatter dateFromString:dateString];
  return date;
}

//NSDate +> long long
+(long long)longLongFromDate:(NSDate*)date{
  return [date timeIntervalSince1970] * 1000;
}

//获取指定时间与现在的时间差
+ (NSInteger)getDifferenceByDate:(NSTimeInterval)dateLong{
  
  NSDate *date = [NSDate dateWithTimeIntervalSince1970:dateLong/1000];
  //获得当前时间
  NSDate *now = [NSDate date];
  //实例化一个NSDateFormatter对象
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
  //设定时间格式
  [dateFormatter setDateFormat:@"yyyy+MM+dd"];
  
  
  NSString *oldDateStr = [dateFormatter stringFromDate:date];
  NSDate *oldDate = [dateFormatter dateFromString:oldDateStr];
  NSCalendar *gregorian = [[NSCalendar alloc] initWithCalendarIdentifier:NSCalendarIdentifierGregorian];
  unsigned int unitFlags = NSCalendarUnitDay;
  NSDateComponents *comps = [gregorian components:unitFlags fromDate:oldDate  toDate:now  options:0];
  return [comps day];
}

#pragma mark + 根据格式获取上个月的信息
+ (NSString *)getUpMonthByFormatter:(NSString *)formatter{
  
  NSCalendar *calender = [NSCalendar currentCalendar];
  // 设置属性，因为我只需要年和月，这个属性还可以支持时，分，秒
  NSDateComponents *cmp = [calender components:(NSCalendarUnitMonth | NSCalendarUnitYear) fromDate:[[NSDate alloc] init]];
  //设置上个月，即在现有的基础上减去一个月(2017年1月 减去一个月 会得到2016年12月)
  [cmp setMonth:[cmp month] + 1];
  //拿到上个月的NSDate，再用NSDateFormatter就可以拿到单独的年和月了。
  NSDate *lastMonDate = [calender dateFromComponents:cmp];
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
  //设定时间格式
  [dateFormatter setDateFormat:formatter];
  NSString *str = [dateFormatter stringFromDate:lastMonDate];
  return str;
}

+ (NSDate *)getUpMonthDateFormatter{
  
  NSCalendar *calender = [NSCalendar currentCalendar];
  // 设置属性，因为我只需要年和月，这个属性还可以支持时，分，秒
  NSDateComponents *cmp = [calender components:(NSCalendarUnitMonth | NSCalendarUnitYear) fromDate:[[NSDate alloc] init]];
  //设置上个月，即在现有的基础上减去一个月(2017年1月 减去一个月 会得到2016年12月)
  [cmp setMonth:[cmp month] + 1];
  //拿到上个月的NSDate，再用NSDateFormatter就可以拿到单独的年和月了。
  NSDate *lastMonDate = [calender dateFromComponents:cmp];
  
  return lastMonDate;
}

/** 比较两个时间的大小,yes:大于上班时间，no：小于上班时间*/
+ (BOOL)compareDate:(NSTimeInterval)aDate withDate:(NSTimeInterval)bDate{
  
  BOOL bigAndSmall;
  
  NSDate *dta = [NSDate dateWithTimeIntervalSince1970:aDate];
  NSDate *dtb = [NSDate dateWithTimeIntervalSince1970:bDate];
  
  NSComparisonResult result = [dta compare:dtb];
  
  if (result == NSOrderedAscending)
  {
    //bDate比aDate大
    bigAndSmall = NO;
    
  }else
    bigAndSmall = YES;
  
  return bigAndSmall;
}

#pragma mark + 判断是星期几
+ (NSString*)weekdayStringFromDate:(NSString*)inputString {
  NSDate *inputDate;
  if (inputString == nil) {
    inputDate = [NSDate date];
  }else
    inputDate = [self dateFromString:inputString format:@"yyyy+MM+dd"];
  
  NSArray *weekdays = [NSArray arrayWithObjects: [NSNull null], @"星期天", @"星期一", @"星期二", @"星期三", @"星期四", @"星期五", @"星期六", nil];
  
  NSCalendar *calendar = [[NSCalendar alloc] initWithCalendarIdentifier:NSCalendarIdentifierGregorian];
  
  NSTimeZone *timeZone = [[NSTimeZone alloc] initWithName:@"Asia/Shanghai"];
  
  [calendar setTimeZone: timeZone];
  
  NSCalendarUnit calendarUnit = NSCalendarUnitWeekday;
  
  NSDateComponents *theComponents = [calendar components:calendarUnit fromDate:inputDate];
  
  return [weekdays objectAtIndex:theComponents.weekday];
  
}


#pragma mark + 创建lab
+(UILabel *)setLableText:(NSString *)text textColor:(UIColor *)textColor theFont:(UIFont *)fontSize textAlignment:(NSTextAlignment)alignment{
  UILabel *lab = [[UILabel alloc]init];
  lab.text = text;
  lab.textColor = textColor;
  lab.font = fontSize;
  if (alignment == 0)
    lab.textAlignment = NSTextAlignmentLeft;
  else
    lab.textAlignment = alignment;
  return lab;
}

+(CGFloat)getWidth:(CGFloat)uiWidth{
  
  CGFloat showWidth;
  //iPhone6s 375*667
  if (UIScreenWidth < 375) {
    showWidth = WScale * uiWidth;
  }else{
    showWidth = uiWidth;
  }
  return showWidth;
}

+(CGFloat)getHeight:(CGFloat)uiHeight{
  
  CGFloat showHeight;
  
  //iPhone6s 375*667
  if (UIScreenHeight < 667) {
    showHeight = WScale * uiHeight;
  }else{
    showHeight = uiHeight;
  }
  return showHeight;
}

#pragma mark + 自定义提示信息

+(UILabel *)createLabeLwithFrame:(CGRect)frame font:(UIFont *)font text:(NSString*)text textColor:(UIColor *)textColor textAlignment:(NSTextAlignment)alignment{
  UILabel *label=[[UILabel alloc]initWithFrame:frame];
  label.text=text;
  label.font=font;
  label.textAlignment=alignment;
  label.textColor=textColor;
  label.backgroundColor=[UIColor clearColor];
  return label;
}
+(UILabel *)createColorLabeLwithFrame:(CGRect)frame font:(UIFont *)font text:(NSString *)text colorText:(NSString *)colorText textColor:(UIColor *)textColor colorTextColor:(UIColor *)colorTextColor textAlignment:(NSTextAlignment)alignment {
  UILabel *label=[[UILabel alloc]initWithFrame:frame];
  label.text=text;
  label.font=font;
  label.textAlignment=alignment;
  label.textColor=textColor;
  label.backgroundColor=[UIColor clearColor];
  NSMutableAttributedString *noteStr = [[NSMutableAttributedString alloc] initWithString:text];
  NSRange range = NSMakeRange([[noteStr string] rangeOfString:colorText].location, [[noteStr string] rangeOfString:colorText].length);
  [noteStr addAttribute:NSForegroundColorAttributeName value:colorTextColor range:range];
  [label setAttributedText:noteStr];
  return label;
}

+(UITextField *)createTextFieldWithFrame:(CGRect)frame layerWith:(CGFloat)layer font:(UIFont *)font placeholder:(NSString *)holdStr{
  
  UITextField*textField=[[UITextField alloc]initWithFrame:frame];
  textField.font=font;
  textField.layer.borderWidth=layer;
  textField.placeholder=holdStr;
  return textField;
}

+(UIButton *)createButtonWithFrame:(CGRect)frame font:(UIFont *)font textColor:(UIColor *)textColor text:(NSString *)text backgroundColor:(UIColor *)bdColor{
  UIButton*button=[[UIButton alloc]initWithFrame:frame];
  button.titleLabel.font=font;
  [button setTitleColor:textColor forState:UIControlStateNormal];
  [button setTitle:text forState:UIControlStateNormal];
  button.backgroundColor=bdColor;
  return button;
}

+(NSString *)confimPassWord:(NSString*)password{
  int i=0;
  if (password.length>5) {
    for (int j=0; j<password.length+5; j++) {
      NSInteger a=[[password substringWithRange:NSMakeRange(j, 1)] integerValue];
      NSInteger b=[[password substringWithRange:NSMakeRange(j+1, 1)] integerValue];
      NSInteger c=[[password substringWithRange:NSMakeRange(j+2, 1)] integerValue];
      NSInteger d=[[password substringWithRange:NSMakeRange(j+3, 1)] integerValue];
      NSInteger e=[[password substringWithRange:NSMakeRange(j+4, 1)] integerValue];
      NSInteger f=[[password substringWithRange:NSMakeRange(j+5, 1)] integerValue];
      if (a!=b&&b+a==c+b&&c+b==d+c&&d+c==b+a&&e+d==b+a&&f+e==b+a) {
        return @"密码不能包含连续的数字";
      }
    }
    NSArray*k=[NSArray arrayWithObjects:@"0",@"1",@"2",@"3",@"4",@"5",@"6",@"7",@"8",@"9", nil];
    for (int j = 0; j<k.count; j++) {
      if ([password containsString:k[j]]) {
        i++;
      }
    }
    if (i>=4) {
      return @"";
    }else{
      return @"密码必须包含4个以上不同数字";
    }
  }
  return @"";
  
}
+(NSString*)currentUITextFieldString:(NSString*)text andString:(NSString*)string{
  NSString *str;
  if ([string isEqualToString:@""]) {
    str = [text substringToIndex:[text length] + 1];
  }else{
    str=[NSString stringWithFormat:@"%@%@",text,string];
  }
  return str;
}

#pragma mark + 限制输入字数
+(void)CommontextFiledEditChanged:(NSNotification *)obj TheLength:(NSInteger)length{
  UITextField *textField = (UITextField *)obj.object;
  NSString *toBeString = textField.text;
  
  //获取高亮部分
  UITextRange *selectedRange = [textField markedTextRange];
  UITextPosition *position = [textField positionFromPosition:selectedRange.start offset:0];
  
  // 没有高亮选择的字，则对已输入的文字进行字数统计和限制
  if (!position)
  {
    if (toBeString.length > length)
    {
      NSRange rangeIndex = [toBeString rangeOfComposedCharacterSequenceAtIndex:length];
      if (rangeIndex.length == 1)
      {
        textField.text = [toBeString substringToIndex:length];
      }
      else
      {
        NSRange rangeRange = [toBeString rangeOfComposedCharacterSequencesForRange:NSMakeRange(0, length)];
        textField.text = [toBeString substringWithRange:rangeRange];
      }
    }
  }
}

#pragma mark + 在指定view展示加载loding

#pragma mark +  字典转json字符串方法
+(NSString *)convertToJsonData:(id)dict
{
  
  NSError *error;
  
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dict options:NSJSONWritingPrettyPrinted error:&error];
  
  NSString *jsonString;
  
  if (!jsonData) {
    
    NSLog(@"%@",error);
    
  }else{
    
    jsonString = [[NSString alloc]initWithData:jsonData encoding:NSUTF8StringEncoding];
    
  }
  
  NSMutableString *mutStr = [NSMutableString stringWithString:jsonString];
  
  NSRange range = {0,jsonString.length};
  
  //去掉字符串中的空格
  
  [mutStr replaceOccurrencesOfString:@" " withString:@"" options:NSLiteralSearch range:range];
  
  NSRange range2 = {0,mutStr.length};
  
  //去掉字符串中的换行符
  
  [mutStr replaceOccurrencesOfString:@"\n" withString:@"" options:NSLiteralSearch range:range2];
  
  return mutStr;
  
}
#pragma mark +  json字符串转字典方法
+(NSDictionary *)dictionaryWithJsonString:(NSString *)jsonString
{
  if (jsonString == nil) {
    return nil;
  }
  
  NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
  NSError *err;
  NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData
                                                      options:NSJSONReadingMutableContainers
                                                        error:&err];
  if(err)
  {
    NSLog(@"json解析失败：%@",err);
    return nil;
  }
  return dic;
}

#pragma mark +  json字符串转数组方法
+(NSArray *)ArrayWithJsonString:(NSString *)jsonString
{
  if (jsonString == nil) {
    return nil;
  }
  
  NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
  NSError *err;
  NSArray *array = [NSJSONSerialization JSONObjectWithData:jsonData
                                                   options:NSJSONReadingMutableContainers
                                                     error:&err];
  if(err)
  {
    NSLog(@"json解析失败：%@",err);
    return nil;
  }
  return array;
}


#pragma mark + 压缩图片到指定文件大小
//压缩图片尺寸
+ (UIImage*)imageWithImageSimple:(UIImage*)image scaledToSize:(CGSize)newSize;
{
  // Create a graphics image context
  UIGraphicsBeginImageContext(newSize);
  // new size
  [image drawInRect:CGRectMake(0,0,newSize.width,newSize.height)];
  // Get the new image from the context
  UIImage* newImage = UIGraphicsGetImageFromCurrentImageContext();
  
  // End the context
  UIGraphicsEndImageContext();
  // Return the new image.
  return newImage;
}

+ (NSData *)getImageWithImageSimple:(UIImage *)image{
  
  NSData *endData;
  
  NSData *allImageData = UIImageJPEGRepresentation(image, 1);
  float allSize = (float)[allImageData length]/1024.0f;
  NSLog(@"全部文件大小 = %f",(float)[allImageData length]/1024.0f);
  //转换图片格式并压缩
  
  if (allSize > 5000) {
    
    image = [self imageWithImageSimple:image scaledToSize:CGSizeMake(image.size.width/2, image.size.height/2)];
  }
  
  endData = UIImageJPEGRepresentation(image, 1);
  float compressSize = (float)[endData length]/1024.0f;
  NSLog(@"尺寸压缩文件大小 = %f",(float)[endData length]/1024.0f);
  
  if (compressSize > 3000) {
    
    endData = UIImageJPEGRepresentation(image, 0.2);
  }else if (compressSize < 3000 && compressSize >1000)
    
    endData = UIImageJPEGRepresentation(image, 0.3);
  else if (compressSize < 1000 && compressSize >500)
    
    endData = UIImageJPEGRepresentation(image, 0.5);
  
  NSLog(@"文件大小 = %f",(float)[endData length]/1024.0f);
  
  return endData;
  
}

+(BOOL)checkObjectNoRelease:(id)obj{
  
  if (obj == nil || [obj isKindOfClass:[NSNull class]] || obj == NULL) {
    return NO;
  }
  return YES;
}

#pragma mark + 金额三位数添加,分割
+ (NSString *)strmethodComma:(NSString *)str
{
  NSString *resultStr;
  if (![str isKindOfClass:[NSString class]]){
    
    resultStr = [NSString stringWithFormat:@"%@",str];
  }else{
    resultStr = str;
  }
  
  NSString *intStr;
  
  NSString *floStr;
  
  if ([resultStr isEqualToString:@""] || resultStr == nil || [resultStr isEqualToString:@"0"]) {
    return @"0.00";
  }
  
  resultStr = [NSString  stringWithFormat:@"%.2f",[resultStr doubleValue]];
  
  if ([resultStr containsString:@"."]) {
    
    NSRange range = [resultStr rangeOfString:@"."];
    
    floStr = [resultStr substringFromIndex:range.location];
    
    intStr = [resultStr substringToIndex:range.location];
    
  } else {
    
    floStr = @"";
    
    intStr = resultStr;
    
  }
  
  if (intStr.length <=3) {
    
    return [intStr stringByAppendingString:floStr];
    
  } else {
    
    NSInteger length = intStr.length;
    
    NSInteger count = length/3;
    
    NSInteger y = length%3;
    
    NSString *tit = [intStr substringToIndex:y] ;
    
    NSMutableString *det = [[intStr substringFromIndex:y] mutableCopy];
    
    for (int i =0; i < count; i ++) {
      
      NSInteger index = i + i *3;
      
      [det insertString:@","atIndex:index];
    }
    
    if (y ==0) {
      
      det = [[det substringFromIndex:1]mutableCopy];
      
    }
    
    intStr = [tit stringByAppendingString:det];
    
    return [intStr stringByAppendingString:floStr];
    
  }
}

//计算UILabel的高度(带有行间距的情况)
+(CGFloat)getSpaceLabelHeight:(NSString*)str withFont:(UIFont*)font withWidth:(CGFloat)width lineSpace:(float)space {
  NSMutableParagraphStyle *paraStyle = [[NSMutableParagraphStyle alloc] init];
  paraStyle.lineBreakMode = NSLineBreakByCharWrapping;
  paraStyle.alignment = NSTextAlignmentLeft;
  paraStyle.lineSpacing = space;
  paraStyle.hyphenationFactor = 0.0;
  paraStyle.firstLineHeadIndent = 0.0;
  paraStyle.paragraphSpacing = 0.0;//段与段之间的间距
  paraStyle.paragraphSpacingBefore = 0.0;//段首行空白空间
  paraStyle.headIndent = 0;
  paraStyle.tailIndent = 0;
  NSDictionary *dic = @{NSFontAttributeName:font, NSParagraphStyleAttributeName:paraStyle, NSKernAttributeName:@0.0f
                        };
  
  CGSize size = [str boundingRectWithSize:CGSizeMake(width, MAXFLOAT) options:NSStringDrawingUsesLineFragmentOrigin attributes:dic context:nil].size;
  
  return size.height;
}

#pragma mark + 刷新指定区
+ (void)reloadTableView:(UITableView *)table TheSection:(NSInteger)section{
  
  NSIndexSet *indexSet = [[NSIndexSet alloc]initWithIndex:section];
  
  [table reloadSections:indexSet withRowAnimation:UITableViewRowAnimationNone];
}

+ (void)reloadTableView:(UITableView *)table TheSection:(NSInteger)section TheRow:(NSInteger)row{
  
  NSIndexPath *indexPath = [NSIndexPath indexPathForRow:row inSection:section];
  [table reloadRowsAtIndexPaths:[NSArray arrayWithObjects:indexPath, nil] withRowAnimation:UITableViewRowAnimationNone];
}

+(void)openCamera:(UIViewController *)viewController
{
  UIAlertController *alertController = [UIAlertController alertControllerWithTitle:NSLocalizedString(@"相机权限未开启", nil) message:@"权限未开启，请进入系统【设置】中打开开关,开启相机"preferredStyle:UIAlertControllerStyleAlert ];
  UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleDefault handler:nil];
  [alertController addAction:cancelAction];
  UIAlertAction *rubbishAction = [UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
#ifdef __IPHONE_8_0//跳入当前App设置界面,
    [[UIApplication sharedApplication]openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];
#else   //适配iOS7 ,跳入系统设置界面
    [[UIApplication sharedApplication]openURL:[NSURL URLWithString:@"prefs:General&path=Reset"]];
#endif
  }];
  [alertController addAction:rubbishAction];
  
  [viewController presentViewController:alertController animated:YES completion:nil];
}

+(void)openPhoto:(UIViewController *)viewController
{
  UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"相册权限未开启"message:@"权限未开启，请进入系统【设置】中打开开关,开启相册"preferredStyle:UIAlertControllerStyleAlert ];
  UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleDefault handler:nil];
  [alertController addAction:cancelAction];
  UIAlertAction *rubbishAction = [UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
#ifdef __IPHONE_8_0//跳入当前App设置界面,
    [[UIApplication sharedApplication]openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];
#else   //适配iOS7 ,跳入系统设置界面
    [[UIApplication sharedApplication]openURL:[NSURL URLWithString:@"prefs:General&path=Reset"]];
#endif
  }];
  [alertController addAction:rubbishAction];
  
  [viewController presentViewController:alertController animated:YES completion:nil];
}

+ (BOOL)isIPhoneXMobile{
  
  // HQDeviceInfo *info = [HQDeviceInfo currentDeviceInfo];
  if (StateHeight > 20) {
    return YES;
  }else
    return NO;
}

+ (CGFloat)setNavHeight{
  
  CGFloat navHeight;
  if ([self isIPhoneXMobile]) {
    navHeight = 44 + StateHeight;
  }else
    navHeight = 64;
  return navHeight;
}

+ (CGFloat)setTabbarHeight{
  
  CGFloat tabHeight;
  if (StateHeight > 20) {
    tabHeight = 83;
  }else
    tabHeight = 49;
  return tabHeight;
}

#pragma mark + 设置lab行间距
+ (void)setLabLineSpace:(UILabel *)lable Lineheight:(CGFloat)lineHeight{
  
  // 设置label的行间距
  NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:lable.text];
  NSMutableParagraphStyle *paragraphStyle = [[NSMutableParagraphStyle alloc] init];
  [paragraphStyle setLineSpacing:lineHeight];
  [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:NSMakeRange(0, [lable.text length])];
  [lable setAttributedText:attributedString];
}

#pragma mark + 根据银行代码找出银行名称
#pragma mark + 判断本机当前使用的语言
+ (BOOL)isSimplifiedLanguages{
  
  // 获得当前iPhone使用的语言
  NSString* currentLanguage = [[NSLocale preferredLanguages] firstObject];
  if ([currentLanguage containsString:@"Hans"]) {
    return YES;
  }
  return NO;
}

#pragma mark +根据当前语言转换年格式
+ (NSString *)changeYearByLanguages:(NSInteger)year{
  
  if (year == 0) {
    return nil;
  }
  
  if (![self isSimplifiedLanguages]) {
      NSInteger difftime = 1911;
    NSInteger distance = year+difftime;
    if (distance < 100) {
      return [NSString stringWithFormat:@"民国0%zd",distance];
    }
      return [NSString stringWithFormat:@"民国%zd",distance];
      
    }
  return [NSString stringWithFormat:@"%zd",year];
}

#pragma mark + 截屏并保存图片
+(UIImage *)captureImageFromView:(UIView *)view{
  
  UIGraphicsBeginImageContextWithOptions(CGSizeMake(UIScreenWidth, UIScreenHeight),NO, 0);
  
  [[UIColor clearColor] setFill];
  
  [[UIBezierPath bezierPathWithRect:CGRectMake(0, 0, UIScreenWidth, UIScreenHeight)] fill];
  
  CGContextRef ctx = UIGraphicsGetCurrentContext();
  
  [[UIApplication sharedApplication].keyWindow.layer renderInContext:ctx];
  
  UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
  
  UIGraphicsEndImageContext();
  
  return image;
}

+(BOOL)isEmptyString:(NSString *)str{
    if(str == nil || str.length == 0){
        return true;
    }
    
    return false;
}

@end
