//
//  IYBWebRequestManager.m
//  iyunbao
//
//  Created by 胡付义 on 2017/3/23.
//  Copyright © 2017年 胡付义. All rights reserved.
//

#import "ZAKJWebRequestManager.h"
#import <AFNetworking.h>
#import "ZAKJRequestItemBase.h"
#import "ZAKJUploadImageRequestItem.h"
#import "ZAKJDeviceInfo.h"

@implementation ZAKJWebRequestManager{
    AFHTTPSessionManager * httpManager;
    NSOperationQueue *sendQueue;
    
    NSMutableArray *requestArray;
    
    NSString * httpHost;
    NSString * appToken;
}

static ZAKJWebRequestManager *instance = nil;
+(ZAKJWebRequestManager *)shareInstance{
    static dispatch_once_t token;
    dispatch_once(&token, ^(){
        instance = [[ZAKJWebRequestManager alloc] init];
    });
    
    return instance;
}

-(void)setHttpHost: (NSString *)host{
    httpHost = host;
}

-(void)setAppToken: (NSString *)token{
    appToken = token;
}

-(NSString *)getHttpHost{
    return httpHost;
}

-(NSString *)getAppToken{
    return appToken;
}

-(void)initNetWork{
    if (httpManager) {
        return;
    }
    
    httpHost = @"";
    appToken = @"";
    
    AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
    manager = [manager initWithSessionConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]];
    
    //NSString *targetUrl = [NSString stringWithFormat:@"%@%@", IYB_BASE_SERVER, IYB_PATH_USERLOGIN];
    AFHTTPResponseSerializer *response = [AFHTTPResponseSerializer serializer];
    //response.removesKeysWithNullValues = YES;
    manager.responseSerializer = response;
    
    manager.requestSerializer = [AFJSONRequestSerializer serializer];
    manager.requestSerializer.timeoutInterval = 10;
    manager.requestSerializer.cachePolicy = NSURLRequestUseProtocolCachePolicy;
    manager.requestSerializer.HTTPShouldHandleCookies = YES;
 
    ZAKJDeviceInfo *devices = [ZAKJDeviceInfo currentDeviceInfo];
    
    [manager.requestSerializer setValue:devices.v forHTTPHeaderField:@"v"];
    [manager.requestSerializer setValue:@"ios" forHTTPHeaderField:@"t"];
    [manager.requestSerializer setValue:devices.osVersion forHTTPHeaderField:@"osVersion"];
    [manager.requestSerializer setValue:devices.osDevice forHTTPHeaderField:@"osDevice"];
    [manager.requestSerializer setValue:devices.deviceId forHTTPHeaderField:@"deviceId"];
    [manager.requestSerializer setValue:@"application/json" forHTTPHeaderField:@"Accept"];
    [manager.requestSerializer setValue:@"application/json" forHTTPHeaderField:@"Content-type"];
  
    //manager.responseSerializer = [AFJSONResponseSerializer serializer];
    NSMutableSet *set = [NSMutableSet setWithSet:manager.responseSerializer.acceptableContentTypes];
    [set addObject:@"text/html"];
    [set addObject:@"application/json"];
    manager.responseSerializer.acceptableContentTypes = set;
    
    httpManager = manager;
    
    sendQueue = [[NSOperationQueue alloc] init];
    requestArray = [[NSMutableArray alloc] initWithCapacity: 20];
}

-(instancetype)init{
    if (!instance) {
        [self initNetWork];
    }
    return self;
}

-(void)addRequestItem: (ZAKJRequestItemBase *) item{
    @synchronized (self) {
        [requestArray addObject: item];
    }
}

-(void)removeRequestItem: (ZAKJRequestItemBase *) item{
    @synchronized (self) {
        ZAKJRequestItemBase *target = nil;
        
        for (ZAKJRequestItemBase* i in requestArray) {
            if (i.requestID == item.requestID) {
                target = i;
                break;
            }
        }
        
        if (target) {
            [requestArray removeObject:target];
        }
    }
}

-(ZAKJRequestItemBase *)findRequestItem: (NSInteger) taskid{
    for (ZAKJRequestItemBase* i in requestArray) {
        if (i.requestID == taskid) {
            return i;
        }
    }
    
    return nil;
}

