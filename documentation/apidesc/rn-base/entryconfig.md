#ReactNative启动入口配置
```javascript
import {AppRegistry} from 'react-native';

//index为注册入口，必须跟原生端启动的module name匹配
//ZANavigator.setDefaultPageName(undefined)
//设置rn对应的路由页面，undefined则使用默认路由页
AppRegistry.registerComponent('index', () => {
    ZANavigator.setDefaultPageName(undefined);
    return ZANavigator;
});
```
