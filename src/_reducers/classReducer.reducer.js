import { userConstants } from '../_constants';

export function classReducer(state = {}, action) {
    switch (action.type) {
        case userConstants.CLASSES_GET_REQUEST:
            return {
                loading: true
            };
        case userConstants.CLASSES_GET_SUCCESS:
            return {
                classes: action.res.data
            };
        case userConstants.CLASSES_GET_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}
export function verifyInstructorReducer(state = {}, action) {
    switch (action.type) {
        case userConstants.CHECK_INSTRUCTOR_START:
            return {
                loading: true
            };
        case userConstants.CHECK_INSTRUCTOR_SUCCESS:
            return {
                response: action.res,
            };
        case userConstants.CHECK_INSTRUCTOR_FAULURE:
            return {
                error: action.error,
            };
        default:
            return state
    }
}