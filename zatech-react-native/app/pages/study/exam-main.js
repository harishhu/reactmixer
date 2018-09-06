import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import HQWebAppRouter from 'hqwebapprouter.js';
import {UIBase} from 'appbase';
import ExamDefine from './examdefine';
import AlertDialog from 'alertdialog/alertdialog.js';
import WebAppLocalStorage from './../../appbase/localstorage.js';
import ListView from 'listview/listview.jsx';
import SubjectItemsDesc from './widget/subjectitemsdesc.js';
import SubjectItemsView from './widget/subjectitemsview.js';

import ExamDataSource from './datasource/examdatasource';
import studydispatcher from './dispatcher/studydispatcher.js';
import webappjsinterface from './../jsinterface/jsinterface.js';
import SimulatorEntry from './simulator-entry.js';

import utils from 'utils/utils';
import mylocalstorage from './../../appbase/localstorage';

import {browserHistory, Router } from 'react-router';

//import testdata from './mockdata/mockdata.js';

import './exam-main.scss';

class SubjectItem extends React.Component{
  static select_normal = 1;
  static select_right = 2;
  static select_error = 3;
  static select_byuser = 4;

  constructor(props){
    super(props);

    this.state = {
      selecttype: SubjectItem.select_normal,
    }

    this.isSelectByUser = false;
    this.lockSelect = false;
  }

  setSelectType(type){
    this.setState({
      selecttype: type
    }
    )
  }

  setUserSelect(sel){
    this.isSelectByUser = sel;

    let type;
    if(this.isSelectByUser){
      type = SubjectItem.select_byuser;
    }else{
      type = SubjectItem.select_normal;
    }

    this.setSelectType(type);
  }

  getItemImg(){
    let data = undefined;

    if(this.props.type == ExamDefine.SUBJECT_TYPE_SINGLE){
      if(this.state.selecttype == select_normal){
    //    data = require('./res/')
      }else if(this.state.selecttype == select_right){

      }else if(this.state.selecttype == select_error){

      }
    }else{

    }
  }

  onclick(){
    if(this.props.onItemClick){
      this.props.onItemClick();
    }
  }

  render(){
    this.answer = this.props.value;
    this.value = this.props.content;

    return (
      <div className='subjectitem' onClick={this.onclick.bind(this)}>
        <button className={'subitem-img' + this.props.type} type={this.state.selecttype}>
          {this.state.selecttype == 1 ? this.answer : " "}
        </button>

        <div className='value-group'>
          <a className={'subitem-value'} type={this.state.selecttype}>
            {this.value}
          </a>
        </div>
      </div>
    )
  }

  static defaultProps = {
    type: ExamDefine.SUBJECT_TYPE_SINGLE,
    value:""
  }
}

export default class ExamMain extends React.Component{
  constructor(props){
    super(props);

    var data = HQWebAppRouter.getRoutePageAttachData();

    this.needshowerrorprompt = data.needshowerrorprompt;
    this.state = {
      pageType: data.type,
      pageValue: data.item,
      pageTitle: data.title,
      showexamdesc: true
    }

    if(data.type == ExamDefine.TYPE_EXERCISE ||
             data.type == ExamDefine.TYPE_ERRORPROGRAMS){
        this.state.showexamdesc = false;
    }

    this.startX = -1;
    this.endX = -1;
  }

  autoPaddingTimeValue(value){
    value = value + "";
    if(value.length == 1){
       value = "0" + value;
    }

    return value;
  }

