# 什么是ReactMixer？
ReactMixer是基于Facebook ReactNative扩展的基础框架，这个框架的设计是目标：
 * 简化Native工程对ReactNative执行环境的集成
 * 定义并实现一套完整的ReactNative JS基础库和控件
 * 实现ReactNative小程序，每个Native工程只要集成ReactMixer，都可以安装，卸载，升级该小程序
 * 三端融合，也就是说，编写玩一次ReactNative代码，可以选择编译成ReactNative Jsbundle被Android或者IOS应用加载运行，也可以选择编译成React H5

 目前，前三个功能都已经完成，三端融合目前还在进一步开发中。
 
 开发文档如下：
 ReactNative小程序代码已经完成，目前文档还未更新

* [概述](./README.md)
* [开发环境介绍]()
   * [RN JS开发环境搭建 & Demo工程下载](./downdesc/reactnative.md)
   * [Native项目集成RN & SDK下载](./downdesc/native.md)
   <!-- * [开发调试App介绍 & 下载](./downdesc/rnbrowser.md) -->
* [RN官方接口文档](./apidesc/apidesc-fb.md)
* [框架中RN架构设计介绍]()
   * [总体架构介绍](./apidesc/rn-archi/rn-archi.md)
   * [页面开发介绍](./apidesc/rn-archi/rn-archi-page.md)
* [框架中RN基础组件接口介绍]()
   * [多国语言](./apidesc/rn-base/language.md)
   * [路由配置](./apidesc/rn-base/routeconfig.md)
   * [RN启动入口配置](./apidesc/rn-base/entryconfig.md)
   * [导航 - ZANavigator](./apidesc/rn-base/zanavigator.md)
   * [页面 - ZAComponent](./apidesc/rn-base/zacomponent.md)
   * [页面 - ZADatacontrol](./apidesc/rn-base/zadatacontrol.md)
   * [网络 - HttpRequestExecutor](./apidesc/rn-base/httprequestexecutor.md)
   * [网络 - RequestItemBase](./apidesc/rn-base/requestitembase.md)
   * [网络 - 自定义http请求](./apidesc/rn-base/httprequestitemdemo.md)
   * [网络 - http状态码定义](./apidesc/rn-base/httpresultcodes.md)
   * [App配置数据 - AppConfig](./apidesc/rn-base/appconfig.md)
   * [RN和原生数据通讯](./apidesc/rn-base/nativeinterface.md)
   * [其他](./apidesc/rn-base/others.md)

* [UI组件接口]()
   * [优化列表 - PureList](./apidesc/rn-widgets/purelist.md)
   * [表格 - TableView](./apidesc/rn-widgets/tableview.md)
   * [网格控件 - GridView](./apidesc/rn-widgets/gridview.md)
   * [Tab控件 - TabControl](./apidesc/rn-widgets/tabcontrol.md)
   * [图片按钮 - ImageButton](./apidesc/rn-widgets/imagebutton.md)
   * [灵活按钮 - FlexButton](./apidesc/rn-widgets/flexbutton.md)
   * [选项视图 - PickerView](./apidesc/rn-widgets/pickerview.md)
   * [单列选项对话框 - SinglePickerDialog](./apidesc/rn-widgets/singlepickerdialog.md)
   * [多列选项对话框 - MultiPickerDialog](./apidesc/rn-widgets/multipickerdialog.md)
   * [日期选择控件 - SADatePickerWidget](./apidesc/rn-widgets/sadatepickerwidget.md)
   * [基础对话框 - Dialog](./apidesc/rn-widgets/dialog.md)
   * [AlertDialog](./apidesc/rn-widgets/alertdialog.md)
   * [首页Banner - BannerView](./apidesc/rn-widgets/bannerview.md)
   * [滚动新闻控件 - AutoTextView](./apidesc/rn-widgets/autotextview.md)

* [原生SDK集成接口介绍](./apidesc/native/apidesc-native.md)
* [打包集成介绍](./apidesc/release/bundle.md)

