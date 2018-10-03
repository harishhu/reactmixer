import React from 'react';

import {
    Dimensions
} from 'react-native';

const {
    UIBase,
    Utils,
    ZAString
} = global.reactmixer;

var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

class ZAComponent extends React.Component{
    constructor(props){
        super(props);

        this.zastrings = ZAString.strings;
        this.isReactNative = window.zaLaunchMode == undefined;

        this.navigator = ZAComponent.navigator;
        this.launchData = this.navigator.pageLaunchData;

        if(this.props.isNaviComponent){
            this.navigator.registerPageInstance(this);
        }

        this.screenWidth = ScreenWidth;
        this.screenHeight = ScreenHeight;

        if (this.props.controller){
          let ct = new this.props.controller(this.props, this);
          this.dcprops = ct.initProps2Render();
        }
    }

    onBackResult(data){
    }

    componentWillMount(){
    }

    componentDidMount(){
    }

    componentWillReceiveProps(nextProps){
    }

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    componentWillUpdate(nextProps, nextState){

    }

    componentDidUpdate(prevProps, prevState){

    }

    componentWillUnmount(){
    }

    static setUIBase(ui){
        ZAComponent.uibase = ui;
    }

    static setH5Navigator(navi){
        ZAComponent.navigatorh5 = navi;
    }

    showToast(toast){
        ZAComponent.uibase.showToast(toast);
    }

    showProgress(show){
        ZAComponent.uibase.showProgress(show);
    }

    convertBirthday2Age(birthday){
        return Utils.convertBirthday2Age(birthday);
    }

    getCurrentDateByType(type){
        return Utils.getCurrentDateByType(type);
    }
    /** 根据实际屏幕尺寸转换对应的像素宽度 */
    static getWidth(width) {
        return Utils.getWidth(width);
    }
    /** 根据实际屏幕尺寸转换对应的像素高度 */
    static getHeight(height){
        return Utils.getHeight(height);
    }
}

ZAComponent.setUIBase(UIBase);

module.exports = ZAComponent;
