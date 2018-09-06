import React, { Component } from 'react';
import {
    TextInput,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';

import {TextStylePropTypes} from 'react-native/Libraries/Text/TextStylePropTypes';
import {ImageSource} from "react-native/Libraries/Image/ImageSource";
import {ImageStylePropTypes} from 'react-native/Libraries/Image/ImageStylePropTypes';
import PropTypes from 'prop-types';

type Props = {
    ...TextInput.propTypes,
    ...Text.propTypes,
    label?: PropTypes.string,
    labelStyle?: TextStylePropTypes,
    textStyle?: TextInput.propTypes.style,
    showDivide?: PropTypes.boolean,
    drawRight?: ImageSource,
    drawRightStyle?: ImageStylePropTypes,
};

class LabelTextInput extends Component<Props> {
    static defaultProps = {
        editable: true,
    }

    constructor(props) {
        super(props);
    }

    render() {
        let divideStyle = this.props.showDivide ? styles.show : styles.hide;
        let drawStyle = this.props.drawRight == null ? styles.hide : styles.show;
        let maxLenght = this.props.maxLength == undefined ? 50 : this.props.maxLength;
        return (
            <TouchableWithoutFeedback onPress={() => {
                if (this.props.onPress != null) {
                    this.props.onPress();
                }
            }}>
            <View style={[this.props.style, styles.root]}>
                <View style={styles.container}>
                    <Text style={[this.props.labelStyle, styles.labelStyle]}>{this.props.label}</Text>
                    <TextInput onChangeText={(text) => {
                        if (this.props.onChangeText != null) {
                            this.props.onChangeText(text);
                        }
                    }} keyboardType={this.props.keyboardType} multiline={true} maxLength={maxLenght} editable={this.props.editable} underlineColorAndroid='transparent' style={[this.props.textStyle, styles.inputStyle]} placeholder={this.props.placeholder} placeholderTextColor={this.props.placeholderTextColor} value={this.props.value}/>
                    <Image source={this.props.drawRight} style={[this.props.drawRightStyle, drawStyle]}/>
                </View>
                <View style={[styles.divide, divideStyle]}/>
            </View>
            </TouchableWithoutFeedback>
        );
    }

    _makeTextView() {
        if (this.props.editable) {
            return this._makeTextInput();
        } else {
            return this._makeText();
        }
    }

    _makeTextInput() {
        return (
            <TextInput onPress={() => {
                if (this.props.onPress != null) {
                    this.props.onPress();
                }
            }} multiline={true} maxLength={200} editable={this.props.editable} underlineColorAndroid='transparent' style={[this.props.textStyle, styles.inputStyle]} placeholder={this.props.placeholder} placeholderTextColor={this.props.placeholderTextColor} value={this.props.value}/>
        );
    }

    _makeText() {
        let value = (this.props.value == undefined || this.props.value == '' || this.props.value == null) ? this.props.placeholder : this.props.value;
        let style = (this.props.value == undefined || this.props.value == '' || this.props.value == null) && this.props.placeholderTextColor != null ? {color: this.props.placeholderTextColor} : {};
        return (
            <Text onPress={() => {
                if (this.props.onPress != null) {
                    this.props.onPress();
                }
            }} style={[this.props.textStyle, styles.inputStyle, style]}>{value}</Text>
        );
    }
};

const styles = StyleSheet.create({

    root: {
        flexDirection: 'column',
    },

    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    divide: {
        height: 0.5,
        backgroundColor: '#ECECEC'
    },

    labelStyle: {
        textAlignVertical: 'center',
    },

    inputStyle: {
        flex: 1,
        textAlignVertical: 'center',
        textAlign: 'right',
    },

    hide: {
        display: 'none',
    },

    show: {
        display: 'flex',
    }
});

module.exports = LabelTextInput;
