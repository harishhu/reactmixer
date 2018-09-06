//
//  RequestItemBase.h
//  hengqinlifeapp
//
//  Created by 胡付义 on 2017/3/31.
//  Copyright © 2017年 横琴人寿. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ZAKJHttpResult.h"

#define REQUEST_DEFAULT_PAGE_SIZE 12

@interface ZAKJRequestItemBase : NSObject
#pragma mark properties
//http请求url
@property(nonatomic, copy) NSString *targetUrl;
//http请求参数
@property(nonatomic, retain) NSDictionary *params;
//http请求头
@property(nonatomic, retain) NSDictionary *headers;
//item执行结束后的回调
@property(nonatomic, copy) void(^callback)(NSInteger returnCode, NSString * returnMsg, id body, id attachData);
//操作的附加数据，它会在执行结束后，在回调函数中传回给caller
@property(nonatomic, assign) id attachData;
//http请求超时时间，默认为30秒
@property(nonatomic, assign) int httpTimeOut;
//http请求id
@property(nonatomic, assign) NSUInteger requestID;
//返回body json数据对应的解析类
@property(nonatomic, assign) Class responseBodyClass;

//http请求列表数据，分页索引
@property(nonatomic, assign) NSInteger pageIndex;
//http请求列表数据，分页大小，可不设置，默认为12
@property(nonatomic, assign) NSInteger pageSize;


#pragma normal methods
//获取http请求返回结果对象
-(ZAKJHttpResult *)getHttpResult;
-(void)setResultTarget: (id) target resultFun:(SEL) resultFun;

//获取http请求返回的分页索引
-(NSInteger)getResponsePageIndex;
//获取http请求返回的总页数
-(NSInteger)getResponsePageTotal;

#pragma mark methods
-(void)run;
-(void)runUpImage;
-(void)runUpFile;

-(ZAKJHttpResult *) sendRequest: (NSString *)targetUrl params: (NSDictionary *)params headers: (NSDictionary *)headers;

-(NSString *) buildTargetUrl: (NSString *) host;
-(void) buildHttpHeaders : (NSDictionary *) headers;
-(void) buildHttpParams : (NSDictionary *) params;

//执行回调操作
-(void)invokeCallbackAfterRequest;
//解析返回的body数据
-(void)parseHttpResultBody: (ZAKJHttpResult *) result;
-(void)parseHttpResult: (ZAKJHttpResult *) result;
@end
