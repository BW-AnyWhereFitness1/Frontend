import React from 'react';
import SignUpInstructor from './components/SignUpInstructor'
import SignupClient from './components/SignupClient'
import Login from './components/LogIn'

function App() {
  return (
    <div>
      <SignUpInstructor />
      <SignupClient />
      <Login/>
    </div>
  );
}

export default App;
