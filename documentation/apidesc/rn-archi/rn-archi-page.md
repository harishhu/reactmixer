#页面开发介绍
![](./../../res/rn-page-design.png)
ReactNative页面是以Stack的形式排列的，每个页面在UI上都分为两部分,标题栏和显示内容,页面通过Navigator来路由配置
为了更好的解耦，以便让组件代码有更好的移植性，我们在设计上建议每个页面都包含两部分：
* Render component - 负责页面数据渲染展示
* data controller（建议非必须） - 负责页面数据逻辑处理

结合页面设计图，添加一个新页面和页面被启动的流程是这样的：
* 配置路由入口，主要包含render component和data controller
* 通过Navigator接口启动页面
* 页面启动后，会判断是否有配置对应的datacontroller
* 如果有配置，则创建data controller实例并调用initprops2render获取初始化props
* 页面启动完成

注意，页面跟data controller之间只允许通过initpropsrender返回的props来进行通讯，考虑javascript的语言特性，这一开发规范大家务必遵守

同样的，上面各模块对应接口介绍详见后续相关章节
