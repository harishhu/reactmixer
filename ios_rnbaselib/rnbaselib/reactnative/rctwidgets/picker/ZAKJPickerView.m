//
//  SAPickerView.m
//  saadtw
//
//  Created by 胡付义 on 2018/1/15.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "ZAKJPickerView.h"
#import <React/RCTViewManager.h>

@interface ZAKJPickerView()<UIPickerViewDataSource, UIPickerViewDelegate>
@property(nonatomic, copy) RCTBubblingEventBlock onChange;
@property(nonatomic, assign) NSInteger defaultIndex;
@property(nonatomic, assign) NSInteger defaultIndex1;
@end

@implementation ZAKJPickerView{
    NSArray *_items;
}

-(instancetype)init{
    self = [super init];
    
    self.dataSource = self;
    self.delegate = self;
    return self;
}

-(void)setItems:(NSArray *)i{
//    NSLog(@"set items, length = %d", i.count);
    _items = i;
    [self reloadAllComponents];
}

-(NSArray *)items{
    return _items;
}

//UIPickerViewDataSource中定义的方法，该方法的返回值决定该控件包含的列数
- (NSInteger)numberOfComponentsInPickerView:(UIPickerView*)pickerView
{
    return 1; // 返回1表明该控件只包含1列
}

//UIPickerViewDataSource中定义的方法，该方法的返回值决定该控件指定列包含多少个列表项
- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component
{
    // 由于该控件只包含一列，因此无须理会列序号参数component
    // 该方法返回teams.count，表明teams包含多少个元素，该控件就包含多少行
    return _items.count;
}

- (CGFloat)pickerView:(UIPickerView *)pickerView rowHeightForComponent:(NSInteger)component
{
    return 35;
}

// UIPickerViewDelegate中定义的方法，该方法返回的NSString将作为UIPickerView
// 中指定列和列表项的标题文本
- (NSString *)pickerView:(UIPickerView *)pickerView
             titleForRow:(NSInteger)row forComponent:(NSInteger)component
{
    // 由于该控件只包含一列，因此无须理会列序号参数component
    // 该方法根据row参数返回teams中的元素，row参数代表列表项的编号，
    // 因此该方法表示第几个列表项，就使用teams中的第几个元素
    
    return [_items objectAtIndex:row];
}

-(UIView *)pickerView:(UIPickerView *)pickerView viewForRow:(NSInteger)row forComponent:(NSInteger)component reusingView:(UIView *)view{
    
    //设置分割线的颜色
    for(UIView *singleLine in pickerView.subviews)
    {
        if (singleLine.frame.size.height < 1)
        {
            singleLine.backgroundColor = [UIColor colorWithRed:205.0f/255.0f green:205.0f/255.0f blue:205.0f/255.0f alpha:1];
        }
    }
    
    UILabel *lalTitle=(UILabel *)view;
    if (!lalTitle) {
        lalTitle=[[UILabel alloc] init];
        lalTitle.minimumScaleFactor=8;//设置最小字体，与minimumFontSize相同，minimumFontSize在IOS 6后不能使用。
        lalTitle.adjustsFontSizeToFitWidth=YES;//设置字体大小是否适应lalbel宽度
        lalTitle.textAlignment=NSTextAlignmentCenter;//文字居中显示
        [lalTitle setTextColor:[UIColor blackColor]];
        [lalTitle setFont:[UIFont systemFontOfSize:15.0f]];
    }
    lalTitle.text=[self pickerView:pickerView titleForRow:row forComponent:component];
    return lalTitle;
}

// 当用户选中UIPickerViewDataSource中指定列和列表项时激发该方法
-(void)pickerView:(UIPickerView *)pickerView didSelectRow:
(NSInteger)row inComponent:(NSInteger)component{
    self.onChange(@{
                    @"index": @(row)
                    });
}

-(void)delayMethod {
    [self selectRow:self.defaultIndex1 inComponent:0 animated:YES];
}

-(void)setDefaultIndex:(NSInteger)defaultIndex{
    self.defaultIndex1 = defaultIndex;
    [self performSelector:@selector(delayMethod) withObject:nil afterDelay:0.1f];
}
@end
