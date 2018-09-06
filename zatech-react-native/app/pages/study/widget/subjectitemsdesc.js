import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './subjectitemsdesc.scss';
import ExamDefine from './../examdefine';

export default class SubjectItemsDesc extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      right : 0,
      error : 0,
      index : 0,
      total: 0
    }

    this.datasouce = undefined;

    this.showErrorNumber = 'Y';

    if(this.props.examType == ExamDefine.TYPE_SIMULATOR ||
      this.props.examType == ExamDefine.TYPE_EXAM ||
      this.props.examType == ExamDefine.TYPE_ERRORPROGRAMS){
        this.showErrorNumber = 'N';
      }
  }

  setRightValue(v){
    this.setState({
      right : v
    });
  }

  setErrorValue(v){
    this.setState({
      error : v
    });
  }

  setIndexValue(v){
    this.setState({
      index : v
    });
  }

  setTotalValue(v){
    this.setState({
      total : v
    });
  }

  static defaultProps = {
    onArrowClick: undefined,
    arrowRotateDegree: 0
  }

  onMiddleClick(){
    if(this.props.onArrowClick){
      this.props.onArrowClick();
    }
  }

  setExamDataSource(datasource){
    this.datasouce = datasource;

    this.datasouce.setDataChangeListener((item, right, error, index, total)=>{
      this.setRightValue(right);
      this.setErrorValue(error);
      this.setIndexValue(index);
      this.setTotalValue(total);
    });
  }

  render(){
    return (
      <div className='subjectitemsdesc'>
        <img className="rightimg" src={require('./../res/right-gray.png')} type={this.showErrorNumber}/>
        <a className='righttext'  type={this.showErrorNumber}>{this.state.right}</a>
        <img className="errorimg" src={require('./../res/error-gray.png')} type={this.showErrorNumber}/>
        <a className='errortext' type={this.showErrorNumber}>{this.state.error} </a>
        <img className='arrayimg' src={require('./../res/array-up.png')} onClick={this.onMiddleClick.bind(this)}
              style={
                {
                  transform: `rotate(${this.props.arrowRotateDegree}deg)`
                }
              }/>

        <a className='progress'><font>{this.state.index + 1}</font>{' / ' + this.state.total}</a>
      </div>
    );
  }
}
