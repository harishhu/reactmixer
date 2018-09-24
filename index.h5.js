// import React from 'react';
// import ReactDOM from 'react-dom';
//import './index.css';
// import App from './App';
// import Test from './Test';
// import { BrowserRouter ,Route ,Switch } from 'react-router-dom';
//import registerServiceWorker from './registerServiceWorker';

// import {
//     AppModule
// } = global.reactmixer;

// let ele = (
//     <div>
//         <BrowserRouter>
//             <Switch>
//                 <Route path='/app' component={App} exact />
//                 <Route path='/test' component={Test} exact />
//             </Switch>
//         </BrowserRouter>
//     </div>
// );

//ReactDOM.render(ele, document.getElementById('root'));
//registerServiceWorker();

import ReactMixer from './lib/reactmixer-react-native/entry-h5';

import home from './src/app-modules/home';
//import demo from './app-modules/demo';

let {AppModuleManager, ZANavigator} = global.reactmixer;

// console.log('ZAComponent = ' + ZAComponent);
  
//must be called after all app modules have imported.
AppModuleManager.initAppEnv(ZANavigator);
  
