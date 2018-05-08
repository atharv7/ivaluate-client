import React, { Component } from 'react';
import logo from './ivaluate.png';
import './App.css';
import { BrowserRouter as Router, Route, Redirect,Link } from 'react-router-dom'
import FrontPage from './containers/frontPage'
import logoutPage from './components/logout/logoutPage';
import {connect} from 'react-redux'
import batchesList from './components/batches/batchesList';


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title" style={{color:'white'}}>for <span style={{color:'#D32F2F'}}>Codaisseur</span></h1>
          {this.props.currentUser && <Link to="/logout"><input type="button" value="LOGOUT"/></Link>}
        </header>
        
        
          <div>
          <Route exact path="/home" component={FrontPage} />
          <Route exact path="/logout" component={logoutPage} />
          <Route exact path="/batches" component={batchesList} />
          <Route exact path="/" render={ () => <Redirect to="/home" /> } />
          </div>
        
        
      </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {return {
  currentUser: state.currentUser
}}

export default connect(mapStateToProps)(App)
