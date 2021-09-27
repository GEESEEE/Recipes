import { combineReducers } from 'redux'
import auth from './auth'
import { myRecipes, mySort, mySearch } from './my'
import { browseRecipes, browseSort, browseSearch } from './browse'
import indices from './indices'
import settings from './settings'

export default combineReducers({
    auth,
    settings,
    myRecipes,
    mySort,
    mySearch,
    browseRecipes,
    browseSort,
    browseSearch,
    indices,
})
