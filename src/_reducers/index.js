import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { classReducer } from './classReducer.reducer';

import { registrationInstructor } from './registration.reducer';


const rootReducer = combineReducers({
    authentication,
    registration,
    registrationInstructor,
    classReducer
});

export default rootReducer;