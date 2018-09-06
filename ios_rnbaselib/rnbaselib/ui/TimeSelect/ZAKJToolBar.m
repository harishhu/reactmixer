//
//  VVToolBar.m
//  有截止时间或起始时间的日期选择器
//
//  Created by iosDev on 16/6/29.
//  Copyright © 2016年 iosDev. All rights reserved.
//

#import "ZAKJToolBar.h"
#import "ZAKJConstant.h"
#import "UIView+ZAKJ.h"
#import "UIColor+ZAKJHex.h"

/**
 *  1.屏幕尺寸
 */
#define ScreenWidth  CGRectGetWidth([UIScreen mainScreen].bounds)
#define ScreenHeight CGRectGetHeight([UIScreen mainScreen].bounds)

/**
 *  2.返回一个RGBA格式的UIColor对象
 */
#define RGBA(r, g, b, a) [UIColor colorWithRed:r/255.0f green:g/255.0f blue:b/255.0f alpha:a]

/**
 *  3.返回一个RGB格式的UIColor对象
 */
#define RGB(r, g, b) RGBA(r, g, b, 1.0f)

/**
 *  4.弱引用
 */
#define STWeakSelf __weak typeof(self) weakSelf = self;

@interface ZAKJToolBar()

@property (nonatomic, strong, nullable)UIButton *buttonLeft;
@property (nonatomic, strong, nullable)UILabel *labelTitle;
@property (nonatomic, strong, nullable)UIButton *buttonRight;
@end
@implementation ZAKJToolBar

#pragma mark - --- init 视图初始化 ---
- (instancetype)initWithTitle:(nullable NSString *)title
            cancelButtonTitle:(nullable NSString *)cancelButtonTitle
                okButtonTitle:(nullable NSString *)okButtonTitle
                    addTarget:(nullable id)target
                 cancelAction:(SEL)cancelAction
                     okAction:(SEL)okAction{
    
    self = [self init];
    
    [self.labelTitle setText:title];
    
    [self.buttonLeft setTitle:cancelButtonTitle forState:UIControlStateNormal];
    [self.buttonLeft addTarget:target action:cancelAction forControlEvents:UIControlEventTouchUpInside];
    
    [self.buttonRight setTitle:okButtonTitle forState:UIControlStateNormal];
    [self.buttonRight addTarget:target action:okAction forControlEvents:UIControlEventTouchUpInside];
    
    return self;
}

- (instancetype)init
{
    if (self = [super init]) {
        [self setupUI];
    }
    return self;
}


- (void)setupUI
{
    _title = nil;
    _font = [UIFont systemFontOfSize:15];
    _titleColor = GrayColor9;
    _borderButtonColor = [UIColor colorWithRed:205/255.0 green:205/255.0 blue:205/255.0 alpha:1.0];
    [self.buttonLeft setTitleColor:BlueColora4 forState:UIControlStateNormal];
    [self.buttonRight setTitleColor:BlueColora4 forState:UIControlStateNormal];
    
    self.bounds = CGRectMake(0, 0, ScreenWidth, VVControlSystemHeight);
    [self setBackgroundColor:[UIColor whiteColor]];
   // [self addSubview:self.labelTitle];
    [self addSubview:self.buttonLeft];
    [self addSubview:self.buttonRight];
}

#pragma mark - --- delegate 视图委托 ---
#pragma mark - --- event response 事件相应 ---
#pragma mark - --- private methods 私有方法 ---
#pragma mark - --- setters 属性 ---

- (void)setTitle:(NSString *)title
{
    _title = title;
    [self.labelTitle setText:title];
}

- (void)setFont:(UIFont *)font
{
    _font = font;
    [self.buttonLeft.titleLabel setFont:font];
    [self.buttonRight.titleLabel setFont:font];
    [self.labelTitle setFont:font];
}

- (void)setTitleColor:(UIColor *)titleColor
{
    _titleColor = titleColor;
    [self.labelTitle setTextColor:titleColor];
    [self.buttonLeft setTitleColor:titleColor forState:UIControlStateNormal];
    [self.buttonRight setTitleColor:titleColor forState:UIControlStateNormal];
}

- (void)setBorderButtonColor:(UIColor *)borderButtonColor
{
    _borderButtonColor = borderButtonColor;
    [self.buttonLeft addBorderColor:borderButtonColor];
    [self.buttonRight addBorderColor:borderButtonColor];
}
#pragma mark - --- getters 属性 ---

- (UIButton *)buttonLeft
{
    if (!_buttonLeft) {
        CGFloat leftX = VVMarginBig;
        CGFloat leftY = VVMarginSmall;
        CGFloat leftW = VVControlSystemHeight;
        CGFloat leftH = VVControlSystemHeight - VVMargin;
        _buttonLeft = [[UIButton alloc]initWithFrame:CGRectMake(leftX, leftY, leftW, leftH)];
        [_buttonLeft setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
//        [_buttonLeft addBorderColor:self.borderButtonColor];
        [_buttonLeft.titleLabel setFont:self.font];
    }
    return _buttonLeft;
}

- (UIButton *)buttonRight
{
    if (!_buttonRight) {
        CGFloat rightW = VVControlSystemHeight;
        CGFloat rightH = VVControlSystemHeight - VVMargin;
        CGFloat rightX = ScreenWidth - rightW - VVMarginBig;
        CGFloat rightY = VVMarginSmall;
        _buttonRight = [[UIButton alloc]initWithFrame:CGRectMake(rightX, rightY, rightW, rightH)];
        [_buttonRight setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
//        [_buttonRight addBorderColor:self.borderButtonColor];
        [_buttonRight.titleLabel setFont:self.font];
    }
    return _buttonRight;
}

- (UILabel *)labelTitle
{
    if (!_labelTitle) {
        CGFloat titleX = self.buttonLeft.right + VVMarginSmall;
        CGFloat titleY = 0;
        CGFloat titleW = ScreenWidth - titleX * 2;
        CGFloat titleH = VVControlSystemHeight;
        _labelTitle = [[UILabel alloc]initWithFrame:CGRectMake(titleX, titleY, titleW, titleH)];
        [_labelTitle setTextAlignment:NSTextAlignmentCenter];
        [_labelTitle setTextColor:self.titleColor];
        [_labelTitle setFont:self.font];
        _labelTitle.adjustsFontSizeToFitWidth = YES;
    }
    return _labelTitle;
}
@end
