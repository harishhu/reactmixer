import {
    NativeModules
} from 'react-native';

let {Utils} = global.reactmixer;

let nativeexport = NativeModules.saadNativeInterface;

/*command format is：
id : {}
params: {}
*/
class NativeInterface {
    constructor() {
    }

    sendHttpRequest(senddata, pathUrl, headers, callback) {
        let cmd = {
            id: 'sendhttprequest',
            params: {
                url: pathUrl,
                headers : headers,
                body: senddata
            }
        };

        //alert(cmd);

        this.command2Native(cmd, callback);
    }

    requestAppConfig(callback){
        let cmd = {
            id: 'requestappconfig',
            params: ''
        };

        this.command2Native(cmd, callback);
    }

    setGoBackTrigger(callback) {
        let cmd = {
            id: 'gobacktrigger',
            params: ''
        };

        this.command2Native(cmd, callback);
    }

    finishNativeWindow() {
        let cmd = {
            id: 'finishcurrent',
            params: ''
        };

        this.command2Native(cmd);
    }

    pushCustomerCenter(callback) {
        let cmd = {
            id: 'pushCustomerCenter',
            params: ''
        };

        this.command2Native(cmd, callback);
    }

    pushProfession(callback) {
        let cmd = {
            id: 'pushProfession',
            params: ''
        };

        this.command2Native(cmd, callback);
    }

    saveCurrentPageIsPhoto() {
        let cmd = {
            id: 'savepageisphoto',
            params: ''
        };
        this.command2Native(cmd);
    }

    callUp(moblie) {
        let cmd = {
            id: 'callup',
            params: moblie
        };
        this.command2Native(cmd, function (data) {
        });
    }

    sendRxBusEvent(params) {
        let cmd = {
            id: 'sendRxBusEvent',
            params: params,
        };

        this.command2Native(cmd, (data) => {
        })
    }

    sendByEmail(title, content) {
        let cmd = {
            id: 'sendbyemail',
            params: {
                title: title,
                body: content
            }
        };
        this.command2Native(cmd, function (data) {
        });
    }

    shareAppContent(title, content, url, imageurl){
      let cmd = {
          id: 'shareappcontent',
          params: {
              title: title,
              body: content,
              url: url,
              imageurl: imageurl
          }
      };
      this.command2Native(cmd, function (data) {
      });
    }

    requestAppModuleCode(modulename, callback){
        let cmd = {
            id: 'requestappmodulecode',
            params: {
                modulename: modulename
            }
        };

        this.command2Native(cmd, function (data) {
            callback(data);
        });
    }

    requestInstalledAppletsInfo(callback){
        let cmd = {
            id: 'requestinstalledappletsinfo',
            params: {
            }
        };

        this.command2Native(cmd, function (data) {
            callback(data);
        });
    }

    command2Native(cmd, callback) {
        nativeexport.command2Native(Utils.Obj2Json(cmd), (body) => {
          if(callback){
            callback(body);            
          }
        })
    }
};

module.exports = new NativeInterface();
