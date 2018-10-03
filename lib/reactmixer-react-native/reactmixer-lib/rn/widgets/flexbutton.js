import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image
} from 'react-native';

class FlexButton extends Component<{}> {
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
      backgroundColor:'white',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
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
        <TouchableWithoutFeedback onPress={this.buttonClick.bind(this)}>
          <View isSelect={this.isSelected()}
                style={this.getViewStyle()}>
            <Image style={this.props.imageStyle ? this.props.imageStyle:styles.image}
                   source={this.getImage()} resizeMode='stretch'>
            </Image>
            <Text style={[this.getTextStyle(), {
              position:'absolute'
            }]}>{this.props.text}</Text>
          </View>
        </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  image:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    right: 0,
    top: 0,
    bottom:0,
    left:0
  }
});

module.exports = FlexButton;
