import React, { Component } from 'react';
import logo from './ivaluate.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title" style={{color:'white'}}>for <span style={{color:'#D32F2F'}}>Codaisseur</span></h1>
        </header>
        <p className="App-intro">
          A students evaluation tool!
        </p>
      </div>
    );
  }
}

export default App;
