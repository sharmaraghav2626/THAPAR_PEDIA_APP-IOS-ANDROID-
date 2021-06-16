import {combineReducers} from 'redux';
import {user} from './user'

const reducers=combineReducers({
    userState:user
})
export default reducers;