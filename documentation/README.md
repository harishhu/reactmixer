<br/>
<!-- TOC -->

- [1. React Mixer移动基础框架 - 概述](#1-react-mixer移动基础框架---概述)
    - [1.1. 什么是ReactMixer基础框架？](#11-什么是reactmixer基础框架)
    - [1.2. 基础框架包含什么？](#12-基础框架包含什么)
    - [1.3. 为什么要包含ReactNative基础库?](#13-为什么要包含reactnative基础库)
    - [1.4. 架构介绍](#14-架构介绍)

<!-- /TOC -->
# 1. React Mixer移动基础框架 - 概述
## 1.1. 什么是ReactMixer基础框架？
ReactMixer是基于Facebook ReactNative扩展的基础框架，这个框架的设计是目标：
 * 简化Native工程对ReactNative执行环境的集成
 * 定义并实现一套完整的ReactNative JS基础库和控件
 * 实现ReactNative小程序，每个Native工程只要集成ReactMixer，都可以安装，卸载，升级该小程序
 * 三端融合，也就是说，编写玩一次ReactNative代码，可以选择编译成ReactNative Jsbundle被Android或者IOS应用加载运行，也可以选择编译成React H5

 目前，前三个功能都已经完成，三端融合目前还在开发中

## 1.2. 基础框架包含什么？
目前主要包括：
* `Android和IOS的ReactNative基础库`
* `原生工程运行所需的ReactNative基础实现和RCT控件`
* `ReactNative JS node基础模块`
* 原生的基础架构代码和基础控件
* 集成第三方的SDK，主要包括支付，推送，分享等

## 1.3. 为什么要包含ReactNative基础库?
为什么不直接使用Facebook所提供的ReactNative基础库呢？我们将ReactNative基础库集成到移动基础框架，主要是基于如下几点考虑的：
* Facebook ReactNative基础库相对来说集成不方便，特别是对已有项目的改造
* 便于对ReactNative基础库做自定义修改

## 1.4. 架构介绍
下面是基础框架的架构设计图
<br/>
<br/>
![](res/framework-design.png)

简单说明：
* 基于基础React JS module实现并打包ReactNative JS bundle
* 任何集成了App基础SDK的App都可以加载运行ReactNative JS bundle

具体的集成细节和开发文档详见相关章节
