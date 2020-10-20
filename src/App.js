import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './components/LogIn';
import Signup from './components/SignupClient';
import styled from 'styled-components';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';



const StyledHeader = styled.header`
  display:flex;
  justify-content:space-between;

  text-decoration: none;  
  background-color: white;
  /* border-radius: 10px; */
  margin-bottom: 2rem;
  width: 100%;
  nav a {
    text-decoration: none;
    color: black;
    margin-left: 1rem;
  }

  #company-name {
    margin-left: 1rem;
    color: black;
    font-family: 'MuseoModerno', cursive;
    font-size: 2rem;
  }

  nav {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
    margin-right: 2rem;
  }

`






class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <StyledHeader>
            <Link to='/' style={{ textDecoration: 'none' }}>
            <h1 id="company-name">Anywhere Fitness</h1>
            </Link>
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