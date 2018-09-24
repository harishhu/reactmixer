import React, { Component } from 'react';
import { requireNativeComponent } from 'react-native';

import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';
var RCTAutoTextView = requireNativeComponent('ZAKJRCTAutoTextView', AutoTextView);

class AutoTextView extends Component{
    constructor(props){
        super(props);

        let textData = [this.props.textColor ? this.props.textColor : "", 
                        this.props.textSize ? this.props.textSize : 13
                        ];
        textData.push(this.props.items);
        this.state = {
            textData: textData
        }
    }

    updateItems(items){
        this.selindex = 0;
        this.setState(
            {
                items: items
            }
        )
    }

    render(){
        return (
            <RCTAutoTextView textData={this.state.textData} autoScrollTimeInterval={this.props.autoScrollTimeInterval}
            style={[styles.container, this.props.style]}/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 20
    },
  });

module.exports = AutoTextView;


