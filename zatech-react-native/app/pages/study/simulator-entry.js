import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './simulator-entry.scss';

import {UIBase} from './../../appbase/appbase'
import HQWebAppRouter from './../../appbase/hqwebapprouter.js';
import DivAutoAdjust from './../../component/divautoadjust/divautoadjust.jsx';
import ExamDefine from './examdefine'
import studydispatcher from './dispatcher/studydispatcher.js';

export default class SimulatorEntry extends React.Component{
  constructor(props){
    super(props);

    var data = HQWebAppRouter.getRoutePageAttachData();
    this.state = {
      item: data.item,
      type: data.type,
      exitbyback: data.exitbyback,
      contentTop: '5',
      title: data.title,
      time:'',
      subjectcount:''
    }

    this.isfirst = false;
  }

  headerSizeAdjustFinish(height){
    this.setState({
      contentTop: height - 70
    });
  }

  componentDidMount(){
    if(!this.isfirst){
      this.isfirst = true;

      UIBase.showProgress(true);

      this.examDataSource = undefined;

      studydispatcher.createExamPaper(this.state.type, this.state.item, (responseData, success)=>{
        UIBase.showProgress(false);

        if(success){
          this.examDataSource = responseData.value;

          let tm = this.examDataSource.answerTime / (1000 * 60) + zastrings.fenzhong;
          let number = this.examDataSource.getExamDataInfo().total + zastrings.daoti;

          this.setState({
            subjectcount: number,
            time : tm
          });
        }else{
          UIBase.showToast(zastrings.meiyoukaoshineirong);
          setTimeout(function(){
            if(webappjsinterface.isInjected()){
              webappjsinterface.closeWebView();
            }
          }, 1500);
        }
      });

      if(this.state.exitbyback){
        this.setNativeHeader();
      }
    }
  }

  setNativeHeader(){
    webappjsinterface.setJnjectCallback(()=>{
      webappjsinterface.setActionBarBackItem(zastrings.back, ()=>{
        webappjsinterface.closeWebView();
      });
    });
  }

  startExam(){
    if(!this.examDataSource){
      UIBase.showToast(zastrings.huoqukaoshishujushibai);
      return;
    }

    if(this.props.onStart){
      this.props.onStart(this.examDataSource);
    }
  }

  getHeaderBackground(){
    if(this.state.type == ExamDefine.TYPE_EXAM){
      return require('./res/offical-kaoshi.png');
    }

    return require('./res/moni-bkg.png');
  }

  render(){
    if(!this.examDataSource){
      return (
        <div>
        </div>
      )
    }

    let str = zastrings.manfentixing.format(this.examDataSource.totalGrade, this.examDataSource.passStandard);

    return (
      <div className='simu-entry'>
        <DivAutoAdjust divBackground={this.getHeaderBackground()} sizeRatio={0.8706666} marginTop={0}
                       divAdjustFinish={this.headerSizeAdjustFinish.bind(this)}>
        </DivAutoAdjust>

        <div className='content' style={
          {
            top: this.state.contentTop + 'px'
          }
        }>
        <div style={{height:'57px'}}></div>
        <div className='itemgroup'>
          <div className='itemgroup1'>
            <div className='item-keyvalue' type={this.state.type}>
              <a className='itemkey'>{zastrings.kaoshixuanze}</a>
              <div className='seperator'></div>
              <a className='itemvalue itemtitle'>{this.state.title}</a>
            </div>

            <div className='item-keyvalue'>
              <a className='itemkey'>{zastrings.kaotishulian}</a>
              <div className='seperator'></div>
              <a className='itemvalue'>{this.state.subjectcount}</a>
            </div>

            <div className='item-keyvalue'>
              <a className='itemkey'>{zastrings.kaoshishijian}</a>
              <div className='seperator'></div>
              <a className='itemvalue'>{this.state.time}</a>
            </div>

            <div className='item-keyvalue'>
              <a className='itemkey'>{zastrings.hegebiaozhun}</a>
              <div className='seperator'></div>
              <a className='itemvalue'>{str}</a>
            </div>
          </div>
        </div>

        <div style={{height:'35px'}}></div>

        <div className='buttongroup'>
          <div>
            <button onClick={this.startExam.bind(this)}>{this.state.type == ExamDefine.TYPE_EXAM ? zastrings.kaishizhengshkaoshi: zastrings.kaishimonikaoshi}</button>
          </div>
        </div>

        </div>
      </div>
    )
  }
}
