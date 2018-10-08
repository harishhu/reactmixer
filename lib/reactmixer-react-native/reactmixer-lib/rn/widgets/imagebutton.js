import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  ImageBackground
} from 'react-native';

class ImageButton extends Component<{}> {
  constructor(props){
    super(props);
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
      <TouchableWithoutFeedback onPress={this.buttonClick.bind(this)}>
      <View style={this.props.style}>
      <Image style={styles.image} source={this.props.image} resizeMode='stretch'>
      </Image>

      <View style={styles.textgroup}>
      <Text style={
        {
          fontSize: this.props.titleFontSize ? this.props.titleFontSize : 16,
          color: this.props.titleColor ? this.props.titleColor : 'blue'
        }
      }>{this.props.title}</Text>
      </View>

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
  },
  textgroup : {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    bottom: 0,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#ffffff00'
  }
});

module.exports = ImageButton;
