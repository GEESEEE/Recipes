import React from 'react'
import { RecipesContextProvider } from './app/contexts/recipes'
import Navigator from './app/routes/LoginStack'
import 'react-native-get-random-values'

export default function App(): JSX.Element {

    return (
        <RecipesContextProvider>
            <Navigator />
        </RecipesContextProvider>

        )
}
