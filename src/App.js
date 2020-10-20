import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './components/LogIn';
import Signup from './components/SignupClient';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <Link to='/login'> Login </Link>
            <Link to='/signup'> Sign up </Link>
          </header>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state =>{
  return{
    classes: state.classes
  }
}

export default connect(mapStateToProps, {})(App);