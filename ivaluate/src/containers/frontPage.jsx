import React, { Component } from 'react';
import LoginPage from '../components/login/loginPage'
import SignupPage from '../components/signup/signupPage';
class App extends Component {
  render() {
    return (
      <div className="Login-box">
        <LoginPage />
        <SignupPage />
      </div>
    );
  }
}

export default App;
