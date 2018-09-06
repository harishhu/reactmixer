import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './tasklistitem.scss'

class TaskListItem extends React.Component{
  constructor(props){
    super(props);

    this.itemDataGotoClick = this.itemDataGotoClick.bind(this);

    this.state = {
      data:   {
          "id":0,
          "name":"",
          "code":"",
          "extraInfo":"",
          "imageUrl":"",
          "finishAward":0,
          "finishAwardType":"HQ币",
          "entrySchema":'',
          "sequence":0,
          "finishState":false,
          "drawState":false,
          "progressState":"0/0"
        }
    }
  }

  setItemData(itemdata){
    // itemdata.finishState = false;
    // itemdata.drawState = false;

    let possplit = itemdata.progressState.split("/");
    itemdata.taskprogress = possplit[0];
    itemdata.tasktotal = possplit[1];

    this.setState({
      data : itemdata
    });
  }

  getFinishAwardText(){
    let prex = "";
    if(this.state.data.finishAwardType=="活跃度" ){
      prex = zastrings.activitydegreee;
    }
    return prex + "+" + this.state.data.finishAward;
  }

  isFinishTask(){
    let ret = this.state.data.finishState && this.state.data.drawState;

    if(ret && this.state.data.code == "NEW"){
      return false;
    }

    return ret;
  }

  getRightButtonText(){
    let ret = this.state.data.finishState && this.state.data.drawState;
    let text = this.state.data.finishState ? zastrings.take : zastrings.goto;

    if(ret && this.state.data.code == "NEW"){
      text = zastrings.gosee;
    }

    return text;
  }

  itemDataGotoClick(){
    this.props.itemDataGoto(this.state.data.finishState, this.state.data)
  }

  render(){
    return (
      <div className='tasklistitem'>
        <img className='itemicon' src={this.state.data.imageUrl}
          style={
            {
              marginLeft: '15px',
              marginTop: '15px',
              width: '45px',
              height: '45px'
            }
          }
        />

        <div className="titlegroup" style={
          {
            marginTop: '15px',
            marginLeft: '15px',
          }
        }>
          <title style={{fontSize: '16px'}}>
            {this.state.data.name}
          </title>
          <div style={{height:'3px'}}></div>
          <desc style={{fontSize: '13px'}}>
            {this.state.data.extraInfo}
          </desc>

          <goldinfo style={{marginTop: '6px'}}>
            <img src={require('./res/gold-icon.png')}
            style={
              {
                width: '18px',
                height: '18px',
                display: this.state.data.finishAwardType== zastrings.hqcion ?'inline':'none'
              }
            }
           />
            <a style={
              {
                fontSize: '12px',
                marginLeft: this.state.data.finishAwardType== zastrings.hqcion ? '6px':'0px',
                lineHeight: '18px'
              }
            }>{this.getFinishAwardText()}</a>
          </goldinfo>
        </div>

        <itemright style={
          {
             lineHeight: this.isFinishTask() ? (this.props.itemHeight / 2 + 'px') : 'normal'
          }
        }>
         <div style={
           {
             display: this.isFinishTask() ? 'none' : 'block'
           }
         }>
         <button className={this.state.data.finishState ? "itemgoto" : "itemgotodraw"} style={
           {
             fontSize: '14px',
             width: '85px',
             height: '35px'
           }
         } onClick={this.itemDataGotoClick}>
           <a>{this.getRightButtonText()}</a>
         </button>
         <taskprogress style={
           {
             marginTop: '7px',
             width: '85px',
             fontSize: '13px'
           }
         }>
           <span className='progress'>{this.state.data.taskprogress}</span>
           <span className='total'>/{this.state.data.tasktotal}</span>
         </taskprogress>
         </div>

         <div className="itemfinish">
           <a className="finishtext" style={
             {
               display: this.isFinishTask() ? 'inline' : 'none'
             }
           }>{zastrings.finish}</a>
         </div>
        </itemright>
      </div>
    )
  }
}


module.exports = TaskListItem;
