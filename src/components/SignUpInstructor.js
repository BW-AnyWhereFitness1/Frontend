import React, {useState, useEffect} from 'react'
import axios from 'axios'
import * as yup from "yup"
import schema from '../formValidation/signUpSchema'

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


export default function SignupInstructor() {

     const [instructorForm, setinstructorForm] = useState(instructorInitialvalues)

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
             password: instructorForm.password.trim()
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
         axios.post('https://reqres.in/api/users', newinstructor)
         .then(res => console.log(res.data))
         .catch(e => console.log(e))
         setinstructorForm(instructorInitialvalues)
     }

    return (
        <div>
           <h1>Instructor Sign Up</h1>
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
               value={instructorForm.name}
               onChange={onChange}
               placeholder="Name"/>

               <input 
               type="text" 
               name="username" 
               value={instructorForm.username}
               onChange={onChange}
               placeholder="Username"/>

               <input 
               type="email" 
               name="email" 
               value={instructorForm.email}
               onChange={onChange}
               placeholder="Email"/>

               <input 
               type="password" 
               name="password" 
               value={instructorForm.password}
               onChange={onChange}
               placeholder="Password"/>
               <button disabled={disabled}>Confirm</button>
           </form>
        </div>
    )
}