import {
    RequestItemBase
} = global.reactmixer;

class LoginRequestItem extends RequestItemBase{
  path_url = '/user/login';

  constructor(username, password){
    super();

    var rawData = {
      "loginName":username,
      "passWord":password,
      "imgCode":""
    };

    this.setSendData(rawData);
  }

  buildHttpHeader(){
    let httpheader = super.buildHttpHeader();
    httpheader.test1 = 'test';
    return httpheader;
  }

  hostUrl(){
    return super.hostUrl() + this.path_url;
  }
}

module.exports = LoginRequestItem;
