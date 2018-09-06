# 1. 打包集成介绍
<!-- TOC -->

- [1. 打包集成介绍](#1-打包集成介绍)
    - [1.1. Android](#11-android)
    - [1.2. IOS](#12-ios)

<!-- /TOC -->
## 1.1. Android
先在rn根目录执行如下脚本：
```javascript
//build_android_jsbundle.sh
mkdir -p build/android/reactnative
react-native bundle --entry-file index.js --platform android --dev false --bundle-output build/android/reactnative/react.jsbundle --assets-dest build/android/reactnative/res

```
脚本执行结束后
```javascript
cd build/android
```
接着将android目录下的reactnative文件夹拷贝到目标Android工程的assert目录下即可
然后配置debug mode为false
```java
public class MainApplication extends ZAReactNativeApplication {
    @Override
    public void onCreate() {
        //注意，必须在super.onCreate之前设置
        ZAReactNative.instance.setDebugMode(false);

        super.onCreate();
    }

    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);

        MultiDex.install(this);
    }
}
```
接着编译打包即可
## 1.2. IOS
同样的，在rn根目录执行如下脚本
```javascript
//build_ios_jsbundle.sh
mkdir -p build/ios/reactnative
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output build/ios/reactnative/react.jsbundle --assets-dest build/ios/reactnative
```
脚本执行结束后
```javascript
cd build/ios
```
接着将ios目录下的reactnative文件夹，打包进mainbundle即可

然后配置如下代码
```java
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
#ifdef DEBUG
    [ZAKJReactNative.instance initReactNativeEnv: TRUE];
#else
    [ZAKJReactNative.instance initReactNativeEnv: FALSE];
#endif
    //...
    return YES;
}
```
接着编译打包即可