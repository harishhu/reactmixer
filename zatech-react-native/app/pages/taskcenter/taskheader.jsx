import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Progress from './../../component/progress/progress.jsx';

import './taskheader.scss'

const PROGRESS_WIDTH = window.screen.width * 0.9 / window.HQappInitScale;
const PROGRESS_HEIGHT = 7;
const PROGRESS_MARGIN_TOP = 28;

const IMAGE_WIDTH_BIGGER = 60;//75;
const IMAGE_HEIGHT_BIGGER = 42.4;//53;

export default class TaskHeader extends React.Component{
  static defaultProps = {
    showactivedegress:false
  }

  constructor(props){
    super(props);

    this.tinttext = [
      {
      pos:0,
      text:'0',
      color:'#000000'
    },
    {
      pos:0.5,
      text:'6',
      color:'#13a5ff'
    },{
      pos:1,
      text:'12',
      color:'#000000'
    }
    ];

    this.tintimage = [
      {
        pos:0.3,
        image:require('./res/baoxiang-gray.png')
      },
      {
        pos:1.0,
        image:require('./res/baoxiang-light.png')
      }
    ];

    this.state = {
      headerData:{}
    }
  }

  componentDidMount(){
  }

  tintItemClickEvent(data){
    //alert(data.rawdata);
    if(this.props.tintItemClickEvent){
      this.props.tintItemClickEvent(data);
    }
  }

  shakeBox(data, ele){
    let box = $('img', ele);
    let minvalue = 0.8;
    let maxvalue = 1.4;
    let current = 1.0;
    let intervalevalue = 0.09;
    let plus = true;
    let timeid = 0;
    let triggercount = 0;

    timeid = setInterval(()=>{
      if(plus){
        current += intervalevalue;

        if(current >= maxvalue){
          plus = false;

          triggercount++;

          if(triggercount == 2){
            clearInterval(timeid);
            this.openBox(data, ele);
            return;
          }

          current = maxvalue;
        }
      }else{
        current -= intervalevalue;

        if(current <= minvalue){
          plus = true;
          current = minvalue;
        }
      }

      box.css("transform",`scale(${current}, ${current})`);
    }, 40);
  }

  openBox(data, ele){
    let box = $('img', ele);

    ele.css('line-height', '2px');

    box.css('width', IMAGE_WIDTH_BIGGER + 'px');
    box.css('height', IMAGE_HEIGHT_BIGGER + 'px');

    box.css("transform",'scale(1.0, 1.0)');
    box.attr('src', require('./res/baoxiang-light-open.png'));
  }

  initTintItems(tintdata){
    let header = $(this.refs.taskheader);

    let leftpos = (header.width() - PROGRESS_WIDTH) / 2;
    let toppos = PROGRESS_MARGIN_TOP + PROGRESS_HEIGHT / 2 - 6;

    $('tintitem', header).remove();

    for(var tmp in tintdata){
      let data = tintdata[tmp];
      let itemwidth = data.width;
      if(data.isbigger){
        itemwidth = IMAGE_WIDTH_BIGGER;
      }
      let leftX = leftpos + PROGRESS_WIDTH * data.pos - itemwidth / 2;
      let topy = toppos - data.height / 2;

      if(leftX + itemwidth > header.width()){
        leftX = header.width() - itemwidth;
      }

      let ele = $('<tintitem/>');
      ele.css('left', leftX + 'px');
      ele.css('top', topy + 'px');
      ele.css('width', itemwidth + 'px');

      if(data.isbigger){
        ele.css('line-height', '18px');
        ele.css('width', itemwidth + 'px');
      }else{
        ele.css('line-height', '18px');
      }

      let img = $('<img/>');

      img.click(this.tintItemClickEvent.bind(this, data));

      img.css('width', data.width + 'px');
      img.css('height', data.height + 'px');
      img.attr('src', data.image);

      ele.append(img);

      if(data.text){
        let txt = $(`<a>${data.text}</a>`);
        ele.css('color', data.color);

        ele.append(txt);
      }

      header.append(ele);

      if(data.isbigger){
        this.shakeBox(data, ele);
      }
    }
  }

  initTaskHeader(data){
    this.refs.progress.setProgressMax(data.posEnd);
    this.refs.progress.setProgress(data.posProgress);

    this.setState({
      headerData: data
    });

    setTimeout(()=>{
      this.initTintItems(data.tintlist);
    }, 50);
  }

  render(){
    console.log('task header is rendering');

    let str = "";
    if(this.state.headerData.posProgress != undefined){
      str = zastrings.todayactivity + this.state.headerData.posProgress;
    }

    return (
      <div ref="taskheader" className='taskheader' style={
        {
          height: this.props.showactivedegress ? '126px' : '108px'
        }
      }>
        <Progress ref='progress' marginTop={PROGRESS_MARGIN_TOP} width={PROGRESS_WIDTH + ""} height={PROGRESS_HEIGHT + ""}>
        </Progress>

        <headerdesc style={
          {
            fontSize: '12px',
            marginTop: '30px'
          }
        }>

        <a>
          {this.state.headerData.desc}
        </a>

        <br/>

        <a className='activedegree' style={
          {
            //display: this.props.showactivedegress ? 'inline' : 'none'
          }
        }>
         &nbsp;{this.props.showactivedegress ? str : ""}&nbsp;
        </a>
        </headerdesc>
      </div>
    )
  }
}
