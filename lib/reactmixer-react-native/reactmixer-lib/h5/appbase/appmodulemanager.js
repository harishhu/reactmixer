// import {
//     NativeInterface,
//     ZANavigator,
//     ZAString,
//     Utils
// } = global.reactmixer;

// import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';

const {
    UIBase
} = global.reactmixer;

//registerServiceWorker();

class AppModuleManager {
    // static APP_MODULE_BASEADDR = 60000;
    // static APP_MODULE_INTERVAL = 2000;

    initAppEnv(Navi) {
        if(this.navi){
            return;
        }

        ReactDOM.render(<Navi/>, document.getElementById('app'));
    }

    constructor() {
        this.modulelist = {};
        // hookfun = hookfun.bind(this);

        // NativeInterface.requestInstalledAppletsInfo((list)=>{
        //     this.appletlist = Utils.Json2Obj(list);
        // });
    }

    setRunningModule(modulename){
       // ZAString.setRunningModule(modulename);
    }

    installModuleObj(moduleobj) {
        console.log('installModuleObj = ' + moduleobj.getName());
        if (this.modulelist[moduleobj.getName()]) {
            return;
        }

        moduleobj.name = moduleobj.getName();
        moduleobj.pagerouter = moduleobj.getPageRouter();

        this.modulelist[moduleobj.name] = moduleobj;
        moduleobj.entry();
        // ZAString.setRunningModule(moduleobj.name);
    }

    installModule(modulename, callback) {
        //console.log('installModule = ' + modulename);
        // if (this.modulelist[modulename]) {
        //     callback();
        //     return;
        // }

        // NativeInterface.requestAppModuleCode(modulename, (data) => {
        //     console.log('requestAppModuleCode result = ' + data);
        //     if(data == ""){
        //         return;
        //     }
            
        //     if (!ishook) {
        //         ishook = true;
        //         hookfun();
        //     }

        //     if (this.currentBaseAddr == undefined) {
        //         this.currentBaseAddr = AppModuleManager.APP_MODULE_BASEADDR;
        //     } else {
        //         this.currentBaseAddr += AppModuleManager.APP_MODULE_INTERVAL;
        //     }

        //     eval(data);
        //     callback();
        // });
    }

    isModuleInstalled(modulename) {
        if (this.modulelist[modulename]) {
            return true;
        }

        return false;
    }

    getModuleRoutePage(modulename, pagename) {
        // let module = this.modulelist[modulename];
        // if (module) {
        //     pagename = pagename ? pagename : 'default';

        //     if (pagename === 'default') {
        //         pagename = module.pagerouter[pagename];
        //     }

        //     let r = module.pagerouter[pagename];
        //     if (r) {
        //         return {
        //             pagename: pagename,
        //             entry: r
        //         }
        //     }

        //     return undefined;
        // }

        // return undefined;
    }
};

module.exports = new AppModuleManager();
