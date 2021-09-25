import { Recipe } from '../../data'

export const MY_RECIPE_ACTIONS = {
    ACTION_START: 'myRecipeActionStart',

    ADD_RECIPE_SUCCES: 'addMyRecipeSucces',
    SET_RECIPES_SUCCES: 'setMyRecipes',
    DELETE_RECIPE_SUCCES: 'deleteMyRecipeSucces',
    EDIT_RECIPE_SUCCES: 'editMyRecipeSucces',

    ACTION_ERROR: 'myRecipeActionError',
}

interface MyRecipes {
    recipes: Recipe[]
    loading: boolean
}

const initialState: MyRecipes = {
    recipes: [],
    loading: false,
}

const myRecipes = (
    state = initialState,
    action: { type: string; payload: any }
): MyRecipes => {
    switch (action.type) {
        case MY_RECIPE_ACTIONS.ACTION_START: {
            return { ...state, loading: true }
        }

        case MY_RECIPE_ACTIONS.SET_RECIPES_SUCCES: {
            const { newRecipes } = action.payload
            return { recipes: newRecipes, loading: false }
        }

        case MY_RECIPE_ACTIONS.ADD_RECIPE_SUCCES: {
            const { newRecipe } = action.payload
            return { recipes: [newRecipe, ...state.recipes], loading: false }
        }

        case MY_RECIPE_ACTIONS.DELETE_RECIPE_SUCCES: {
            const { recipe } = action.payload
            return {
                recipes: state.recipes.filter((r) => r.id !== recipe.id),
                loading: false,
            }
        }

        case MY_RECIPE_ACTIONS.EDIT_RECIPE_SUCCES: {
            const { newRecipe } = action.payload
            return {
                recipes: state.recipes.map((r) =>
                    r.id === newRecipe.id ? newRecipe : r
                ),
                loading: false,
            }
        }

        case MY_RECIPE_ACTIONS.ACTION_ERROR: {
            return { ...state, loading: false }
        }

        default:
            return state
    }
}

export default myRecipes
