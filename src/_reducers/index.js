import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { registrationInstructor } from './registration.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    registrationInstructor
});

export default rootReducer;