import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
    SectionsScreen,
    EditSectionScreen,
    RecipesScreen,
    ViewRecipeScreen,
} from '@/screens'
import { screenUtils } from '@/utils'
import { HeaderComponent } from '@/components/molecules'

const Stack = createStackNavigator()

function RecipesStack(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="Sections"
            screenOptions={{
                presentation: 'transparentModal',
                cardStyleInterpolator: screenUtils.slideVertical,
                header: ({ navigation }) => (
                    <HeaderComponent
                        navigation={navigation}
                        config={{ drawer: false, right: [] }}
                    />
                ),
            }}
        >
            <Stack.Screen
                name="Sections"
                component={SectionsScreen}
                options={{
                    header: ({ navigation }) => (
                        <HeaderComponent
                            navigation={navigation}
                            config={{ drawer: true, right: [] }}
                        />
                    ),
                }}
            />

            <Stack.Screen name="EditSection" component={EditSectionScreen} />

            <Stack.Screen name="Recipes" component={RecipesScreen} />

            <Stack.Screen name="ViewRecipe" component={ViewRecipeScreen} />
        </Stack.Navigator>
    )
}

export default RecipesStack
