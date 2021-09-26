import { combineReducers } from 'redux'
import auth from './auth'
import { myRecipes, mySort, mySearch } from './my'
import { browseRecipes, browseSort, browseSearch } from './browse'
import user from './user'
import indices from './indices'
import settings from './settings'
import initialized from './initialization'

export default combineReducers({
    auth,
    myRecipes,
    mySort,
    mySearch,
    browseRecipes,
    browseSort,
    browseSearch,
    user,
    indices,
    settings,
    initialized
})
