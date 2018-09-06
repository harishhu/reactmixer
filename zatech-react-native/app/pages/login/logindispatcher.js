import LoginRequestItem from './LoginRequestItem'
import RequestItemBase from './../../ajax/requestitems';
import appconfig from './../../appbase/appconfig';

class LoginDispatcher{
  userlogin(username, password, callback){
    //  alert(username + password);
    var login = new LoginRequestItem(username, password);
    login.setRequestCallback(function(resData){
      if(RequestItemBase.isResponseSuccess(resData)){
        let token = resData.value;
        appconfig.setUserToken(token);  
      }

      callback(resData);
    });
    login.run();
  }
}

module.exports = new LoginDispatcher();
