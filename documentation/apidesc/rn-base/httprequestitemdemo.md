#自定义http请求
自定义request item代码：
```javascript
import {
    RequestItemBase
} from 'zatech-react-native';

class LoginRequestItem extends RequestItemBase{
  path_url = '/user/login';

  constructor(username, password){
    super();

    var rawData = {
      "loginName":username,
      "passWord":password,
      "imgCode":""
    };
    //设置发送
    this.setSendData(rawData);
  }
  //设置http header
  buildHttpHeader(){
    let httpheader = super.buildHttpHeader();
    httpheader.test1 = 'test';
    return httpheader;
  }
  //设置host url
  hostUrl(){
    return super.hostUrl() + this.path_url;
  }
}

module.exports = LoginRequestItem;
```
发送请求代码：
```javascript
import LoginRequestItem from './loginrequestitem'

import {
    AppConfig,
    RequestItemBase
} from 'zatech-react-native';

class LoginDispatcher{
  userlogin(username, password, callback){
    //构造
    var login = new LoginRequestItem(username, password);
    //设置回调
    login.setRequestCallback(function(resData, success){
      //to do ...
    });
    //执行请求
    login.run();
  }
}

module.exports = new LoginDispatcher();
```