-(void)sendRequestImpl: (ZAKJRequestItemBase *)item requestCallback: (void (^)(BOOL success, NSURLSessionDataTask * _Nonnull, id _Nullable)) callback{
    if (!item) {
        return;
    }
    
    if (item.headers) {
        for (NSString *key in [item.headers allKeys]) {
            NSString *value = [item.headers valueForKey:key];
          
            NSLog(@"http header = %@, value = %@", key, value);
//          ZAKJDeviceInfo *devices = [ZAKJDeviceInfo currentDeviceInfo];
//            NSLog(@"token = %@ deviceId=%@", value,devices.deviceId);
            //属性为空处理
            if ([value isEqual:[NSNull null]]) {
                 value=@"";
            }
            [httpManager.requestSerializer setValue:value forHTTPHeaderField:key];
        }
    }
    
    NSLog(@"http request url = %@", item.targetUrl);
    NSLog(@"http request params = %@", item.params);
    
//    if (item.params) {
//        for (NSString *s in [item.params allKeys]) {
//            NSLog(@"http param key: %@ value:%@", s, [item.params valueForKey:s]);
//        }
//    }
    
    NSURLSessionDataTask * task = [httpManager POST:item.targetUrl parameters:item.params progress:^(NSProgress * _Nonnull uploadProgress) {
        // 这里可以获取到目前的数据请求的进度
    } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        NSString *responseStr =[[NSString alloc] initWithData:responseObject encoding:NSUTF8StringEncoding];
      
        ZAKJRequestItemBase *item = [self findRequestItem: task.taskIdentifier];
        
        if (item) {
            NSLog(@"url = %@, http response data = %@", item.targetUrl, responseStr);
            if (callback) {
                callback(TRUE, task, responseStr);
            }
            [self removeRequestItem:item];
        }
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        ZAKJRequestItemBase *item = [self findRequestItem: task.taskIdentifier];
        
        if (item) {
            NSLog(@"url = %@, http response error = %@", item.targetUrl, error);
            if (callback) {
                callback(FALSE, task, error);
            }
            [self removeRequestItem:item];
        }
    }];
    
    item.requestID = task.taskIdentifier;
    [self addRequestItem:item];
}

//-(void)sendRequest:(NSString *)url parameters:(NSDictionary *)params attachData:(id)data callback:(requestCallback)callback{
//    RequestItemBase *item = [[RequestItemBase alloc] init];
//    item.targetUrl = url;
//    item.params = params;
//    item.attachData = data;
//    item.callback = callback;
//   
//    [self sendRequest:item];
//}

-(void)sendRequest:(ZAKJRequestItemBase *)requestItem requestCallback: (void (^)(BOOL success, NSURLSessionDataTask * _Nonnull, id _Nullable)) callback{
    [self sendRequestImpl:requestItem requestCallback: callback];
}

-(void)uploadImages:(ZAKJRequestItemBase *)requestItem requestCallback: (void (^)(BOOL success, NSURLSessionDataTask * _Nonnull, id _Nullable)) callback{
    
    [self uploadImagesResult:requestItem requestCallback: callback];
}

-(void)uploadFiles:(ZAKJRequestItemBase *)requestItem requestCallback: (void (^)(BOOL success, NSURLSessionDataTask * _Nonnull, id _Nullable)) callback{
    
    [self uploadFilesResult:requestItem requestCallback: callback];
}

