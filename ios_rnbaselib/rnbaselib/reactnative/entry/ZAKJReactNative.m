//
//  ReactNativeBaseViewController.m
//  saadtw
//
//  Created by 胡付义 on 2018/1/2.
//  Copyright © 2018年 Facebook. All rights reserved.
//
#import "ZAKJRCTInterface.h"
#import "ZAKJReactNative.h"
#import "ZAKJRNHttpRequestItem.h"
#import "ZAKJRNCommands.h"
#import <MessageUI/MFMailComposeViewController.h>
#import "ZAKJRNLocalStorage.h"
#import "ZAKJUtils.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "ZAKJUtils.h"
#import "ZAKJRNAppConfig.h"
#import "ZAKJRNAppletManager.h"

@interface ZAKJReactNative()<MFMailComposeViewControllerDelegate>
@property (nonatomic, strong) NSString *cmdCallbackID;
@end

@implementation ZAKJReactNative{
    UIViewController *attachVC;
    
    ZAKJRCTInterface *attachRCT;
    ZAKJRNAppConfig *appconfig;
    ZAKJRNAppletManager *rnAppletMgr;
    
    id<ZAKJReactNativeProtocol> eventDelegate;
    RCTBridge *bridge;
}

static ZAKJReactNative *instance = nil;
+(ZAKJReactNative *)instance
{
    static dispatch_once_t token;
    dispatch_once(&token, ^{
        instance = [[[self class] alloc] init];
        instance.isDebugMode = FALSE;
    });
    return instance;
}

-(instancetype)init{
    self = [super init];
    if(self){
        appconfig = [[ZAKJRNAppConfig alloc] init];
        rnAppletMgr = [[ZAKJRNAppletManager alloc] init];
    }
    
    return self;
}

-(ZAKJRNAppConfig *)getRNAppConfig{
    return appconfig;
}

-(ZAKJRNAppletManager *)getRNAppletManager{
    return rnAppletMgr;
}

-(UINavigationController *)getAttachNavigator{
    if (attachVC) {
        return attachVC.navigationController;
    }
    
    return nil;
}

-(void)setAttachVC: (UIViewController *)vc{
    attachVC = vc;
}

-(void)setJSLocationHost:(NSString *)host{
//    if([ZAKJUtils isEmptyString:host]){
//        return;
//    }
    if (host == nil || host.length == 0) {
        host = nil;
    }
    
    [[NSUserDefaults standardUserDefaults] setObject:host forKey:ZAKJ_JSLOCATION_KEY];
    [[NSUserDefaults standardUserDefaults] synchronize];
}

-(void)initRNBridge:(NSURL *)jsCodeLocation{
    if (!bridge) {
        if (jsCodeLocation == nil) {
            NSString *rootdir = [rnAppletMgr composeRNRootDir];
            NSString *path = [NSString stringWithFormat:@"%@/react.jsbundle", rootdir];
            jsCodeLocation = [NSURL fileURLWithPath:path];
        }
        
        bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation
                                       moduleProvider:nil
                                        launchOptions:nil];
    }
}

-(void)initReactNativeEnv: (BOOL) debug{
    self.isDebugMode = debug;
    
    if (!debug) {
        [rnAppletMgr installPrebuiltApplets];
        
        [self initRNBridge: nil];
        [NSThread sleepForTimeInterval:1.0f];
    }
}

