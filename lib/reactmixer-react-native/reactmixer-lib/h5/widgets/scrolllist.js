import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

class ScrollList extends Component {
  static TYPE_NORMAL = 1;
  static TYPE_REACH = 2;
  static TYPE_LEAVE = 3;

  constructor(props) {
    super(props);

    this.itemlist = [];
    this.indexKey = 0;

    for(let j = 0, len = this.props.data.length; j < len; j++) {
      if(j == 0 && this.props.ListHeaderComponent){
        this.itemlist.push(this.props.ListHeaderComponent(this.makeKey()));
      }

      let item = this.props.renderItem(this.props.data[j], this.makeKey());
      this.itemlist.push(item);

      if(j != len - 1 && this.props.ItemSeparatorComponent){
        this.itemlist.push(this.props.ItemSeparatorComponent(this.makeKey()));
      }
    }

    this.reachStatus = ScrollList.TYPE_REACH;

    this.reachCallbackEnable = true;
    this.lastScrollPos = 0;
    this.isScrollDone = false;
  }

  makeKey(){
    return this.indexKey++;
  }

  onTouchMove(event){
    if (event.nativeEvent.touches.length == 1) {
      var touch = event.nativeEvent.touches[0];
    }
  //this.refs.scrollView.scrollTo({x: 0, y: value, animated: true})
  }

  onScroll = (event)=>{
    //alert(event.nativeEvent.contentOffset.y);
    //console.log("scroll to = " + event.nativeEvent.contentOffset.y);
    this.lastScrollPos = event.nativeEvent.contentOffset.y;
    this.isScrollDone = true;

    if (!this.reachCallbackEnable){
      return;
    }

    if(event.nativeEvent.contentOffset.y <= 0 && this.reachStatus != ScrollList.TYPE_REACH){
      this.reachCallbackEnable = false;
      this.reachStatus = ScrollList.TYPE_REACH;
      if(this.props.reachTopStatusCallback){
        this.props.reachTopStatusCallback(this.reachStatus);
      }

      return;
    }

    if(event.nativeEvent.contentOffset.y > 0 && this.reachStatus != ScrollList.TYPE_LEAVE){
      this.reachCallbackEnable = false;
      this.reachStatus = ScrollList.TYPE_LEAVE;
      if(this.props.reachTopStatusCallback){
        this.props.reachTopStatusCallback(this.reachStatus);
      }

      return;
    }
  }

  dragStart = ()=>{
    console.log('drag start = ');
    this.reachCallbackEnable = true;
    this.isScrollDone = false;
  }

  dragEnd = ()=>{
    //console.log('drag end = ' + this.lastScrollPos + ' iscroll done = ' + this.isScrollDone);
    this.reachCallbackEnable = false;

    if(this.lastScrollPos == 0 && this.isScrollDone == false){
      this.reachStatus = ScrollList.TYPE_REACH;
      if(this.props.reachTopStatusCallback){
        this.props.reachTopStatusCallback(this.reachStatus);
      }
    }
  }

  // onAnnotationEnd(value){
  //   console.log('onAnnotationEnd = ' + value);
  // }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
          <ScrollView
            ref="scrollView"
            scrollEnabled={true}
            onTouchMove={this.onTouchMove}
            onScroll={this.onScroll}
            scrollEventThrottle={16}
            onScrollBeginDrag={this.dragStart}
            onScrollEndDrag={this.dragEnd}
            // onMomentumScrollEnd={this.onAnnotationEnd}
            style={[styles.scrollView, styles.horizontalScrollView]}
            horizontal={false}
            showsHorizontalScrollIndicator={true}>
              {this.itemlist}
            </ScrollView>
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:'100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
    },
    scrollView:{
      flex: 1,
      width:'100%'
    },
    horizontalScrollView:{
      height: 71
    }
  });

  module.exports = ScrollList;
