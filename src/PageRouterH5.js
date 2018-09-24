import React , { Component }from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import ZAComponent from './core/appbase/zacomponent';
// import {uibase} from './core/appbase_h5/appbase';
// import requestitembase from './core/network/requestitembase';
// import sendrequest from './core/network/sendrequest_h5';
// import mynavigator from './core/appbase_h5/mynavigator'
// import zastring from './language/zastring';
// import Login from './demos/login/login_render_h5';
// import Home from './demos/home/home_render_h5'

// zastring.setLangType('cht');
// requestitembase.sendRequest = sendrequest;
// ZAComponent.navigator = new mynavigator();
// ZAComponent.setUIBase(uibase);
import Home from './home/home_render_h5';

let ele = (
    <div>
        <BrowserRouter>
            <Switch>
                <Route path='/app' component={Home} exact />
            </Switch>
        </BrowserRouter>
    </div>
);

ReactDOM.render(
   ele, document.getElementById('app')
);
