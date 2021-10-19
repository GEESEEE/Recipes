import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EditRecipeTabs } from './EditRecipeTabs'
import SectionsScreen from './Sections'
import { routeUtils } from '@/utils'
import { HeaderNavigator } from '@/components/molecules'

const Stack = createStackNavigator()

function RecipesStack(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="Sections"
            screenOptions={{
                presentation: 'transparentModal',
                cardStyleInterpolator: routeUtils.slideVertical,
            }}
        >
            <Stack.Screen
                name="Sections"
                component={SectionsScreen}
                options={{
                    header: ({ navigation }) => (
                        <HeaderNavigator navigation={navigation} />
                    ),
                }}
            />

            <Stack.Screen
                name="EditRecipeTabs"
                component={EditRecipeTabs}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default RecipesStack
