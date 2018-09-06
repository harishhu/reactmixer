#import <UIKit/UIKit.h>

@interface UIColor (ZAKJHex)
+ (UIColor *)colorWithHexString:(NSString *)string;
+ (UIColor *)colorWithHexString:(NSString *)string alpha:(CGFloat)alpha;
@end
