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
    ZAKJSource,
    HttpRequestExecutor,
    AppModuleManager,
} from 'zatech-react-native';

import NativeInterface from './../../../common/appbase/nativeinterface'
import appconfig from './../../../common/appbase/appconfig'
import ZAComponent from './../../../common/appbase/zacomponent';
import utils from './../../../common/appbase/utils';
import NaviContent from './navicontent';
import NaviBarGroup from './navibargroup';

class ZANavigator extends Component<{}> {
    static MAX_PAGE_COUNT = 20;

    static statusBarHeight;
    static actionBarHeight;

    initAppConfig(){
        if(!this.props.appConfig){
            return;
        }

        let data = utils.Json2Obj(this.props.appConfig);

        for(var key in data){
            appconfig[key] = data[key];
        }

        ZANavigator.statusBarHeight = Number(appconfig.statusBarHeight);
        ZANavigator.actionBarHeight = 44;
    }

    constructor(props) {
        super(props);
        this.initAppConfig();

        ZAComponent.navigator = this;
 
        this.contentList = [];
        for (let i = 0; i < ZANavigator.MAX_PAGE_COUNT; i++) {
            this.contentList.push({});
        }

        this.isIos = Platform.OS == 'ios' ? true : false;

        this.routStack = [];

        this.state = {
            title: ''
        }

        this.currentRoutPage = this.getPageAtStack();

        this.pageNaviBgColorMap = {};

        this.value = 60;
        this.ismounted = false;

        ZAKJSource.setResDirInfo(this.props.resdirinfo);
    }

    setGoBackCallback(callback) {
        this.gobackcallback = callback;
    }

    initHandleNativeBack() {
        NativeInterface.setGoBackTrigger(() => {
            if (this.gobackcallback) {
                this.gobackcallback();
                this.initHandleNativeBack();
                return;
            }

            this.goBack();
        });
    }

    getPageAtStack() {
        let size = this.routStack.length;

        if (size == 0) {
            return;
        }

        return this.routStack[size - 1];
    }

    popUpPageStack() {
        let size = this.routStack.length;
        this.routStack.splice(size - 1, 1);
    }

    componentDidMount() {
        this.navigate(appconfig.appletpagerouter, undefined, appconfig.appletname);

        this.ismounted = true;
        this.initHandleNativeBack();
    }

    setBackResultData(data) {
        this.backResultData = data;
    }

    goBack() {
        if (this.routStack.length == 0) {
            return;
        }

        let refcontent = this.refs['content' + (this.routStack.length - 1)];
        refcontent.setRenderBody(undefined);
        refcontent.showView(false);

        this.popUpPageStack();

        let size = this.routStack.length;

        console.log('the rout stack length = ' + size);

        if (size > 0) {
            let tmppage = this.getPageAtStack();
            this.currentRoutPage = tmppage;
            AppModuleManager.setRunningModule(this.currentRoutPage.modulename);

            this.initHandleNativeBack();

            refcontent = this.refs['content' + (this.routStack.length - 1)];
            refcontent.showView(true);

            this.restoreNavigatorBarData();

            if (this.currentRoutPage.refcontent.pageins) {
                this.currentRoutPage.refcontent.pageins.onBackResult(this.backResultData);
            }
            this.backResultData = undefined;
        } else {
            NativeInterface.finishNativeWindow();
        }
    }

    restoreNavigatorBarData(data) {
        if(this.refs.navibargroup == undefined){
          return;
        }

        this.currentRoutPage.refcontent.restoreActionBar(data);
    }

    getNavigatorBarData(){
      if(this.refs.navibargroup == undefined){
        return;
      }

      let navidata = {...this.currentRoutPage.refcontent.actionbardata};
      return navidata;
    }

    setTitle(value) {
        this.currentRoutPage.refcontent.setTitle(value);
    }

