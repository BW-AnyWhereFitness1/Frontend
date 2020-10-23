import React, {useState, useEffect} from 'react'
import * as yup from "yup"
import schema from '../formValidation/signUpSchema'
import {useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'

import { userActions } from '../_actions';
const instructorInitialvalues = {
    name: '',
    username: '',
    email: '',
    password: ''
}   

const initialErrors = {
    name: '',
    username: '',
    email: '',
    password: ''
}

const FormContainerDiv = styled.div`
  display: flex;
  height:400px;
  width:320px;
  border-radius:2rem;
  flex-direction:column;
  justify-content:center;
  font-family: 'Comfortaa', cursive;
/*   height: 75vh; */
  background-color: #ffffff;
  padding: 1rem;
  .form-text-top {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #welcome-text {
    font-weight: 400;
    font-size: 3rem; 
  }
  #sub-text {
    font-family: 'MuseoModerno', cursive;
    font-size: 2.5rem;
  }
  #sub-text {
    font-family: 'MuseoModerno', cursive;
  }
  form {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-content: center   
  }
  .form-bottom {
      display: flex;
      justify-content: center;
      #no-account {
          font-size: .15rem;
          margin-right: .35rem;
      }
      #sign-up {
          font-size: .15rem;
          font-weight: 750;
      }
  }
  .error {
      color: red;
      font-size: 1.5rem;
  }
  
  button {
      color: white;
      padding:1rem 0;
      margin-bottom:1rem;
  }

  .btn {
    flex: 1 1 auto;
    background-image: linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%);
    border-radius: 5px;
    padding: 3px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    color: white;
    /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
    box-shadow: 0 0 20px #eee;
    height:4rem;
    .btn:hover {
        background-position: right center;
    }

    .btn-disabled {
    flex: 1 1 auto;
    /* background-image: linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%); */
    background-color: grey;
    margin: 10px;
    border-radius: 5px;
    padding: 3px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 150% auto;
    color: white;
    /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
    box-shadow: 0 0 20px #eee;
    }
    .btn:hover {
        background-position: right center;
    }
  }

  input {
      margin-bottom: .15rem;
      margin-bottom: 2rem;
      outline: 0;
      border-width: 0 0 2px;
      border-color: pink;
  }
  input:focus {
      border-color: pink;
  }
  input[placeholder] {
      font-size:2rem;
  }
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 1px rgba(0,0,0,0.09), 
              0 4px 2px rgba(0,0,0,0.09), 
              0 8px 4px rgba(0,0,0,0.09), 
              0 16px 8px rgba(0,0,0,0.09),
              0 32px 16px rgba(0,0,0,0.09);
`

const LoginDiv = styled.div`
    height:100%;
    min-height:500px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    .form-bottom {
        font-size:2rem;
        .link {
            text-decoration:none;
            color:black;
            font-weight:bold;
            &:hover {
                color:pink;
            }
        }
    }
`


export default function SignupInstructor() {

     const [instructorForm, setinstructorForm] = useState(instructorInitialvalues)

     const [formErrors, setFormErrors] = useState(initialErrors)

     const [disabled, setDisabled] = useState(true)
     const registering = useSelector(state => state.registrationInstructor.registering);
     const dispatch = useDispatch();
     const inputChange = (name, value) => {
        yup.reach(schema,name)
        .validate(value)
        .then(() => {
            setFormErrors({
                ...formErrors,[name]: ''
            })
        })
        .catch((err) => {
            setFormErrors({
              ...formErrors,
              [name]: err.errors[0],
            })
          }) 

        setinstructorForm({
            ...instructorForm, [name]: value
        })
     }

     const onChange = e => {
         const {name, value} = e.target
         inputChange(name,value)
     }

     const formSubmit = () => {
         const newinstructor = {
             name: instructorForm.name.trim(),
             username: instructorForm.username.trim(),
             email: instructorForm.email.trim(),
             password: instructorForm.password.trim(),
             role: 'instructor'
         }
         sendSignUp(newinstructor)
     }

     const onSubmit = e => {
         e.preventDefault()
         formSubmit()
     }

     useEffect(() => {
        schema.isValid(instructorForm).then((valid) => {
          setDisabled(!valid);
        });
      }, [instructorForm]);


     const sendSignUp = newinstructor => {
        dispatch(userActions.registerInstructor(newinstructor));
     }

    return (
        <LoginDiv>
           <h1>Instructor Sign Up</h1>
           <div>
                <div>{formErrors.name}</div>
                <div>{formErrors.username}</div>
                <div>{formErrors.password}</div>
                <div>{formErrors.email}</div>
            </div>
           <FormContainerDiv onSubmit={onSubmit}>
           <div class="form-text-top">
            <p id="welcome-text">Welcome</p>
            <p id="sub-text">Anywhere Fitness</p>
        </div>
               <input className="input"
               type="text" 
               name="name" 
               value={instructorForm.name}
               onChange={onChange}
               placeholder="Name"/>

               <input className="input"
               type="text" 
               name="username" 
               value={instructorForm.username}
               onChange={onChange}
               placeholder="Username"/>

               <input className="input"
               type="email" 
               name="email" 
               value={instructorForm.email}
               onChange={onChange}
               placeholder="Email"/>

               <input className="input"
               type="password" 
               name="password" 
               value={instructorForm.password}
               onChange={onChange}
               placeholder="Password"/>
               {disabled === true ? <button className="btn-disabled" disabled={disabled}>Confirm</button> : <button className="btn" disabled={disabled}>Confirm</button>}
               {registering && <p>Signing Up...</p>}
           </FormContainerDiv>
        </LoginDiv>
    )
}