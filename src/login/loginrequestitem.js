import RequestItemBase from './../../core/network/requestitembase';


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

  hostUrl(){
    return super.hostUrl() + this.path_url;
  }
}

module.exports = LoginRequestItem;
