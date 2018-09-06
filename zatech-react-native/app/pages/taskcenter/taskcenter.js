import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import {UIBase} from './../../appbase/appbase'

import webappjsinterface from './../jsinterface/jsinterface.js';
import './taskcenter.scss';

import ImageGallery from './../../component/imagegallery/imagegallery.jsx';
import TabsControl from './../../component/tabscontrol/tabs.jsx';

import XinRenView from './xinrenview.jsx';
import XinBinView from './xinbinview.jsx';
import YinXiaoYuanView from './yinxiaoyuanview.jsx';
import requestDispatcher from './dispatcher/taskcenterdispatcher';

import RequestItemBase from './../../ajax/requestitems';

import applog from './../../appbase/applog';
import utils from './../../appbase/utils/utils';
import HQWebAppRouter from './../../appbase/hqwebapprouter.js';

const HEADER_RATIO = 0.541333;

export default class TaskCenter extends React.Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.setNativeHeader();

    this.galleryItemSelect = this.galleryItemSelect.bind(this);
    this.tabItemChanged = this.tabItemChanged.bind(this);
    this.initTaskItems = this.initTaskItems.bind(this);

    this.galleryHeightAdjustFinish = this.galleryHeightAdjustFinish.bind(this);

    this.tabtitles=['one', 'two', 'three'];

    this.tabitems=[
        this.createXinRenTabItem.bind(this),
        this.createXinBinTabItem.bind(this),
        this.createYinXiaoYuanTabItem.bind(this)
    ];

    this.tabitemdata = [];

    this.state = {
      contentHeight: '100%',
    };

    this.currentIndex = -1;

    webappjsinterface.reloadPageData = (data)=>{
      // alert('reload page data index = ' + this.currentIndex);
      console.log('reloadPageData 1111');
      UIBase.showProgress(true);
      requestDispatcher.queryTaskCategory((responseData)=>{
        UIBase.showProgress(false);
        if(RequestItemBase.isResponseSuccess(responseData)){
          //UIBase.showToast(responseData.errorMsg);

          this.initTaskItems(responseData.value);

          if(this.currentIndex == 0){
            this.refs['tabitem' + this.currentIndex].refreshTaskData();
          }else{
            //this.tabitemdata[this.currentIndex].progressState = "5/10";
            this.refs['tabitem' + this.currentIndex].refreshTaskData(this.tabitemdata[this.currentIndex - 1].finishState, this.tabitemdata[this.currentIndex]);
          }

          //try 2 refresh next task data
          let nextIndex = this.currentIndex + 1;
          if(nextIndex < this.tabitemdata.count){
            this.refs['tabitem' + nextIndex].refreshTaskData(this.tabitemdata[nextIndex - 1].finishState, this.tabitemdata[nextIndex]);
          }
        }else{
          UIBase.showToast(responseData.errorMsg);
        }
      });
    }

    // setTimeout(()=>{
    //   alert('hahamm');
    //   let tt = {
    //     h:'aa'
    //   }
    //   window.iHealthBridge.goWebView('http://www.sina.com.cn', JSON.stringify(tt));
    // }, 5000);
  };

  setNativeHeader(){
    webappjsinterface.setJnjectCallback(()=>{
      webappjsinterface.setWebViewTitle(zastrings.taskcenter);
      this.initActionBarViews();
      webappjsinterface.showRightActionBarItem(true);
    });
  }

  initActionBarViews(){
    let image = require('./res/2x/icon_hq_detail.png');
    //alert(window.devicePixelRatio);

    if(window.devicePixelRatio == 3){
       image = require('./res/3x/icon_hq_detail.png');
    }

    image = utils.getSubImageStr(image);
    webappjsinterface.setWebviewMenuImage(image, ()=>{
      webappjsinterface.showRightActionBarItem(false);
      HQWebAppRouter.link2page(HQWebAppRouter.HQ_PATH_TASKCENTER_DESC);
    });
  }

  galleryItemSelect(index){
    applog.log('gallery item sel = ' + index);
    this.currentIndex = index;
    this.refs.tabcontrol.setSelectItem(index);
  }

  tabItemChanged(index){
    applog.log('tabItemChanged sel = ' + index);
    this.currentIndex = index;

    if(index >= 1){
      //this.tabitemdata[index - 1].finishState = true;
      this.refs['tabitem' + index].setTaskData(this.tabitemdata[index - 1].finishState, this.tabitemdata[index]);
    }else{
      this.refs['tabitem' + index].setTaskData(this.tabitemdata[index]);
    }
  }

  galleryHeightAdjustFinish(height){
    //delay executor to make sure that component render finish.
    setTimeout(()=>{
      let taskcenter = $(this.refs.taskcenter);
      this.setState({
        contentHeight: taskcenter.height() - height
      });
    }, 50);
  }

  render(){
    return (
      <div className="taskcenter" ref='taskcenter'>
      <ImageGallery ref='imagegallery' divBackground={require('./res/header-bkg.png')} sizeRatio={HEADER_RATIO} marginTop={0}
        itemSelectCallback={this.galleryItemSelect} divAdjustFinish={this.galleryHeightAdjustFinish}>
      </ImageGallery>

      <div className="taskcontent" style={{height: this.state.contentHeight}}>
        <TabsControl tabtitles={this.tabtitles} showheader={false} ref="tabcontrol" tabItemChanged={this.tabItemChanged}>
          {
            this.tabitems.map((item,index)=> {
              return item(index);
            })
          }
        </TabsControl>
      </div>
    </div>
  );
}

