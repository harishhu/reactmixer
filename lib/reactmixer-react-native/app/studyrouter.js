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
    path: 'exam-home',
    main : require('./pages/study/exam-home.jsx')
  },
  {
    path: 'simu-list',
    main : require('./pages/study/simulator-list')
  },
  {
    path: 'simu-desc',
    main : require('./pages/study/simulator-desc')
  },
  {
    path: 'exam-main',
    main : require('./pages/study/exam-main')
  },
  {
    path: 'simu-entry',
    main : require('./pages/study/simulator-entry')
  },
  {
    path: 'exam-result',
    main : require('./pages/study/exam-result')
  }
]

HQWebAppRouter.currentPageName = 'hqlife-study.html'
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
   <Router routes={rootRoute} history={browserHistory}/>,
  document.getElementById('app')
);
