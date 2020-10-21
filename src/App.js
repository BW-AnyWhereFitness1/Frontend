import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Login } from './components/Login';
import Signup from './components/SignupClient';
import SignupInstructor from './components/SignUpInstructor';
import Navbar from './components/Navbar'


import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';



class App extends Component {
  render() {
    return (
      <div>
      <Router>
          <Navbar/>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route exact path='/' component={LandingPage} />
          <Route path='/signupInstructor' component={SignupInstructor} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
      </Router>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    classes: state.classes
  }
}

export default connect(mapStateToProps, {})(App);