import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './simulator-list.scss';

import {UIBase} from './../../appbase/appbase'
import ListView from './../../component/listview/listview.jsx';
import HQWebAppRouter from './../../appbase/hqwebapprouter.js';
import webappjsinterface from './../jsinterface/jsinterface.js';
import ExamDefine from './examdefine';

import mylocalstorage from './../../appbase/localstorage.js';
import utils from './../../appbase/utils/utils';

export default class SimulatorList extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      listitems:[
      ]
    }

    let examinfo = utils.Json2Obj(mylocalstorage.getData('examdata'));

    for(let key in examinfo.mockExam){
      let item = {};
      item.name = examinfo.mockExam[key];
      item.value = key;

      console.log('name = ' + item.name);

      this.state.listitems.push(item);
    }
    this.setNativeHeader();
  }

  setNativeHeader(){
    webappjsinterface.setJnjectCallback(function(){
      //alert(111);
      webappjsinterface.setWebViewTitle(zastrings.xuanzemonikaojuan);
    });
  }

  listitemClick(index){
    var data = {
      item: this.state.listitems[index].value,
      title: this.state.listitems[index].name,
      type: ExamDefine.TYPE_SIMULATOR
    }

    webappjsinterface.setWebViewTitle('');
    HQWebAppRouter.link2page('exam-main', data);
  }

  render(){
    return (
      <div className='simulatorlist'>
        <ListView ref="listview">
          {
            this.state.listitems.map((item,index)=> {
              return (
                <div className='listitem' key={index} onClick={this.listitemClick.bind(this, index)}>
                  <a>{item.name}</a>

                  <div className='arraygroup'>
                    <img src={require('./res/array-up.png')}>
                    </img>
                  </div>
                </div>
              );
            })
          }
        </ListView>
      </div>
    )
  }
}