  startUpdateExamTime(){
    this.studentAnswerTime = 0;
    if(this.state.pageType == ExamDefine.TYPE_EXAM || this.state.pageType == ExamDefine.TYPE_SIMULATOR){
      this.timeid = setInterval(()=>{
        if(this.lockTimeElapsing){
          return;
        }

        this.studentAnswerTime += 1000;

        let lefttime = this.examTime - this.studentAnswerTime;
        let str = "";
        str = lefttime / (3600 * 1000);
        str = zastrings.countdown + this.autoPaddingTimeValue(parseInt(str));

        let minutes = lefttime % (3600 * 1000);
        str += ":" + this.autoPaddingTimeValue(parseInt(minutes / (60 * 1000)));
        let seconds = minutes % (60 * 1000);
        str += ":" + this.autoPaddingTimeValue(parseInt(seconds) / 1000);

        if(webappjsinterface.isInjected()){
          webappjsinterface.setWebViewTitle(str);
        }

        if(lefttime <= 0){
          this.studentAnswerTime = this.examTime;
          clearInterval(this.timeid);

          if(this.dialog){
            this.dialog.dismiss();
          }

          let dialog = new AlertDialog();
          //dialog.setTitle('是否继续考试?');

          dialog.setMessage(zastrings.examendprompt);
          dialog.setButton1(zastrings.subitconfirm, ()=>{
            this.dialog = undefined;
            dialog.dismiss();

            this.submitExamPaper();
          });

          dialog.show();

          this.dialog = dialog;
        }

      //  console.log(str);
      }, 1000);
    }
  }

  submitExamPaper(){
    UIBase.showProgress(true);
    studydispatcher.submitExamPaper(this.examDataSource, (resData, success)=>{
      UIBase.showProgress(false);

      if(success){
        let data = {
          type: this.state.pageType,
          grade: resData.value.grade,
          isPass: resData.value.isPass,
          passGradeStandard: this.examDataSource.passStandard,
          totalGrade: this.examDataSource.totalGrade,
          employeeNo: resData.value.employeeNo,
          name: resData.value.name,
          pagetitle: this.state.pageTitle,
          pageValue: this.state.pageValue,
          studentAnswerTime: this.studentAnswerTime
        }

        HQWebAppRouter.link2page('exam-result', data);
    }else{
      UIBase.showToast(zastrings.submitfailedprompt);
    }
    })
  }

  setNativeHeader(){
    //test
    // let imgcallback = ()=>{
    //   let subitem = this.examDataSource.getDataList()[this.state.subjectIndex];
    //
    //   UIBase.showProgress(true);
    //   studydispatcher.removeErrorTopic(subitem.detailId, (resData, success)=>{
    //
    //     if(success){
    //       this.examDataSource.removeDataByIndex(this.state.subjectIndex);
    //       UIBase.showProgress(false);
    //       UIBase.showToast('移除成功');
    //     }else{
    //       UIBase.showProgress(false);
    //       UIBase.showToast('移除失败');
    //     }
    //   })
    // };
    //
    // setTimeout(imgcallback, 5000);
    //test
    //alert('set native header');
    webappjsinterface.setJnjectCallback(()=>{
      //alert(111);
      //alert(this.state.pageType);
      if(this.state.pageType == ExamDefine.TYPE_EXAM){
        webappjsinterface.setWebViewTitle(zastrings.exam);
      }else if(this.state.pageType == ExamDefine.TYPE_ERRORPROGRAMS){
        webappjsinterface.setWebViewTitle(zastrings.topicset);
      }else if(this.state.pageType == ExamDefine.TYPE_SIMULATOR){
        webappjsinterface.setWebViewTitle(zastrings.simulator);
      }else if(this.state.pageType == ExamDefine.TYPE_EXERCISE){
        webappjsinterface.setWebViewTitle(zastrings.exercise);
      }

      this.initActionBarViews();
    });

if(this.state.pageType == ExamDefine.TYPE_EXAM || this.state.pageType == ExamDefine.TYPE_SIMULATOR
){
    window.webappjsinterface.notifyCommandFromNative = (methodname, data)=>{
      if(methodname == 'gotoForeground'){
        this.showExitExamPromptDialog(true);
      }
    }
  }
}

