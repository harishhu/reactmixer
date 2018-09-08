import React, { Component } from 'react';
import { requireNativeComponent } from 'react-native';
import RootSiblings from './rootsiblings'

import {
  StyleSheet,
  View
} from 'react-native';

var SADatePicker = requireNativeComponent('ZAKJRCTDatePicker', SADatePickerWidget);

class SADatePickerWidget extends Component {
  constructor(props){
    super(props);
    this.currentDate = this.props.currentDate;
  }

  /**
   *   mode enum('date', 'time', 'datetime')
   *   date:年月日
   *   time:时分
   *   datetime:月日时分
   *   yearmonth:年月
   *   year:年
   */
  static show(mode,currentDate,pickcallback){
    SADatePickerWidget.current = new RootSiblings(
        <SADatePickerWidget currentDate={currentDate}
                            mode={mode}
                            onPickItem={pickcallback}>
        </SADatePickerWidget>);
    return SADatePickerWidget.current;
  }

  static hidePicker(){
    if(SADatePickerWidget.current){
      SADatePickerWidget.current.destroy();
      SADatePickerWidget.current = undefined;
    }
  }

  onChange(event){
    SADatePickerWidget.hidePicker();
    if (event.nativeEvent['date'] != undefined){
      this.date = event.nativeEvent['date'];
      this.props.onPickItem(this.date);
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <SADatePicker currentDate={this.props.currentDate} mode={this.props.mode}
                        style={{backgroundColor:'rgba(102, 102, 102, 0.6)', width:'100%', height:'100%'}}
                        onChange={this.onChange.bind(this)}/>
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
});

module.exports = SADatePickerWidget;
