// import {
//     Platform,
//     StyleSheet,
//     Text,
//     View,
//     Button,
//     NativeModules,
//     Image,
//     TouchableWithoutFeedback,
//     StatusBar,
//     ImageBackground
// } from 'react-native';

const {
    ZAString
} = global.reactmixer;

// import NaviContent from './navicontent';
// import NaviBarGroup from './navibargroup';

import React from 'react';
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import './zanavigator.scss';

const {
    AppModuleManager,
    ZAComponent
} = global.reactmixer;

class ZANavigator extends ZAComponent{
    static MAX_PAGE_COUNT = 20;

    static statusBarHeight;
    static actionBarHeight;

    initAppConfig(){
        this.pagerouter = {};
        this.histroy = [];

        ZAComponent.navigator = this;

        const modulelist = AppModuleManager.modulelist;

        let pathname = window.location.pathname;
        let targetrender = undefined;
        let targetmodule = undefined;

        for(let key in modulelist){
            let m = modulelist[key];

            console.log('module name = ' + m.name);
            for(let k1 in m.pagerouter){
                if(k1 == 'default'){
                    continue;
                }

                let tmp = m.pagerouter[k1];
                let item = {
                    name: m.name + '-' + k1,
                    render: tmp.render
                };

                console.log('item = ' + item.name);
                if('/' + item.name == pathname){
                    targetrender = item.render;
                    targetmodule = m.name;
                }

                this.pagerouter[item.name] = item.render;
            }
        }

        ZAString.setRunningModule(targetmodule);        
        this.state = {
            currentrender : targetrender
        }
    }

    constructor(props) {
        super(props);
        this.initAppConfig();
    }

    setGoBackCallback(callback) {
        this.gobackcallback = callback;
    }

    initHandleNativeBack() {
    }

    getPageAtStack() {
    }

    popUpPageStack() {
    }

    componentDidMount() {
    }

    setBackResultData(data) {
        this.backResultData = data;
    }

    goBack() {
    }

    restoreNavigatorBarData(data) {
    }

    getNavigatorBarData(){
    }

    setTitle(value) {
    }

    setBackgroundColor(bgcolor) {
    }

    setBackgroundImage(source) {
    }

    setLeftNaviItem(icon, name, callback) {
    }

    setRightNaviItem(icon, name, callback) {
    }

    setLeftNaviItems(items){
    }

    setRightNaviItems(items){
    }

    showTitleBar(show) {
    }

    showStatusBar(show){
    }

    registerPageInstance(ins) {
    }

    replace(pagename, launchData, modulename){
    }

    navigateinner(page, launchData, modulename){
    }

    navigate(pagename, launchData, modulename) {
        let render = this.pagerouter[modulename + '-' + pagename];

        //console.log('navigate render = ' + render);

        if(render){
            ZAString.setRunningModule(modulename);        
            this.setState(
                {
                    currentrender : render
                }
            );
        }
    }

    render(){
        if(this.state.currentrender){
            const ItemRender = this.state.currentrender;
            return (
                <div id='navi'>
                <ItemRender/>
                </div>
            )
        }
        
        return (
            <div id='navi'>
            </div>
        )
    }
}

module.exports = ZANavigator;