  setAdd2ErrorListActionMenu(){
    console.log('setAdd2ErrorListActionMenu');

    if(!webappjsinterface.isInjected()){
      return;
    }

    let image = require('./res/2x/error-add-icon.png');
    //alert(window.devicePixelRatio);

    if(window.devicePixelRatio == 3){
       image = require('./res/3x/error-add-icon.png');
    }

    image = utils.getSubImageStr(image);
    webappjsinterface.setWebviewMenuImage(image, ()=>{
        let subitem = this.examDataSource.getDataList()[this.state.subjectIndex];
        //this.try2CollectErrorTopic(subitem);
        UIBase.showProgress(true);
        studydispatcher.checkErrorTopic(subitem, (resData, success)=>{
          UIBase.showProgress(false);

          if(success){
            if(this.state.pageType == ExamDefine.TYPE_EXERCISE){
              this.try2AddInErrorList(subitem);
              this.setRemoveFromErrorListActionMenu();
            }
            UIBase.showToast(zastrings.addsuccess);
          }else{
            UIBase.showToast(zastrings.addfailed);
          }
        }, true);
    });
  }

  setRemoveFromErrorListActionMenu(){
    console.log('setRemoveFromErrorListActionMenu');
    if(!webappjsinterface.isInjected()){
      return;
    }

    let image = require('./res/2x/error-remove-icon.png');
    //alert(window.devicePixelRatio);

    if(window.devicePixelRatio == 3){
       image = require('./res/3x/error-remove-icon.png');
    }

    image = utils.getSubImageStr(image);

    let imgcallback = ()=>{
      let subitem = this.examDataSource.getDataList()[this.state.subjectIndex];

      UIBase.showProgress(true);
      studydispatcher.removeErrorTopic(subitem.detailId, (resData, success)=>{
        if(success){
          if(this.state.pageType == ExamDefine.TYPE_ERRORPROGRAMS){
            this.examDataSource.removeDataByIndex(this.state.subjectIndex);
          }else if(this.state.pageType == ExamDefine.TYPE_EXERCISE){
            this.removeItemFromErrorList(subitem);
            this.setAdd2ErrorListActionMenu();
          }

          UIBase.showProgress(false);
          UIBase.showToast(zastrings.removesuccess);
        }else{
          UIBase.showProgress(false);
          UIBase.showToast(zastrings.removefailed);
        }
      }, subitem)
    };

    webappjsinterface.setWebviewMenuImage(image, imgcallback);
  }

  showExitExamPromptDialog(forceshow){
    if(this.dialog){
      return;
    }

    let dialog = new AlertDialog();
    dialog.setTitle(zastrings.continueexamprompt);

    let examinfo = this.examDataSource.getExamDataInfo();
    let alreaynumber = examinfo.right + examinfo.error;
    let leftnumber = examinfo.total - examinfo.right - examinfo.error;

    if(alreaynumber == 0 && !forceshow){
      webappjsinterface.closeWebView();
      return;
    }

    let lefttime = this.examTime - this.studentAnswerTime;
    lefttime = parseInt(lefttime / (60 * 1000));

    dialog.setMessage(zastrings.kaoshituichutixing.format(alreaynumber, leftnumber, lefttime));

    dialog.setButton2(zastrings.exitexam, ()=>{
      this.dialog = undefined;
      dialog.dismiss();
      this.lockTimeElapsing = false;
      //browserHistory.goBack();
      webappjsinterface.closeWebView();
    }, zastrings.continueexam, ()=>{
      this.dialog = undefined;
      dialog.dismiss();
      this.lockTimeElapsing = false;
    });

    dialog.show();
    this.lockTimeElapsing = true;

    this.dialog = dialog;
  }

