import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    NativeModules,
    Image,
    TouchableWithoutFeedback,
    StatusBar,
    ImageBackground
} from 'react-native';

import {
    AppConfig
} from 'zatech-react-native';

import NaviActionBar from './naviactionbar';
import NaviStatusBar from './navistatusbar';

class NaviBarGroup extends Component<{}> {
    static DEFAULT_BACKGROUND_COLOR = '#2f8aff';

    constructor(props){
        super(props);

        this.state = {};

        if(AppConfig.actionBarStyle){
            this.defaultBKColor = AppConfig.actionBarStyle.backgroundColor;
        }

        if(this.defaultBKColor == undefined){
            this.defaultBKColor = NaviBarGroup.DEFAULT_BACKGROUND_COLOR;
        }
    }

    showTitleBar(show) {
        this.setState({
            showTitleBar:show
        });
    }

    showStatusBar(show) {
        this.setState({
            showStatusBar:show
        });
    }

    setBackgroundColor(bgcolor) {
        this.setState(
            {
                backgroundColor: bgcolor
            }
        )
    }

    setBackgroundImage(source) {
        this.setState({backgroundImage: source});
    }

    render(){
        return (
            <ImageBackground source={this.state.backgroundImage} style={{}} resizeMode={'cover'}>
                <View style={{
                    width: '100%',
                    backgroundColor: this.state.backgroundColor ? this.state.backgroundColor : this.defaultBKColor
                }}>
                <NaviStatusBar {...this.props} ref='statusbar'style={
                    {
                        display:this.state.showStatusBar ? 'flex' : 'none'
                    }
                }/>
                <NaviActionBar {...this.props} style={
                    {
                        display:this.state.showTitleBar ? 'flex' : 'none'
                    }
                }
                ref='navibar'/>
                </View>
            </ImageBackground>
        )
    }
}

module.exports = NaviBarGroup;
