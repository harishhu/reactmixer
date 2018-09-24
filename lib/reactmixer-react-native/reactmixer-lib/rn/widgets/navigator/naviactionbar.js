import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

let {
    AppConfig
} = global.reactmixer;

import NaviItemGroup from './naviitemgroup';

class NaviActionBar extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            showTitleBar: true,
        }

        if(AppConfig.actionBarStyle){
            this.titleDefaultStyle = {
                color: AppConfig.actionBarStyle.titleColor,
                fontSize: AppConfig.actionBarStyle.titleSize
            }
        }else{
            this.titleDefaultStyle = {}
        }
       
        this.groupStyle = {
            width: '100%',
            height: this.props.actionBarHeight
        }
    }

    updateTitle(value) {
    //    console.log('render title updateTitle= ' + value);
        this.setState(
            {
                title: value
            }
        );
    }

    componentDidMount() {
    }

    setNaviItemData(isleft, data) {
        if (isleft) {
            if (data == undefined) {
                this.refs.leftnaviitem.setItemData(undefined, isleft);
            } else {
                this.refs.leftnaviitem.setItemData(data, isleft);
            }
        } else {
            if (data == undefined) {
                this.refs.rightnaviitem.setItemData(undefined, isleft);
            } else {
                this.refs.rightnaviitem.setItemData(data, isleft);
            }
        }
    }

    naviItemClickCallback(itemdata, index) {
        if (itemdata == undefined || itemdata.callback == undefined) {
            return;
        }

        itemdata.callback(itemdata, index);
    }

    render() {
        // console.log('render title = ' + this.state.title)
        return (
            <View style={[this.groupStyle, this.props.style]}>
            <View style={styles.navititlegroup}>
                <Text style={[styles.title, this.titleDefaultStyle]}>{this.state.title}</Text>
            </View>
            <NaviItemGroup style={styles.naviitemgroupleft} ref='leftnaviitem'
                      itemClick={this.naviItemClickCallback.bind(this)} />
            <NaviItemGroup style={styles.naviitemgroupright} ref='rightnaviitem'
                      itemClick={this.naviItemClickCallback.bind(this)} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navititlegroup: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    naviitemgroupleft: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        height: '100%',
        left: 0,
        top: 0
    },
    naviitemgroupright: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        height: '100%',
        right: 0,
        top: 0
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: 17
    }
});

module.exports = NaviActionBar;