  initActionBarViews(){
    if(this.state.pageType == ExamDefine.TYPE_EXERCISE){
      let subitem = this.examDataSource.getDataList()[this.state.subjectIndex];

      if(this.isInErrorList(subitem)){
        this.setRemoveFromErrorListActionMenu();
      }else{
        this.setAdd2ErrorListActionMenu();
      }
    }

    if(this.state.pageType == ExamDefine.TYPE_ERRORPROGRAMS){
      this.setRemoveFromErrorListActionMenu();

      webappjsinterface.setActionBarBackItem(zastrings.back, ()=>{
        webappjsinterface.closeWebView();
      });
    }

    if(this.state.pageType == ExamDefine.TYPE_EXAM || this.state.pageType == ExamDefine.TYPE_SIMULATOR){
      webappjsinterface.setActionBarBackItem(zastrings.back, ()=>{
        this.showExitExamPromptDialog();
      })

      let image = require('./res/2x/submit-icon.png');
      //alert(window.devicePixelRatio);

      if(window.devicePixelRatio == 3){
         image = require('./res/3x/submit-icon.png');
      }

      image = utils.getSubImageStr(image);
      webappjsinterface.setWebviewMenuImage(image, ()=>{
        if(this.dialog){
          return;
        }

        let dialog = new AlertDialog();

        let examinfo = this.examDataSource.getExamDataInfo();
        let leftnumber = examinfo.total - examinfo.right - examinfo.error;

        let msg = zastrings.confirmsubit;
        if(leftnumber > 0){
          msg = zastrings.jiaojuantixing.format(leftnumber);
        }

        dialog.setMessage(msg);
        dialog.setButton2(zastrings.jixudati, ()=>{
          this.dialog = undefined;
          dialog.dismiss();
        }, zastrings.subitconfirm, ()=>{
          this.dialog = undefined;
          dialog.dismiss();

          this.submitExamPaper();
        });

        dialog.show();

        this.dialog = dialog;
      });
    }
  }

  componentDidMount(){
    if(!this.state.showexamdesc){
      if(this.state.pageType == ExamDefine.TYPE_EXERCISE){
        UIBase.showProgress(true);
        studydispatcher.getExerciseTopicSet((resData, success)=>{
          UIBase.showProgress(false);

          if(success){
            this.initExamMain(resData.value);
          }
        });
      }

      if(this.state.pageType == ExamDefine.TYPE_ERRORPROGRAMS){
        console.log('init error topic set');
        setTimeout(()=>{
          //alert(mylocalstorage.getData('examdata'));
          let examinfo = utils.Json2Obj(mylocalstorage.getData('examdata'));
          let dataset = new ExamDataSource(examinfo.errortopicdata.errorCollection, ExamDefine.TYPE_ERRORPROGRAMS)
          this.initExamMain(dataset);
        }, 100);
      }
    }
  }

  initExamMain(data){
    //this.try2ShowPromptDialog();
    let examinfo = utils.Json2Obj(mylocalstorage.getData('examdata'));

    this.examDataSource = data;
    this.errortopicdata = examinfo.errortopicdata.errorCollection;
    //window.hqAppGlobal.examDataSource = null;

    this.setState({
      subjectIndex: 0,
      showexamdesc:false
    });

    this.lockTimeElapsing = false;

    this.initElementViews();

    this.examTime = this.examDataSource.answerTime;//90 * 60 * 1000; //一个半小时
    this.startUpdateExamTime();

    this.setNativeHeader();
    this.gotoSubject(0);
  }

  initElementViews(){
    if(this.examDataSource.getDataList()){
      this.refs.subitemsview.setExamDataSource(this.examDataSource);

      this.examDataSource.setDataChangeListener((item, right, error, index, total)=>{
        if(index == -1){
          if(webappjsinterface){
            webappjsinterface.closeWebView();
          }
          return;
        }

        this.refs.subitemdesc.setRightValue(right);
        this.refs.subitemdesc.setErrorValue(error);
        this.refs.subitemdesc.setIndexValue(index);
        this.refs.subitemdesc.setTotalValue(total);

        setTimeout(()=>{
          this.setState({
            subjectIndex: index
          });

          this.clearItemViewsState();

          let subitem = this.examDataSource.getDataList()[this.state.subjectIndex];
          this.checkAnswer(subitem, true);
          this.lockSelect = false;

          if(this.state.pageType == ExamDefine.TYPE_EXERCISE){
            let subitem = this.examDataSource.getDataList()[this.state.subjectIndex];

            console.log(this.state.subjectIndex);

            if(this.isInErrorList(subitem)){
              this.setRemoveFromErrorListActionMenu();
            }else{
              this.setAdd2ErrorListActionMenu();
            }
          }
        }, 500);
      });
    }
  }

