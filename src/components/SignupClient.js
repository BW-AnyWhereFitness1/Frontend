import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as yup from "yup";
import schema from '../formValidation/signUpSchema';
import styled from 'styled-components';


// STYLING
const FormContainerDiv = styled.div`
    display: flex;
    flex-direction: space-between;
    background-color: black;
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
             password: clientForm.password.trim()
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
         axios.post('https://reqres.in/api/users', newclient)
         .then(res => console.log(res.data))
         .catch(e => console.log(e))
         setclientForm(clientInitialvalues)
     }

    return (
        <FormContainerDiv>
            <PicLeftDiv>
                <img src='Assets/jared-rice-8w7b4SdhOgw-unsplash.jpg' />
            </PicLeftDiv>
            <FormFieldsRightDiv>
                    <div>
                        <div>{formErrors.name}</div>
                        <div>{formErrors.username}</div>
                        <div>{formErrors.password}</div>
                        <div>{formErrors.email}</div>
                    </div>
                <h2>Sign Up</h2>
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
                </form>
           </FormFieldsRightDiv>
        </FormContainerDiv>
    )
}

