import ReactMixer from './lib/reactmixer-react-native/entry-rn';
global.reactmixer = ReactMixer;

let home = require('./src/app-modules/home');
//import demo from './src/app-modules/demo';

let {AppModuleManager, ZANavigator} = global.reactmixer;
//console.log('harish - ' + AppModuleManager.installModule);
//must be called after all app modules have imported.
AppModuleManager.initAppEnv(ZANavigator);
