import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import TaskListItem from './tasklistitem.jsx';
import ListView from './../../component/listview/listview.jsx';
import TaskHeader from './taskheader.jsx';

import requestDispatcher from './dispatcher/taskcenterdispatcher';
import RequestItemBase from './../../ajax/requestitems';
import {UIBase} from './../../appbase/appbase'

import TaskCenterJSInterface from './../jsinterface/taskcenterjsinterface';
import applog from './../../appbase/applog';

import './xinbinview.scss';

const ITEM_HEIGHT = 94;

const IMAGE_WIDTH_NORMAL = 40;//50;
const IMAGE_HEIGHT_NORMAL = 29.6;//37;

const IMAGE_WIDTH_BIGGER = 60;//75;
const IMAGE_HEIGHT_BIGGER = 42.4;//53;

class XinBinView extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      dataItems:[],
      emptyStr: undefined
    }
  }

  initTaskHeader(data){
    applog.log('init task header');
    let headerData = {};
    headerData.selectCount = data.selectCount;

    let posarray = data.progressState.split('/');

    var imgtmp = require('./res/baoxiang-light.png');

    let w = IMAGE_WIDTH_NORMAL;
    let h = IMAGE_HEIGHT_NORMAL;
    let isbigger = false;

    let boxtext = "";

    //data.drawState = false;
    if(data.finishState){
      if(data.drawState){
        imgtmp = require('./res/baoxiang-gray.png');
        w = IMAGE_WIDTH_NORMAL;
        h = IMAGE_HEIGHT_NORMAL;
        isbigger = false;
        boxtext = '';
      }else{
      //  imgtmp = require('./res/baoxiang-light-open.png');
        //w = IMAGE_WIDTH_BIGGER;
        //h = IMAGE_HEIGHT_BIGGER;
        isbigger = true;
      }
    }

    headerData.tintlist = [
    {
      pos:0,
      text:'0',
      color:'#000000',
      width: IMAGE_WIDTH_NORMAL,
      height: IMAGE_HEIGHT_NORMAL
    },
    {
      pos: posarray[0] / posarray[1],
      text:posarray[0] + '',
      color:'#13a5ff',
      width: IMAGE_WIDTH_NORMAL,
      height: IMAGE_HEIGHT_NORMAL
    },
    {
      pos: posarray[1] / posarray[1],
      text:posarray[1] + '',
      color:'#000000',
      width: IMAGE_WIDTH_NORMAL,
      height: IMAGE_HEIGHT_NORMAL
    }
    ];

    if(posarray[0] == headerData.selectCount){
      if(boxtext != ""){
        headerData.tintlist[1].text = '';
      }
    }

      headerData.tintlist.push({
          pos:headerData.selectCount / posarray[1],
          image: imgtmp,
          width: w,
          height: h,
          isbigger: isbigger,
          color:'#999999',
          text: boxtext
        })

    headerData.desc = zastrings.opentruesurebox.format(headerData.selectCount);
    headerData.posProgress = parseInt(posarray[0]);
    headerData.posEnd = parseInt(posarray[1]);

    applog.log("pos = " + headerData.posProgress);
    this.refs.taskheader.initTaskHeader(headerData);
  }

  refreshTaskData(finishState, data){
    //alert('xinbin refresh data');
    let temp = data;
    this.taskData = undefined;

    this.setTaskData(finishState, temp);
  }

  setTaskData(finishState, data){
    //alert("set task data " + this.taskData);
    if(!this.taskData){
      this.initTaskHeader(data);
      this.taskData = data;

      if(!finishState){
        this.setState({
          emptyStr:'完成新人指引后开启任务'
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
      });
    }
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
    //alert('xinbin');
    if(itemData.image){
      applog.log("xin bin header click = " + this.taskData.finishState + " " + this.taskData.drawState);
      if(this.taskData.finishState && !this.taskData.drawState){
        TaskCenterJSInterface.takeTaskAward(JSON.stringify(this.taskData));
      }
    }
  }

  render(){
    if(this.state.emptyStr){
      return (
        <div className='xinbinview centerView'>
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
        <div className='xinbinview'>
          <TaskHeader ref='taskheader' tintItemClickEvent={this.headerItemClick.bind(this)}>
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

module.exports = XinBinView;
