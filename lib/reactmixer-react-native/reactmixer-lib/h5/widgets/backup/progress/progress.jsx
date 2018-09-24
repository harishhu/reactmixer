import React from 'react';
import './progress.scss';

export default class Progress extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      progress: 0,
      bgcolor: '#f2f4f5',
      progresscolor: '#29b3ff',
      startpos: 0,
      endpos: 100
    }
  }

  static defaultProps = {
    height:'0',
    width: '0',
  }

  setProgressMax(max){
    this.setState({
      endpos: max
    });
  }

  setProgress(value){
    console.log("set progress value = " + value + " start pos = " + this.state.startpos + " end pos =" + this.state.endpos);
    if(value < this.state.startpos){
      value = this.state.startpos;
    }

    if (value > this.state.endpos){
      value = this.state.endpos;
    }

    this.setState({
      progress: value
    });
  }

  render(){
    let percent = this.state.progress / (this.state.endpos - this.state.startpos) * 100;
    //alert(percent);
    console.log(percent + " progress = " + this.state.progress);
    let finish = "";
    if(percent == 100){
      finish = ' progressfinish';
    }

    return (
      <div className='progress-group' style={
        {
          marginTop: this.props.marginTop + "px",
          width: this.props.width + 'px',
          height: this.props.height + 'px',
          backgroundColor: this.state.bgcolor
        }
      }>

      <div className={'progress' + finish} style={
          {
            width: percent + '%',
            backgroundColor: this.state.progresscolor
          }
        }>
      </div>

      </div>
    )
  }
}
