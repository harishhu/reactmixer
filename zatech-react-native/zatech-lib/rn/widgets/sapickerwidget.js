import React, { Component } from 'react';
import { requireNativeComponent } from 'react-native';
import PropTypes from 'prop-types';
import utils from './../../common/appbase/utils'
import RootSiblings from './rootsiblings'
import zastring from "./../../common/appbase/zastring";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback
} from 'react-native';

import {
  PickerView,
  ZAComponent
} from 'zatech-react-native';

var defaultItemHeight = Platform.OS == 'ios' ? 216 : 160;

class SAPickerWidget extends Component {
  static propTypes = {
  };

  constructor(props){
    super(props);
    this.selindex = this.props.defaultIndex;
  }

  /**
   * @param
   * items : picker data array
   * defaultindex: default index
   * pickcallback: 选中回调
  */
  static showPicker(items, defaultindex, pickcallback){
    if(defaultindex == undefined || items.length <= defaultindex){
      defaultindex = 0;
    }

    ZAComponent.navigator.setGoBackCallback(()=>{
      SAPickerWidget.hidePicker();
    });

    SAPickerWidget.current = new RootSiblings(<SAPickerWidget items={items} defaultIndex={defaultindex} onPickItem={pickcallback}></SAPickerWidget>);
    return SAPickerWidget.current;
  }

  static hidePicker(){
    ZAComponent.navigator.setGoBackCallback(undefined);

    if(SAPickerWidget.current){
      SAPickerWidget.current.destroy();
      SAPickerWidget.current = undefined;
    }
  }

  onChange(column, index){
    this.selindex = index;
  }

  onTitleClick(cancel){
    SAPickerWidget.hidePicker();

    if(!cancel && this.props.onPickItem){
      this.props.onPickItem(this.selindex, this.props.items);
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
            {zastring.strings.alert_leftTitle}
          </Text>
          <Text style={styles.titletext}>
            {/*{zastring.strings.alert_middleTitle}*/}
          </Text>
          <Text style={styles.titlebuttonright} onPress={this.onTitleClick.bind(this, false)}>
            {zastring.strings.alert_rightTitle}
          </Text>
        </View>
        <PickerView items={this.props.items} column={0}
                  style={{backgroundColor:'#fff', width:'100%', height:defaultItemHeight}} onChange={this.onChange.bind(this)}/>
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

module.exports = SAPickerWidget;
