import { combineReducers } from 'redux'
import auth from './auth'
import recipes from './recipes'

export default combineReducers({
    auth,
    recipes,
})
