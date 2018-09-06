#App配置数据 - AppConfig
AppConfig保存RN执行时所需的配置数据，目前业务线RN预定义的配置属性有:

属性名 | 描述
:- | :-
hostUrl|保存rn http request item包含的默认host url
envType|rn运行环境(比如dev，prd等)
userToken|user token
appVersion|宿主原生app版本号
osType|操作系统类型(android or ios)
statusBarHeight|系统状态栏高度

配置标题栏和状态栏：
```javascript
//set background color, title size & color for action bar
AppConfig.actionBarStyle = {
     backgroundColor:  '#ff0000',
     titleSize : 20,
     titleColor:'#0000ff'
}
```
预定义类型后续会根据开发情况逐步添加
