import React, { Component } from 'react';

const {
  ZAComponent,
  StyleSheet,
  View,
  Image,
  Text
} = global.reactmixer;

class FlexButton extends ZAComponent{
  constructor(props){
    super(props);

    this.state = {
      issel : false
    }

    this.initViewStyle();
    this.initTextViewStyle();
  }

  initViewStyle(){
    this.viewStyle = {
      height:45,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    };

    if(this.props.style){
      this.viewStyle = [this.viewStyle, this.props.style];
    }

    if(this.props.selectStyle){
      this.viewSelectStyle = [this.viewStyle, this.props.selectStyle];
    }
  }

  initTextViewStyle(){
    this.textStyle = {
      fontSize: 15,
      color:'black'
    }

    if(this.props.textStyle){
      this.textStyle = [this.textStyle, this.props.textStyle];
    }

    if(this.props.textSelectStyle){
      this.textSelectStyle = [this.textStyle, this.props.textSelectStyle];
    }
  }

  isSelected(){
    this.isSelect = this.state.issel;

    if(this.props.isSelect != undefined){
      this.isSelect = this.props.isSelect;
    }

    return this.isSelect;
  }

  setSelected(value){
    if(value == this.state.issel){
      return;
    }

    this.setState(
      {
          issel:value
      }
    );
  }

  componentDidMount(){
  }

  buttonClick(){
    if(this.props.onClick){
      this.props.onClick();
    }
  }

  getViewStyle = ()=>{
    return this.isSelected() ? this.viewSelectStyle : this.viewStyle;
  }

  getTextStyle = ()=>{
    return this.isSelected() ? this.textSelectStyle : this.textStyle;
  }
  getImage = ()=>{
    return this.isSelected() ? this.props.selectImage : this.props.image;
  }

  render() {
    return (
      <View isSelect={this.isSelected()}
            style={
              this.composeStyle([this.getViewStyle(), this.props.style, {
                position:'relative'
              }])
            }>
            <Image
            style={
              this.composeStyle([this.props.imageStyle ? this.props.imageStyle:styles.image])
            }
            source={this.getImage()} resizeMode='stretch'>
            </Image>
            <Text style={
              this.composeStyle([this.getTextStyle(), {
                position:'absolute'
              }])}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image:{
    width: '100%',
    height: '100%'
  }
});

module.exports = FlexButton;
