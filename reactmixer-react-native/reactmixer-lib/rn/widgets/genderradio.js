import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import IconText from './icontext';
import PropTypes from 'prop-types';
import {ViewStylePropTypes} from 'react-native/Libraries/Components/View/ViewStylePropTypes';

const GenderType = {
    MALE:'M',
    FEMALE:'F',
    UNKNOWN:'N'
};

type Props = {
    ...ViewStylePropTypes,
    value: GenderType,
    onChange: PropTypes.func,
    editable: PropTypes.boolean,
    cancelable: PropTypes.boolean,
};

class GenderRadio extends Component<Props> {
  static GenderType = GenderType;
  
    static defaultProps = {
        editable: true,
        cancelable: true,
    };

    constructor(props) {
        super(props);
        this.initial()
    }

    render() {
        let selectMaleDraw = require('./res/icon_man_white.png');
        let unSelectMaleDraw = require('./res/icon_man.png');
        let selectFemaleDraw = require('./res/icon_woman_white.png');
        let unselectFemaleDraw = require('./res/icon_woman.png');
        let maleDraw = this.state.value == GenderType.MALE ? selectMaleDraw : unSelectMaleDraw;
        let femaleDraw = this.state.value == GenderType.FEMALE ? selectFemaleDraw : unselectFemaleDraw;
        let maleStyle = this.state.value == GenderType.MALE ? styles.maleSelectStyle : {};
        let femaleStyle = this.state.value == GenderType.FEMALE ? styles.femaleSelectStyle : {};
        let maleTextStyle = this.state.value == GenderType.MALE ? styles.selectTextStyle : {};
        let femaleTextStyle = this.state.value == GenderType.FEMALE ? styles.selectTextStyle : {};
        return (
            <View style={[styles.container, this.props.style]}>
                <IconText drawLeftStyle={styles.imageStyle} textStyle={[styles.textStyle, maleTextStyle]} drawLeft={maleDraw} text='男' style={[styles.itemStyle, maleStyle]} onPress={() => {
                    this.onPress(GenderType.MALE);
                }}/>
                <IconText drawLeftStyle={styles.imageStyle} textStyle={[styles.textStyle, femaleTextStyle]} drawLeft={femaleDraw} text='女' style={[styles.itemStyle, femaleStyle]} onPress={() => {
                    this.onPress(GenderType.FEMALE);
                }}/>
            </View>
        );
    }

    onPress(value) {
        if (this.props.editable != undefined && !this.props.editable) {
            return;
        }
        if (value == this.state.value && this.props.cancelable != undefined && this.props.cancelable) {
            this.state.value = GenderType.UNKNOWN;
        } else {
            this.state.value = value;
        }
        this.setState(this.state);
        if (this.props.onChange != null) {
            this.props.onChange(this.state.value);
        }
    }

    initial() {
        this.state = {};
        if (this.props.value != null && (this.props.value == GenderType.FEMALE || this.props.value == GenderType.MALE)) {
            this.state.value = this.props.value;
        } else {
            this.state.value = GenderType.UNKNOWN;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    itemStyle: {
        height: 30,
        width: 80,
        borderRadius: 50,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: '#FFFFFF',
        borderColor: '#B9B9B9',
        borderWidth: 0.5,
        marginLeft: 10,
    },

    textStyle: {
        fontSize: 15,
        color: '#999999',
        textAlignVertical: 'center',
        padding: 0,
        textAlign: 'center',
    },

    selectTextStyle: {
        color: '#FFFFFF'
    },

    maleSelectStyle: {
        backgroundColor: '#61A3F9',
        borderColor: '#61A3F9',
    },

    femaleSelectStyle: {
        backgroundColor: '#FB7D8F',
        borderColor: '#FB7D8F',
    },

    imageStyle: {
        width: 15,
        height: 15,
    }
});

module.exports = GenderRadio;
