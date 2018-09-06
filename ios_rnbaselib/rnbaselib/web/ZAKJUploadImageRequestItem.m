//
//  UploadImageRequestItem.m
//  hengqinlifeapp
//
//  Created by 姚志飞 on 2017/5/2.
//  Copyright © 2017年 横琴人寿. All rights reserved.
//

#import "ZAKJUploadImageRequestItem.h"

@implementation ZAKJUploadImageRequestItem

-(NSString *)buildTargetUrl:(NSString *)host{
    return [NSString stringWithFormat:@"%@%@", host, @"/biz/file/upload"];
}

-(void)buildHttpParams:(NSDictionary *)params{
    [super buildHttpParams:params];
    [params setValue:_images forKey:@"file"];
}

@end

@implementation ZAKJUploadRecordRequestItem

-(NSString *)buildTargetUrl:(NSString *)host{
    return [NSString stringWithFormat:@"%@%@", host, @"/biz/file/upload"];
}

-(void)buildHttpParams:(NSDictionary *)params{
    [super buildHttpParams:params];
    [params setValue:_record forKey:@"file"];
}

@end

@implementation ZAKJUploadFileRequestItem

-(NSString *)buildTargetUrl:(NSString *)host{
    return [NSString stringWithFormat:@"%@%@", host, @"/biz/file/upload"];
}

-(void)buildHttpParams:(NSDictionary *)params{
    [super buildHttpParams:params];
    [params setValue:_files forKey:@"file"];
}

@end

@implementation ZAKJIdCardRequest

-(NSString *)buildTargetUrl:(NSString *)host{
    return [NSString stringWithFormat:@"%@%@", host, @"/data/ocr/idCard.json"];
}

-(void)buildHttpParams:(NSDictionary *)params{
    [super buildHttpParams:params];
    [params setValue:_picrure forKey:@"images"];
}

@end

@implementation ZAKJBankCardRequest

-(NSString *)buildTargetUrl:(NSString *)host{
    return [NSString stringWithFormat:@"%@%@", host, @"/data/ocr/bankCard.json"];
}

-(void)buildHttpParams:(NSDictionary *)params{
    [super buildHttpParams:params];
    [params setValue:_picrure forKey:@"images"];
    
}

@end
