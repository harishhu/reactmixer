import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RootSiblings from './rootsiblings'

import {
  Text,
  TouchableHighlight,
  View ,
  StyleSheet,
  Dimensions
} from 'react-native';

let {
  ZAComponent,
  NormalButton
} = global.reactmixer;

let SCREEN_WIDTH = Dimensions.get('window').width;//宽
let SCREEN_HEIGHT = Dimensions.get('window').height;//高

class AlertDialog{
  setTitle(value){
    this.title = value;
  }

  setContent(value){
    this.content = value;
  }

  setContentRender(render){
    this.contentRender = render;
  }

  setLeftButton(title, callback){
    this.leftbuttontitle = title;
    this.leftbuttoncallback = callback;
  }

  setRightButton(title, callback){
    this.rightbuttontitle = title;
    this.rightbuttoncallback = callback;
  }

  btnClickLeft(){
    if(this.leftbuttoncallback){
      this.leftbuttoncallback();
    }
  }

  btnClickRight(){
    if(this.rightbuttoncallback){
      this.rightbuttoncallback();
    }
  }

  showTitleClose(){
    this.showTitleClose = true;
  }

  show(){
    ZAComponent.navigator.setGoBackCallback(()=>{
      this.hide();
    });

    this.rootSilb = new RootSiblings(
      <AlertDialogImpl
        _dialogTitle={this.title}
        _dialogContent={this.content}
        _dialogLeftBtnTitle={this.leftbuttontitle}
        _dialogRightBtnTitle={this.rightbuttontitle}
        _dialogLeftBtnAction={this.btnClickLeft.bind(this)}
        _dialogRightBtnAction={this.btnClickRight.bind(this)}
        _dialogContentRender={this.contentRender}
        hideSelf={this.hide}
        showTitleClose={this.showTitleClose}
      />
    );
  }

  hide = ()=>{
    ZAComponent.navigator.setGoBackCallback(undefined);

    if(this.rootSilb){
      this.rootSilb.destroy();
      this.rootSilb = undefined;
    }
  }
}

class AlertDialogImpl extends Component {
  // 构造
  constructor(props) {
    super(props);

    this.title = this.props._dialogTitle;
    this.content = this.props._dialogContent;
    this.contentRender = this.props._dialogContentRender;
    this.leftbuttontitle = this.props._dialogLeftBtnTitle;
    this.rightbuttontitle = this.props._dialogRightBtnTitle;

    this.leftbuttoncallback = this.props._dialogLeftBtnAction;
    this.rightbuttoncallback = this.props._dialogRightBtnAction;

    this.showButton = false;

    if(this.leftbuttontitle || this.rightbuttontitle){
      this.showButton = true;
    }
  }

  static propTypes = {
    _dialogTitle: PropTypes.string, //标题
    _dialogContent: PropTypes.string, //内容
    _dialogLeftBtnTitle: PropTypes.string,    //左按键标题
    _dialogRightBtnTitle: PropTypes.string,   //右按键标题
    _dialogLeftBtnAction: PropTypes.func.isRequired,  //左点击方法
    _dialogRightBtnAction: PropTypes.func.isRequired, //右点击方法
  }

  static defaultProps = {
    _dialogTitle: '',
    _dialogContent: '',
    _dialogLeftBtnTitle: '',
    _dialogRightBtnTitle: '',
  }

  getContentRender(){
    if(this.contentRender){
      return this.contentRender();
    }

    return (
      <Text style={styles.dialogContent}>
        {this.content}
      </Text>
    )
  }

  render() {
    return (
      <View style={styles.bg}>
        <View style={styles.dialog}>
          <View style={styles.dialogTitleView}>
            <Text style={styles.dialogTitle}>
              {this.title}
            </Text>

            <View style={
              {
                display: this.props.showTitleClose === true ? "flex" : 'none',
                position:'absolute',
                width:'100%',
                height: '100%',
                flexDirection:'row',
                justifyContent: 'flex-end'
              }
            }>

            <NormalButton style={
              {
                marginRight: 12,
                marginTop: 10
              }
            }
            textStyle={
              {
                fontSize:18
              }
            }
            text='X'
            onClick={this.props.hideSelf}/>
          </View>
          </View>

          <View style={
            {
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: this.showButton ? 20 : 0,
            }
          }
            >
            {this.getContentRender()}
          </View>
          <View style={
            {
              display: this.showButton ? 'flex' : 'none',
              backgroundColor:'#f5f5f5',
              height:1
            }
          }></View>
          <View style={
            {
              display: this.showButton ? 'flex' : 'none',
              width: SCREEN_WIDTH * 0.8,
              height: SCREEN_HEIGHT * 0.08,
              flexDirection: 'row'
            }
          }>
            <TouchableHighlight style={styles.dialogBtnViewItem} onPress={this.leftbuttoncallback}>
              <Text style={styles.leftButton}>
                {this.leftbuttontitle}
              </Text>
            </TouchableHighlight>
            <View style={{backgroundColor:'#f5f5f5',width:1,}}></View>
            <TouchableHighlight style={styles.dialogBtnViewItem} onPress={this.rightbuttoncallback}>
              <Text style={styles.rightButton}>
                {this.rightbuttontitle}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    position:'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  dialogTitleView: {
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  dialogTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000000',
  },
  dialogContentView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
  },
  dialogContent: {
    textAlign: 'center',
    fontSize: 16,
    color: '#4A4A4A',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dialogBtnView: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.08,
    flexDirection: 'row',
  },
  dialogBtnViewItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  leftButton: {
    fontSize: 18,
    color: 'black',
    borderBottomLeftRadius: 8,
  },
  rightButton: {
    fontSize: 18,
    color: '#007AFF',
    borderBottomRightRadius: 8,
  }
});

module.exports = AlertDialog;
