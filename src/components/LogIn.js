import React, {useState, useEffect} from 'react'
import * as yup from "yup"
import schema from '../formValidation/LogInSchema'
import {useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';


const loginInitialvalues = {
    username: '',
    password: ''
}   

const initialErrors = {
    username: '',
    password: ''
}


function Login() {

     const [loginForm, setloginForm] = useState(loginInitialvalues)

     const [formErrors, setFormErrors] = useState(initialErrors)

     const [disabled, setDisabled] = useState(true)

     const loggingIn = useSelector(state => state.authentication.loggingIn);
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
         console.log(newlogin);

         dispatch(userActions.login(newlogin));

     }

    return (
        <div>
           <h1>Log In</h1>
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
               {loggingIn && <p>Logging In...</p>}
               <button disabled={disabled}>Confirm</button>
           </form>
        
        </div>
    )
}

export { Login };