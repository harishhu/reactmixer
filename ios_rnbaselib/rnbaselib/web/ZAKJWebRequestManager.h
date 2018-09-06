//
//  IYBWebRequestManager.h
//  iyunbao
//
//  Created by 胡付义 on 2017/3/23.
//  Copyright © 2017年 胡付义. All rights reserved.
//

#import <Foundation/Foundation.h>

@class ZAKJRequestItemBase;
@interface ZAKJWebRequestManager : NSObject
-(instancetype _Nonnull)init;

+(ZAKJWebRequestManager *_Nonnull)shareInstance;

-(void)setHttpHost: (NSString *)host;
-(void)setAppToken: (NSString *)token;

-(NSString *)getHttpHost;
-(NSString *)getAppToken;

//-(void)sendRequest: (NSString *)url parameters: (NSDictionary *)params attachData: (id) data callback: (requestCallback) callback;
-(void)sendRequest: (ZAKJRequestItemBase *)requestItem requestCallback: (void (^)(BOOL success, NSURLSessionDataTask * _Nonnull, id _Nullable)) calback;

#pragma mark 图片上传
-(void)uploadImages:(ZAKJRequestItemBase *)requestItem requestCallback: (void (^)(BOOL success, NSURLSessionDataTask * _Nonnull, id _Nullable)) callback;
#pragma mark 文件上传
-(void)uploadFiles:(ZAKJRequestItemBase *)requestItem requestCallback: (void (^)(BOOL success, NSURLSessionDataTask * _Nonnull, id _Nullable)) callback;
@end
