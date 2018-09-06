import $ from 'jquery';
import {UIBase} from './../appbase';
import httpresultcodes from './httpresultcodes.js';
import appconfig from './../appbase/appconfig';
import applog from './../appbase/applog';

class RequestItemBase{
  constructor(){
    this.baseUrl = appconfig.getHostUrl();
  }

  hostUrl(){
    return this.baseUrl;
  };

  static isResponseSuccess(responseData){
    if(responseData == undefined){
      return false;
    }

    if(responseData.success && responseData.errorCode == httpresultcodes.RESULT_OK){
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
    sendRequest.call(this, this.sendData, this.hostUrl(), this.callback);
  }
  //this.isResponseSuccess = isResponseSuccess;
}

//private method
function sendRequest(sendData, pathUrl, callback){
  //alert('ajax path url = ' + pathUrl);

  var jsonStr = JSON.stringify(sendData);

  //alert('ajax send data = ' + jsonStr);
  //document.cookie='token=' + appconfig.getUserToken();
  //alert(document.cookie);
  //alert(appconfig.getUserToken());
  //alert(pathUrl);
  var aj = $.ajax( {
    url: pathUrl,// 跳转到 action
    contentType: "application/json; charset=utf-8",
    data: jsonStr,
    type:'post',
    cache:false,
    dataType:'json',
    timeout: 30000,
    beforeSend: function(request) {
      //alert(appconfig.getUserToken());
      request.setRequestHeader("token", appconfig.getUserToken());
      request.setRequestHeader("deviceId", appconfig.getDeviceID());
    },
    success:function(data) {
      //var jsonStr = JSON.stringify(data);
      //applog.log(jsonStr);

      if(callback != undefined){
         callback(data, RequestItemBase.isResponseSuccess(data));
      }
    },
    error : function() {
      // view("异常！");
      applog.log('url 访问异常');
      //UIBase.showToast('URL访问失败');
      var ret = {
        errorMsg:'http访问异常',
        success: false
      }
      callback(ret, false);
    }
  });
}

module.exports = RequestItemBase;
