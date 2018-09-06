#import "UIColor+ZAKJHex.h"

@implementation UIColor (ZAKJHex)

+ (NSUInteger)integerValueFromHexString:(NSString *)hex
{
    int result = 0;
    sscanf([hex UTF8String], "%x", &result);
    return result;
}

+ (UIColor *)colorWithHexString:(NSString *)hex
{
    return [UIColor colorWithHexString:hex alpha:1.0];
}

+ (UIColor *)colorWithHexString:(NSString *)hex alpha:(CGFloat)alpha
{
    hex = [hex stringByReplacingOccurrencesOfString:@"#" withString:@""];
    if ([hex length]!=6 && [hex length]!=3)
    {
        return nil;
    }
    
    NSUInteger digits = [hex length] / 3;
    CGFloat maxValue = (digits==1)?15.0:255.0;
    
    CGFloat red = [self integerValueFromHexString:[hex substringWithRange:NSMakeRange(0, digits)]]/maxValue;
    CGFloat green = [self integerValueFromHexString:[hex substringWithRange:NSMakeRange(digits, digits)]]/maxValue;
    CGFloat blue = [self integerValueFromHexString:[hex substringWithRange:NSMakeRange(2*digits, digits)]]/maxValue;
    
    return [UIColor colorWithRed:red green:green blue:blue alpha:alpha];
}

@end
