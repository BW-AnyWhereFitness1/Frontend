import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as yup from "yup";
import schema from '../formValidation/signUpSchema';
import styled from 'styled-components';


// STYLING
const FormContainerDiv = styled.div`
    display: flex;
    /* justify-content: center; */
    height:85vh;
    width: 135vh;
    border-radius: 1%;
    background-color: white;
    -webkit-box-shadow: 0px 6px 15px 0px rgba(0,0,0,0.45); 
    box-shadow: 0px 6px 15px 0px rgba(0,0,0,0.45);

    button {
        background-color: #40e0d0;
        color: white;
    }
`

const PicLeftDiv = styled.div`
    /* background-image: url(../Assets/jared-rice-8w7b4SdhOgw-unsplash.jpg); */
    background-color: #EEEEEE;
    width: 35%;
`

const FormFieldsRightDiv = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    align-content: center;

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
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
                <p>PICTURE GOES HERE</p>
            </PicLeftDiv>
            <FormFieldsRightDiv>
                    <div>
                        <h1>Sign Up</h1>
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
                </form>
           </FormFieldsRightDiv>
        </FormContainerDiv>
    )
}

