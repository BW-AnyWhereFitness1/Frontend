import { authHeader } from '../_helpers';
export const userService = {
    login,
    logout,
    register,
    registerInstructor,
    getClassesClient,
    checkInstructor,
    createClass
};
const apiUrl = 'https://anywherefit.herokuapp.com'
function login(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/api/auth/login`, requestOptions)
        .then(handleResponse)
        .then(res => {
            localStorage.setItem('token', JSON.stringify(res.token));
            return res;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
}

function checkInstructor() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiUrl}/api/auth/instructor/classes/`, requestOptions).then(handleResponse);
}

function getClassesClient() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiUrl}/api/auth/users/classes`, requestOptions).then(handleResponse);
}

function createClass(classObj) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(classObj),
    };
    console.log(requestOptions.body);
    return fetch(`${apiUrl}/api/auth/instructor/classes/add`, requestOptions)
    .then(handleResponse)
    .then(res => {
        console.log(res)
        return res;
    });
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/api/auth/register`, requestOptions)
    .then(handleResponse)
    .then(res => {
        console.log('Register Called')
        console.log(res.message)
        return res;
    });
}

function registerInstructor(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/api/auth/register`, requestOptions)
    .then(handleResponse)
    .then(res => {
        console.log('Register Called')
        console.log(res.message)
        return res;
    });
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                console.log(401)
                logout();
               
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log(data);
        return data;
    });
}