  try2ShowPromptDialog(){
    if(this.state.pageType == ExamDefine.TYPE_EXERCISE){
      let dialog = new AlertDialog();
      dialog.setTitle(zastrings.cuotijitixing);
      //dialog.setMessage('已做一题，还剩49题，剩余120分钟');
      dialog.setButton1(zastrings.ok, function(){
        dialog.dismiss();
      });

      dialog.show();
    }
  }

  clearItemViewsState(){
    let subitem = this.examDataSource.getDataList()[this.state.subjectIndex];

    for(let index = 0; index < subitem.contentArray.length; index++){
      let itemview = this.refs['subitem' + index];
      itemview.setUserSelect(false);
    }
  }

  gotoSubject(index){
    if(index < 0){
      UIBase.showToast(zastrings.reachhead);
      return;
    }

    if(index >= this.examDataSource.getDataList().length){
      UIBase.showToast(zastrings.reachend);
      return;
    }

    this.examDataSource.gotoItemByIndex(index);
  }

  isInAnswerList(target, answerlist){
    for(let index = 0; index < answerlist.length; index++){
      if(target == answerlist[index]){
        return true;
      }
    }

    return false;
  }

  checkAnswerIsRight(subitem){
    if(!subitem.studentAnswer || subitem.studentAnswer.length == 0){
      return false;
    }

    let answerlist = subitem.answer.split(';');
    let stuanswerlist = subitem.studentAnswer.split(';');

    if(answerlist.length != stuanswerlist.length){
      return false;
    }

    for(let index = 0; index < answerlist.length; index++){
      if(!this.isInAnswerList(answerlist[index], stuanswerlist)){
        return false;
      }
    }

    return true;
  }

  checkAnswer(subitem, justfordatapresent){
    let answerlist = subitem.answer.split(';');
    let studentAnswer = subitem.studentAnswer ? subitem.studentAnswer : "";
    let stuanswerlist = studentAnswer.split(';');

    let byuserlist = [];

    if(studentAnswer != "" && stuanswerlist.length > 0 && justfordatapresent){
      for(let index = 0; index < subitem.contentArray.length; index++){
        let itemview = this.refs['subitem' + index];
        let value = itemview.answer;

        if(this.isInAnswerList(value, stuanswerlist)){
          itemview.setUserSelect(true);
          byuserlist.push(value);
        }
      }
    }else{
      studentAnswer = "";
      for(let index = 0; index < subitem.contentArray.length; index++){
        let itemview = this.refs['subitem' + index];
        let value = itemview.answer;

        if(itemview.isSelectByUser){
          if(studentAnswer != ""){
            studentAnswer += ";"
          }

          studentAnswer += value;
          byuserlist.push(value);
        }
      }

      if(byuserlist.length == 0){
        if(!justfordatapresent){
          UIBase.showToast(zastrings.selectoneatleast);
        }
        return false;
      }

      this.lockSelect = true;
    }

    if(this.state.pageType == ExamDefine.TYPE_EXAM || this.state.pageType == ExamDefine.TYPE_SIMULATOR){
      for(let index = 0; index < subitem.contentArray.length; index++){
        let itemview = this.refs['subitem' + index];
        let value = itemview.answer;

        if(itemview.isSelectByUser){
          itemview.setSelectType(SubjectItem.select_byuser);
        }
      }
    }else{
      for(let index = 0; index < subitem.contentArray.length; index++){
        let itemview = this.refs['subitem' + index];
        let value = itemview.answer;

        let isright = this.isInAnswerList(value, answerlist);

        if(isright){
          itemview.setSelectType(SubjectItem.select_byuser);
        }

        if(itemview.isSelectByUser){
          if(!isright){
            itemview.setSelectType(SubjectItem.select_error);
          }
        }else{
          if(subitem.type == ExamDefine.SUBJECT_TYPE_MULTI){
            if(isright){
              itemview.setSelectType(SubjectItem.select_right);
            }
          }
        }
      }
    }

    subitem.studentAnswer = studentAnswer;
    console.log('answer = ' + subitem.studentAnswer);
    return true;
  }

