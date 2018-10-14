import React from 'react';
import ReactDOM from 'react-dom';

const {
    UIBase
} = global.reactmixer;

class AppModuleManager {
    initAppEnv(Navi) {
        if(this.navi){
            return;
        }

        ReactDOM.render(<Navi/>, document.getElementById('app'));
    }

    constructor() {
        this.modulelist = {};
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
        console.log('installModule = ' + modulename);
        if (this.modulelist[modulename]) {
            callback();
            return;
        }
    }

    isModuleInstalled(modulename) {
        if (this.modulelist[modulename]) {
            return true;
        }

        return false;
    }

    getModuleRoutePage(modulename, pagename) {
        let module = this.modulelist[modulename];
        if (module) {
            pagename = pagename ? pagename : 'default';

            if (pagename === 'default') {
                pagename = module.pagerouter[pagename];
            }

            let r = module.pagerouter[pagename];
            if (r) {
                return {
                    pagename: pagename,
                    entry: r
                }
            }

            return undefined;
        }

        return undefined;
    }
};

module.exports = new AppModuleManager();
