import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../constants/actionTypes";

const initialState = {
    token: null,
    error: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                error: null,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                token: null,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default authReducer;