    setBackgroundColor(bgcolor) {
        this.currentRoutPage.refcontent.setBackgroundColor(bgcolor);
    }

    setBackgroundImage(source) {
        this.currentRoutPage.refcontent.setBackgroundImage(source);
    }

    setLeftNaviItem(icon, name, callback) {
        this.currentRoutPage.refcontent.setLeftNaviItem(icon, name, callback);
    }

    setRightNaviItem(icon, name, callback) {
        this.currentRoutPage.refcontent.setRightNaviItem(icon, name, callback);
    }

    setLeftNaviItems(items){
      this.currentRoutPage.refcontent.setLeftNaviItems(items);
    }

    setRightNaviItems(items){
      this.currentRoutPage.refcontent.setRightNaviItems(items);
    }

    showTitleBar(show) {
        this.currentRoutPage.refcontent.showTitleBar(show);
    }

    showStatusBar(show){
        this.currentRoutPage.refcontent.showStatusBar(show);
    }

    registerPageInstance(ins) {
        this.currentRoutPage.refcontent.pageins = ins;
    }

    replace(pagename, launchData, modulename){
      let refcontent = this.refs['content' + (this.routStack.length - 1)];
      refcontent.setRenderBody(undefined);
      refcontent.showView(false);

      this.popUpPageStack();
      this.navigate(pagename, launchData, modulename);
    }

    navigateinner(page, launchData, modulename){
        if (page) {
            if (this.routStack.length > 0) {
                let refcontent = this.refs['content' + (this.routStack.length - 1)];
                refcontent.showView(false);
            }

            this.pageLaunchData = launchData;
            this.currentRoutPage = page;
            AppModuleManager.setRunningModule(this.currentRoutPage.modulename);

            this.routStack.push(page);
            this.initHandleNativeBack();

            let refcontent = this.refs['content' + (this.routStack.length - 1)];
            page.refcontent = refcontent;

            refcontent.initDefault();

            // refcontent.setRenderBody(this.currentRoutPage.entry({
            //     isNaviComponent: true,
            //     launchData: this.props.launchData
            // }));
            let entryData = this.currentRoutPage.entry;

            entryData.initprops = entryData.initprops ? entryData.initprops : {};
            entryData.initprops.isNaviComponent = true;
            entryData.initprops.launchData = this.props.launchData;

            refcontent.setRenderBody(entryData);
            refcontent.showView(true);
            console.log('navigate- rout stack size = ' + this.routStack.length);
        }
    }

    navigate(pagename, launchData, modulename) {
        let targetmodule = modulename;
        if (targetmodule == undefined && this.currentRoutPage) {
            targetmodule = this.currentRoutPage.modulename;
        }

        AppModuleManager.installModule(targetmodule, () => {
            let routepage = AppModuleManager.getModuleRoutePage(targetmodule, pagename);
            if (routepage) {
                let page = {
                    modulename: targetmodule,
                    name: routepage.pagename,
                    entry: routepage.entry
                };

                this.navigateinner(page, launchData, targetmodule);
                console.log('navigate = ' + page.modulename);
            }
        })
    }

    render() {
        return (
            <View style={styles.navigatorcontainer}>
       <StatusBar translucent={true} hidden={false} barStyle={'light-content'} backgroundColor={'transparent'} />
       <NaviBarGroup ref='navibargroup' statusBarHeight={ZANavigator.statusBarHeight} actionBarHeight={ZANavigator.actionBarHeight}></NaviBarGroup>
       <View style={styles.navigatorcontent}>
        {
            this.contentList.map((item, index) => {
                return (
                  <NaviContent key={index} ref={'content' + index} navigator={this}/>
                )
            })
        }
       </View>
     </View>
        );
    }
}

const styles = StyleSheet.create({
    navigatorcontainer: {
        flexDirection: 'column',
        flex: 1,
    },
    navigatorcontent: {
        flex: 1,
    }
});

module.exports = ZANavigator;
