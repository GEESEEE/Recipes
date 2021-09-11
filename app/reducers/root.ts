import { combineReducers } from 'redux'
import auth from './auth'
import {myRecipes, mySort} from './my'
import {browseRecipes, browseSort} from './browse'
import user from './user'
import theme from './theme'
import indices from './indices'

export default combineReducers({
    auth,
    myRecipes,
    mySort,
    browseRecipes,
    browseSort,
    user,
    theme,
    indices,
})
