import { userConstants } from '../_constants';
import { userService } from '../_services';

export const userActions = {
    login,
    logout,
    register,
    registerInstructor,
    getClassesClient,
    checkInstructor
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                   
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getClassesClient() {
    return dispatch => {
        dispatch(request());
        userService.getClassesClient()
            .then(
                res => { 
                    dispatch(success(res));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.CLASSES_GET_REQUEST } }
    function success(res) { return { type: userConstants.CLASSES_GET_SUCCESS, res } }
    function failure(error) { return { type: userConstants.CLASSES_GET_FAILURE, error } }
}

function checkInstructor() {
    return dispatch => {
        dispatch(request());
        userService.checkInstructor()
            .then(
                res => { 
                    dispatch(success(res));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.CHECK_INSTRUCTOR_START } }
    function success(res) { return { type: userConstants.CHECK_INSTRUCTOR_SUCCESS, res } }
    function failure(error) { return { type: userConstants.CHECK_INSTRUCTOR_FAULURE, error } }
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                   
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
function registerInstructor(user) {
    return dispatch => {
        dispatch(request(user));

        userService.registerInstructor(user)
            .then(
                user => { 
                    dispatch(success()); 
                },
                error => {
                    dispatch(failure(error.toString()));
                   
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_INSTRUCTOR_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_INSTRUCTOR_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_INSTRUCTOR_FAILURE, error } }
}