  removeItemFromErrorList(subitem){
    for(var i = 0; i < this.errortopicdata.length; i++) {
      if(this.errortopicdata[i].detailId == subitem.detailId) {
        this.errortopicdata.splice(i, 1);
        break;
      }
    }
  }

  isInErrorList(subitem){
    for(let index in this.errortopicdata){
      if(this.errortopicdata[index].id == subitem.id){
        //this item has already existed
        return true;
      }
    }

    return false;
  }

  try2AddInErrorList(subitem){
    if(this.isInErrorList(subitem)){
      return;
    }

    this.errortopicdata.push(subitem);
  }

  try2CollectErrorTopic(subitem){
    if(this.state.pageType == ExamDefine.TYPE_EXERCISE){
      subitem.isrightanswer = this.checkAnswerIsRight(subitem);

      if(subitem.isrightanswer){
        return;
      }

      if(this.needshowerrorprompt && !subitem.isrightanswer){
        this.needshowerrorprompt = false;
        this.try2ShowPromptDialog();
      }

      studydispatcher.checkErrorTopic(subitem, (resData, success)=>{
        if(success && !subitem.isrightanswer){
            this.try2AddInErrorList(subitem);
        }
      });
    }
  }

  onItemSelect(index){
    console.log('on item select lock = ' + this.lockSelect);
    if(this.lockSelect){
      return;
    }

    let subitem = this.examDataSource.getDataList()[this.state.subjectIndex];

    if(subitem.type == ExamDefine.SUBJECT_TYPE_SINGLE){
      this.clearItemViewsState();
      subitem.studentAnswer = "";

      this.refs['subitem' + index].setUserSelect(true);

      this.checkAnswer(subitem, false);
      this.examDataSource.updateExamData(subitem.studentAnswer, this.state.subjectIndex);
      this.try2CollectErrorTopic(subitem);

      if(this.state.pageType == ExamDefine.TYPE_EXERCISE && !this.checkAnswerIsRight(subitem)){
        return;
      }

      if(this.state.pageType == ExamDefine.TYPE_ERRORPROGRAMS && !this.checkAnswerIsRight(subitem)){
        return;
      }

      this.gotoSubject(this.state.subjectIndex + 1);
    }else{
      this.refs['subitem' + index].setUserSelect(!this.refs['subitem' + index].isSelectByUser);
    }
  }

  onNextSubjectItem(){
    if(this.lockSelect){
      return;
    }

    let subitem = this.examDataSource.getDataList()[this.state.subjectIndex];

    let res = this.checkAnswer(subitem, false);
    console.log('onNextSubjectItem index = ' + subitem.index + " student answer = " + subitem.studentAnswer);
    this.examDataSource.updateExamData(subitem.studentAnswer, this.state.subjectIndex);
    this.try2CollectErrorTopic(subitem);

    if (res) {
      this.gotoSubject(this.state.subjectIndex + 1);
    }
  }

  onTouchEnd(event){
    if(this.startX == -1 || this.endX == -1){
      return;
    }

    let triggleValue = 60;
    let curindex = this.state.subjectIndex;
    let nextindex = (this.endX - this.startX) > 0 ? (curindex - 1) : (curindex + 1);

    let distance = Math.abs(this.endX - this.startX);
    console.log('on touch end, distance = ' + distance);

    if(distance >= triggleValue){
      this.gotoSubject(nextindex);
    }

    this.startX = -1;
    this.endX = -1;
  }

  onTouchMove(event){
    if(this.startX == -1){
      return;
    }

    if (event.targetTouches.length == 1) {
      var touch = event.targetTouches[0];

      this.endX = touch.pageX;
    //  console.log('on touch move X = ' + touch.pageX);
    }
  }

  onTouchStart(event){
    if (event.targetTouches.length == 1) {
      var touch = event.targetTouches[0];

    //  console.log('on touch start X = ' + touch.pageY);
      this.startX = touch.pageX;
    }
  }

  static defaultProps = {
  }

  onSubjectViewSwitch(){
    this.refs.subitemsview.showView(true);
  }

