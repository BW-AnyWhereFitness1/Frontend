import React, {useState, useEffect} from 'react'
import * as yup from "yup"
import schema from '../formValidation/createClassSchema'
import styled from 'styled-components'
import {useDispatch} from 'react-redux';
import { userActions } from '../_actions';

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
    max-width:1000px;
    margin: 0 auto;
    text-align:center;
    color:#1f3c88;
    h1 {
        color:black;
        text-align: center;
        font-size:4rem;
        margin:3rem 0;
    }
    input {
        width:100%;
        padding: 1rem;
        border:none;
        border-bottom: 1px #9ba4b4  solid;
    }
    input[type='checkbox'] {
        display:none;
    }
    .label {
        color: #07031a;
        text-align:left;
        display:flex;
        margin: 1.5rem .9rem;
        flex-direction:column;
    }
    textarea {
        width:100%;
        padding: 1rem;
        border-radius:5px;
        border: 1px #9ba4b4 solid;
    }
    select {
        width:80px;
        border-radius:.4rem;
        border: 1px #9ba4b4 solid;
        padding:.6rem 0;
    }
    .checkbox {
        display:flex;
        color: #07031a;
        justify-content:center;
        flex-wrap:wrap;
        label {
            border-radius:10px;
            margin-left:2rem;
            padding:.5rem 1.5rem;
            margin:3rem 0;
            margin-right: 3rem;
            cursor: pointer;
            &:hover {
                background: #fbd46d;
            }
        }
        .checkedbox {
                background: #fbd46d;
            }
    }

    .classtime {
        text-align:left;
        color: #07031a;
        margin-left:-5rem;
        input {
            width:60px;
            margin-left:1rem;
        }
        .classtimeto {
            margin:0 1rem;
        }
    }
    padding: 2rem 7rem;
    font-size: 2.5rem;
    button {
        background:#f4f6ff;
        padding:1.5rem 10rem;
        font-weight:bold;
        color: gray;
        border:none;
        border-radius:1rem;
    }
    .btn-ready {
        background: #fbd46d;
        color: #07031a;
    }
    .formcontainer {
        display:flex;
        justify-content:space-between;
        .leftform {
            width:45%;
        }
        .rightform {
            width:45%;
        }
    }
    .error {
        font-size:1.5rem;
        color:red;
    }
`

export default function EditClass({id, setclassForm, classForm, classInitialvalues, disabled, setDisabled}) {
    const dispatch = useDispatch();

     const [formErrors, setFormErrors] = useState(initialErrors)


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
             name: classForm.classname.trim(),
             type: classForm.classtype,
             location: classForm.address.trim(),
             intensity: classForm.classlevel,
             max_size: classForm.classsize,
             duration: classForm.classlength,
             date: classForm.start.trim()
         }
         console.log(classInitialvalues)
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
         dispatch(userActions.editClass(newclass, id));
         setclassForm(classInitialvalues)
         
     }

    return (
        <div>
           <FormContainers onSubmit={onSubmit}>
                <h1>Edit Class ({id})</h1>
                <div className="formcontainer">
                <div className="leftform">
                <label className='label'>
                    Class Name
                    <input 
                    type="text" 
                    name="classname" 
                    value={classForm.classname}
                    onChange={onChange}
                    />
                </label>
                <p className='error'>{formErrors.classname}</p>
                <label className='label'>
                    Class Address
                    <input 
                    type="text" 
                    name="address" 
                    value={classForm.address}
                    onChange={onChange}
                    />
                </label>
                <p className='error'>{formErrors.address}</p>
                <label className='label'>
                    Class Cost
                    <input 
                    type="text" 
                    name="classcost" 
                    value={classForm.classcost}
                    onChange={onChange}
                    />
                </label>
                <p className='error'>{formErrors.classcost}</p>
                <label className='label'>
                    Class Date
                    <input 
                    type="text" 
                    name="start" 
                    value={classForm.start}
                    onChange={onChange}
                    />
                </label>
                <p className='error'>{formErrors.classtime}</p>
               
    
                </div>
                <div className="rightform">
                <label className='label'>
                    Class Length
                    <input 
                    type="text" 
                    name="classlength" 
                    value={classForm.classlength}
                    onChange={onChange}
                    />
                </label>
                <p className='error'>{formErrors.classlength}</p>
                <label className='label'>
                    Class Size
                    <input 
                    type="text" 
                    name="classsize" 
                    value={classForm.classsize}
                    onChange={onChange}
                    />
                </label>
                <p className='error'>{formErrors.classsize}</p>
                <label className='label'>
                    Class Type
                    <select 
                    onChange={onChange}
                    value={classForm.classtype}
                    name='classtype'
                    >
                        <option value="cardio">Cardio</option>
                        <option value="medetation">Medetation</option>
                        <option value="boxing">Boxing</option>
                        <option value="yoga">Yoga</option>
                        <option value="weights">Weights</option>
                    </select>
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
                <p className='error'>{formErrors.classlevel}</p>
                <p className='error'>{formErrors.classtype}</p>
                </div>
                </div>
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
                <button disabled={disabled} className={`box ${disabled ? '' : 'btn-ready'}`} >Update</button>
           </FormContainers>
        </div>
    )
}

