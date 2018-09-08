import {
    AppRegistry
} from 'react-native';
import {
    NativeInterface,
    ZANavigator,
    ZAString,
    Utils
} from 'reactmixer-react-native';

const buildbaseaddr = 50000;
let ishook = false;
let hookfun = function () {
    //console.log('global obj = ' + global.__d);
    //console.log('global obj = ' + global.require);
    const adjustid = (id) => {
        if (id < buildbaseaddr) {
            return id;
        }

        let value = id - buildbaseaddr;
        value = value % 5000;
        value = this.currentBaseAddr + value;
        return value;
    };

    let restoreDefine = global.__d;
    let restoreRequire = global.require;
    global.__d = (factory, moduleid, moduledependency) => {
        console.log('define module id = ' + moduleid);
        moduleid = adjustid(moduleid);

        for (let i = 0; i < moduledependency.length; i++) {
            let value = moduledependency[i];

            if (value >= buildbaseaddr) {
                  value = adjustid(value);
                  moduledependency[i] = value;
            }
        }
        
        restoreDefine(factory, moduleid, moduledependency);
    }

    global.require = (moduleid) => {
        moduleid = adjustid(moduleid);
        console.log('require module id = ' + moduleid);
        restoreRequire(moduleid);
    }
}

class AppModuleManager {
    static APP_MODULE_BASEADDR = 60000;
    static APP_MODULE_INTERVAL = 2000;

    initAppEnv() {
        AppRegistry.registerComponent('index', () => {
            return ZANavigator;
        });
    }

    constructor() {
        this.modulelist = {};
        hookfun = hookfun.bind(this);

        NativeInterface.requestInstalledAppletsInfo((list)=>{
            this.appletlist = Utils.Json2Obj(list);
        });
    }

    setRunningModule(modulename){
        ZAString.setRunningModule(modulename);
    }

    installModuleObj(moduleobj) {
        if (this.modulelist[moduleobj.getName()]) {
            return;
        }

        moduleobj.name = moduleobj.getName();
        moduleobj.pagerouter = moduleobj.getPageRouter();

        this.modulelist[moduleobj.name] = moduleobj;
        moduleobj.entry();
        ZAString.setRunningModule(moduleobj.name);
    }

    installModule(modulename, callback) {
        if (this.modulelist[modulename]) {
            callback();
            return;
        }

        NativeInterface.requestAppModuleCode(modulename, (data) => {
            console.log('requestAppModuleCode result = ' + data);
            if(data == ""){
                return;
            }
            
            if (!ishook) {
                ishook = true;
                hookfun();
            }

            if (this.currentBaseAddr == undefined) {
                this.currentBaseAddr = AppModuleManager.APP_MODULE_BASEADDR;
            } else {
                this.currentBaseAddr += AppModuleManager.APP_MODULE_INTERVAL;
            }

            eval(data);
            callback();
        });
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
