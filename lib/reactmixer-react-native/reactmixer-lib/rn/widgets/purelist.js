import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View ,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';

const {
  ZAComponent
} = global.reactmixer;

class PureListItem extends ZAComponent {
  static MAX_DELETE_VIEW_WIDTH = 82

  constructor(props){
    super(props)

    this.forceUpdate = false;
    this.index = this.props.index;

    this.state = {
      deleteViewWidth : 0
    }

    this.enableItemDelete = this.props.enableItemDelete;

    this.eventProps = {};

    if(this.enableItemDelete == true){
      this.eventProps.onMoveShouldSetResponder=this.onMoveShouldSetResponder
      this.eventProps.onStartShouldSetResponder=this.onStartShouldSetResponder
      this.eventProps.onResponderGrant=this.onResponderGrant
      this.eventProps.onResponderMove=this.onResponderMove
      this.eventProps.onResponderRelease=this.onResponderRelease
      this.eventProps.onResponderTerminate=this.onResponderTerminate
      this.eventProps.onResponderTerminationRequest=this.onResponderTerminationRequest
    }
  }

  _onPress = () => {
    this.props.onItemSelected(this.props.index, this.props.item);
  };

  onDelete = ()=>{
    this.updateDeleteViewWidth(0);

    this.props.onItemDelete(this.props.index);
  }

  expandDeleteView(expand){
    // alert('expandview = ' + expand);
    let t = expand ? PureListItem.MAX_DELETE_VIEW_WIDTH : 0;
    this.updateDeleteViewWidth(t);
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.forceUpdate){
      this.forceUpdate = false;
      return true;
    }

    let redraw = this.props.needRedraw(this.props.index, this.props.item);
    //console.log('shouldComponentUpdate index = ' + this.props.index + ' need redraw = ' + redraw);
    return redraw;
  }

  adjustViewPosition(){
    let dis = parseInt(this.endX - this.prevX);

    if(dis > 0){
      if(this.state.deleteViewWidth == 0){
        return;
      }

      let target = this.state.deleteViewWidth - dis;
      if(target < 0){
        target = 0;
      }

      this.updateDeleteViewWidth(target);
    }else if(dis < 0){
      if(this.state.deleteViewWidth == PureListItem.MAX_DELETE_VIEW_WIDTH){
        return;
      }

      let target = this.state.deleteViewWidth - dis;
      if(target > PureListItem.MAX_DELETE_VIEW_WIDTH){
        target = PureListItem.MAX_DELETE_VIEW_WIDTH;
      }

      console.log('dis = ' + dis + ' target = ' + target);
      this.updateDeleteViewWidth(target);
    }
  }

  updateDeleteViewWidth(width){
    if(this.enableItemDelete != true){
      return;
    }

    this.forceUpdate = true;

    this.setState(
      {
        deleteViewWidth: width
      }
    )
  }

  onMoveShouldSetResponder = (evt)=>{
    console.log('on move');
    return true;
  }

  onStartShouldSetResponder = (evt)=>{
    console.log('on start');

    return true;
  }

  onResponderGrant = (evt)=>{
    console.log('onResponderGrant, x = ' + evt.nativeEvent.locationX);

    this.startX = evt.nativeEvent.locationX;
    this.endX = this.startX;
    this.prevX = this.startX;

    this.hasMoveEvent = false
    this.isPointAdd = undefined;
  }

  onResponderMove = (evt)=>{
    console.log('onResponderMove, x = ' + evt.nativeEvent.locationX);
    if(this.isPointAdd == undefined){
      if(evt.nativeEvent.locationX > this.endX){
        this.isPointAdd = true;
      }else if(evt.nativeEvent.locationX < this.endX){
        this.isPointAdd = false;
      }else{
        return;
      }
    }

    if(this.isPointAdd === true){
      if(evt.nativeEvent.locationX <= this.endX){
        return;
      }
    }

    if(this.isPointAdd === false){
      if(evt.nativeEvent.locationX >= this.endX){
        return;
      }
    }

    this.hasMoveEvent = true;

    this.prevX = this.endX;
    this.endX = evt.nativeEvent.locationX;

    this.adjustViewPosition();
  }

  onResponderTerminate = (evt)=>{
    console.log('onResponderTerminate, x = ' + evt.nativeEvent.locationX);

    this.prevX = this.endX;
    this.endX = evt.nativeEvent.locationX;

    this.autoAdjustDeleteViewWidth();
  }

  onResponderTerminationRequest = (evt)=>{
    console.log('onResponderTerminate onResponderTerminationRequest, x = ' + evt.nativeEvent.locationX);
  }

  onResponderRelease = (evt)=>{
    console.log('onResponderRelease, x = ' + evt.nativeEvent.locationX);

    this.prevX = this.endX;
    this.endX = evt.nativeEvent.locationX;

    if(Math.abs(this.endX - this.startX) <= 3){
      this._onPress();
      return;
    }

    this.autoAdjustDeleteViewWidth();
  }

  autoAdjustDeleteViewWidth(){
    this.adjustViewPosition();

    let targetvalue = this.state.deleteViewWidth;

    if(this.state.deleteViewWidth < PureListItem.MAX_DELETE_VIEW_WIDTH / 2){
      targetvalue = 0;
    }else{
      if(this.state.deleteViewWidth != PureListItem.MAX_DELETE_VIEW_WIDTH){
        targetvalue = PureListItem.MAX_DELETE_VIEW_WIDTH;
      }
    }

    console.log('autoAdjustDeleteViewWidth, updateDeleteViewWidth = ' + targetvalue)

    this.updateDeleteViewWidth(targetvalue);

    if(this.props.onDeleteViewExpand){
      this.props.onDeleteViewExpand(targetvalue == PureListItem.MAX_DELETE_VIEW_WIDTH, this);
    }
  }

  render() {
    console.log('render item index = ' + this.props.index);
    let v = (
      <View
            {...this.eventProps}
            style={
              {
                width: '100%',
                flexDirection:'row',
                justifyContent:'flex-end'
              }
            }>
        {this.props.renderItem(this.props.item)}

        <View
          onStartShouldSetResponder={function(){
            return true;
          }}
          onResponderRelease={this.onDelete}
          onResponderTerminationRequest={function(){
            return false;
          }}

          style={
          {
            width: this.state.deleteViewWidth,
            height: '100%',
            flexDirection:'row',
            backgroundColor:'#ff6a4b',
            justifyContent:'center',
            alignItems:'center'
          }
        }>
        <Text style={
          {
            display: this.state.deleteViewWidth == PureListItem.MAX_DELETE_VIEW_WIDTH ? 'flex': 'none',
            color:'#ffffff',
            fontSize: 14,
            lineHeight: 14
          }
        }>
          {this.zastrings.delete}
        </Text>
        </View>
      </View>
    )

    if(this.enableItemDelete == true){
      return v;
    }else{
      return (
        <TouchableWithoutFeedback onPress={this._onPress}>
          {v}
        </TouchableWithoutFeedback>
      )
    }
  }
}

