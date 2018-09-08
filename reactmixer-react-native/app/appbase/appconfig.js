import utils from './utils/utils.js';

//开发环境
class AppConfig {
  ENV_UAT = 'uat';
  ENV_DEV = 'dev';
  ENV_TEST = 'test';
  ENV_PRD = 'prd';

  hostMap = {
    uat: "",
    dev: "",
    test: "",
    pre: "",
    prd: ""
  }

  constructor(){
    this.envType = utils.getUrlParam('env');

    //set environment for env as default
    if(this.envType == null){
      this.envType = 'dev';
    }

    this.setUserToken(utils.getUrlParam('token'));

    //alert(this.getUserToken())

    //document.cookie = "token=DVZMUj7ikOTL9rCT/HwsxF+VirsqNH8vTvQTq9AvulQ=";

    //alert(document.cookie);
    if(document.cookie){
      let cks = document.cookie.split(';');

      for(let index in cks){
        let str = cks[index];
        let pos = str.indexOf("=", 0);

        let key = str.substr(0, pos).trim();
        let value = str.substr(pos + 1, str.length - pos - 1).trim();

        //("1" + key + "=" + value);

        if(key == "hq_http_usertoken"){
          this.setUserToken(value);
          //alert(this.getUserToken())

        }else if(key == "hq_http_deviceid"){
          this.setDeviceID(value);
        }
      }
    }

    if(!this.envType){
      this.envType = this.ENV_PRD;
    }
  }

  getHostUrl(){
    return this.hostMap[this.envType] + 'api';
  }

  getEnvType(){
    return this.envType;
  }

  setDeviceID(did){
    if(did){
      this.deviceID = did;
    }
  }

  setUserToken(token){
    if(token){
      this.userToken = token;
    }
  }

  getUserToken(){
    return this.userToken;
  }

  getDeviceID(){
    return this.deviceID;
  }

  composeImagePath(value){
    if(value.startsWith("http")){
      return value;
    }

    return this.hostMap[this.envType] + value;
  }

  ROOT_ROUTE_PATH = 'hqlife-webapp/build/';					//前端路由根目录

  //路由时获取本地打开页面和服务器打开的兼容路径
  getCompatiblePath(path){
    var pathname = location.pathname;

    //  alert(location);
    //  alert(pathname);

    if(location.href.startsWith('http')){
      return path;
    }

    var index = pathname.indexOf(this.ROOT_ROUTE_PATH);
    if(index == -1){
      return "";
    }

    var length = pathname.length - this.ROOT_ROUTE_PATH.length - index;
    index = index + this.ROOT_ROUTE_PATH.length;

    var finalpath = pathname.substr(index, length);

    if(finalpath == path){
      return pathname;
    }

    //alert('final = ' + finalpath);
    //alert(path);
    return "";
  }
};

module.exports = new AppConfig();
