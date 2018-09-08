import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import $ from 'jquery';

export default class DivAutoAdjust extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      height: 0,
      width:0
    }

    this.firstRender = true;
  }

  getAutoAdjustStyle(){
  let divstyle = {
      backgroundImage: `url(${this.props.divBackground})`,
      height: this.state.height,
      marginTop: `${this.props.marginTop}px`,
      backgroundRepeat: 'no repeat',
      backgroundSize: `${this.state.width}px ${this.state.height}px`
    }

    return divstyle;
  }

  render(){
    const { children } = this.props;

    return (
      <div ref="divAutoAdjust" style={this.getAutoAdjustStyle()}>
        {children}
      </div>
    )
  }

  componentDidMount(){
    if(this.firstRender){
      this.firstRender = false;

      this.adjustHeight();
    }
  }

  adjustHeight(){
    var body = $('body');
    var divself = this.refs.divAutoAdjust;
    divself = $(divself);

    //alert(divself.width());

    let height = divself.width() * this.props.sizeRatio;
    //alert(height);
    let sta = {
      height : height,
      width: divself.width()
    }

    this.setState(sta);
    this.divAdjustFinish(height + this.props.marginTop);
  }

  divAdjustFinish(height){
    if(this.props.divAdjustFinish != undefined){
      this.props.divAdjustFinish(height);
    }
  }
}

DivAutoAdjust.defaultProps = {
  divBackground:'',
  sizeRatio: 1.0,
  marginTop: 0
}

DivAutoAdjust.propTypes = {
  divBackground: PropTypes.string.isRequired,
  sizeRatio : PropTypes.number.isRequired,
  marginTop : PropTypes.number
}
