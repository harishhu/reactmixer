const {
  HttpRequestExecutor,
  AppConfig,
  HttpResultCodes
} = global.reactmixer;

class RequestItemBase{
  constructor(hosturl){
    if(hosturl){
      this.baseUrl = hosturl;
    }else{
      this.baseUrl = AppConfig.getHostUrl();
    }

    this.httpHeader = {};
  }

  hostUrl(){
    return this.baseUrl;
  };

  buildHttpHeader(){
    let defaultheader = HttpRequestExecutor.getDefaultHttpHeaders();
    if(defaultheader){
      this.httpHeader = {...defaultheader};
    }

    return this.httpHeader;
  }

  static isResponseSuccess(responseData){
    if(responseData == undefined){
      return false;
    }

    if(responseData.code == HttpResultCodes.RESULT_OK){
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
    HttpRequestExecutor.executor(this);
  }
}

module.exports = RequestItemBase;
