import React, { Component } from 'react';

import {
    ZAComponent,
    ZAString,
    RequestItemBase,
    AppConfig,
    HttpRequestExecutor,
    ZANavigator,
    AppModuleManager,
    AppModule
} from 'zatech-react-native';

import language_chs from './language/zastring_chs';
import language_cht from './language/zastring_cht';

import DemoWidgets from './demo/demo_render_rn';

//set background color, title size & color for action bar
// AppConfig.actionBarStyle = {
//     backgroundColor:  '#ff0000',
//     titleSize : 20,
//     titleColor:'#0000ff'
// }
class DemoModule extends AppModule{
    constructor(){
        super();
    }

    /**
     * return module name of module
    */
    getName(){
        return 'hu.reactmixer.demo';
    }
    
    /**
     * return page router of module
    */
    getPageRouter(){
        return {
            'default': 'DemoWidgets',
            DemoWidgets: {
                render: DemoWidgets
            }
          }
    }

    /**
     * the entry of module, it must be invoked at first time of this module mounted 
    */
    entry(){
         //config languages and set default one
         this.registerLangSource('chs', language_chs);
         this.registerLangSource('cht', language_cht);
         this.setDefaultLang('chs');
 
         //set default http handler
         this.setHttpHeadersGenerator(function () {
             let httpHeader = {};
             httpHeader.v = AppConfig.getAppVersion();
             httpHeader.deviceId = AppConfig.getDeviceID();
             httpHeader.token = AppConfig.getUserToken();
             return httpHeader;
         });
    }
}

AppModuleManager.installModuleObj(new DemoModule());