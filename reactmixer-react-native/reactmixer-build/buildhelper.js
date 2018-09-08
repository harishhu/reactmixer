//createModuleIdFactory.js /node_modules/metro/src/lib
//buildBundle.js /node_modules/react-native/local-cli/bundle
//Serializers.js /node_modules/metro/src/deltabunder/serializers
const fs = require('fs');
const MakeOutput = require('./makeoutput');
const isWindows = process.platform === 'win32';
const fileseperator = isWindows ? '\\' : '/';

const modulebuildinterval = 5000;

let fixPathConfig = {
    appModuleBaseCode : 50000,
    "\\node_modules\\react\\index.js" : 49000,
    "/node_modules/react/index.js" : 49000,
    "/node_modules/react-native/Libraries/Image/resolveAssetSource.js": 49001,
    "\\node_modules\\react-native\\Libraries\\Image\\resolveAssetSource.js": 49001,
    "\\reactmixer-react-native\\entry.js" : 49002,
    "/reactmixer-react-native/entry.js" : 49002,
    "\node_modules\react-native\Libraries\react-native\react-native-implementation.js" : 49003,
    "\\node_modules\\react-native\\Libraries\\react-native\\react-native-implementation.js" : 49003
}

class BuildHelper {
    constructor(){
        this.pwdpath = process.cwd() + fileseperator;
        this.outputmodulepath = this.pwdpath + "/build/rn-applets/"; 

        this.initAppletsMap();
    }

    initAppletsMap(){
        this.appletMap = {};

        let index = 0;
        let path = this.pwdpath + 'app-modules';
        
        if (fs.existsSync(path)) {
            var arr = fs.readdirSync(path);
            for (var i in arr) {
                let appletpath = path + '/' + arr[i];
                let stats = fs.statSync(appletpath);
                if (!stats.isFile()) {
                    let name = arr[i];
                    let config = fs.readFileSync(appletpath + '/package.json', 'utf8');
                    config = JSON.parse(config);
                    config.buildmoduleid = fixPathConfig.appModuleBaseCode + index++ * modulebuildinterval;
                    config.modulecode = [];
                    config.moduleres = [];
                    config.subpath = 'app-modules' + fileseperator + name;
                    console.log('applet name = ' + config.name + ' version = ' + config.version);
                    this.appletMap[config.subpath] = config;
                }
            }
        }
    }

    try2GeneratorAppletID(path){
        for(let key in this.appletMap){
            if (path.indexOf(key) == 0) {
                return this.appletMap[key].buildmoduleid++;
            }
        }

        return -1;
    }

    createModuleIdFactory() {
            // console.log("1111project path = " + process.cwd())
            const fileToIdMap = new Map();
            let nextId = 0;
            return path => {
                path = path.replace(this.pwdpath, "");
                // if(path.indexOf("react-native-implementation") != -1){
                //     console.log('path = ' + path);
                // }
                let id = fixPathConfig[path];
                if(id){
                    return id;
                }

                id = fileToIdMap.get(path);
                //console.log("createModuleIdFactory = " + path + ", id = " + id);
                if (path.indexOf('app-modules') == 0) {
                    let mmid = this.try2GeneratorAppletID(path);
                    if (id == undefined && mmid >= 0) {
                        id = mmid;
                        fileToIdMap.set(path, id);
                    }
                } else {
                    if (typeof id !== 'number') {
                        id = nextId++;
                        fileToIdMap.set(path, id);
                    }
                }

                return id;
            };
    }

    isImageRes(filename){
        if(filename.length <= 4){
            return false;
        }

        let lastindex = filename.length - 4;

        if(filename.lastIndexOf('.png') == lastindex || filename.lastIndexOf('.jpg') == lastindex){
            return true;
        }

        return false;
    }

    filterModuleCode(m){
        let path = m.path;
        path = path.replace(this.pwdpath, "");

        for(let key in this.appletMap){
            if (path.indexOf(key) == 0) {
                this.appletMap[key].modulecode.push(m.code);

                if(this.isImageRes(m.name)){
                    console.log('filter res file = ' + m.name);
                    this.appletMap[key].moduleres.push(m.name);
                }
                break;
            }
        }
    }

    startBuild(){
        console.log("start build - project path = " + process.cwd());
    }

    endBuild() {
        console.log("rn build finish");

        for (let key in this.appletMap) {
            let applet = this.appletMap[key];
            let modulecode = applet.modulecode;

            if (modulecode.length > 0) {
                modulecode.push('require(' + fixPathConfig.appModuleBaseCode + ')');
                MakeOutput.make(applet, this.outputmodulepath, this.pwdpath);
            }
        }
    }
}

module.exports = new BuildHelper();