-(instancetype)startModule: (NSString *)modulename inSuper:(UIViewController *)superViewController launchData:(NSDictionary *)launchData{
    if (modulename == nil || modulename.length == 0) {
        modulename = @"index";
    }
    
    NSURL *jsCodeLocation;
    
    if (self.isDebugMode) {
        jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    }else{
        //  NSString *dicFilePath = [[NSBundle mainBundle].bundleURL
        //                           URLByAppendingPathComponent:@"react.jsbundle"
        //                           isDirectory:NO].path;
        //  NSLog(@"dic file path = %@", dicFilePath);
//        jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"reactnative/react" withExtension:@"jsbundle"];
        NSString *rootdir = [rnAppletMgr composeRNRootDir];
        NSString *path = [NSString stringWithFormat:@"%@/react.jsbundle", rootdir];
        jsCodeLocation = [NSURL fileURLWithPath:path];
    }
    
    NSLog(@"js code location = %@", jsCodeLocation);
    
    [self initRNBridge:jsCodeLocation];

    NSMutableDictionary *dic = [NSMutableDictionary dictionary];
    if (launchData) {
        NSString *jsonDic = [ZAKJUtils convertToJsonData:launchData];
        [dic setValue:jsonDic forKey:@"launchData"];
    }
    
    [appconfig putConfig:modulename forKey:@"appletname"];
    [appconfig putConfig:@"default" forKey:@"appletpagerouter"];

    NSString *configdata = [ZAKJUtils convertToJsonData:[appconfig getAllConfigs]];
    [dic setValue:configdata forKey:@"appConfig"];
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"index" initialProperties:dic];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
    [[UIApplication sharedApplication]setStatusBarStyle:UIStatusBarStyleLightContent];
    // self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    //UIViewController *rootViewController = [UIViewController new];
    [self setAttachVC:superViewController];
    
    NSLog(@"ZAKJReactNative start module ,rct root view = %@, owner vc = %@", rootView, superViewController);
    
    superViewController.view = rootView;
    //[UIApplication sharedApplication].keyWindow.rootViewController = rootViewController;
    
    return self;
}

-(void)setAttachedRCTInterface:(ZAKJRCTInterface *)interf{
    attachRCT = interf;
}

-(void)invokeCallback: (NSString *)callbackid params:(id)data{
    [attachRCT invokeCallback:callbackid Parameters:data];
}

-(void)setEventHandlerDelegate: (id<ZAKJReactNativeProtocol>)handler{
    eventDelegate = handler;
}

