import utils from './utils.js';

//开发环境
class AppConfig {
  constructor(){
  }

  getHostUrl(){
    return this.hostUrl;
  }

  getEnvType(){
    return this.envType;
  }

  getDeviceID(){
    return this.deviceID;
  }

  getUserToken(){
    return this.userToken;
  }

  getAppVersion(){
    return this.appVersion;
  }

  getOSType(){
    return this.osType;
  }

  composeImagePath(value){
    if(value.startsWith("http")){
      return value;
    }

    return this.hostUrl + value;
  }
};

module.exports = new AppConfig();
