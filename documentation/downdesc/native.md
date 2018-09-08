<!-- TOC -->

- [1. Native工程集成RN框架SDK](#1-native工程集成rn框架sdk)
    - [1.1. SDK下载](#11-sdk下载)
    - [1.2. Android工程集成介绍](#12-android工程集成介绍)
    - [1.3. IOS工程集成介绍](#13-ios工程集成介绍)

<!-- /TOC -->

# 1. Native工程集成RN框架SDK
## 1.1. SDK下载
点击 [下载](./../../bin/react-mixer-app-sdk.zip) SDK库文件，并解压缩

## 1.2. Android工程集成介绍
在工程的build.gradle中配置本地maven库，url地址即为上面下载的SDK目录
```javascript
  allprojects {
  repositories {
      mavenLocal()
      maven {
          url 'SDK库文件目录/android'
      }
  }
}
```
接着添加工程依赖：
```javascript
    api ("com.facebook.react:react-native:0.55.3") {
        exclude group: 'com.android.support', module: 'appcompat-v7'
    }
    api "hu.reactmixer.tech:rnbaselib:1.0.4"
    implementation 'com.squareup.okhttp:okhttp:2.7.5'
    implementation 'com.android.support:multidex:1.0.2'
```
添加sdk运行所需权限：
```javascript
<uses-permission android:name="android.permission.SEND_SMS" />
    <!-- <uses-permission android:name="android.permission.CALL_PRIVILEGED" />-->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
    <uses-permission android:name="android.permission.READ_CONTACTS" />
    <uses-permission android:name="android.permission.CAMERA" />

    <!-- 这个权限用于进行网络定位-->
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

    <!-- SD卡读取权限，用户写入离线定位数据-->
    <uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />

    <!-- 阿里云推送相关权限 -->
    <uses-permission android:name="android.permission.WRITE_SETTINGS" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.RESTART_PACKAGES" />
    <uses-permission android:name="android.permission.GET_TASKS" />
    <uses-permission android:name="android.permission.GET_ACCOUNTS" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.REORDER_TASKS" />

    <uses-permission android:name="android.permission.CHANGE_CONFIGURATION" />
```

## 1.3. IOS工程集成介绍
在工程 build settings -> framework search paths中添加SDK路径：
```javascript
  SDK库文件目录/ios
```
接着在general -> link frameworks and libraries中添加
```javascript
  SDK库文件目录/ios
```
目录下的rnbaselib.framework
<br/>
然后在Pods的Podfile中添加依赖库：
```javascript
pod 'AFNetworking', '~> 3.0’
pod 'Masonry', '~> 0.6.3'
pod 'SDWebImage', '~> 3.7.3'
```
