import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { BrowseScreen, ViewRecipeScreen } from '../screens'
import { HeaderComponent } from '../components/routes'

const Stack = createStackNavigator()

function BrowseStack(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="Browse"
            screenOptions={{
                // header: ({navigation}) => <HeaderComponent navigation={navigation}/>
            }}

        >

            <Stack.Screen
                name="Browse"
                component={BrowseScreen}
            />

            <Stack.Screen
                name="ViewRecipe"
                component={ViewRecipeScreen}
            />

        </Stack.Navigator>
    )
}

export default BrowseStack
