import {combineReducers} from 'redux';
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";
import workReducer from "./workReducer";


export default combineReducers({
    loginReducer: loginReducer,
    userReducer: userReducer,
    workReducer: workReducer,

});

export function clear(state) {
}