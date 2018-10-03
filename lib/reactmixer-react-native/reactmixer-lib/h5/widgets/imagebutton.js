import React, { Component } from 'react';

const {
  ZAComponent,
  StyleSheet
} = global.reactmixer;

import './imagebutton.scss';

class ImageButton extends ZAComponent {
  constructor(props){
    super(props);

    this.textStyle = {};

    if(this.props.textColor){
      this.textStyle.color = this.props.textColor;
    }

    if(this.props.textFontSize){
      this.textStyle.fontSize = this.props.textFontSize;
    }
  }

  componentDidMount(){
  }

  buttonClick(){
    if(this.props.onClick){
      this.props.onClick();
    }
  }

  render() {
    return (
      <button className="imagebutton" 
      style={
        this.composeStyle([{
          backgroundImage: `url(${this.props.image})`
        }, this.props.style])
      }
     onClick={this.buttonClick.bind(this)}>
      <span style={this.textStyle}>{this.props.text}</span>
      </button>
    );
 }
}

const styles = StyleSheet.create({
});

module.exports = ImageButton;
