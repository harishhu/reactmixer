#HttpRequestExecutor
HttpRequestExecutor主要包括三个功能：
* 设置默认http headers
* 获取默认http headers
* 执行request item

参考代码如下：
```javascript
import {
    HttpRequestExecutor
} from 'zatech-react-native';

//set function to generate default http headers
HttpRequestExecutor.defaultHttpHeadersConstructor(function(){
    let httpHeader = {};
    httpHeader.v = AppConfig.getAppVersion();
    httpHeader.deviceId = AppConfig.getDeviceID();
    httpHeader.token = AppConfig.getUserToken();
    return httpHeader;
});

//get default http headers
HttpRequestExecutor.getDefaultHttpHeaders();

//执行request item
HttpRequestExecutor.executor(requestitem);
```
