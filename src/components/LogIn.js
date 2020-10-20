import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as yup from "yup";
import schema from '../formValidation/LogInSchema';
import styled from 'styled-components';



const FormContainerDiv = styled.div`
    background-image: url("Assets/bruce-mars-ZXq7xoo98b0-unsplash.jpg");
    background-size: 100%;
    display: flex;
    flex-direction: column;
    background-color: black;
    min-height: 45vh;
    /* align-items: flex-end; */
    /* max-width: 50%; */
    width: 45%;
    padding: 0rem;
    border-radius: 10px;
    background-color: white;
    -webkit-box-shadow: 0px 6px 15px 0px rgba(0,0,0,0.45); 
    box-shadow: 0 2px 1px rgba(0,0,0,0.09), 
              0 4px 2px rgba(0,0,0,0.09), 
              0 8px 4px rgba(0,0,0,0.09), 
              0 16px 8px rgba(0,0,0,0.09),
              0 32px 16px rgba(0,0,0,0.09);

    button {
        background-color: #40e0d0;
        color: white;
    }
    text-align:center;
    input {
        margin: 1rem 0;
    }
`

const H1Title = styled.h1`
    color: white;
`


const loginInitialvalues = {
    username: '',
    password: ''
}   

const initialErrors = {
    username: '',
    password: ''
}


export default function Login() {

     const [loginForm, setloginForm] = useState(loginInitialvalues)

     const [formErrors, setFormErrors] = useState(initialErrors)

     const [disabled, setDisabled] = useState(true)
     
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

        setloginForm({
            ...loginForm, [name]: value
        })
     }

     const onChange = e => {
         const {name, value} = e.target
         inputChange(name,value)
     }

     const formSubmit = () => {
         const newlogin = {
             username: loginForm.username.trim(),
             password: loginForm.password.trim()
         }
         sendSignUp(newlogin)
     }

     const onSubmit = e => {
         e.preventDefault()
         formSubmit()
     }

     useEffect(() => {
        schema.isValid(loginForm).then((valid) => {
          setDisabled(!valid);
        });
      }, [loginForm]);


     const sendSignUp = newlogin => {
         axios.post('https://reqres.in/api/users', newlogin)
         .then(res => console.log(res.data))
         .catch(e => console.log(e))
         setloginForm(loginInitialvalues)
     }

    return (
        <FormContainerDiv>
           <H1Title>Log In</H1Title>
           <div>
                <div>{formErrors.username}</div>
                <div>{formErrors.password}</div>
            </div>
           <form onSubmit={onSubmit}>

               <input 
               type="text" 
               name="username" 
               value={loginForm.username}
               onChange={onChange}
               placeholder="Username"/>

               <input 
               type="password" 
               name="password" 
               value={loginForm.password}
               onChange={onChange}
               placeholder="Password"/>
               <button disabled={disabled}>Confirm</button>
           </form>
        </FormContainerDiv>
    )
}

