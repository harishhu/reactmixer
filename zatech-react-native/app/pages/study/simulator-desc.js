import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './simulator-desc.scss';

import {UIBase} from './../../appbase/appbase'

export default class SimulatorDesc extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <h1>simulator desc</h1>
    )
  }
}
