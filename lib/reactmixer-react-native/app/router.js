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
    path: HQWebAppRouter.HQ_PATH_LOGIN,
    main : require('./pages/login/login.js')
  },
  {
    path: HQWebAppRouter.HQ_PATH_TASKCENTER,
    main : require('./pages/taskcenter/taskcenter.js')
  },
  {
    path: HQWebAppRouter.HQ_PATH_TASKCENTER_DESC,
    main : require('./pages/taskcenter/taskdesc.jsx')
  }
]

HQWebAppRouter.setConfigPath(configPath);
//alert(window.devicePixelRatio + ' ' + screen.height + ' ' + screen.width);

const rootRoute = [
  {
  path: '*',//appconfig.getCompatiblePath('index.html'),
  component: HQWebAppRouter.routerComponent(),
  onEnter: () => {
  },
  childRoutes: [
    // {
    //   path: 'login',
    //   getComponent(location, cb) {
    //     require.ensure([], (require) => {
    //       cb(null, require('./Login'));
    //     });
    //   },
    //   onEnter: () => {bridge.doAction('setTitle', { title: '绑定帐号' });bridge.doAction('setWechat', {showOptionMenu: false})}
    // },
  ]
},
{
  path: 'taskcenter',
  component: require('./pages/taskcenter/taskcenter.js')
}
];

ReactDOM.render(
   <Router routes={rootRoute} history={browserHistory} />,
  document.getElementById('app')
);
