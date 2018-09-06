import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ListView from './../../component/listview/listview.jsx';
import TaskListItem from './tasklistitem.jsx';

import {UIBase} from './../../appbase/appbase'
import requestDispatcher from './dispatcher/taskcenterdispatcher';
import RequestItemBase from './../../ajax/requestitems';

import TaskCenterJSInterface from './../jsinterface/taskcenterjsinterface';
import applog from './../../appbase/applog';


const ITEM_HEIGHT = 94;
class XinRenView extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      dataItems:[]
    }
  }

  refreshTaskData(){
    //alert('xinren refresh data');

    let temp = this.taskData;
    this.taskData = undefined;

    this.setTaskData(temp);
  }

  setTaskData(data){
    if(!this.taskData){
      this.taskData = data;

      UIBase.showProgress(true);
      //alert("query task code = " + this.taskData.code);
      requestDispatcher.queryTaskList(this.taskData.code, "", (responseData)=>{
        UIBase.showProgress(false);
        //alert(responseData.toString());
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

  itemDataGoto(finishState, data){
  //  alert('new --- item data goto ' + finishState + JSON.stringify(data) + '');
  if(data.finishState && data.drawState && data.code == "NEW"){
    TaskCenterJSInterface.gotoTaskEntry(JSON.stringify(data));
    return;
  }

  if(finishState){
    TaskCenterJSInterface.takeTaskAward(JSON.stringify(data));
  }else{
    TaskCenterJSInterface.gotoTaskEntry(JSON.stringify(data));
  }

    // TaskCenterJSInterface.web.invoketest = function(data){
    //   alert(data);
    // }
  }

  componentDidMount(){
  }

  render(){
    let listconfig = {
      sepreatorColor: '#f4f4f4',
      sepreatorHeight: 1
    }
    return (
      <ListView ref="listview" config={listconfig}>
        {
          this.state.dataItems.map((item,index)=> {
            return (
              <TaskListItem ref={'item' + index} key={index} itemHeight={ITEM_HEIGHT} itemDataGoto={this.itemDataGoto}>

              </TaskListItem>
            );
          })
        }
      </ListView>
    );
  }
}

module.exports = XinRenView;
