import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './components/LogIn';
import Signup from './components/SignupClient';
import styled from 'styled-components';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';



const StyledHeader = styled.header`
  
  background-color: white;
  border-radius: 10px;
  margin-bottom: 2rem;
  nav a {
    text-decoration: none;
    color: black;
  }

`

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <StyledHeader>
            <h1 id="company-name">Anywhere Fitness</h1>
            <nav>
              <Link to='/login'> Login </Link>
              <Link to='/signup'> Sign up </Link>
            </nav>
            
          </StyledHeader>
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