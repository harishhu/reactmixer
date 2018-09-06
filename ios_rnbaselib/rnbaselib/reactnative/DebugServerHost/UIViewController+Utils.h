
#import <UIKit/UIKit.h>

@interface UIViewController (Utils)

+(UIViewController*) currentViewController;
+(UIViewController*) findBestViewController:(UIViewController*)vc;
@end