createXinRenTabItem(index){
  let name = 'tabitem' + index;
  return (
      <XinRenView key={index} ref={name}>
      </XinRenView>
    );
}

createXinBinTabItem(index){
  let name = 'tabitem' + index;

  return (
      <XinBinView key={index} ref={name}>
      </XinBinView>
  );
}

createYinXiaoYuanTabItem(index){
  let name = 'tabitem' + index;

  return (
      <YinXiaoYuanView key={index} ref={name}>
      </YinXiaoYuanView>
  );
}

componentDidMount(){
  UIBase.showProgress(true);
  requestDispatcher.queryTaskCategory((responseData)=>{
    UIBase.showProgress(false);
    if(RequestItemBase.isResponseSuccess(responseData)){
      UIBase.showToast(responseData.errorMsg);

      this.initTaskItems(responseData.value);

      this.refs.imagegallery.setDefaultGalleryIndex(this.getDefaultGalleryIndex(responseData.value));
    }else{
      UIBase.showToast(responseData.errorMsg);
    }
  });
}

getDefaultGalleryIndex(value){
  let code = utils.getUrlParam('code');

  //alert('parent code = ' + code);

  if(code && code != ""){
    if(code == 'BEGINNING'){
      return 0;
    }else if(code == 'GREAT'){
      return 2;
    }else if(code == 'EXERCISE'){
      return 1;
    }
  }

  let execiseok = false;
  let greatok = false;

  for(var index in value){
    let item = value[index];

    if(item.code == 'BEGINNING'){
      execiseok = item.finishState;
    }else if(item.code == 'GREAT'){
    }else if(item.code == 'EXERCISE'){
      greatok = item.finishState;
    }
  }

  if(greatok){
    return 2;
  }

  if(execiseok){
    return 1;
  }

  return 0;
}

 initTaskItems(value){
   if(!value){
     return;
   }

   var tmpitems = [];
   var tmpindex = 0;

   let previtem = undefined;

   for(var index in value){
     let item = value[index];

     if(item.code == 'BEGINNING'){
       item.image = require('./res/xinren.png');
       item.imagegray = require('./res/xinren-gray.png');

       item.mydesc = zastrings.beginingdesc;

       tmpitems[tmpindex++] = item;
     }else if(item.code == 'GREAT'){
      // item.finishState = false;

       let light = require('./res/yxy.png');
       let gray = require('./res/yxy-gray.png');

       if(previtem && previtem.finishState){
         item.image = light;
         item.imagegray = gray;
       }else{
         item.image = gray;
         item.imagegray = gray;
       }

       item.mydesc = zastrings.greatdesc;

       tmpitems[tmpindex++] = item;
     }else if(item.code == 'EXERCISE'){
       applog.log('set yinxiaoyuan data');
       //item.finishState = false;

       let light = require('./res/xinbin.png');
       let gray = require('./res/xinbin-gray.png');

       item.mydesc = zastrings.exercisedesc;

       if(previtem && previtem.finishState){
         item.image = light;
         item.imagegray = gray;
       }else{
         item.image = gray;
         item.imagegray = gray;
       }

       tmpitems[tmpindex++] = item;
     }

     previtem = item;
   }

   this.tabitemdata = tmpitems;
   this.refs.imagegallery.setGalleryItems(tmpitems);
 }
}
