import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Test from './Test';
import { BrowserRouter ,Route ,Switch } from 'react-router-dom';
//import registerServiceWorker from './registerServiceWorker';

let ele = (
   <div>
        <BrowserRouter>
            <Switch>
                <Route path='/app' component={App} exact />
                <Route path='/test' component={Test} exact />
            </Switch>
        </BrowserRouter>
    </div>
);

ReactDOM.render(ele, document.getElementById('root'));
//registerServiceWorker();