-(BOOL)handleEventFromJS:(NSString *)cmdCallbackID commandData:(NSString *)cmdObj{
    if ([ZAKJUtils isEmptyString:cmdObj]) {
        return true;
    }
    
    self.cmdCallbackID = cmdCallbackID;
    NSDictionary *cmdDic = [ZAKJUtils dictionaryWithJsonString:cmdObj];
    NSString * cmdID = [cmdDic valueForKey:@"id"];
    NSString * params = [cmdDic valueForKey:@"params"];
    
    if (eventDelegate && [eventDelegate handleReactNativeEvent:cmdID cmdParams:params cmdCallbackID:cmdCallbackID]) {
        return true;
    }
    
    NSLog(@"handle event from js, cmd id = %@, params = %@", cmdID, params);
    
    if([cmdID isEqualToString: ZAKJ_CMD_FINISHCURRENT]){
        [self handleBack];
    } else if([cmdID isEqualToString: ZAKJ_CMD_HTTPREQUEST]){
        NSString * httpurl = [params valueForKey:@"url"];
        NSDictionary * httpbody = [params valueForKey:@"body"];
        NSDictionary * headers = [params valueForKey:@"headers"];
        
        ZAKJRNHttpRequestItem *item = [[ZAKJRNHttpRequestItem alloc] init];
        
        item.callback = ^(NSInteger returnCode, NSString * returnMsg, id body, id attachData){
            NSLog(@"react native ios - http request result = %@", returnMsg);
            NSDictionary * bodyDic = [ZAKJUtils dictionaryWithJsonString:body];
            returnCode = [bodyDic[@"code"] integerValue];
            
//            if (returnCode == RESULT_MORE_LOGIN || returnCode == RESULT_INVALID_TOKEN) {
//                [HQCOM comAfreshLoginWith:bodyDic[@"message"]];
//            }else{
                [self invokeCallback:attachData params:body];
//            }
        };
        
        item.targetUrl = httpurl;
        item.bodyDic = httpbody;
        item.attachData = cmdCallbackID;
        item.httpHeaders = headers;
        
        [item run];
    }else if ([cmdID isEqualToString: ZAKJ_CMD_CALLUP]){
        NSMutableString* str=[[NSMutableString alloc] initWithFormat:@"tel:%@",params];
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:str] options:@{} completionHandler:nil];
    }else if ([cmdID isEqualToString: ZAKJ_CMD_MAIL]){
        if ([params isKindOfClass:[NSDictionary class]]) {
            
            NSDictionary *paramsDic = [NSDictionary dictionaryWithDictionary:[cmdDic valueForKey:@"params"]];
            if ([MFMailComposeViewController canSendMail]) {
                [self displayMailPickerTitle:paramsDic[@"title"] Body:paramsDic[@"body"]]; //APP内编辑邮件
            }
            else {
                [self launchMailAppTitle:paramsDic[@"title"] Body:paramsDic[@"body"]];    // 打开Mail客户端
            }
        }
    }else if ([cmdID isEqualToString: ZAKJ_CMD_LOCALSTORAGE]){
        NSString * type = [params valueForKey:@"type"];
        NSString * key = [params valueForKey:@"key"];
        id data = [params valueForKey:@"data"];
        
        [ZAKJRNLocalStorage handleEvent:type Key:key Data:data callbackid:cmdCallbackID responser:self];
    }else if ([cmdID isEqualToString: ZAKJ_CMD_REQUESTAPPCONFIG]){
        NSString *jsonDic = [ZAKJUtils convertToJsonData:[appconfig getAllConfigs]];
        [self invokeCallback: cmdCallbackID params: jsonDic];
    }else if ([cmdID isEqualToString: ZAKJ_CMD_REQUESTAPPLETSINFO]){
        NSArray * appletlist = [rnAppletMgr getInstalledApplets];
        NSString *jsonDic = [ZAKJUtils convertToJsonData:appletlist];
        NSLog(@"applets info = %@", jsonDic);
        [self invokeCallback: cmdCallbackID params: jsonDic];
    }else if ([cmdID isEqualToString: ZAKJ_CMD_REQUESTMODULECODE]){
        NSString * appletname = [params valueForKey:@"modulename"];
        
        NSString *jsonDic = nil;
        NSArray * appletlist = [rnAppletMgr getInstalledApplets];
        
        for (NSDictionary *info in appletlist) {
            NSString *name = [info valueForKey:@"name"];
            if ([name isEqualToString:appletname]) {
                NSString *path = [info valueForKey:@"path"];
                path = [path stringByAppendingPathComponent:@"applet.jsbundle"];
                
                NSData *data = [[NSFileManager defaultManager] contentsAtPath:path];
                jsonDic = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                break;
            }
        }
        
        //NSLog(@"json dic = %@", jsonDic);
        
        if (jsonDic) {
            [self invokeCallback: cmdCallbackID params: jsonDic];
        }
    }
    
    return true;
}

-(void)getJobData:(NSNotification *)info{
  NSDictionary *body = [info userInfo];
  [self invokeCallback:self.cmdCallbackID params:body];
  //移除通知
  [[NSNotificationCenter defaultCenter]removeObserver:self name:info.name object:nil];
}

-(void)handleBack{
    NSLog(@"ZAKJReactNative handle back = %@", attachVC);
    
    if(attachVC){
      [attachVC.navigationController popViewControllerAnimated:NO];
//      [UIApplication sharedApplication].keyWindow.rootViewController = backupVC;
    }
}

