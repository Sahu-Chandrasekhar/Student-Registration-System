import {combineReducers} from 'redux';
import authReducer from './authReducer';
import studentReducer from './studentReducer';


const rootReducer = combineReducers ({
    auth: authReducer,
    student: studentReducer
})

export default rootReducer;