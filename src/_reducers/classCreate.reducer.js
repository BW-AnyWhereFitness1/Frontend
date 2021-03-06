import { userConstants } from '../_constants';

export function classCreateReducer(state = {}, action) {
    switch (action.type) {
        case userConstants.CREATE_CLASS_REQUEST:
            return { creating: true };
        case userConstants.CREATE_CLASS_SUCCESS:
            return {
                response: action.res
            };
        case userConstants.CREATE_CLASS_FAILURE:
            return {
                error: action.error,
            };
        default:
            return state
    }
}
export function classEditReducer(state = {}, action) {
    switch (action.type) {
        case userConstants.EDIT_CLASS_REQUEST:
            return { editing: true };
        case userConstants.EDIT_CLASS_SUCCESS:
            return {
                response: action.res
            };
        case userConstants.EDIT_CLASS_FAILURE:
            return {
                error: action.error,
            };
        default:
            return state
    }
}