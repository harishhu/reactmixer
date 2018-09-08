import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TaskListItem from './tasklistitem.jsx';
import ListView from './../../component/listview/listview.jsx';

import requestDispatcher from './dispatcher/taskcenterdispatcher';
import RequestItemBase from './../../ajax/requestitems';
import {UIBase} from './../../appbase/appbase'
import TaskHeader from './taskheader.jsx';

import TaskCenterJSInterface from './../jsinterface/taskcenterjsinterface';
import applog from './../../appbase/applog';

import utils from './../../appbase/utils/utils';

import './yinxiaoyuanview.scss'

const ITEM_HEIGHT = 94;

const IMAGE_WIDTH_NORMAL = 40;//50;
const IMAGE_HEIGHT_NORMAL = 29.6;//37;

const IMAGE_WIDTH_BIGGER = 60;//75;
const IMAGE_HEIGHT_BIGGER = 42.4//53;

class YinXiaoYuanView extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      dataItems:[],
      emptyStr: undefined
    }
  }

  refreshTaskData(finishState, data){
    //alert('yinxiaoyuan refresh data');
    applog.log('refresh yxy task data, finishState = ' + finishState);
    //UIBase.showToast('refresh yxy task data, finishState = ' + finishState);

    let temp = data;
    this.taskData = undefined;

    this.setTaskData(finishState, temp);
  }

  setTaskData(finishState, data){
    if(!this.taskData){
      this.taskData = data;

      if(!finishState){
        this.setState({
          emptyStr:zastrings.yxyemptystr
        });
        return;
      }

      UIBase.showProgress(true);

      requestDispatcher.queryTaskList(this.taskData.code, "", (responseData)=>{
        UIBase.showProgress(false);
        if(RequestItemBase.isResponseSuccess(responseData)){
          UIBase.showToast(responseData.errorMsg);
          this.initTaskList(responseData.value);
        }else{
          UIBase.showToast(responseData.errorMsg);
        }

        UIBase.showProgress(false);
        requestDispatcher.queryTaskActiveDegree((responseData)=>{
          UIBase.showProgress(false);
          this.initTaskHeader(responseData.value);

          var jsonStr = JSON.stringify(responseData.value);

          //alert(jsonStr);

          if(RequestItemBase.isResponseSuccess(responseData)){
            UIBase.showToast(responseData.errorMsg);
          }else{
            UIBase.showToast(responseData.errorMsg);
          }
        });
      });
    }
  }

  initTaskHeader(data){
    applog.log('init yinxiaoyuan task header');
    let headerData = {
      tintlist:[
        {
          pos:0,
          text:'0',
          color:'#000000',
          width: IMAGE_WIDTH_NORMAL,
          height: IMAGE_HEIGHT_NORMAL
      }]
    };

    let count = data.detail.length;
    let posstart = 0;
    let posend = data.detail[count - 1].limited;

    // data.current = '3000';
    // data.detail[0].finishState = true;
    // data.detail[0].drawState = false;
    for(var index in data.detail){
      let detailitem = data.detail[index];

      var isfinishanddraw = detailitem.finishState && detailitem.drawState;

      var texttmp = isfinishanddraw ? detailitem.limited + "" : detailitem.limited + "";
      var colortmp = isfinishanddraw ? '#999999' : '#13a5ff';
      var postmp = detailitem.limited / posend;

      var imgtmp = require('./res/baoxiang-light.png');

      if(isfinishanddraw){
        imgtmp = require('./res/baoxiang-gray.png');
      }

      let w = IMAGE_WIDTH_NORMAL;
      let h = IMAGE_HEIGHT_NORMAL;
      let isbigger = false;

      if(detailitem.finishState && !detailitem.drawState){
        //imgtmp = require('./res/baoxiang-light-open.png');
        //w = IMAGE_WIDTH_BIGGER;
        //h = IMAGE_HEIGHT_BIGGER;
        isbigger = true;
      }

      var item = {
        pos: postmp,
        text: texttmp,
        color:colortmp,
        image: imgtmp,
        width: w,
        height: h,
        isbigger: isbigger,
        rawdata : detailitem
      };

      headerData.tintlist.push(item);
    }

    //data.current = "1000";
    headerData.desc = zastrings.yxyheaderdesc;
    headerData.posProgress = parseInt(data.current);
    headerData.posEnd = parseInt(posend);

    applog.log("init header pos end = " + posend);
    this.refs.taskheader.initTaskHeader(headerData);
  }

  initTaskList(value){
    // if(this.state.dataItems && this.state.dataItems.length > 0){
    //   return;
    // }

    this.setState({
      dataItems: value
    });

    for(var index in this.state.dataItems){
      this.refs['item' + index].setItemData(this.state.dataItems[index]);
    }
  }

  componentDidMount(){
  }

  itemDataGoto(finishState, data){
    // alert('item data goto ' + finishState + data + '');
    if(finishState){
      TaskCenterJSInterface.takeTaskAward(JSON.stringify(data));
    }else{
      TaskCenterJSInterface.gotoTaskEntry(JSON.stringify(data));
    }
  }

  headerItemClick(itemData){
    let rawdata = itemData.rawdata;

    if(rawdata){
      if(rawdata.finishState && !rawdata.drawState){
        TaskCenterJSInterface.changeMissionAward(JSON.stringify(rawdata));
      }
    }
  }

  render(){
    if(this.state.emptyStr){
      return (
        <div className='yinxiaoyuanview centerView'>
          <a className="emptyview">
            {this.state.emptyStr}
          </a>
        </div>
      )
    }else{
      let listconfig = {
        sepreatorColor: '#f4f4f4',
        sepreatorHeight: 1
      }
    return (
      <div className='yinxiaoyuanview'>
        <TaskHeader ref='taskheader' showactivedegress={true} tintItemClickEvent={this.headerItemClick.bind(this)}>
        </TaskHeader>

        <div className='seperator'>
        </div>

        <ListView ref="listview" config={listconfig}>
          {
            this.state.dataItems.map((item,index)=> {
              return (
                <TaskListItem ref={('item' + index)}key={index} itemHeight={ITEM_HEIGHT} itemDataGoto={this.itemDataGoto}>
                </TaskListItem>
              );
            })
          }
        </ListView>
      </div>
    );
  }
}
}

class HQCoinAnimator{
  constructor(owner){
    this.owner = owner;
  }

  startAnim(from, to){
    let img = $('<img/>');

    img.attr('src', require('./res/hq_coin.png'));
    img.attr('class', 'flyhqcoin');

    img.css('left', '200px');
    img.css('top', '200px');

  //  utils.rotateItemCss(img, 180);
  //  utils.scaleItemCss(img, 0.5);

    this.rotateX = 0;
    this.owner.append(img);

    this.intervalid = setInterval(()=>{
      this.makeRotateXValue();
      img.css("transform",`rotateX(${this.rotateX}deg) scale(${0.5}, ${0.5})`);
    }, 50);
  }

  makeRotateXValue(){
    this.rotateX += 10;

    if(this.rotateX > 360){
      this.rotateX = 0;
    }
  }
}

module.exports = YinXiaoYuanView;
