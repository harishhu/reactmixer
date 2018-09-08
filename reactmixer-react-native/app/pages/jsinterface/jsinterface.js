import utils from './../../appbase/utils/utils';

class WebAppJSInterface{
  notifyCommandFromNative = undefined;
  reloadPageData = undefined;

  constructor(){
    this.callbackindex = 1;
    this.callbackmap = {};
  }

  setInjectJsObject(jsobj){
    this.injectJs = jsobj;

    if(this.injectCallback){
      this.injectCallback();
    }
  }

  setJnjectCallback(callback){
    this.injectCallback = callback;

    if(this.injectJs){
      this.injectCallback();
    }
  }

  isInjected(){
    return this.injectJs != undefined;
  }

  setWebViewTitle(title){
    if(this.injectJs){
      this.injectJs.onJSInvokeResult('1', title);
    }
  }

  webapplog(data){
    // if(this.injectJs){
    //   this.injectJs.webappLog(data);
    //   return true;
    // }

    return false;
  }

  closeWebView(){
    this.injectJs.closeWebview("2");
  }

  openNewWindow(url){
    this.injectJs.openNewWindow(url);
  }

  native2webCallbackBody(params){
    if(params){
      this.callbackmap[params]();
      //this.callbackmap[params] = undefined;
    }
  }

  setActionBarBackItem(title, callback){
    let content = this.makeActionBarInvokeContent('text', title, callback);
    this.injectJs.setActionBarBackItem(utils.Obj2Json(content));
  }

  setWebviewMenuText(title, callback){
    let content = this.makeActionBarInvokeContent('text', title, callback);
    this.injectJs.setWebViewMenu(utils.Obj2Json(content));
  }

  setWebviewMenuImage(imagebase64, callback){
    let content = this.makeActionBarInvokeContent('image', imagebase64, callback);
    this.injectJs.setWebViewMenu(utils.Obj2Json(content));
  }

  showRightActionBarItem(show){
  //  alert('show actionbar = ' + show);
    this.injectJs.showActionBarPanel("2", show);
  }

  //生成回调参数，具体可看app的设计文档
  makeActionBarInvokeContent(type, title, callback){
    var content = {};
    content.type = type;
    content.title = title;

    if(callback){
      content.javascript = "native2webCallbackBody";
    }

    content.params = this.callbackindex;

    this.callbackmap[this.callbackindex + ""] = callback;
    this.callbackindex++;

    return content;
  }
}

window.native2webCallbackBody = function(params){
  //alert('native2webCallbackBody = ' + params + ' js ' + window.webappjsinterface);

  if(window.webappjsinterface){
    window.webappjsinterface.native2webCallbackBody(params);
  }
}

window.HQAppGetH5Header = function(){
  if (window.HQAppJSInterface){
    window.webappjsinterface.setInjectJsObject(window.HQAppJSInterface);
  }else{
    alert('js has not injected yet!!');
  }
}

window.notifyCommandFromNative = function(name, data){
  if(window.webappjsinterface){
    if(window.webappjsinterface.reloadPageData && name=='reloadPageData'){
      window.webappjsinterface.reloadPageData(data);
      return;
    }

    if(window.webappjsinterface.notifyCommandFromNative){
      window.webappjsinterface.notifyCommandFromNative(name, data);
    }
  }
}

if(window.webappjsinterface == undefined){
  window.webappjsinterface = new WebAppJSInterface();
}

module.exports = window.webappjsinterface;
