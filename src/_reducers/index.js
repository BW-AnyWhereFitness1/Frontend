import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { classReducer, verifyInstructorReducer } from './classReducer.reducer';

import { registrationInstructor } from './registration.reducer';


const rootReducer = combineReducers({
    authentication,
    registration,
    registrationInstructor,
    classReducer,
    verifyInstructorReducer
});

export default rootReducer;