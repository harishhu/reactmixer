import React, { Component } from 'react';

const {
  ZAComponent,
  StyleSheet
} = global.reactmixer;

import './imagebutton.scss';

class ImageButton extends ZAComponent {
  constructor(props){
    super(props);

    this.titleStyle = {};

    this.titleStyle.color = this.props.titleColor ? this.props.titleColor : 'blue';

    if(this.props.titleFontSize){
      this.titleStyle.fontSize = this.props.titleFontSize;
    }
  }

  componentDidMount(){
  }

  render() {
    console.log('image button on click = ' + this.props.onClick);
    
    return (
      <button className="imagebutton" 
      style={
        this.composeStyle([{
          backgroundImage: `url(${this.props.image})`
        }, this.props.style])
      }
      onClick={this.props.onClick}>
      <span style={this.titleStyle}>{this.props.title}</span>
      </button>
    );
 }
}

const styles = StyleSheet.create({
});

module.exports = ImageButton;
