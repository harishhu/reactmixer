//
//  RequestItemBase.m
//  hengqinlifeapp
//
//  Created by 胡付义 on 2017/3/31.
//  Copyright © 2017年 横琴人寿. All rights reserved.
//

#import "ZAKJRequestItemBase.h"
#import "ZAKJUploadImageRequestItem.h"
#import "ZAKJWebRequestManager.h"
#import "NSObject+AutoCoding.h"
//#import "HQDeviceInfo.h"
#import <AFNetworking.h>
#import "ZAKJHttpResultCodes.h"

@implementation ZAKJRequestItemBase{
    NSString * hostUrl;
    
    ZAKJHttpResult *httpResult;
    
    id resultTarget;
    SEL resultSel;
    
    NSInteger responsePageIndex;
    NSInteger responsePageTotal;
}

-(instancetype)init{
    if (!hostUrl) {
        hostUrl = [[ZAKJWebRequestManager shareInstance] getHttpHost];//IYBViewLocalizedStringForKey(@"HQ_HTTP_HOST");
        self.httpTimeOut = 10;
        
        _pageIndex = -1;
        _pageSize = REQUEST_DEFAULT_PAGE_SIZE;
        
        responsePageTotal = -1;
        responsePageIndex = -1;
    }
    
    return [super init];
}

-(NSInteger)getResponsePageIndex{
    return responsePageIndex;
}

-(NSInteger)getResponsePageTotal{
    return responsePageTotal;
}

