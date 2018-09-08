import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import HQWebAppRouter from './../../appbase/hqwebapprouter.js';

import './exam-result.scss';
import webappjsinterface from './../jsinterface/jsinterface.js';
import studydispatcher from './dispatcher/studydispatcher.js';
import ExamDefine from './examdefine';
import {UIBase} from 'appbase'
import mylocalstorage from 'localstorage.js';
import utils from 'utils/utils';

export default class ExamResult extends React.Component{
  constructor(props){
    super(props);

    var data = HQWebAppRouter.getRoutePageAttachData();

    this.state = {
      pageType: data.type,
      grade: data.grade,
      isPass:  data.isPass,
      rawdata: data
    }

    let str = "";
    str = data.studentAnswerTime / (3600 * 1000);
    str = "" + this.autoPaddingTimeValue(parseInt(str));

    let minutes = data.studentAnswerTime % (3600 * 1000);
    str += ":" + this.autoPaddingTimeValue(parseInt(minutes / (60 * 1000)));
    let seconds = minutes % (60 * 1000);
    str += ":" + this.autoPaddingTimeValue(parseInt(seconds) / 1000);

    this.composedTimeStr = str;

    this.passstr = zastrings.unpass;
    this.resultdesc = zastrings.unpassprompt;

    if(this.state.isPass == 'Y'){
      this.passstr = zastrings.pass;
      this.resultdesc = zastrings.passprompt;
    }

    if(this.state.pageType == ExamDefine.TYPE_SIMULATOR){
      this.resultdesc = "";
    }
  }

  autoPaddingTimeValue(value){
    value = value + "";
    if(value.length == 1){
       value = "0" + value;
    }

    return value;
  }

  needShowEmployeeInfo(){
    if(this.state.pageType == ExamDefine.TYPE_EXAM &&
        this.state.isPass == 'Y'){
      return true;
    }

    return false;
  }

  needShowPassStandardInfo(){
    if(this.state.pageType == ExamDefine.TYPE_EXAM &&
        this.state.isPass == 'Y'){
      return false;
    }

    return true;
  }

  reviewErrorTopics(){
    UIBase.showProgress(true);
    studydispatcher.getErrorTopicSet((resData, success)=>{
      UIBase.showProgress(false);

      if(success){
        let examinfo = utils.Json2Obj(mylocalstorage.getData('examdata'));
        examinfo.errortopicdata = resData.value;

        if(examinfo.errortopicdata.errorNnumber <= 0){
          UIBase.showToast(zastrings.zanwucuoti);
          return;
        }

        var data = {
          type: ExamDefine.TYPE_ERRORPROGRAMS
        }

        mylocalstorage.putData('examdata', utils.Obj2Json(examinfo));
        HQWebAppRouter.link2page('exam-main', data);
      }else{
        UIBase.showToast(zastrings.cuotiqingqiushibai);
      }
    });
  }

  examAgain(){
    var data = {
      item: this.state.rawdata.pageValue,
      title: this.state.rawdata.pagetitle,
      type: this.state.pageType,
      exitbyback: true
    }

    HQWebAppRouter.link2page('exam-main', data);
  }

  closeView(){
    webappjsinterface.closeWebView();
  }

  setNativeHeader(){
    //alert('set native header');
    webappjsinterface.setJnjectCallback(()=>{
      webappjsinterface.setWebViewTitle(' ');

      webappjsinterface.setWebviewMenuText(' ', ()=>{
        })

        webappjsinterface.setActionBarBackItem(zastrings.back, ()=>{
          webappjsinterface.closeWebView();
        })
    });
  }

  componentDidMount(){
    this.setNativeHeader();
  }

  needShowConfirmbutton(){
    if(this.state.pageType == ExamDefine.TYPE_EXAM &&
     this.state.grade == this.state.rawdata.totalGrade){
      return true;
    }

    return false;
  }

  render(){
    return (
      <div className='examresult'>
        <div className='header'>
          <div className='imggroup' type={this.state.isPass}>
            <div className='space'>
            </div>

            <a className="percentvalue">
              {this.state.grade}
            </a>
          </div>
        </div>

        <div style={
          {
            height: this.state.isPass == 'Y' ? '0px' : '8px'
          }
        }>
        </div>

        <a className="resultinfo" type={this.state.isPass}>
          {zastrings.exam}<font type={this.state.isPass}>{this.passstr}</font>
        </a>
        <br/>
        <a className='resultdesc'>
          {this.resultdesc}
        </a>

        <div style={
          {
            height: '44px'
          }
        }>
        </div>

        <div className='examinfogroup'>
          <div className='itemgroup1'>
            <div className='item-keyvalue'>
              <a className='itemkey'>{zastrings.examtime}</a>
              <div className='seperator'></div>
              <a className='itemvalue'>{this.composedTimeStr}</a>
            </div>

            <div className='item-keyvalue' style={
              {
                display: this.needShowEmployeeInfo() ? 'block' : 'none'
              }
            }>
              <a className='itemkey'>{zastrings.studentname}</a>
              <div className='seperator'></div>
              <a className='itemvalue'>{this.state.rawdata.name}</a>
            </div>

            <div className='item-keyvalue' style={
              {
                display: this.needShowEmployeeInfo() ? 'block' : 'none'
              }
            }>
              <a className='itemkey'>工</a>
              <div style={
                {
                  display:'inline-block',
                  width:'30px'
                }
              }>

              </div>
              <a>号</a>
              <div className='seperator'></div>
              <a className='itemvalue'>{this.state.rawdata.employeeNo}</a>
            </div>

            <div className='item-keyvalue' style={
              {
                display: this.state.pageType == ExamDefine.TYPE_SIMULATOR ? 'block' : 'none'
              }
            }>

              <a className='itemkey'>{zastrings.kaotixuanze}</a>
              <div className='seperator'></div>
              <a className='itemvalue'>{this.state.rawdata.pagetitle}</a>
            </div>

            <div className='item-keyvalue' style={
              {
                display: this.needShowPassStandardInfo() ? 'block' : 'none'
              }
            }>
              <a className='itemkey'>{zastrings.hegebiaozhun}</a>
              <div className='seperator'></div>
              <a className='itemvalue'>{`满分${this.state.rawdata.totalGrade}分，${this.state.rawdata.passGradeStandard}分及格`}</a>
            </div>
          </div>
        </div>

        <div className='buttongroupexam' style={
          {
            display: this.needShowConfirmbutton() ? 'none' : 'block'
          }
        }>
          <div className='seperatorexam'>

          </div>
          <button onClick={this.reviewErrorTopics.bind(this)}>{zastrings.chakancuoti}</button>
          <div className='seperatorexam'>

          </div>
          <button onClick={this.examAgain.bind(this)}>{zastrings.chongxinkaoshi}</button>
          <div className='seperatorexam'>

          </div>
        </div>

        <div className='buttongroup' style={
          {
            display: this.needShowConfirmbutton() ? 'block' : 'none'
          }
        }>
          <div className='seperatorexam'>

          </div>
          <button onClick={this.closeView.bind(this)}>{zastrings.ok}</button>
          <div className='seperatorexam'>

          </div>
        </div>
      </div>
    )
  }
}
