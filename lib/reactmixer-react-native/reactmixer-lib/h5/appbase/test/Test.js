import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Test extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
        <div className="App" style={
          {
            height: '100%',
            width: '100%'
          }
        }>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to test react view</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div style={
          {
            height: '100%',
            width: '100%',
            display: 'flex',
            backgroundColor: '#00ff00'
          }
        }>

        <div>

        </div>

        <div>
          
        </div>

        </div>
      </div>
    );
  }
}

export default Test;
