import React, {useState, useEffect} from 'react'
import * as yup from "yup"
import schema from '../formValidation/signUpSchema'
import {useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';
const clientInitialvalues = {
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


export default function Signup() {

     const [clientForm, setclientForm] = useState(clientInitialvalues)

     const [formErrors, setFormErrors] = useState(initialErrors)

     const [disabled, setDisabled] = useState(true)
     const registering = useSelector(state => state.registration.registering);
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

        setclientForm({
            ...clientForm, [name]: value
        })
     }

     const onChange = e => {
         const {name, value} = e.target
         inputChange(name,value)
     }

     const formSubmit = () => {
         const newclient = {
             name: clientForm.name.trim(),
             username: clientForm.username.trim(),
             email: clientForm.email.trim(),
             password: clientForm.password.trim(),
             role: 'client'
         }
         sendSignUp(newclient)
     }

     const onSubmit = e => {
         e.preventDefault()
         formSubmit()
     }

     useEffect(() => {
        schema.isValid(clientForm).then((valid) => {
          setDisabled(!valid);
        });
      }, [clientForm]);


     const sendSignUp = newclient => {
        dispatch(userActions.register(newclient));
     }

    return (
        <div>
           <h1>Sign Up</h1>
           <div>
                <div>{formErrors.name}</div>
                <div>{formErrors.username}</div>
                <div>{formErrors.password}</div>
                <div>{formErrors.email}</div>
            </div>
           <form onSubmit={onSubmit}>
               <input 
               type="text" 
               name="name" 
               value={clientForm.name}
               onChange={onChange}
               placeholder="Name"/>

               <input 
               type="text" 
               name="username" 
               value={clientForm.username}
               onChange={onChange}
               placeholder="Username"/>

               <input 
               type="email" 
               name="email" 
               value={clientForm.email}
               onChange={onChange}
               placeholder="Email"/>

               <input 
               type="password" 
               name="password" 
               value={clientForm.password}
               onChange={onChange}
               placeholder="Password"/>
               <button disabled={disabled}>Confirm</button>
               {registering && <p>Signing Up...</p>}
           </form>
        </div>
    )
}

