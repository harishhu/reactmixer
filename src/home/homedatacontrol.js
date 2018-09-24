import ZADataControl from './../../core/appbase/zadatacontrol';
import React, { Component } from 'react';

export default class HomeDataControl extends ZADataControl {
  constructor(props){
    super(props);
  }

  initProps2Render(){
    let renderProps = super.initProps2Render();

    renderProps = {
      ...renderProps,
      ...this.props,
    }

    return renderProps;
  }

  componentDidMount(){
    console.log('login component did mount = ');
    let i = 1;

    this.navigator.setTitle('首页');
  }

  componentWillUnmount(){
    clearInterval(this.intervalid);
  }
}
