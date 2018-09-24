import React from 'react';
import $ from 'jquery';
import {UIBase} from './../../appbase';
import LoginDispatcher from './logindispatcher';
import RequestItemBase from './../../ajax/requestitems';
import HQWebAppRouter from './../../appbase/hqwebapprouter.js';

import test, {h1} from './test';
alert(test + h1);
import './login.scss';

class Login extends React.Component{
  userName = "1440000167";
  userPwd = "20170631";

  constructor(props){
    super(props);

    this.ajustLoginViews = this.ajustLoginViews.bind(this);
    this.userNameInputChange = this.userNameInputChange.bind(this);
    this.userPwdInputChange = this.userPwdInputChange.bind(this);
    this.loginClick = this.loginClick.bind(this);

    this.firstRender = true;
    this.state = {
      ajustAreaData : {
        middleAreaTop:0,
        middleAreaHeight:0,
        logoViewTop:0,
        bottomLogoTop:0
      },
      loginDisable: true
    }
  }

  getMiddleAreaStyle(){
    console.log('get middle area style');

    let mstyle;

    let area = this.state.ajustAreaData;
    if(area.middleAreaTop > 0 && area.middleAreaHeight > 0){
         mstyle = {marginTop: area.middleAreaTop,
                   height: area.middleAreaHeight};
    }

    console.log(mstyle);
    return mstyle;
  }

  getLogoViewStyle(){
    let mstyle;

    let area = this.state.ajustAreaData;
    if(area.logoViewTop != 0){
         mstyle = {marginTop: area.logoViewTop};
    }

    console.log('get logo view style = ' + mstyle);
    return mstyle;
  }

  getBottomLogoStyle(){
    console.log('get bottom logo style');
    let mstyle;

    let area = this.state.ajustAreaData;
    if(area.bottomLogoTop != 0){
      mstyle = {
        marginTop: area.bottomLogoTop
      }
    }

    console.log('get login button style = ' + mstyle);
    return mstyle;
  }

  getLoginButtonStyle(){
    let mstyle;

    if(this.state.loginDisable){
      mstyle = {
        backgroundImage: `url(${require("./res/pic_login_but_disable.png")})`
      }
    }else{
      mstyle = {
        backgroundImage: `url(${require("./res/pic_login_but.png")})`
      }
    }

    console.log('get login button style = ' + mstyle);
    return mstyle;
  }

  userNameInputChange(event){
    console.log('user input type = ' + event.target.value);
    this.userName = event.target.value;

    this.adjustLoginButton();
  }

  userPwdInputChange(event){
    console.log('user input type = ' + event.target.value);
    this.userPwd = event.target.value;

    this.adjustLoginButton();
  }

  adjustLoginButton(){
    if(this.userName.length == 10 && this.userPwd.length >= 6){
       this.setState({
         loginDisable:false
       })
    }else{
      this.setState({
        loginDisable:true
      })
    }
  }

  loginClick(type){
    UIBase.showProgress(true);
    LoginDispatcher.userlogin(this.userName, this.userPwd, function(responseData){
      UIBase.showProgress(false);
      if(RequestItemBase.isResponseSuccess(responseData)){
        UIBase.showToast(responseData.errorMsg);

        setTimeout(function(){
          if(type == 'task'){
            HQWebAppRouter.link2page(HQWebAppRouter.HQ_PATH_TASKCENTER);
          }else{
            HQWebAppRouter.link2page('exam-home', null, null, 'hqlife-study.html');
          }
        }, 500)
      }else{
        UIBase.showToast(responseData.errorMsg);
      }
    });
  }

  render(){
    return (
      <div id="loginContainer">
        <topBackground>
          <img src={require("./res/pic_login_bg.png")} ref="toparea"/>
        </topBackground>

        <middleBackground style={this.getMiddleAreaStyle()}>
          <logo style={this.getLogoViewStyle()}>
            <img ref="logoimg" src={require("./res/icon_login_logo.png")}/>
          </logo>

          <editBoxGroup id="username">
            <img src={require("./res/icon_login_user.png")}/>
            <middleSpace>&nbsp;</middleSpace>
            <input className="number" maxLength="10" defaultValue={this.userName} onChange={this.userNameInputChange}/>
            <a>
              <img className="editdelete" src={require("./res/icon_me_code_del.png")}/>
              <middleSpace>&nbsp;</middleSpace>
            </a>
          </editBoxGroup>

          <editBoxGroup id="userpassword">
            <img src={require("./res/icon_login_key.png")}/>
            <middleSpace>&nbsp;</middleSpace>
            <input className="text" type="password" defaultValue={this.userPwd} onChange={this.userPwdInputChange}/>
            <a>
              <img className="editdelete" src={require("./res/icon_me_code_del.png")}/>
              <img className="passwrodEye" src={require("./res/icon_login_eye.png")} />
            </a>
          </editBoxGroup>

          <div className="loginButtonGroup">
            <button className="loginbutton" style={this.getLoginButtonStyle()} onClick={this.loginClick.bind(this, 'task')}>
              <span>登录任务中心</span>
            </button>
            <button className="loginbutton" style={this.getLoginButtonStyle()} onClick={this.loginClick.bind(this, 'study')}>
              <span>登录到考试</span>
            </button>
          </div>

          <forgetpwd>
            <a>忘记密码?</a>
          </forgetpwd>

          <logoBottom style={this.getBottomLogoStyle()}>
            <img src={require("./res/pic_login_logo_hq.png")}/>
          </logoBottom>
        </middleBackground>
      </div>
    );
  }

  ajustLoginViews(){
    //alert(this.refs.toparea.width);
    console.log('ajust login views');

    var topArea = $("#loginContainer topBackground img");

    console.log('adjust login views' + topArea.width());

    if(topArea.width() == 0){
      this.timer = setInterval(this.ajustLoginViews, 100);
      return;
    }else{
      clearInterval(this.timer);
    }

    var adjustCenterArea = function(width, height){
      console.log('ajust center area');
      //alert("width = " + width + " height = " + window.devicePixelRatio);
      var newAreaData = {};

      newAreaData.middleAreaTop = height / 2;
      //alert("height = " + middleArea.height());

      var body = $("body");
      //alert("body width = " + window.devicePixelRatio);
      newAreaData.middleAreaHeight = body.height()  - height / 2 - 20;

      //var logoView = $("#loginContainer middleBackground logo");
      var logoSubImg = this.refs.logoimg;

      newAreaData.logoViewTop = -logoSubImg.height / 2;
      newAreaData.bottomLogoTop = newAreaData.middleAreaHeight - 200;
      //  alert("width = " + bottomLogo.css("top"));

      this.setState({ajustAreaData: newAreaData});
      console.log('adjust center area');
    };

    //  alert(topArea.width);
    adjustCenterArea = adjustCenterArea.bind(this);
    adjustCenterArea(topArea.width(), topArea.height());
  }

  componentWillMount(){
  }

  componentWillUpdate(nextProps, nextState){
  }

  componentDidUpdate(prevProps, prevState){
  }

  componentWillUnmount(){
  }

  componentDidMount(){
    //  alert("login component mounted");
    //this.hqAppGlobal = require('./../../base/appbase');

    //alert(this.hqAppGlobal.harish);
    //this.hqAppGlobal.showToast('diqiuzhanshi');
    //this.hqAppGlobal.showProgress(true);

    if(this.firstRender){
      this.firstRender = false;
      this.ajustLoginViews();

      this.adjustLoginButton();
    }
  }
}

module.exports = Login;
