import React, {useState, useEffect} from 'react'
import axios from 'axios'
import * as yup from "yup"
import schema from '../formValidation/createClassSchema'
import styled from 'styled-components'

const classInitialvalues = {
    classname: '',
    classdescription: '',
    classcost:'',
    classequipment:'',
    address:'',
    classsize:'',
    classlength:'',
    arrivetime: '',
    whattoknow:'',
    start:'',
    finish:'',
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

const checkboxInitial = {
    sunday: false,
    monday: false,
    tuesday:false,
    wednesday:false,
    thursday:false,
    friday:false,
    saturday:false  
}

const initialErrors = {
    classname: '',
    classdescription: '',
    classcost:'',
    classequipment:'',
    address:'',
    classsize:'',
    classlength:'',
    arrivetime: '',
    whattoknow:'',
    start:'',
    finish:'',
    classtype:'',
    classlevel:''
}

const FormContainers = styled.form`
    display:flex;
    flex-direction:column;
    input {
        width:400px;
        padding: 1rem;
        border-radius:5px;
        border: 1px lightgrey solid;
    }
    input[type='checkbox'] {
        display:none;
    }
    .label {
        display:flex;
        margin: 1.5rem .9rem;
        flex-direction:column;
    }
    textarea {
        width:400px;
        padding: 1rem;
        border-radius:5px;
        border: 1px lightgrey solid;
    }
    select {
        width:80px;
        border-radius:.4rem;
        border: 1px lightgray solid;
        padding:.6rem 0;
    }
    .checkbox {
        display:flex;
        label {
            background:lightgray;
            border-radius:10px;
            margin-left:2rem;
            padding:.5rem 1.5rem;
            margin:3rem 0;
            margin-right: 3rem;
        }
        .checkedbox {
                background: orange;
            }
    }

    .classtime {
        margin: .9rem;
        input {
            width:50px;
            margin-left:1rem;
        }
        .classtimeto {
            margin:0 1rem;
        }
    }
    padding: 2rem 7rem;
    font-size: 2.5rem;
    button {
        width:400px;
        padding:1rem;
        font-weight:bold;
        color:darkgray;
    }
`

export default function CreateClass() {

     const [classForm, setclassForm] = useState(classInitialvalues)

     const [formErrors, setFormErrors] = useState(initialErrors)

     const [disabled, setDisabled] = useState(true)

     const [checkbox, setCheckbox] = useState(checkboxInitial)
     
     const inputChange = (name, value) => {
        yup.reach(schema,name)
        .validate(value)
        .then(() => {
            setFormErrors({
                ...formErrors,[name]: ''
            })
        })
        .catch((err) => {
            console.log(err.errors[0])
            setFormErrors({
              ...formErrors,
              [name]: err.errors[0],
            })
          }) 

        setclassForm({
            ...classForm, [name]: value
        })
     }

     const onChange = e => {
        const {name, value, type, checked} = e.target
        const valueToUse = type === 'checkbox' ? checked : value
        inputChange(name,valueToUse)
     }

     const checkboxClick = e => {
        const {name, checked} = e.target
        setCheckbox({...checkbox, [name]:checked})
     }

     const formSubmit = () => {
         const newclass = {
             classname: classForm.classname.trim(),
             classdescription: classForm.classdescription.trim(),
             classcost: classForm.classcost.trim(),
             classequipment: classForm.classequipment.trim(),
             address: classForm.address.trim(),
             classtype: classForm.type,
             classsize: classForm.classsize.trim(),
             classlength: classForm.classlength.trim(),
             classlevel: classForm.classlevel,
             arrivetime: classForm.arrivetime.trim(),
             whattoknow: classForm.whattoknow.trim(),
             start: classForm.start.trim(),
             finish: classForm.finish.trim(),
             classtype: classForm.classtype,
             days: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].filter(day => classForm[day])
         }
         sendSignUp(newclass)
     }

     const onSubmit = e => {
         e.preventDefault()
         formSubmit()
     }

     useEffect(() => {
        schema.isValid(classForm).then((valid) => {
          setDisabled(!valid);
        });
      }, [classForm]);


     const sendSignUp = newclass => {
         axios.post('https://reqres.in/api/users', newclass)
         .then(res => console.log(res.data))
         .catch(e => console.log(e))
         setclassForm(classInitialvalues)
     }

    return (
        <div>
           <h1>Create Class</h1>
           <div>
                {formErrors.classname}
            </div>
           <FormContainers onSubmit={onSubmit}>

                <label className='label'>
                    Class Name
                    <input 
                    type="text" 
                    name="classname" 
                    value={classForm.classname}
                    onChange={onChange}
                    />
                </label>
                <label className='label'>
                    Class Description
                    <textarea 
                    rows="4" 
                    type="text" 
                    name="classdescription" 
                    value={classForm.classdescription}
                    onChange={onChange}
                    />
                </label>
                <label className='label'>
                    Class Cost
                    <input 
                    type="text" 
                    name="classcost" 
                    value={classForm.classcost}
                    onChange={onChange}
                    />
                </label>
                <label className='label'>
                    Class Equipment Requirements
                    <textarea 
                    rows="4"  
                    type="text" 
                    name="classequipment" 
                    value={classForm.classequipment}
                    onChange={onChange}
                    />
                </label>
                <label className='label'>
                    Class Address
                    <input 
                    type="text" 
                    name="address" 
                    value={classForm.address}
                    onChange={onChange}
                    />
                </label>
                <label className='label'>
                    Class Type
                    <select 
                    onChange={onChange}
                    value={classForm.classtype}
                    name='classtype'
                    >
                        <option value="boxing">Boxing</option>
                        <option value="yoga">Yoga</option>
                        <option value="weights">Weights</option>
                    </select>
                </label>
                <label className='label'>
                    Class Size
                    <input 
                    type="text" 
                    name="classsize" 
                    value={classForm.classsize}
                    onChange={onChange}
                    />
                </label>
                <label className='label'>
                    Class Length
                    <input 
                    type="text" 
                    name="classlength" 
                    value={classForm.classlength}
                    onChange={onChange}
                    />
                </label>
                <label className='label'>
                    Class Level
                    <select 
                    onChange={onChange}
                    value={classForm.classlevel}
                    name='classlevel'
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
                <label className='label'>
                    When To Arrive
                    <input 
                    type="text" 
                    name="arrivetime" 
                    value={classForm.arrivetime}
                    onChange={onChange}
                    />
                </label>
                <label className='label'>
                    What You Need To Know
                    <textarea 
                    rows="4" 
                    type="text" 
                    name="whattoknow" 
                    value={classForm.whattoknow}
                    onChange={onChange}
                    />
                </label>
                <label className='classtime'>
                    Class Time
                    <input 
                    type="text" 
                    name="start" 
                    value={classForm.start}
                    onChange={onChange}
                    />
                    <span className='classtimeto'>To</span>
                    <input 
                    type="text" 
                    name="finish" 
                    value={classForm.finish}
                    onChange={onChange}
                    />
                </label>
                <div className='checkbox'>
                <label 
                className={`box ${checkbox.sunday ? 'checkedbox' : ''}`} 
                onClick={checkboxClick}>
                Sunday
                <input
                    type="checkbox"
                    name="sunday"
                    checked={classForm.sunday}
                    onChange={onChange}
                />
                </label>
                <label
                className={`box ${checkbox.monday ? 'checkedbox' : ''}`} 
                onClick={checkboxClick}
                >
                Monday
                <input
                    type="checkbox"
                    name="monday"
                    checked={classForm.monday}
                    onChange={onChange}
                />
                </label>
                <label
                className={`box ${checkbox.tuesday ? 'checkedbox' : ''}`} 
                onClick={checkboxClick}
                >
                Tuesday
                <input
                    type="checkbox"
                    name="tuesday"
                    checked={classForm.tuesday}
                    onChange={onChange}
                />
                </label>
                <label
                className={`box ${checkbox.wednesday ? 'checkedbox' : ''}`} 
                onClick={checkboxClick}
                >
                Wednesday
                <input
                    type="checkbox"
                    name="wednesday"
                    checked={classForm.wednesday}
                    onChange={onChange}
                />
                </label>
                <label
                className={`box ${checkbox.thursday ? 'checkedbox' : ''}`} 
                onClick={checkboxClick}
                >
                Thursday
                <input
                    type="checkbox"
                    name="thursday"
                    checked={classForm.thursday}
                    onChange={onChange}
                />
                </label>
                <label
                className={`box ${checkbox.friday ? 'checkedbox' : ''}`} 
                onClick={checkboxClick}
                >
                Friday
                <input
                    type="checkbox"
                    name="friday"
                    checked={classForm.friday}
                    onChange={onChange}
                />
                </label>
                <label
                className={`box ${checkbox.saturday ? 'checkedbox' : ''}`} 
                onClick={checkboxClick}
                >
                Saturday
                <input
                    type="checkbox"
                    name="saturday"

                    checked={classForm.saturday}
                    onChange={onChange}
                />
                </label>
                </div>
                <button disabled={disabled}>Confirm</button>
           </FormContainers>
        </div>
    )
}

