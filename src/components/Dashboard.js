import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { userActions } from '../_actions';
import { Redirect, Link } from 'react-router-dom';

import ClassCard from './ClassCard'
import styled from 'styled-components';

const Browser = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
const DashboardWrapper = styled.div`
    display: flex;
    flex-direction:column;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
`
export default function Dashboard() {
    const classes = useSelector(state => state.classReducer);
    const instructorPane = useSelector(state => state.verifyInstructorReducer)
     const dispatch = useDispatch();
     function startLogOut() {
        console.log('called logout')
        dispatch(userActions.logout());
        window.location.href = "/login";


     }
     useEffect(() => {
        dispatch(userActions.getClassesClient());
        dispatch(userActions.checkInstructor());
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);
    return (
        <DashboardWrapper>
           <h1>Logged In</h1>
           <button onClick={() => startLogOut()}>Signout</button>
           <h1>Browse Classes</h1>
           {(localStorage.getItem("token") === null) && <Redirect to="/login" />}
           {classes.loading && <em>Loading classes...</em>}

           {classes.classes &&
                <Browser>
                    {classes.classes.map((user, index) =>
                        <ClassCard key = {user.id} class = {user}/>
                    )}
                </Browser>
            }
            {instructorPane.response &&
           <Link to='/createClass'>Create A Class</Link>
            }
        </DashboardWrapper>
        
    )
}

export { Dashboard }