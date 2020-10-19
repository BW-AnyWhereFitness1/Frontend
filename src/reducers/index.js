import { LOGIN_START, LOGIN_SUCCESS } from "../actions";

const initialState = {
    loggingIn: false,
    error: null,
    loggedIn: false
};

function reducer(state = initialState, action){
    switch(action.type){
        case LOGIN_START:
            return({
                ...state,
                loggingIn: true,
                error: '',
                loggedIn: false
            })
        case LOGIN_SUCCESS:
            return({
                ...state,
                loggingIn: false,
                error: '',
                loggedIn: true
            })
        default:
        return{
            ...state
        };
    };
};

export default reducer;