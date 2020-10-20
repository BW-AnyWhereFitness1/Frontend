import React, {useState, useEffect} from 'react'
import axios from 'axios'
import * as yup from "yup"
import schema from '../formValidation/createClassSchema'

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



export default function CreateClass() {

     const [classForm, setclassForm] = useState(classInitialvalues)

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
           <form onSubmit={onSubmit}>

                <label>
                    Class Name
                    <input 
                    type="text" 
                    name="classname" 
                    value={classForm.classname}
                    onChange={onChange}
                    />
                </label>
                <label>
                    Class Description
                    <input 
                    type="text" 
                    name="classdescription" 
                    value={classForm.classdescription}
                    onChange={onChange}
                    />
                </label>
                <label>
                    Class Cost
                    <input 
                    type="text" 
                    name="classcost" 
                    value={classForm.classcost}
                    onChange={onChange}
                    />
                </label>
                <label>
                    Class Equipment Requirements
                    <input 
                    type="text" 
                    name="classequipment" 
                    value={classForm.classequipment}
                    onChange={onChange}
                    />
                </label>
                <label>
                    Class Address
                    <input 
                    type="text" 
                    name="address" 
                    value={classForm.address}
                    onChange={onChange}
                    />
                </label>
                <label>
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
                <label>
                    Class Size
                    <input 
                    type="text" 
                    name="classsize" 
                    value={classForm.classsize}
                    onChange={onChange}
                    />
                </label>
                <label>
                    Class Length
                    <input 
                    type="text" 
                    name="classlength" 
                    value={classForm.classlength}
                    onChange={onChange}
                    />
                </label>
                <label>
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
                <label>
                    When To Arrive
                    <input 
                    type="text" 
                    name="arrivetime" 
                    value={classForm.arrivetime}
                    onChange={onChange}
                    />
                </label>
                <label>
                    What You Need To Know
                    <input 
                    type="text" 
                    name="whattoknow" 
                    value={classForm.whattoknow}
                    onChange={onChange}
                    />
                </label>
                <label>
                    Class Time
                    <input 
                    type="text" 
                    name="start" 
                    value={classForm.start}
                    onChange={onChange}
                    />
                    To
                    <input 
                    type="text" 
                    name="finish" 
                    value={classForm.finish}
                    onChange={onChange}
                    />
                </label>
                <label>
                Sunday
                <input
                    type="checkbox"
                    name="sunday"
                    checked={classForm.sunday}
                    onChange={onChange}
                />
                </label>
                <label>
                Monday
                <input
                    type="checkbox"
                    name="monday"
                    checked={classForm.monday}
                    onChange={onChange}
                />
                </label>
                <label>
                Tuesday
                <input
                    type="checkbox"
                    name="tuesday"
                    checked={classForm.tuesday}
                    onChange={onChange}
                />
                </label>
                <label>
                Wednesday
                <input
                    type="checkbox"
                    name="wednesday"
                    checked={classForm.wednesday}
                    onChange={onChange}
                />
                </label>
                <label>
                Thursday
                <input
                    type="checkbox"
                    name="thursday"
                    checked={classForm.thursday}
                    onChange={onChange}
                />
                </label>
                <label>
                Friday
                <input
                    type="checkbox"
                    name="friday"
                    checked={classForm.friday}
                    onChange={onChange}
                />
                </label>
                <label>
                Saturday
                <input
                    type="checkbox"
                    name="saturday"

                    checked={classForm.saturday}
                    onChange={onChange}
                />
                </label>
                <button disabled={disabled}>Confirm</button>
           </form>
        </div>
    )
}

