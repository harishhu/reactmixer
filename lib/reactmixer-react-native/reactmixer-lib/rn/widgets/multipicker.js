// MapView.js
import React, { Component } from 'react';
import { requireNativeComponent } from 'react-native';
import PropTypes from 'prop-types';
import RootSiblings from './rootsiblings'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';

const {
  PickerView,
  ZAComponent,
  ZAString
} = global.reactmixer;

var defaultItemHeight = Platform.OS == 'ios' ? 216 : 160;

class MultiPicker extends Component {
  static propTypes = {
  };

  constructor(props){
    super(props);
  }

  static showMultiPicker(items, datachangecallback, pickcallback){
    ZAComponent.navigator.setGoBackCallback(()=>{
      MultiPicker.hideMultiPicker();
    });

    MultiPicker.current = new RootSiblings(<MultiPicker items={items} columnDataChange={datachangecallback} onPickMultiItems={pickcallback}></MultiPicker>);
    return MultiPicker.current;
  }

  static hideMultiPicker(){
    ZAComponent.navigator.setGoBackCallback(undefined);

    if(MultiPicker.current){
      MultiPicker.current.destroy();
      MultiPicker.current = undefined;
    }
  }

  onChange(column, index){
    if(this.props.columnDataChange){
      this.props.columnDataChange(this, column, index);
    }
  }

  updateColumnItems(column, items){
    // alert('column = ' + column + ' items = ' + items.length)
    this.refs['pickitem' + column].updateItems(items);
  }

  onTitleClick(cancel){
    MultiPicker.hideMultiPicker();

    if(!cancel && this.props.onPickMultiItems){
      this.indexarray = [];
      for(index = 0; index < this.props.items.length; index++){
        this.indexarray.push(this.refs['pickitem' + index].selindex);
      }

      this.props.onPickMultiItems(this.indexarray, this.props.items);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.space}>
          <TouchableWithoutFeedback onPress={this.onTitleClick.bind(this, true)}>
            <View style={{
              width:'100%',
              height:'100%',
              backgroundColor:'rgba(102, 102, 102, 0.6)'
            }}/>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.titlegroup}>
          <Text style={styles.titlebuttonleft} onPress={this.onTitleClick.bind(this, true)}>
            {ZAString.strings.alert_leftTitle}
          </Text>
          <Text style={styles.titletext}>
            {/*{ZAString.strings.alert_middleTitle}*/}
          </Text>
          <Text style={styles.titlebuttonright} onPress={this.onTitleClick.bind(this, false)}>
            {ZAString.strings.alert_rightTitle}
          </Text>
        </View>
        <View style={
          {
            height: defaultItemHeight,
            width:'100%',
            flexDirection:'row'
          }
        }>
          {
            this.props.items.map((item, index)=>{
              return (
                <PickerView ref={'pickitem' + index} key={index} items={item} column={index}
                  style={{backgroundColor:'#fff', flex: 1, height:'100%'}} onChange={this.onChange.bind(this)}/>
              )
            })
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  space:{
     flex: 1,
     width:'100%',
  },
  titlegroup:{
    flexDirection:'row',
    width: '100%',
    height: 40,
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor: '#E5E5E5'
  },
  titlebuttonleft:{
    color:'#33b6e7',
    fontSize:18,
    marginLeft: 10
  },
  titlebuttonright:{
    color:'#33b6e7',
    fontSize:18,
    marginRight: 10
  },
  titletext:{
    color:'#333333',
    fontSize: 18
  }
});

module.exports = MultiPicker;
