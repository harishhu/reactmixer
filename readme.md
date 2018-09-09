
# 什么是ReactMixer？
ReactMixer是基于Facebook ReactNative扩展的基础框架，这个框架的设计是目标：
 * 简化Native工程对ReactNative执行环境的集成
 * 定义并实现一套完整的ReactNative JS基础库和控件
 * 实现ReactNative小程序，每个Native工程只要集成ReactMixer，都可以安装，卸载，升级该小程序
 * 三端融合，也就是说，编写玩一次ReactNative代码，可以选择编译成ReactNative Jsbundle被Android或者IOS应用加载运行，也可以选择编译成React H5

 目前，前三个功能都已经完成，三端融合目前还在进一步开发中。
 
 开发文档如下：
 ReactNative小程序代码已经完成，目前文档还未更新

* [概述](./documentation/README.md)
* [开发环境介绍]()
   * [RN JS开发环境搭建 & 基础工程下载](./documentation/downdesc/reactnative.md)
   * [Native项目集成RN & SDK下载](./documentation/downdesc/native.md)
   <!-- * [开发调试App介绍 & 下载](./documentation/downdesc/rnbrowser.md) -->
* [RN官方接口文档](./documentation/apidesc/apidesc-fb.md)
* [框架RN架构设计介绍]()
   * [总体架构介绍](./documentation/apidesc/rn-archi/rn-archi.md)
   * [页面开发介绍](./documentation/apidesc/rn-archi/rn-archi-page.md)
* [框架RN基础组件接口介绍]()
   * [多国语言](./documentation/apidesc/rn-base/language.md)
   * [路由配置](./documentation/apidesc/rn-base/routeconfig.md)
   * [RN启动入口配置](./documentation/apidesc/rn-base/entryconfig.md)
   * [导航 - ZANavigator](./documentation/apidesc/rn-base/zanavigator.md)
   * [页面 - ZAComponent](./documentation/apidesc/rn-base/zacomponent.md)
   * [页面 - ZADatacontrol](./documentation/apidesc/rn-base/zadatacontrol.md)
   * [网络 - HttpRequestExecutor](./documentation/apidesc/rn-base/httprequestexecutor.md)
   * [网络 - RequestItemBase](./documentation/apidesc/rn-base/requestitembase.md)
   * [网络 - 自定义http请求](./documentation/apidesc/rn-base/httprequestitemdemo.md)
   * [网络 - http状态码定义](./documentation/apidesc/rn-base/httpresultcodes.md)
   * [App配置数据 - AppConfig](./documentation/apidesc/rn-base/appconfig.md)
   * [RN和原生数据通讯](./documentation/apidesc/rn-base/nativeinterface.md)
   * [其他](./documentation/apidesc/rn-base/others.md)

* [UI组件接口]()
   * [优化列表 - PureList](./documentation/apidesc/rn-widgets/purelist.md)
   * [表格 - TableView](./documentation/apidesc/rn-widgets/tableview.md)
   * [网格控件 - GridView](./documentation/apidesc/rn-widgets/gridview.md)
   * [Tab控件 - TabControl](./documentation/apidesc/rn-widgets/tabcontrol.md)
   * [图片按钮 - ImageButton](./documentation/apidesc/rn-widgets/imagebutton.md)
   * [灵活按钮 - FlexButton](./documentation/apidesc/rn-widgets/flexbutton.md)
   * [选项视图 - PickerView](./documentation/apidesc/rn-widgets/pickerview.md)
   * [单列选项对话框 - SinglePickerDialog](./documentation/apidesc/rn-widgets/singlepickerdialog.md)
   * [多列选项对话框 - MultiPickerDialog](./documentation/apidesc/rn-widgets/multipickerdialog.md)
   * [日期选择控件 - SADatePickerWidget](./documentation/apidesc/rn-widgets/sadatepickerwidget.md)
   * [基础对话框 - Dialog](./documentation/apidesc/rn-widgets/dialog.md)
   * [AlertDialog](./documentation/apidesc/rn-widgets/alertdialog.md)
   * [首页Banner - BannerView](./documentation/apidesc/rn-widgets/bannerview.md)
   * [滚动新闻控件 - AutoTextView](./documentation/apidesc/rn-widgets/autotextview.md)

* [原生SDK集成接口介绍](./documentation/apidesc/native/apidesc-native.md)
* [打包集成介绍](./documentation/apidesc/release/bundle.md)

