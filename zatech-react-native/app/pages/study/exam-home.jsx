import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './exam-home.scss';

import {UIBase} from 'appbase'
import ExamDefine from './examdefine'
import HQWebAppRouter from 'hqwebapprouter';

import studydispatcher from './dispatcher/studydispatcher.js';

import mylocalstorage from 'localstorage.js';
import utils from 'utils/utils';

import webappjsinterface from './../jsinterface/jsinterface.js';


export default class StudyExam extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      examinfo: null
    }
  }

  componentDidMount(){
    UIBase.showProgress(true);
    studydispatcher.getExamInfo((resData, success)=>{
      UIBase.showProgress(false);

      if(success){
        this.examinfo = resData.value;

        //UIBase.showToast('是否考试通过：' + this.examinfo.isPass);

        UIBase.showProgress(true);
        studydispatcher.getErrorTopicSet((resData, success)=>{
          UIBase.showProgress(false);

          this.examinfo.errortopicdata = resData.value;

          this.setState({
            examinfo: this.examinfo
          });

          mylocalstorage.putData('examdata', utils.Obj2Json(this.examinfo));
        });
      }else{
        UIBase.showToast(zastrings.examdatafechfailed);
      }
    });
  }

  itemClick(index){
    if(index == 0){
      var data = {
        type: ExamDefine.TYPE_EXERCISE,
        needshowerrorprompt: this.state.examinfo.errortopicdata.errorNnumber == 0 ? true :false
      }

      let url = HQWebAppRouter.link2page('exam-main', data, webappjsinterface.isInjected());
      //alert(url);
      if(url){
        webappjsinterface.openNewWindow(url);
      }
    }else if(index == 1){
      let url = HQWebAppRouter.link2page('simu-list', null, webappjsinterface.isInjected());
      if(url){
        webappjsinterface.openNewWindow(url);
      }
    }else if (index == 2){
      if(this.state.examinfo.errortopicdata.errorNnumber <= 0){
        UIBase.showToast(zastrings.noerrortopic);
        return;
      }

      var data = {
        type: ExamDefine.TYPE_ERRORPROGRAMS
      }
      let url = HQWebAppRouter.link2page('exam-main', data, webappjsinterface.isInjected());
      if(url){
        webappjsinterface.openNewWindow(url);
      }
    }else if (index == 4){
      // var data = {
      //   type: ExamDefine.TYPE_EXAM
      // }
      // HQWebAppRouter.link2page('exam-main', data);
      var data = {
        item: 'formalExam',
        type: ExamDefine.TYPE_EXAM,
        title: zastrings.examtitle
      }
      let url = HQWebAppRouter.link2page('exam-main', data, webappjsinterface.isInjected());
      if(url){
        webappjsinterface.openNewWindow(url);
      }
    }
  }

  render(){
    if(!this.state.examinfo){
      return (
        <div>

        </div>
      )
    }else{
      let readnum = this.state.examinfo.totalNum - this.state.examinfo.unFinishNum;

      let monicount = 0;
      for(let name in this.state.examinfo.mockExam){
        console.log('name = ' + name);
        monicount++;
      }

      return (
        <div className="exammain">
          <div className="itemdesc">
            <div className="exercise">
              <div className='itembox' onClick={this.itemClick.bind(this, 0)}>
                <img src={require('./res/execise.png')}></img>
                <br/>
                <title>{zastrings.exercise}</title>
                <br/>
                <desc><font color='#fb6030'>{readnum}</font>{'/' + this.state.examinfo.totalNum}</desc>
              </div>
            </div>
            <div className="simulator">
              <div className='itembox' onClick={this.itemClick.bind(this, 1)}>
                <img src={require('./res/moni-kaoshi.png')}></img>
                <br/>
                <title>{zastrings.simulator}</title>
                <br/>
                <desc>{monicount + zastrings.topicset}</desc>
              </div>
            </div>
            <div className="errorprogram">
              <div className='itembox' onClick={this.itemClick.bind(this, 2)}>
                <img src={require('./res/error-program-group.png')}></img>
                <br/>
                <title>{zastrings.errortopicsset}</title>
                <br/>
                <desc>{this.state.examinfo.errortopicdata.errorNnumber + zastrings.topicitem}</desc>
              </div>
            </div>
          </div>

          <div className="itemseperator"/>

          <div className="itemprepare" style={
            {
              display: this.state.examinfo.isPass == 'Y' ? 'none' : 'block'
            }
          }>
            <div className='itembox'>
              <title>{zastrings.agencyexaming}</title>
              <br/>
              <desc>{zastrings.angencyexamprompt}</desc>
              <div className='seperator'></div>
              <button onClick={this.itemClick.bind(this, 4)}>{zastrings.examingsoon}</button>
            </div>
          </div>

          <div className="itemready" style={
            {
              display: this.state.examinfo.isPass == 'Y' ? 'block' : 'none'
            }
          }>
            <div className='readyitem'>
              <img src={require('./res/pass-img.png')}></img>
              <a className='title'><font color='red'>&nbsp;&nbsp;{zastrings.congratulation}，</font>{zastrings.exampassprompt}</a>
            </div>
          </div>
        </div>
      );
    }
  }
}
