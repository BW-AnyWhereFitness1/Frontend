import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { userActions } from '../_actions';
import { Redirect, Link } from 'react-router-dom';
import EditClass from './EditClass'
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

    const classInitialvalues = {
        classname: '',
        classcost:'',
        address:'',
        classsize:'',
        classlength:'',
        start:'',
        classtype:'boxing',
        classlevel:'easy',
        sunday: false,
        monday: false,
        tuesday:false,
        wednesday:false,
        thursday:false,
        friday:false,
        saturday:false  
    } 
     const [classForm, setclassForm] = useState(classInitialvalues)

     const [disabled, setDisabled] = useState(true)

     const [classObject, setClassObject] = useState(classInitialvalues)

     const [showEdit, setShowEdit] = useState(false)

     function startLogOut() {
        console.log('called logout')
        dispatch(userActions.logout());
        window.location.href = "/login";


     }

     function edit(classObj) {
        setShowEdit(true);
        setClassObject(classObj);
        const {
            date,
            intensity,
            location,
            max_size,
            type,
            name,
            duration
        } = classObj

        setclassForm({
            classname: name,
            classlevel: intensity,
            address: location,
            classsize: max_size,
            classtype: type,
            start: date,
            classlength: duration
        })
        console.log(classObj)
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
                    {classes.classes.map((classObj) =>
                        <ClassCard key = {classObj.id} class = {classObj} edit={edit}/>
                    )}
                </Browser>
            }
            {
              instructorPane.response && <Link to = '/createClass'>Add Class</Link>
            }
            { showEdit && <EditClass id = {classObject.id}  setclassForm={setclassForm} disabled={disabled} setDisabled={setDisabled} classForm={classForm} classInitialvalues={classInitialvalues}/>
            }
        </DashboardWrapper>
        
    )
}

export { Dashboard }