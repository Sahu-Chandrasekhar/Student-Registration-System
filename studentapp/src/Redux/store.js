import {createStore, applyMiddleware} from 'redux';
import { thunk } from 'redux-thunk' ;  //npm i redux-thunk
import rootReducer from './reducers';



const store = createStore(
    rootReducer, applyMiddleware(thunk)
);


export default store;
