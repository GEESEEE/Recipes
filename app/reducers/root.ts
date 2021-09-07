import { combineReducers } from 'redux'
import auth from './auth'
import myRecipes from './my-recipes'
import browseRecipes from './browse-recipes'
import user from './user'
import theme from './theme'
import indices from './indices'

export default combineReducers({
    auth,
    myRecipes,
    browseRecipes,
    user,
    theme,
    indices,
})
