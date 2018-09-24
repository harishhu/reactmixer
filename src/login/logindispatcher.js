import LoginRequestItem from './loginrequestitem'
import RequestItemBase from './../../core/network/requestitembase';
import appconfig from './../../core/appbase/appconfig';

class LoginDispatcher{
  userlogin(username, password, callback){
    //  alert(username + password);
    var login = new LoginRequestItem(username, password);
    login.setRequestCallback(function(resData, success){
      if(RequestItemBase.isResponseSuccess(resData)){
        let token = resData.value;
        appconfig.setUserToken(token);
      }

      callback(resData, success);
    });

    login.run();
  }
}

module.exports = new LoginDispatcher();
