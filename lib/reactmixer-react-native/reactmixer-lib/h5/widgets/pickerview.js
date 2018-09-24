import React, { Component } from 'react';
import { requireNativeComponent } from 'react-native';

var RCTPicker = requireNativeComponent('ZAKJRCTPicker', PickerView);

class PickerView extends Component{
    constructor(props){
        super(props);
        this.selindex = 0;
        this.state = {
            items: this.props.items
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

    onChange(event){
        this.selindex = event.nativeEvent['index'];
        this.props.onChange(this.props.column ? this.props.column : 0, this.selindex);
    }

    render(){
        return (
            <RCTPicker items={this.state.items} defaultIndex={this.selindex}
                  style={this.props.style} onChange={this.onChange.bind(this)}/>
        )
    }
}

module.exports = PickerView;


