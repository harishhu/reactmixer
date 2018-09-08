//
//  BaseDataModel.h
//  hengqinlifeapp
//
//  Created by harishhu on 2017/3/28.
//  Copyright © 2017年 横琴人寿. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "NSObject+AutoCoding.h"

@interface ZAKJBaseDataModel : NSObject<NSCoding, NSCopying>
@property(nonatomic, assign) NSInteger pageIndex;
@property(nonatomic, assign) NSInteger pageTotal;

-(NSArray *)convertArrayData: (NSArray *) fromDicArray targetItemCalzz: (__unsafe_unretained Class) clazz;
- (id)valueForUndefinedKey:(NSString *)key;
-(void)setValue:(id)value forUndefinedKey:(NSString *)key;

@end
