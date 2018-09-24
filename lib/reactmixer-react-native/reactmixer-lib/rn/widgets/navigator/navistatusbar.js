import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

class NaviStatusBar extends Component<{}> {
    render(){
        return (
            <View style={[{width: '100%', height: this.props.statusBarHeight}, this.props.style]} />
        )
    }
}

module.exports = NaviStatusBar;
