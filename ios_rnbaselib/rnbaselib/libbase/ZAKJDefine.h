//
//  ZAKJDefine.h
//  rnbaselib
//
//  Created by harishhu on 2018/4/24.
//  Copyright © 2018年   ReactMixer. All rights reserved.
//

#ifndef ZAKJDefine_h
#define ZAKJDefine_h

#import "UIColor+ZAKJHex.h"

#define ZAKJ_JSLOCATION_KEY @"RCT_jsLocation"

#define BlueColoraAE5 [UIColor colorWithHexString:@"509AF7"]
#define GreenColora41cc [UIColor colorWithHexString:@"41cca5"]
#define RedColorf91 [UIColor colorWithHexString:@"ff9196"]
#define GETUSSER(key) [[NSUserDefaults standardUserDefaults] objectForKey:key]
#define Relation_Friend_Color [UIColor colorWithHexString:@"#42D380"]
#define Relation_Family_Color [UIColor colorWithHexString:@"#FF535B"]
#define BlueSearchColor [UIColor colorWithHexString:@"2F8AFF"]
#define MenSexColor [UIColor colorWithHexString:@"91dbfe"]
#define WomenSexColor [UIColor colorWithHexString:@"fb7d8f"]
#define LineViewColor [UIColor colorWithHexString:@"e1e1e1"]
#define LineViewColor1 [UIColor colorWithHexString:@"f0f0f0"]
#define NameColor [UIColor colorWithHexString:@"333333"]
#define BackGroundColor [UIColor colorWithHexString:@"f7f7f7"]
#define BlueColora4 [UIColor colorWithHexString:@"00a4ff"]
#define GrayColor1 [UIColor colorWithHexString:@"f5f5f5"]
#define GrayColor1a [UIColor colorWithHexString:@"1a1a1a"]
#define GrayColor2 [UIColor colorWithHexString:@"a0a0a0"]
#define GrayColor3 [UIColor colorWithHexString:@"787878"]
#define GrayColor4 [UIColor colorWithHexString:@"5a5a5a"]
#define GrayColor5 [UIColor colorWithHexString:@"282828"]
#define GrayColor6 [UIColor colorWithHexString:@"666666"]
#define GrayColor7 [UIColor colorWithHexString:@"e6e6e6"]
#define GrayColor9 [UIColor colorWithHexString:@"999999"]
#define GrayColor12 [UIColor colorWithHexString:@"cccccc"]

#define WhiteTextColor [UIColor colorWithHexString:@"#FFFFFF"]
#define TextBackBlue [UIColor colorWithHexString:@"#8CCFFE"]

#define RGBA_COLOR(R, G, B, A) [UIColor colorWithRed:((R) / 255.0f) green:((G) / 255.0f) blue:((B) / 255.0f) alpha:A]
#define RGB_COLOR(R, G, B) [UIColor colorWithRed:((R) / 255.0f) green:((G) / 255.0f) blue:((B) / 255.0f) alpha:1.0f]

#define COLOR(arg) [UIColor colorWithHexString:arg]
#define COLOR_ALPHA(arg,a) [UIColor colorWithHexString:arg alpha:(a)]

#define UIScreenWidth [[UIScreen mainScreen] bounds].size.width
#define UIScreenHeight [[UIScreen mainScreen] bounds].size.height

#define WScale ([[UIScreen mainScreen] bounds].size.width / 375)
#define HScale ([[UIScreen mainScreen] bounds].size.width / 667)

#define StateHeight [[UIApplication sharedApplication] statusBarFrame].size.height

#endif /* ZAKJDefine_h */
