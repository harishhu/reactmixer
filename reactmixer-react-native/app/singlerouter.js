import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router } from 'react-router';
import appconfig from './appbase/appconfig';
import HQWebAppRouter from './appbase/hqwebapprouter.js';
import zastring from './language/zastring'

zastring.setLangType('chs');
window.zastrings = zastring.strings;

var configPath = [
  {
    path: HQWebAppRouter.HQ_PATH_HQCOIN_DESC,
    main : require('./pages/singlepage/hqcion/hqcoin_desc')
  }
]

HQWebAppRouter.currentPageName = 'hqlife-single.html'
HQWebAppRouter.setConfigPath(configPath);
//alert(window.devicePixelRatio + ' ' + screen.height + ' ' + screen.width);

const rootRoute = [
  {
  path: '*',//appconfig.getCompatiblePath('index.html'),
  component: HQWebAppRouter.routerComponent(),
  onEnter: () => {
  },
  childRoutes: [
  ]
}
];

ReactDOM.render(
   <Router routes={rootRoute} history={browserHistory} />,
  document.getElementById('app')
);