  onStartExam(data){
    setTimeout(()=>{
      this.initExamMain(data);
    }, 100);
  }

  clearRecordsCallback(){
    let msg = zastrings.querenqingkongma;
    let iserror = false;
    if(this.state.pageType == ExamDefine.TYPE_ERRORPROGRAMS){
      msg = zastrings.querenqingkongcuotiji;
      iserror = true;
    }

    let dialog = new AlertDialog();

    dialog.setMessage(msg);
    dialog.setButton2(zastrings.clearconfirm, ()=>{
      dialog.dismiss();

      if(iserror){
        UIBase.showProgress(true);
        studydispatcher.clearErrorTopicSetRecord((resData, success) => {
          if(success){
            //this.examDataSource.clearRecords();
            //this.refs.subitemsview.showView(false);
            //this.gotoSubject(0);
            UIBase.showProgress(false);
            UIBase.showToast(zastrings.clearsuccess);

            if(webappjsinterface){
              webappjsinterface.closeWebView();
            }
          }else{
            UIBase.showProgress(false);
            UIBase.showToast(zastrings.clearfailed);
          }
        });
      }else{
        UIBase.showProgress(true);
        studydispatcher.clearExerciseRecord((resData, success) => {
          if(success){
            this.examDataSource.clearRecords();
            this.refs.subitemsview.showView(false);
            this.gotoSubject(0);
            UIBase.showProgress(false);
            UIBase.showToast(zastrings.clearsuccess);
          }else{
            UIBase.showProgress(false);
            UIBase.showToast(zastrings.clearfailed);
          }
        });
      }
    }, zastrings.cancel, ()=>{
      dialog.dismiss();
    });

    dialog.show();
  }

  render(){
    if(this.state.showexamdesc){
      return (
          <SimulatorEntry onStart={this.onStartExam.bind(this)}>
          </SimulatorEntry>
      )
    }else{
      if(!this.examDataSource){
        return (
          <div>
          </div>
        );
      }

      let subitem = this.examDataSource.getDataList()[this.state.subjectIndex];
      let listconfig = {
        sepreatorHeight: 10,
        sepreatorColor: '#fafafa'
      };

    //  console.log('start render');

      // for(let i in subitem.contentArray){
      //   console.log(subitem.contentArray[i].content);
      // }

      return (
        <div className='exam-main' onTouchStart={this.onTouchStart.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}
          onTouchMove={this.onTouchMove.bind(this)}>
          <div className='exam-content'>
            <div style={{height:'15px'}}></div>
            <div className='titlegroup'>
              <button>{subitem.type == ExamDefine.SUBJECT_TYPE_SINGLE ? zastrings.single : zastrings.multisel}</button>
              <a>{subitem.index + ". " + subitem.title}</a>
            </div>
            <div style={{height:'20px'}}></div>
            <div className="subjectgroup">
              <ListView ref="listview" config={listconfig}>
                {
                  subitem.contentArray.map((item,index)=> {
                    return (
                      <SubjectItem key={index} type={subitem.type} value={item.value} content={item.content} ref={"subitem" + index}
                        onItemClick={this.onItemSelect.bind(this, index)}>
                      </SubjectItem>
                    );
                  })
                }
              </ListView>
            </div>
            <div style={{height:'20px'}}></div>
            <button className='nextsubject_btn' type={subitem.type} onClick={this.onNextSubjectItem.bind(this)}>{zastrings.xiayiti}</button>

            <div className='bottomdesc'>
              <a className='bottomdesctext'>{zastrings.zuoyouhuadongqieti}</a>
              <div className="shadow"></div>
              <SubjectItemsDesc onArrowClick={this.onSubjectViewSwitch.bind(this)} ref='subitemdesc' examType={this.state.pageType}></SubjectItemsDesc>
            </div>
          </div>

          <SubjectItemsView ref='subitemsview' examType={this.state.pageType} clearRecordsCallback={this.clearRecordsCallback.bind(this)}></SubjectItemsView>
        </div>
      )
    }
  }
}
