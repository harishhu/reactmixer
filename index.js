import ReactMixer from './lib/reactmixer-react-native/entry-rn';

let home = require('./src/app-modules/home');
let demo = require('./src/app-modules/demo');

const {AppModuleManager, ZANavigator} = global.reactmixer;
//console.log('harish - ' + AppModuleManager.installModule);
//must be called after all app modules have imported.
AppModuleManager.initAppEnv(ZANavigator);
