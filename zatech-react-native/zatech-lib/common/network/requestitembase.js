import httpresultcodes from './httpresultcodes.js';
import httprequestexecutor from './httprequestexecutor.js';
import appconfig from './../appbase/appconfig';

class RequestItemBase{
  constructor(hosturl){
    if(hosturl){
      this.baseUrl = hosturl;
    }else{
      this.baseUrl = appconfig.getHostUrl();
    }

    this.httpHeader = {};
  }

  hostUrl(){
    return this.baseUrl;
  };

  buildHttpHeader(){
    let defaultheader = httprequestexecutor.getDefaultHttpHeaders();
    if(defaultheader){
      this.httpHeader = {...defaultheader};
    }

    return this.httpHeader;
  }

  static isResponseSuccess(responseData){
    if(responseData == undefined){
      return false;
    }

    if(responseData.code == httpresultcodes.RESULT_OK){
      return true;
    }

    return false;
  }

  setRequestCallback(callback){
    this.callback = callback;
  }

  setSendData(data){
    this.sendData = data;
  }

  run(){
    httprequestexecutor.executor(this);
  }
}

module.exports = RequestItemBase;
