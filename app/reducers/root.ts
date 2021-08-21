import { combineReducers } from 'redux'
import auth from './auth'
import recipes from './recipes'
import user from './user'
import theme from './theme'
import indices from './indices'

export default combineReducers({
    auth,
    recipes,
    user,
    theme,
    indices,
})
