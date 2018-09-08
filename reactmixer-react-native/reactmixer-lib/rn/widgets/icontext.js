import React, { Component } from 'react';
import {
    Image,
    Text,
    TouchableWithoutFeedback,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';

import {ImageSource} from "react-native/Libraries/Image/ImageSource";
import {ImageStylePropTypes} from 'react-native/Libraries/Image/ImageStylePropTypes';
import {ViewStylePropTypes} from 'react-native/Libraries/Components/View/ViewStylePropTypes';

type Props = {
    ...TextInput.propTypes,
    text?: string,
    drawLeft?: ImageSource,
    drawTop?: ImageSource,
    drawRight?: ImageSource,
    drawBottom?: ImageSource,
    onPress?: ?() => void,
    textStyle?: TextStyleProp,
    drawLeftStyle?: ImageStylePropTypes,
    drawTopStyle?: ImageStylePropTypes,
    drawRightStyle?: ImageStylePropTypes,
    drawBottomStyle?: ImageStylePropTypes,
    style?:ViewStylePropTypes
};

class IconText extends Component<Props> {

    static defaultProps = {
        underlineColorAndroid: 'transparent',
        editable: false,
    }

    constructor(props) {
        super(props);
    }

    render() {
        let drawTopStyle = this.props.drawTop == null ? styles.hide : styles.show;
        let drawLeftStyle = this.props.drawLeft == null ? styles.hide : styles.show;
        let drawRightStyle = this.props.drawRight == null ? styles.hide : styles.show;
        let drawBottomStyle = this.props.drawBottom == null ? styles.hide : styles.show;

        return (
            <TouchableWithoutFeedback onPress={() => {
                if (this.props.onPress != null) {
                    this.props.onPress();
                }
            }}>
                <View style={[styles.container, this.props.style]}>
                    <Image source={this.props.drawTop} style={[this.props.drawTopStyle, drawTopStyle]}/>
                    <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Image source={this.props.drawLeft} style={[this.props.drawLeftStyle, drawLeftStyle]}/>
                        <Text {...this.props} style={[this.props.textStyle, styles.textStyle]}>
                          {this.props.text}
                        </Text>
                        <Image source={this.props.drawRight} style={[this.props.drawRightStyle, drawRightStyle]}/>
                    </View>
                    <Image source={this.props.drawBottom} style={[this.props.drawBottomStyle, drawBottomStyle]}/>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',

    },

    show: {
        display: 'flex',
    },
    hide: {
        display: 'none',
    },

    textStyle: {
        textAlignVertical: 'center',
        padding: 0,
        marginLeft: 2,
    }
});

module.exports = IconText;
