import React, {useState, useEffect} from 'react';
import * as yup from "yup";
import schema from '../formValidation/LogInSchema';
import styled from 'styled-components';
import {useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userActions } from '../_actions';


const FormContainerDiv = styled.div`
  display: flex;
  flex-direction:column;
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
  #welcome-text {
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
  .btn {
    flex: 1 1 auto;
    background-image: linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%);
    margin: 10px;
    border-radius: 45px;
    padding: 10px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 150% auto;
    color: white;
    /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
    .btn:hover {
        background-position: right center;
    }
  }
  input {
      outline: 0;
      border-width: 0 0 2px;
      border-color: aquamarine;
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



// const FormContainerDiv = styled.div`
//     background-image: url("Assets/bruce-mars-ZXq7xoo98b0-unsplash.jpg");
//     background-size: 100%;
//     display: flex;
//     flex-direction: column;
//     background-color: black;
//     min-height: 45vh;
//     /* align-items: flex-end; */
//     /* max-width: 50%; */
//     width: 45%;
//     padding: 0rem;
//     border-radius: 10px;
//     background-color: white;
//     -webkit-box-shadow: 0px 6px 15px 0px rgba(0,0,0,0.45); 
//     box-shadow: 0 2px 1px rgba(0,0,0,0.09), 
//               0 4px 2px rgba(0,0,0,0.09), 
//               0 8px 4px rgba(0,0,0,0.09), 
//               0 16px 8px rgba(0,0,0,0.09),
//               0 32px 16px rgba(0,0,0,0.09);

//     button {
//         background-color: #40e0d0;
//         color: white;
//     }
//     text-align:center;
//     input {
//         margin: 1rem 0;
//     }
// `

const H1Title = styled.h1`
    color: black;
`


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
        <FormContainerDiv>

           <div class="form-text-top">
                <p id="welcome-text">Welcome</p>
                <p id="sub-text">Anywhere Fitness</p>
                </div>
            <div>
                    <div>{formErrors.username}</div>
                    <div>{formErrors.password}</div>
                </div>
                <div class="input">
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
                        <button className="btn" disabled={disabled}>Confirm</button>
                    </form>
                    <div class="form-bottom">
                    <p id="no-account">Don't have an account? </p><span id="sign-up">Sign Up</span>
            </div>
            </div>
           {localStorage.getItem('token') && <Redirect to="/dashboard" />}

        </FormContainerDiv>
    )
}

export { Login };
