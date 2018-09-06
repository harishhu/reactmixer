<!-- TOC -->

- [1. ZANavigator](#1-zanavigator)
    - [接口和属性描述](#接口和属性描述)
    - [物理返回键拦截（Android）](#物理返回键拦截android)

<!-- /TOC -->
# 1. ZANavigator
##接口和属性描述
属性描述：

属性 | 描述
:- | :- 
statusBarHeight|静态属性，包含状态栏高度
actionBarHeight|静态属性，包含标题栏高度
函数描述：

函数 | 参数 | 描述
:- | :- | :-
setRouteList|routlist：路由配置列表|静态函数，用于配置RN路由列表
setDefaultPageName|pagename：路由页面名|静态函数，用于动态设置默认路由页面
navigate | pagename：路由页面名<br/>launchData: 启动参数| 启动指定页面,当前页面会被压栈，但不会被销毁
replace | pagename：路由页面名<br/>launchData: 启动参数 | 替换启动新页面，当前页会被出栈并销毁
goBack | 无 | 将当前页面出栈，如果栈不为空，则显示上一页面，否则退出RN环境(回到原生)
showTitleBar|show:boolean|当前页是否显示标题栏
showStatusBar|show:boolean|当前页是否显示标题栏
setTitle|title|设置页面标题
setBackgroundColor|bgcolor|设置标题栏颜色
setBackgroundImage|bgimage|设置标题栏背景图
setLeftNaviItems|items:array|设置导航栏左侧navi items
setRightNaviItems|items:array|设置导航栏右侧navi items
getNavigatorBarData|无|获取当前页面的导航栏数据
restoreNavigatorBarData|navidata|通过导航栏数据还原当前页面的导航栏
setBackResultData|data|设置当前页面的back result data，也就是说，当前页面被销毁后，上一页面会收到该数据回调

其中setLeftNaviItems和setRightNaviItems的参数是一个数组，数组项的数据结构如下：
```javascript
let item = {};
//item名和icon，最少要设置一项
item.name = '返回';
item.icon = require('./../res/icon_back.png');
//item点击回调
item.callback = (item, index) => {
      this.navigator.goBack();
};
//可选设置
//设置与前一item的间隔，如果未设置，则使用默认
item.interval = 5;
//自定义item渲染，如果未设置，则使用默认实现
item.render = function(itemdata, index){
  return (
  )
}
```
这里拿在右侧设置两个item项举例：
```javascript
let item = {};
        item.name = '返回';
        item.icon = require('./../res/icon_back.png');
        item.callback = (item, index) => {
            this.navigator.goBack();
};
let item1 = {};
        item1.name = 'test';
        item.callback = (item, index) => {
          alert('test');
        };
this.navigator.setRightNaviItems([item, item1]);
```
##物理返回键拦截（Android）
在某些窗口弹出对话框时，我们会希望按物理返回键时，能够先关闭对话框，而不是直接退出当前页面，这就需要对物理返回键做拦截处理：
```javascript
//设置拦截回调
ZAComponent.navigator.setGoBackCallback(()=>{
  // to do
  //handle back key
});

//取消拦截
ZAComponent.navigator.setGoBackCallback(undefined);
```
