const {
  HttpResultCodes,
  RequestItemBase,
  NativeInterface
} = global.reactmixer;

let sendByNative = true;

function sendRequest(sendData, pathUrl, headers, callback){
    //alert('ajax path url = ' + pathUrl);
    //var jsonStr = JSON.stringify(sendData);
    // alert(jsonStr);
    //console.log('path url = ' + pathUrl);
    //console.log('send data = ' + jsonStr);
    if(sendByNative){
      sendRequestByNative(sendData, pathUrl, headers, callback);
    }else{
      sendRequestByFetch(sendData, pathUrl, headers, callback);
    }
}

function sendRequestByNative(jsonStr, pathUrl, headers, callback){
  NativeInterface.sendHttpRequest(jsonStr, pathUrl, headers, function(body){

    let data;
    if (body) {
      console.log(body);
      data = JSON.parse(body);
    } else {
      data = {
        message: 'http访问异常',
        code: 404,
      }
    }

    let issuccess = RequestItemBase.isResponseSuccess(data);

    if(callback != undefined){
       callback(data, issuccess);
    }
  });
}

function sendRequestByFetch(sendData, pathUrl, headers, callback){
  var jsonStr = JSON.stringify(sendData);

  var fetchOptions = {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json; charset=utf-8'
     },
     body: jsonStr
  };

  fetch(pathUrl, fetchOptions)
  .then(function(response){
    response.text()
  })
  .then(function(responseText){
    console.log('response text = ' + responseText);

    let data = JSON.parse(responseText);

    if(callback != undefined){
      callback(data, RequestItemBase.isResponseSuccess(data));
    }
  }).catch(function(err){
    applog.log('url 访问异常');
    //UIBase.showToast('URL访问失败');
    let ret = {
      errorMsg:'http访问异常',
      success: false
    }

    if(callback != undefined){
      callback(ret, false);
    }
  }).done();
}

module.exports = sendRequest;
