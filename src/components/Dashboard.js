import React from 'react'
import { useDispatch } from 'react-redux';

import { userActions } from '../_actions';
import { Redirect } from 'react-router-dom';

export default function Dashboard() {
     const dispatch = useDispatch();
     function startLogOut() {
        console.log('called logout')
        dispatch(userActions.logout());
     }
    return (
        <div>
           <h1>Logged In</h1>
           <button onClick={() => startLogOut()}>Signout</button>
           {(localStorage.getItem("token") === null) && <Redirect to="/login" />}
        </div>
        
    )
}
