//
//  VVToolBar.h
//  有截止时间或起始时间的日期选择器
//
//  Created by iosDev on 16/6/29.
//  Copyright © 2016年 iosDev. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

@interface ZAKJToolBar : UIView

@property(nullable, nonatomic,copy) NSString          *title;
@property(null_resettable, nonatomic,strong) UIFont   *font;
@property(null_resettable, nonatomic,strong) UIColor  *titleColor;
@property(null_resettable, nonatomic,strong) UIColor  *borderButtonColor;


- (instancetype)initWithTitle:(nullable NSString *)title
            cancelButtonTitle:(nullable NSString *)cancelButtonTitle
                okButtonTitle:(nullable NSString *)okButtonTitle
                    addTarget:(nullable id)target
                 cancelAction:(SEL)cancelAction
                     okAction:(SEL)okAction;

@end
