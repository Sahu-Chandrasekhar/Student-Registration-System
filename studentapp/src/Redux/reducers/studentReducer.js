import { ADD_STUDENT_FAILURE, ADD_STUDENT_SUCCESS} from "../constants/actionTypes";

const initialState = {
    token: null,
    error: null
}

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_STUDENT_SUCCESS:
            return {
                ...state,
                token: action.payload,
                error: null,
            }
        case ADD_STUDENT_FAILURE:
            return {
                ...state,
                token: null,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default studentReducer;