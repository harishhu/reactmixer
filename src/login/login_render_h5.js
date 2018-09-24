import React from 'react';
import ZAComponent from './../../core/appbase/zacomponent'
import LoginDataControl from './logindatacontrol';

import './login.scss'

const TOP_IMAGE_RATIO = 0.6133;
class LoginRender extends ZAComponent{
  constructor(props){
    super(props);

    this.screenWidth = document.body.clientWidth;

    this.datacontrol = new LoginDataControl(this);
    this.dataconfig = this.datacontrol.initProps2Render();

    this.phoneNumber = this.dataconfig.phoneNumber;
    this.phonePassword = this.dataconfig.phonePassword;
  }

  clickLogin(){
    this.dataconfig.startLogin(this.phoneNumber, this.phonePassword);
  }

  render(){
    return (
      <div id="login">
        <img src={require('./res/pic_login_bg.png')} style={{
          width: this.screenWidth,
          height: this.screenWidth * TOP_IMAGE_RATIO
        }}/>
        <input className="number" maxLength="10" defaultValue={this.phoneNumber} onChange={(text) => this.phoneNumber = text}/>
        <input className="text" type="password" defaultValue={this.phonePassword} onChange={(text) => this.phonePassword = text}/>
        <button className="loginbutton" onClick={this.clickLogin.bind(this)}>
            <span>{this.zastrings.login_button_title}</span>
        </button>
      </div>
    )
  }
}

export default LoginRender;
