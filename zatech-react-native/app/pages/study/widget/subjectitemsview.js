import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './subjectitemsview.scss';
import SubjectItemsDesc from './subjectitemsdesc.js';
import ExamDefine from './../examdefine';

export default class SubjectItemsView extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      show: false
    }

    this.isAdjusted = false;
  }

  adjustItemHeight(){
    if(this.isAdjusted){
      return;
    }

    console.log('adjusting the height of subview items');
    let itemgroups = $(".itemgroup");
    let index = 0;
    let length = itemgroups.length;

    let intervalid = setInterval(function(){
      console.log('ajust interval index = ' + index);
      for(let tempindex = 0; tempindex < 20; tempindex++){
        let finalindex = index + tempindex;

        if(finalindex >= length){
          clearInterval(intervalid);
          return;
        }

        let i = $(itemgroups[finalindex]);
        let w = i.css('width');

        i.css('height', w);
        i.css('line-height', w);

        let btn = $('.btn', i);
        btn.css('border-radius', w);
        btn.css('border-width', '1px');
      }

      index += 10;
    }, 100);

    this.isAdjusted = true;
  }

  showView(s){
    if(!this.datasouce){
      return;
    }

    this.setState({
      show: s
    })

    if(s){
      this.adjustItemHeight();
    }
  }

  isShow(){
    return this.state.show;
  }

  onTouchEnd(event){
    event.stopPropagation();

    if(this.startY == -1 || this.endY == -1){
      return;
    }

    let triggleValue = 60;

    let distance = Math.abs(this.endY - this.startY);
    console.log('on touch end, distance = ' + distance);

    if(this.endY > this.startY && distance >= triggleValue){
      this.showView(false);
    }

    this.startX = -1;
    this.endX = -1;
  }

  onTouchMove(event){
    event.stopPropagation();

    if(this.startY == -1){
      return;
    }

    if (event.targetTouches.length == 1) {
      var touch = event.targetTouches[0];

      this.endY = touch.pageY;
    //  console.log('on touch move X = ' + touch.pageX);
    }
  }

  onTouchStart(event){
    event.stopPropagation();

    if (event.targetTouches.length == 1) {
      var touch = event.targetTouches[0];

      console.log('on touch start Y = ' + touch.pageY);
      this.startY = touch.pageY;
    }
  }

  onSubjectViewSwitch(){
    this.showView(false);
  }

  clearRecords(){
    if(this.props.clearRecordsCallback){
      this.props.clearRecordsCallback();
    }
  }

  componentDidMount(){
  }

  onTouchEndContent(event){
    event.stopPropagation();
  }

  onTouchMoveContent(event){
    event.stopPropagation();
  }

  onTouchStartContent(event){
    event.stopPropagation();
  }

  setExamDataSource(datasource){
    this.datasouce = datasource;

    this.datasouce.setDataChangeListener((item, right, error, index, total)=>{
      if(index == -1){
        return;
      }

      this.refs.subitemdesc.setRightValue(right);
      this.refs.subitemdesc.setErrorValue(error);
      this.refs.subitemdesc.setIndexValue(index);
      this.refs.subitemdesc.setTotalValue(total);
    });
  }

  getDataList(){
    if(this.datasouce){
      return this.datasouce.getDataList();
    }

    return [];
  }

  needShowClearRecord(){
    if (this.props.examType == ExamDefine.TYPE_EXAM ||
        this.props.examType == ExamDefine.TYPE_SIMULATOR
        ){
      return false;
    }

    return true;
  }

  onItemClick(index){
    this.datasouce.gotoItemByIndex(index);
  }

  render(){
    console.log('render subject item view');

    return (
      <div className='subjectitemsview' onTouchStart={this.onTouchStart.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}
        onTouchMove={this.onTouchMove.bind(this)} style={
          {
            display: this.state.show ? 'block' : 'none'
          }
        }>
        <div className='content' onTouchStart={this.onTouchStartContent.bind(this)} onTouchEnd={this.onTouchEndContent.bind(this)}
          onTouchMove={this.onTouchMoveContent.bind(this)}>
          <SubjectItemsDesc arrowRotateDegree={180} ref='subitemdesc' onArrowClick={this.onSubjectViewSwitch.bind(this)}
            examType={this.props.examType}></SubjectItemsDesc>
          <div className='space' style={
            {
              display : this.needShowClearRecord() ? 'block' : 'none'
            }
          }>
            <div className='cleargroup' onClick={this.clearRecords.bind(this)}>
              <img src={require('./../res/clear.png')}></img>
              <a>清空记录</a>
            </div>
          </div>
          <div className='seperator' style={
            {
              display : this.needShowClearRecord() ? 'none' : 'block'
            }
          }></div>
          <div className='items'>
            {
              this.getDataList().map((item,index)=> {
                return (
                  <div className='itemgroup' key={index}>
                    <button className={'btn'} type={this.datasouce.checkAnswerState(index)} onClick={this.onItemClick.bind(this, index)}>
                      {item.index}
                    </button>
                  </div>
                );
              })
            }
          </div>
          <div style={
            {
              height:'10px'
            }
          }></div>
        </div>
      </div>
    )
  }
}
