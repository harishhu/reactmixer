//
//  ZAKJCycleScrollView.m
//  saadtw
//
//  Created by tet-cjx on 2018/4/28.
//  Copyright © 2018年 Facebook. All rights reserved.
//
#import <Masonry.h>
#import "ZAKJDefine.h"
#import "ZAKJAutoTextView.h"

#define COLOR_INDEX 0
#define SIZE_INDEX 1
#define DATA_INDEX 2

#define DEFAULT_FONT_SIZE 13

@implementation ZAKJAutoTextView{
    NSArray *items;
    NSString *textColor;
    float textSize;
}

-(instancetype)initWithFrame:(CGRect)frame {
    if ((self = [super initWithFrame:frame])) {
    }
    return self;
}

-(void)delayCreateScrollview{
    CGFloat height = self.frame.size.height;
    //NSLog(@"delayCreateScrollview height = %f", height);
    
    if (height > 0) {
        [self initAutoTextView];
        [self initAutoTextData];
    }else{
        [self performSelector:@selector(delayCreateScrollview) withObject:nil afterDelay:0.1f];
    }
}

-(void)setAutoScrollTimeInterval:(CGFloat)autoScrollTimeInterval {
    _autoScrollTimeInterval = autoScrollTimeInterval;
}

-(void)setTextData:(NSArray *)textData {
    _textData = textData;
    textColor = textData[COLOR_INDEX];
    NSNumber *data = (NSNumber*)textData[SIZE_INDEX];
    if (data) {
        textSize = data.floatValue;
    }
    items = textData[DATA_INDEX];
    
//    NSLog(@"set textData = %f", data.floatValue);

    [self performSelector:@selector(delayCreateScrollview) withObject:nil afterDelay:0.1f];
}

-(void)initAutoTextView{
    CGSize s = self.frame.size;
    SDCycleScrollView *view = [SDCycleScrollView cycleScrollViewWithFrame:CGRectMake(0 , 0, s.width, s.height) delegate:nil placeholderImage:nil];
    [view setClickItemOperationBlock:^(NSInteger currentIndex){
        NSLog(@"%ld",(long)currentIndex);
    }];
    view.autoScrollTimeInterval = _autoScrollTimeInterval ? _autoScrollTimeInterval : 5;
    if (textColor && textColor.length > 0) {
        view.titleLabelTextColor = [UIColor colorWithHexString:textColor];
    }else{
        view.titleLabelTextColor = GrayColor6;
    }
    
    view.titleLabelBackgroundColor = [UIColor colorWithRed:1.0 green:1.0 blue:1.0 alpha:0.0];
    view.backgroundColor = [UIColor whiteColor];
    //_notifyScrollView.titleLabelTextAlignment = NSTextAlignmentJustified;
    view.displayType = SDDisplayTypeAttributeText;
    view.titleLabelTextFont = [UIFont systemFontOfSize:textSize];
    view.scrollDirection = UICollectionViewScrollDirectionVertical;
    view.onlyDisplayText = YES;
    
    _cycleScrollView = view;
    [self addSubview:view];
}

-(void)initAutoTextData{
    NSMutableArray *titleArr = [NSMutableArray arrayWithCapacity:0];
    for (int index = 0; index < items.count; index++) {
        NSString *title = items[index];
        NSMutableAttributedString *attributeString  = [[NSMutableAttributedString alloc]initWithString:title];
        NSMutableParagraphStyle *paragraphStyle = [[NSMutableParagraphStyle alloc] init];
        [paragraphStyle setLineSpacing:6];
        [attributeString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:NSMakeRange(0, title.length)];
        [titleArr addObject:attributeString];
    }
    
    self.cycleScrollView.titlesGroup = titleArr;
}

//- (void)setPlaceholderImage:(UIImage *)placeholderImage {
//    _placeholderImage = placeholderImage;
//    CGSize parentSize = self.frame.size;
//
//    SDCycleScrollView *view = [SDCycleScrollView cycleScrollViewWithFrame:CGRectMake(0, 0, 0, 0) delegate:self placeholderImage:placeholderImage];
//    view.autoScrollTimeInterval = _autoScrollTimeInterval ? _autoScrollTimeInterval : 2;
//    view.pageControlBottomOffset = _pageControlBottomOffset ? _pageControlBottomOffset : 5;
//    view.imageURLStringsGroup = _imageURLStringsGroup;
//    _cycleScrollView = view;
//    [self addSubview:view];
//}

- (void)cycleScrollView:(SDCycleScrollView *)cycleScrollView didSelectItemAtIndex:(NSInteger)index {
    if (self.onChange) {
        self.onChange(@{@"index":@(index)});
    }
}

@end