-(void)run{
    NSString *targetUrl = [self buildTargetUrl: hostUrl];
    
    NSMutableDictionary * params = [NSMutableDictionary dictionaryWithCapacity: 5];
    [self buildHttpParams:params];
    
    NSMutableDictionary *headers = [NSMutableDictionary dictionaryWithCapacity: 5];
    [self buildHttpHeaders:headers];
    
    self.params = params;
    self.headers = headers;
    self.targetUrl = [targetUrl stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    
    httpResult = [[ZAKJHttpResult alloc] init];
    httpResult = [self sendRequest: targetUrl params:params headers:headers];
}

-(void)runUpImage{
    NSString *targetUrl = [self buildTargetUrl: hostUrl];
    
    NSMutableDictionary * params = [NSMutableDictionary dictionaryWithCapacity: 5];
    [self buildHttpParams:params];
    
    NSMutableDictionary *headers = [NSMutableDictionary dictionaryWithCapacity: 5];
    [self buildHttpHeaders:headers];
    
    self.params = params;
    self.headers = headers;
    self.targetUrl = [targetUrl stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    
    httpResult = [[ZAKJHttpResult alloc] init];
    httpResult = [self sendUpLoadRequest: targetUrl params:params headers:headers];
}

-(void)runUpFile{
    NSString *targetUrl = [self buildTargetUrl: hostUrl];
    
    NSMutableDictionary * params = [NSMutableDictionary dictionaryWithCapacity: 5];
    [self buildHttpParams:params];
    
    NSMutableDictionary *headers = [NSMutableDictionary dictionaryWithCapacity: 5];
    [self buildHttpHeaders:headers];
    
    self.params = params;
    self.headers = headers;
    self.targetUrl = [targetUrl stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    
    httpResult = [[ZAKJHttpResult alloc] init];
    httpResult = [self sendUpLoadFileRequest: targetUrl params:params headers:headers];
}

-(ZAKJHttpResult *)getHttpResult{
    return httpResult;
}

-(void)setResultTarget:(id)target resultFun:(SEL)resultFun{
    resultTarget = target;
    resultSel = resultFun;
}

-(ZAKJHttpResult *) sendRequest: (NSString *)targetUrl params: (NSDictionary *)params headers: (NSDictionary *)headers{
    __block typeof(self) blockself = self;
    
    [[ZAKJWebRequestManager shareInstance] sendRequest:self requestCallback:^(BOOL success, NSURLSessionDataTask * _Nonnull task, id _Nullable responseObject) {
        if (success) {
            httpResult.body = responseObject;
            [blockself parseHttpResult: httpResult];
        }else{
            httpResult.returnCode = RESULT_UNKOWN_ERROR;
            httpResult.returnMsg = @"";
        }
        
        [blockself invokeCallbackAfterRequest];
    }];
    
    return httpResult;
}
    
-(NSDictionary *)dictionaryWithJsonString:(NSString *)jsonString
{
        if (jsonString == nil) {
            return nil;
        }
        
        NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
        NSError *err;
        NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData
                                                            options:NSJSONReadingMutableContainers
                                                              error:&err];
        if(err)
        {
            NSLog(@"json解析失败：%@",err);
            return nil;
        }
        return dic;
}

-(ZAKJHttpResult *) sendUpLoadRequest: (NSString *)targetUrl params: (NSDictionary *)params headers: (NSDictionary *)headers{
    __block typeof(self) blockself = self;
    
    [[ZAKJWebRequestManager shareInstance] uploadImages:self requestCallback:^(BOOL success, NSURLSessionDataTask * _Nonnull task, id _Nullable responseObject) {
  
        if (success) {
            httpResult.body = [self dictionaryWithJsonString:responseObject];
            if (![self isKindOfClass:[ZAKJIdCardRequest class]] &&![self isKindOfClass:[ZAKJBankCardRequest class]]) {
               [blockself parseHttpResult: httpResult];
            }
        }else{
            httpResult.returnCode = RESULT_UNKOWN_ERROR;
            httpResult.returnMsg = @"";
        }
        
        [blockself invokeCallbackAfterRequest];
    }];
    
    return httpResult;
}

-(ZAKJHttpResult *) sendUpLoadFileRequest: (NSString *)targetUrl params: (NSDictionary *)params headers: (NSDictionary *)headers{
    __block typeof(self) blockself = self;
    
    [[ZAKJWebRequestManager shareInstance] uploadFiles:self requestCallback:^(BOOL success, NSURLSessionDataTask * _Nonnull task, id _Nullable responseObject) {
        
        if (success) {
            httpResult.body = [self dictionaryWithJsonString:responseObject];
            [blockself parseHttpResult: httpResult];
        }else{
            httpResult.returnCode = RESULT_UNKOWN_ERROR;
            httpResult.returnMsg = @"";
        }
        
        [blockself invokeCallbackAfterRequest];
    }];
    
    return httpResult;
}

-(NSString *) buildTargetUrl: (NSString *) host{
    //do nothing as default
    return host;
}

-(void) buildHttpHeaders : (NSDictionary *) headers{
//    HQUserData *userData = [AppConfig getUserData];
    [headers setValue:[[ZAKJWebRequestManager shareInstance] getAppToken] forKey: @"token"];
}

-(void) buildHttpParams : (NSDictionary *) params{
    if (_pageIndex >= 0) {
        NSString *pagei = [NSString stringWithFormat:@"%ld", _pageIndex + 1L];
        NSString *pageS = [NSString stringWithFormat:@"%ld", (long)_pageSize];
        [params setValue: pagei forKey:@"pageIndex"];
        [params setValue:pageS forKey:@"pageSize"];
    }
}

-(void)invokeCallbackAfterRequest{
    if (resultTarget && resultSel) {
        [resultTarget performSelectorOnMainThread:resultSel withObject:self waitUntilDone:YES];
    }else if(_callback){
      ZAKJHttpResult *result = [self getHttpResult];
      _callback(result.returnCode, result.returnMsg, result.body, self.attachData);
    }
}

-(void)parseHttpResult: (ZAKJHttpResult *) result{
  if ([result.body isKindOfClass:[NSString class]]) {
    result.body = [self dictionaryWithJsonString:result.body];
  }
  
    if ([result.body isKindOfClass:[NSDictionary class]]) {
        NSDictionary *resultDic = result.body;
        NSString *returnCode = [resultDic valueForKey:@"errorCode"];
        NSString *returnMsg = [resultDic valueForKey:@"errorMsg"];
        
        NSString *pindex = [resultDic valueForKey:@"pageIndex"];
        NSString *ptotal = [resultDic valueForKey:@"pageTotal"];
//        
//        if (returnCode == nil || returnCode.length == 0 ||[returnCode isKindOfClass:[NSNull class]]) {
//            returnCode = @"0";
//        } else {
//            returnCode = @"1";
//        }
        
            BOOL success = [[resultDic objectForKey:@"success"] boolValue];
            if (success && [returnCode integerValue] != RESULT_FIRST_LOGIN) {
                returnCode = @"0";
            }
        
        if (pindex && ![pindex isKindOfClass:[NSNull class]]) {
            responsePageIndex = [pindex integerValue];
            responsePageIndex--;
        }else{
            responsePageIndex = _pageIndex;
        }
        
        if (ptotal && ![ptotal isKindOfClass:[NSNull class]]) {
            responsePageTotal = [ptotal integerValue];
        }
        
        httpResult.returnCode = [returnCode integerValue];
        httpResult.returnMsg = returnMsg;
        
        //NSLog(@"http return code = %ld", (long)httpResult.returnCode);
        
        httpResult.body = [resultDic valueForKey:@"value"];
        
        [self parseHttpResultBody:httpResult];
        
        id parserBody = httpResult.body;
        if ([parserBody isKindOfClass:[ZAKJBaseDataModel class]]) {
            ZAKJBaseDataModel *item = parserBody;
            item.pageIndex = responsePageIndex;
            item.pageTotal = responsePageTotal;
        }
        
       // NSLog(@"return code = %@, return Msg = %@", returnCode, returnMsg);
    }
}

-(void)parseHttpResultBody:(ZAKJHttpResult *)result{
     if ([result.body isKindOfClass:[NSDictionary class]]) {
         if (_responseBodyClass) {
             result.body = [_responseBodyClass ac_objectWithAny:result.body];
         }
     }
}

@end
