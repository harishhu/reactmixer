//
//  ZAKJCycleScrollView.m
//  saadtw
//
//  Created by tet-cjx on 2018/4/28.
//  Copyright © 2018年 Facebook. All rights reserved.
//
#import <Masonry.h>
#import "ZAKJCycleScrollView.h"

@implementation ZAKJCycleScrollView

- (instancetype)initWithFrame:(CGRect)frame {
  if ((self = [super initWithFrame:frame])) {
  }
  return self;
}

- (void)setAutoScrollTimeInterval:(CGFloat)autoScrollTimeInterval {
  _autoScrollTimeInterval = autoScrollTimeInterval;
}

- (void)setPageControlBottomOffset:(CGFloat)pageControlBottomOffset {
  _pageControlBottomOffset = pageControlBottomOffset;
}

- (void)setImageURLStringsGroup:(NSArray *)imageURLStringsGroup {
  _imageURLStringsGroup = imageURLStringsGroup;
  _cycleScrollView.imageURLStringsGroup = imageURLStringsGroup;
}

-(void)delayCreateScrollview{
    CGFloat height = self.frame.size.height;
    //NSLog(@"delayCreateScrollview height = %f", height);
    
    if (height > 0) {
        [self initCycleScollView];
    }else{
        [self performSelector:@selector(delayCreateScrollview) withObject:nil afterDelay:0.1f];
    }
}

-(void)initCycleScollView{
    CGSize s = self.frame.size;
    SDCycleScrollView *view = [SDCycleScrollView cycleScrollViewWithFrame:CGRectMake(0, 0, s.width, s.height) delegate:self placeholderImage:_placeholderImage];
    view.delegate = self;
    view.autoScrollTimeInterval = _autoScrollTimeInterval ? _autoScrollTimeInterval : 3;
    view.pageControlBottomOffset = _pageControlBottomOffset ? _pageControlBottomOffset : 5;
    view.imageURLStringsGroup = _imageURLStringsGroup;
    _cycleScrollView = view;
    [self addSubview:view];
}

- (void)setPlaceholderImage:(UIImage *)placeholderImage {
    _placeholderImage = placeholderImage;
    [self performSelector:@selector(delayCreateScrollview) withObject:nil afterDelay:0.1f];
}

- (void)cycleScrollView:(SDCycleScrollView *)cycleScrollView didSelectItemAtIndex:(NSInteger)index {
  if (self.onChange) {
    self.onChange(@{@"index":@(index)});
  }
}

@end