class PureList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      drawcount : 0
    }

    this.redraw = false;
    this.redrawItems = {};

    this.datasource = this.props.data;
    this.expandItem = undefined;
  }

  _keyExtractor = (item, index) => {
    item.index = index;
    return item.index + "";
  };

  _onItemSelected = (index, item) => {
    if(this.props.onItemSelected){
      this.props.onItemSelected(index, item, this);
    }
  };

  checkSubItemNeedRedraw = (index, item)=>{
    if(this.redrawItems['item' + index]){
      this.redrawItems['item' + index] = undefined;
      return true;
    }

    return false;
  }

  onItemDeleteViewExpand = (isexpand, item)=>{
    console.log('onItemDeleteViewExpand: isexpand = ' + isexpand + ' index = ' + item.index);
    if(isexpand == true){
      if(this.expandItem){
        if(this.expandItem.index != item.index){
          this.expandItem.expandDeleteView(false);
        }
      }

      this.expandItem = item;
    }else{
      if(this.expandItem) {
          if(this.expandItem.index == item.index){
            this.expandItem = undefined;
          }
      }
    }
  }

  onRemoveItem = (index)=>{
    let delitem = this.datasource[index];

    if(this.props.onItemDeleted){
      if(this.props.onItemDeleted(index, delitem) == true){
        return;
      }
    }

    this.datasource.splice(index, 1);
    this.expandItem = undefined;
    this.updateListItem(-1);
  }

  _renderItem = ({item}) => (
    <PureListItem
      index={item.index}
      item={item}
      enableItemDelete={this.props.enableItemDelete ? true : false}
      renderItem={this.props.renderItem}
      onItemSelected={this._onItemSelected}
      needRedraw={this.checkSubItemNeedRedraw}
      onDeleteViewExpand={this.onItemDeleteViewExpand}
      onItemDelete={this.onRemoveItem}
    />
  );

  updateListItem(index){
    console.log('update' + index + 'datasource' + this.datasource);
    if(index >= 0){
      this.redrawItems['item' + index] = '' + index;
    }else if(index == -1 && undefined != this.datasource){
      for(let i = 0; i < this.datasource.length; i++){
        this.redrawItems['item' + i] = i + '';
      }
    }else{
      return;
    }

    this.redraw = true;
    this.setState({
      drawcount: ++this.drawcount
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.redraw){
      this.redraw = false;
      return true;
    }

    return false;
  }

  render() {
    console.log('pure list -- render');
    let parentprops = {};
    for(key in this.props){
      if(key != 'style'){
        parentprops[key] = this.props[key];
      }
    }

    return (
      <FlatList
        {...parentprops}
        initialNumToRender={20}
        ref='flatlist'
        data={this.datasource}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        // ItemSeparatorComponent={this.props.ItemSeparatorComponent}
        // ListHeaderComponent={this.props.ListHeaderComponent}
        // ListFooterComponent={this.props.ListFooterComponent}
        // onScroll={this.props.onScroll}
      />
    );
  }
}

module.exports = PureList;
