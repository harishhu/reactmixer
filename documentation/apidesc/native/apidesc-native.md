# 1. 原生SDK集成接口介绍
<!-- TOC -->

- [1. 原生SDK集成接口介绍](#1-原生sdk集成接口介绍)
    - [1.1. 概述](#11-概述)
    - [1.2. Android SDK集成接口](#12-android-sdk集成接口)
    - [1.3. IOS SDK集成接口](#13-ios-sdk集成接口)

<!-- /TOC -->
## 1.1. 概述
不管Android还是IOS SDK，都会向要集成的项目提供如下基础能力
   * 指定模块入口来启动RN
   * 设置要连接的RN server地址
   * 设置开发模式
   * 配置RN环境运行所需的各种初始配置数据
   * RN事件处理回调，主要处理RN跟原生之间的数据通讯

## 1.2. Android SDK集成接口
Android SDK将上述功能封装到
```java
ZAReactNative
```
ZAReactNative函数介绍：

函数 | 描述
:-|:-
startRNActivity(Context c, String module)|根据module名启动RN
setRNServer|设置RN server的IP地址
setDebugMode(boolean debug)|设置开发模式
setApplicationContext(Context c)|设置application context
Context getApplicationContext()|获取application context
RNAppConfig getRNAppConfig()|获取RN环境的数据配置对象，用于配置RN环境运行所需的初始数据
setReactNativeEventListener(IZAReactNativeEventListener lis)|设置RN事件处理回调

参考代码：
```java
 private void initReactNative() {
        zaReactNative  = ZAReactNative.instance;
        zaReactNative.setApplicationContext(applicationContext);

        //配置RN运行所需的配置数据，这里只加一个userToken
        RNAppConfig appconfig = ZAReactNative.instance.getRNAppConfig();
        appconfig.putConfig("userToken", "rnbrowser-android");
        //设置事件处理回调
        zaReactNative.setReactNativeEventListener(new ZAReactNative.IZAReactNativeEventListener() {
            /**
            * 处理rn command命令
            */
            @Override
            public boolean handleEventFromJS(String eventCallbackID, String cmdid, String cmdParams) {
                if (cmdid.equals(ACTION_CUSTOMER)) {
//                    cutomer_eventId = eventCallbackID;
//                    Intent i = new Intent(AppConstant.KEY_CUSTOMER_PICK_ACTION);
//                    i.setPackage(applicationContext.getPackageName());
//                    zaReactNative.getCurrentReactActivity().startActivityForResult(i, RESULT_CUSTOMER_PICK);

                    return true;
                } else if (cmdid.equals(ACTION_CALLUP)) {
                    String moblie = cmdParams;

                    if (null != moblie && !"".equals(moblie)) {
                        Intent intent1 = new Intent(Intent.ACTION_DIAL);
                        intent1.setData(Uri.parse("tel:" + moblie));
                        zaReactNative.getCurrentReactActivity().startActivity(intent1);
                    }

                    return true;
                } else if (cmdid.equals(ACTION_SHAREAPPCONTENT)) {

                    try {
                        JSONObject jsonObject = new JSONObject(cmdParams);
                        String title = jsonObject.optString("title");
                        String body = jsonObject.optString("body");
                        String url = jsonObject.optString("url");
                        String imageurl = jsonObject.optString("imageurl");

//                        LocalShareData data = new LocalShareData();
//                        data.title = title;
//                        data.desc = body;
//                        data.url = url;
//                        data.imageUrl = imageurl;
//                        data.typeSet = null;

//                        ShareDialog shareDialog = new ShareDialog(zaReactNative.getCurrentReactActivity(), data);
//                        shareDialog.show();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                    return true;
                }

                return false;
            }

            @Override
            public boolean onActivityResult(int requestCode, int resultCode, Intent data) {
                if (resultCode != Activity.RESULT_OK)
                    return false;

                switch (requestCode) {
                    case RESULT_CUSTOMER_PICK:{
//                        Customer info = (Customer) data.getSerializableExtra(AppConstant.KEY_PICK_RETURN);
//                        handlePickCustomer(info);
                        return true;
                    }

                }

                return false;
            }
        });
    }
```

## 1.3. IOS SDK集成接口
同样的，IOS将上述功能封装到
```java
ZAKJReactNative
```
ZAKJReactNative函数介绍：

函数 | 描述
:-|:-
startModule|根据module名启动RN
setJSLocationHost|设置rn server的IP地址
-(void)setEventHandlerDelegate: (id<ZAKJReactNativeProtocol>)handler|设置事件处理回调

参考代码：
```java
//设置开发模式
ZAKJReactNative.instance.isDebugMode = TRUE;
//设置rn server 地址
[ZAKJReactNative.instance setJSLocationHost:rnserver];
//配置RN运行所需的配置数据，这里只加一个userToken
[[ZAKJReactNative.instance getRNAppConfig] putConfig:@"rnbrowser - ios" forKey:@"userToken"];
    
NSLog(@"open rnserver = %@", rnserver);
//根据module name启动rn，ZAKJReactNativeViewController是辅助类，封装了startModule的调用
ZAKJReactNativeViewController *vc = [[ZAKJReactNativeViewController alloc]init];
vc.modulename = moduleEntry;
[self.navigationController pushViewController:vc animated:YES];
```