#pragma mark  - 邮件发送
-(void)displayMailPickerTitle:(NSString *)title Body:(NSString *)body{
  MFMailComposeViewController *mailPicker = [[MFMailComposeViewController alloc] init];
  mailPicker.navigationBar.titleTextAttributes = @{NSForegroundColorAttributeName:[UIColor blackColor],NSFontAttributeName:[UIFont systemFontOfSize:17]};
  //    [[UINavigationBar appearance] setTitleTextAttributes:@{NSForegroundColorAttributeName:[UIColor whiteColor]}];
  mailPicker.mailComposeDelegate = self;
  //设置主题
  [mailPicker setSubject: title];
  //添加收件人
  //    NSArray *toRecipients = [NSArray arrayWithObject: @"wanghan@zhongan.io"];
//  NSArray *toRecipients = [NSArray arrayWithObject: @"wanghan@zhongan.io"];
//  [mailPicker setToRecipients: toRecipients];
  //    //添加抄送
  //    NSArray *ccRecipients = [NSArray arrayWithObjects:@"second@example.com", @"third@example.com", nil];
  //    [mailPicker setCcRecipients:ccRecipients];
  //    //添加密送
  //    NSArray *bccRecipients = [NSArray arrayWithObjects:@"fourth@example.com", nil];
  //    [mailPicker setBccRecipients:bccRecipients];
  
  //添加一个pdf附件
  //    NSString *file = [self fullBundlePathFromRelativePath:@"abc.pdf"];
  //    NSData *pdf = [NSData dataWithContentsOfFile:file];
  
  
  //    NSString *path = [[NSBundle mainBundle] pathForResource:@"101521189404000001"ofType:@"pdf"];
  //    NSData *myData = [NSData dataWithContentsOfFile:path];
  //    [mailPicker addAttachmentData:myData mimeType:@"" fileName:@"101521189404000001.pdf"];
  
  //    NSData *pdf = [NSData dataWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"101521189404000001" ofType:@"pdf"]];
  //    [mailPicker addAttachmentData:pdf mimeType: @"" fileName: @"10152118940400000.pdf"];
  
//  NSData *pdf = [NSData dataWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"101521189404000001" ofType:@"pdf"]];
//  [mailPicker addAttachmentData:pdf mimeType: @"" fileName: @"abc.pdf"];
  
  
  NSString *emailBody = body;
  [mailPicker setMessageBody:emailBody isHTML:NO];
  [attachVC presentViewController:mailPicker animated:YES completion:nil];
}

-(void)launchMailAppTitle:(NSString *)title Body:(NSString *)body
{
  NSMutableString *mailUrl = [[NSMutableString alloc]init];
  //添加收件人
//  NSArray *toRecipients = [NSArray arrayWithObject: @"wanghan@zhongan.io"];
//  [mailUrl appendFormat:@"mailto:%@", [toRecipients componentsJoinedByString:@","]];
  //    //添加抄送
  //    NSArray *ccRecipients = [NSArray arrayWithObjects:@"second@example.com", @"third@example.com", nil];
  //    [mailUrl appendFormat:@"?cc=%@", [ccRecipients componentsJoinedByString:@","]];
  //    //添加密送
  //    NSArray *bccRecipients = [NSArray arrayWithObjects:@"fourth@example.com", nil];
  //    [mailUrl appendFormat:@"&bcc=%@", [bccRecipients componentsJoinedByString:@","]];
  //添加主题
  [mailUrl appendString:[NSString stringWithFormat:@"&subject=%@",title]];
  //添加邮件内容
  [mailUrl appendString:[NSString stringWithFormat:@"&body=%@",body]];
  NSString* email = [mailUrl stringByAddingPercentEscapesUsingEncoding: NSUTF8StringEncoding];
  [[UIApplication sharedApplication] openURL: [NSURL URLWithString:email]];
}

#pragma mark - 实现 MFMailComposeViewControllerDelegate
- (void)mailComposeController:(MFMailComposeViewController *)controller didFinishWithResult:(MFMailComposeResult)result error:(NSError *)error
{
  //关闭邮件发送窗口
  [attachVC dismissViewControllerAnimated:YES completion:nil];
  NSString *msg;
  switch (result) {     // result是枚举类型
    case MFMailComposeResultCancelled:
      msg = @"用户取消编辑邮件";
      break;
    case MFMailComposeResultSaved:
      msg = @"用户成功保存邮件";
      break;
    case MFMailComposeResultSent:
      msg = @"用户点击发送，将邮件放到队列中，还没发送";
      break;
    case MFMailComposeResultFailed:
      msg = @"用户试图保存或者发送邮件失败";
      break;
    default:
      msg = @"";
      break;
  }
  NSLog(@"%@",msg);
  //    [self alertWithMessage:msg];
}

#pragma mark - 分享结果
- (void)cancelShare{
  
  //[attachVC showToast:@"取消分享"];
}

-(void)shareCallbackMessage:(NSString *)text{
  
  //[attachVC showToast:text];
}

@end
