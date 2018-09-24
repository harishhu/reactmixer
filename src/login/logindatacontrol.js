import ZADataControl from './../../core/appbase/zadatacontrol';
import loginDispatcher from './logindispatcher';
import React from 'react';

export default class LoginDataControl extends ZADataControl{
  static defaultProps = {
    phoneNumber : '1440000167',
    phonePassword : '20170631',
  }

  initProps2Render(){
    let dataconfig = super.initProps2Render();

    dataconfig = {
      ...dataconfig,
      ...LoginDataControl.defaultProps,
      startLogin : this.startLogin.bind(this)
    }

    return dataconfig;
  }

  constructor(render){
    super(render);
  }

  startLogin(phonenumber, password){
     this.navigator.navigate('DemoHome', 'hufuyi');
    // this.showProgress(true);
    // loginDispatcher.userlogin(phonenumber, password, (responseData, success)=>{
    //   this.showProgress(false);
    //   if(success){
    //     this.showToast(responseData.errorMsg);
    //
    //     if(this.mainRender.isReactNative){
    //      this.navigator.navigate('DemoHome');
    //     }else{
    //       //this.navigator.navigate('/home');
    //     }
    //   }else{
    //     this.showToast(responseData.errorMsg);
    //   }
    // });
  }
}
