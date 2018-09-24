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

// let {
//     ZAKJSource,
//     HttpRequestExecutor,
//     AppModuleManager,
//     NativeInterface,
//     AppConfig,
//     ZAComponent,
//     Utils
// } = global.reactmixer;

// import NaviContent from './navicontent';
// import NaviBarGroup from './navibargroup';

import React from 'react';
import './../../appbase/test/index.css';
import App from './../../appbase/test/App';
import Test from './../../appbase/test/Test';

import { BrowserRouter , Route , Switch } from 'react-router-dom';
import './zanavigator.scss';

let {
    AppModuleManager,
    ZAComponent
} = global.reactmixer;

class ZANavigator extends ZAComponent{
    static MAX_PAGE_COUNT = 20;

    static statusBarHeight;
    static actionBarHeight;

    initAppConfig(){
        this.pagerouter = [];
        this.histroy = [];

        const modulelist = AppModuleManager.modulelist;

        let pathname = window.location.pathname;
        let targetrender = undefined;

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
                }

                this.pagerouter.push(item)
            }
        }

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

    getRootEle() {
        return (
        <BrowserRouter>
            <Switch >
            <Route path='/test' component={Test} exact />
            <Route path='/app' component={App} exact />
            <Route path='/test1' component={render} exact />
            </Switch>
        </BrowserRouter>
        )
    }
}

module.exports = ZANavigator;
