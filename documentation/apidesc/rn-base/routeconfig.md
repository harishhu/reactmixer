#路由配置
```javascript
import {
    ZANavigator
} from 'reactmixer-react-native';

//路由页面配置
var PageRouter = {
  //默认路由页
  '/': 'DemoLogin',
  DemoLogin: {
      render: DemoLogin,
      initprops: {
          controller: DemoLoginDataControl
      }
  },
  DemoHome: {
      render: DemoHome
  }
}
//将路由配置设置到navigator
ZANavigator.setRouteList(PageRouter);
```
