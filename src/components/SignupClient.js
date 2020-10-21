import React, {useState, useEffect} from 'react';
import * as yup from "yup";
import schema from '../formValidation/signUpSchema';
import styled from 'styled-components';
import {useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions';

// STYLING
const FormContainerDiv = styled.div`
  display: flex;
  flex-direction:column;
  align-self: flex-end;
  margin-right: 2rem;
  min-height: 25rem;
  font-family: 'Comfortaa', cursive;
  max-width: 25%;
  border-radius: 10px;
/*   height: 75vh; */
  background-color: #ffffff;
  padding: 1rem;
  .form-text-top {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #sign-up-text {
    font-weight: 400;
    font-size: 2rem; 
  }
  #sub-text {
    font-family: 'MuseoModerno', cursive;
    font-size: .65rem;
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
      font-size: .65rem;
  }
  .error {
      color: red;
      font-size: .25rem;
  }
  
  button {
      color: white;
  }

  .btn {
    flex: 1 1 auto;
    background-image: linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%);
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
      outline: 0;
      border-width: 0 0 2px;
      border-color: pink;
  }
  input:focus {
      border-color: pink;
  }
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 1px rgba(0,0,0,0.09), 
              0 4px 2px rgba(0,0,0,0.09), 
              0 8px 4px rgba(0,0,0,0.09), 
              0 16px 8px rgba(0,0,0,0.09),
              0 32px 16px rgba(0,0,0,0.09);
`

const PicLeftDiv = styled.div`
    padding-top: 2rem;
    img {
         max-width: 90%;
         border-radius: 10px;
         } 
`

const FormFieldsRightDiv = styled.div`
    /* background-color: black; */
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-right: 2rem;
    max-width:75%;
    height: 100%;
    /* display: flex;
    flex-direction: column; */
    /* align-items: flex-start; */
    /* align-items: center; */
    /* justify-content: center;
    /* align-content: center; */ */

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

`

// STYLING END



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
        <FormContainerDiv>
        <div class="form-text-top">
            <p id="welcome-text">Welcome</p>
            <p id="sub-text">Anywhere Fitness</p>
        </div>

                <form onSubmit={onSubmit}>
                    <input 
                    type="text" 
                    name="name" 
                    value={clientForm.name}
                    onChange={onChange}
                    placeholder="Name"/>
                    {formErrors.name.length > 0 ? <p className="error">{formErrors.name}</p> : null}

                    <input 
                    type="text" 
                    name="username" 
                    value={clientForm.username}
                    onChange={onChange}
                    placeholder="Username"/>
                    {formErrors.username.length > 0 ? <p className="error">{formErrors.username}</p> : null}

                    <input 
                    type="email" 
                    name="email" 
                    value={clientForm.email}
                    onChange={onChange}
                    placeholder="Email"/>
                    {formErrors.email.length > 0 ? <p className="error">{formErrors.email}</p> : null}

                    <input 
                    type="password" 
                    name="password" 
                    value={clientForm.password}
                    onChange={onChange}
                    placeholder="Password"/>
                    {formErrors.password.length > 0 ? <p className="error">{formErrors.password}</p> : null}
                    
                                   {registering && <p>Signing Up...</p>}
                    {disabled === true ? <button className="btn-disabled" disabled={disabled}>Confirm</button> : <button className="btn" disabled={disabled}>Confirm</button>}
                </form>
                <div class="form-bottom">
                    <span id="no-account">Already have an account?</span><span id="sign-up">Sign In</span>
                </div>
        </FormContainerDiv>
    )
}

