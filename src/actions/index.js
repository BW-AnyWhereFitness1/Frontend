import axios from 'axios';
import axiosWithAuth from '../utils/axiosAuth';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SINGUP_SUCCESS';

export const GET_CLASSES_START = 'GET_CLASSES_START';
export const GET_CLASSES_SUCCESS = 'GET_CLASSES_SUCCESS';

export const login = userInfo => dispatch =>{
    dispatch({ type: LOGIN_START });

    axios.post("http://localhost:5000/api/login", userInfo)
        .then(res => {
            localStorage.setItem('token', res.data.payload);
            console.log(localStorage.getItem('token'));
            dispatch({
                type: LOGIN_SUCCESS
            })
        })
        .catch(err => console.log(err));
}

export const signup = userInfo => dispatch =>{
    dispatch({ type: SIGNUP_START });

    axios.post("http://localhost:5000/api/register", userInfo)
        .then(res => {
            localStorage.setItem('token', res.data.payload);
            console.log(localStorage.getItem('token'));
            dispatch({
                type: LOGIN_SUCCESS
            })
        })
        .catch(err => console.log(err));
}
export const getClasses = () => dispatch =>{
    console.log("getting classes from server");
    dispatch({ type: GET_CLASSES_START });

    axiosWithAuth().get('http://localhost:5000/api/classes')
        .then(res => {
            dispatch({
                type: GET_CLASSES_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => console.log(err));


}