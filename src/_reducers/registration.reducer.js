import { userConstants } from '../_constants';

export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { registering: true };
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}
export function registrationInstructor(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_INSTRUCTOR_REQUEST:
            return { registering: true };
        case userConstants.REGISTER_INSTRUCTOR_SUCCESS:
            return {};
        case userConstants.REGISTER_INSTRUCTOR_FAILURE:
            return {};
        default:
            return state
    }
}