//
//  BaseDataModel.m
//  hengqinlifeapp
//
//  Created by harishhu on 2017/3/28.
//  Copyright © 2017年 横琴人寿. All rights reserved.
//

#import "ZAKJBaseDataModel.h"
#import <objc/runtime.h>

@implementation ZAKJBaseDataModel

- (void)encodeWithCoder:(NSCoder *)aCoder
{
    unsigned int outCount, i;
    objc_property_t *properties = class_copyPropertyList([self class], &outCount);
    for (i = 0; i < outCount; i++) {
        objc_property_t property = properties[i];
        NSString *key = [NSString stringWithFormat:@"%s",property_getName(property)];
        id value = [self valueForKey:key];
        if(!value)continue;
        [aCoder encodeObject:value forKey:[NSString stringWithFormat:@"%@",key]];
    }
    free (properties);
}

- (id)initWithCoder:(NSCoder *)aDecoder
{
    self = [super init];
    if(self)
    {
        unsigned int outCount, i;
        objc_property_t *properties = class_copyPropertyList([self class], &outCount);
        for (i = 0; i < outCount; i++) {
            objc_property_t property = properties[i];
            NSString *key = [NSString stringWithFormat:@"%s",property_getName(property)];
            id value = [aDecoder decodeObjectForKey:key];
            if (!value)continue;
            [self setValue:value forKey:key];
        }
        free (properties);
    }
    return self;
}

- (id)copyWithZone:(NSZone *)zone
{
    id copyObject = [[[self class] allocWithZone:zone] init];
    unsigned int outCount, i;
    objc_property_t *properties = class_copyPropertyList([self class], &outCount);
    for (i = 0; i < outCount; i++) {
        objc_property_t property = properties[i];
        NSString *key = [NSString stringWithFormat:@"%s",property_getName(property)];
        id value = [self valueForKey:key];
        if (!value)continue;
        [copyObject setValue:value forKey:key];
    }
    free (properties);
    return copyObject;
}

-(NSArray*)convertArrayData:(NSArray *)fromDicArray targetItemCalzz:(__unsafe_unretained Class)clazz{
    if (!fromDicArray || fromDicArray.count == 0) {
        return nil;
    }
    
    NSMutableArray * objects = [NSMutableArray array];
    
    for ( NSDictionary * obj in fromDicArray )
    {
        if ( [obj isKindOfClass:[NSDictionary class]] )
        {
            id convertedObj = [clazz ac_objectWithDictionary:obj];
            if ( convertedObj ) {
                [objects addObject:convertedObj];
                
            }
        }
        else
        {
            [objects addObject:obj];
        }
    }
    
    return objects;
}
- (id)valueForUndefinedKey:(NSString *)key {
    return nil;
}
-(void)setValue:(id)value forUndefinedKey:(NSString *)key {
    
}
@end