-(void)uploadImagesResult: (ZAKJRequestItemBase *)item requestCallback: (void (^)(BOOL success, NSURLSessionDataTask * _Nonnull, id _Nullable)) callback{
    if (!item) {
        return;
    }
//    [httpManager.requestSerializer setValue:@"multipart/form-data" forHTTPHeaderField:@"Content-type"];
    
    if (item.headers) {
        for (NSString *key in [item.headers allKeys]) {
            NSString *value = [item.headers valueForKey:key];
            
            NSLog(@"token = %@", value);
            
            [httpManager.requestSerializer setValue:value forHTTPHeaderField:key];
        }
    }

    NSURLSessionDataTask * task = [httpManager POST:item.targetUrl parameters:nil constructingBodyWithBlock:^(id<AFMultipartFormData>  _Nonnull formData) {
        
        
        NSArray *imagesArray = [item.params objectForKey:@"file"];
        for (int i = 0; i < imagesArray.count; i++) {
            NSData *imageData = imagesArray[i];
            
            if ([item isKindOfClass:[ZAKJUploadImageRequestItem class]]) {
                ZAKJUploadImageRequestItem *uploadItem = (ZAKJUploadImageRequestItem *)item;
                
                [formData appendPartWithFileData:imageData name:uploadItem.pathName fileName:[NSString stringWithFormat:@"img%d.jpg", i+1]  mimeType:@"image/jpeg"];
            }else if([item isKindOfClass:[ZAKJIdCardRequest class]]) {
                ZAKJIdCardRequest *uploadItem = (ZAKJIdCardRequest *)item;
                
                [formData appendPartWithFileData:imageData name:uploadItem.pathName fileName:[NSString stringWithFormat:@"img%d.jpg", i+1]  mimeType:@"image/jpeg"];
            }else if([item isKindOfClass:[ZAKJBankCardRequest class]]) {
                ZAKJBankCardRequest *uploadItem = (ZAKJBankCardRequest *)item;
                
                [formData appendPartWithFileData:imageData name:uploadItem.pathName fileName:[NSString stringWithFormat:@"img%d.jpg", i+1]  mimeType:@"image/jpeg"];
            }
            
        }
        
    } progress:^(NSProgress * _Nonnull uploadProgress) {
        
    } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        NSString *responseStr =[[NSString alloc] initWithData:responseObject encoding:NSUTF8StringEncoding];
        ZAKJRequestItemBase *item = [self findRequestItem: task.taskIdentifier];
        
        if (item) {
            if (callback) {
                callback(TRUE, task, responseStr);
            }
            [self removeRequestItem:item];
        }
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        ZAKJRequestItemBase *item = [self findRequestItem: task.taskIdentifier];
        
        if (item) {
            if (callback) {
                callback(FALSE, task, error);
            }
            [self removeRequestItem:item];
        }
    }];
    
    item.requestID = task.taskIdentifier;
    [self addRequestItem:item];
}

-(void)uploadFilesResult: (ZAKJRequestItemBase *)item requestCallback: (void (^)(BOOL success, NSURLSessionDataTask * _Nonnull, id _Nullable)) callback{
    if (!item) {
        return;
    }
    
    if (item.headers) {
        for (NSString *key in [item.headers allKeys]) {
            NSString *value = [item.headers valueForKey:key];
            
            NSLog(@"token = %@", value);
            
            [httpManager.requestSerializer setValue:value forHTTPHeaderField:key];
        }
    }
    
    NSURLSessionDataTask * task = [httpManager POST:item.targetUrl parameters:nil constructingBodyWithBlock:^(id<AFMultipartFormData>  _Nonnull formData) {
        
        NSArray *imagesArray = [item.params objectForKey:@"file"];
        for (int i = 0; i < imagesArray.count; i++) {
            NSData *imageData = imagesArray[i];
            if ([item isKindOfClass:[ZAKJUploadRecordRequestItem class]]) {
                [formData appendPartWithFileData:imageData name:@"files" fileName:[NSString stringWithFormat:@"record%d.mp3", i+1]  mimeType:@"audio/mp3"];
            } else {
                [formData appendPartWithFileData:imageData name:@"files" fileName:[NSString stringWithFormat:@"file%d.text", i+1]  mimeType:@"image/text"];
            }
        }
        
    } progress:^(NSProgress * _Nonnull uploadProgress) {
        
    } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        NSString *responseStr =[[NSString alloc] initWithData:responseObject encoding:NSUTF8StringEncoding];
        ZAKJRequestItemBase *item = [self findRequestItem: task.taskIdentifier];
        
        if (item) {
            if (callback) {
                callback(TRUE, task, responseStr);
            }
            [self removeRequestItem:item];
        }
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        ZAKJRequestItemBase *item = [self findRequestItem: task.taskIdentifier];
        
        if (item) {
            if (callback) {
                callback(FALSE, task, error);
            }
            [self removeRequestItem:item];
        }
    }];
    
    item.requestID = task.taskIdentifier;
    [self addRequestItem:item];
}

@end
