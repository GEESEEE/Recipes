import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EditRecipeTabs } from './EditRecipeTabs'
import SectionsScreen from './Sections'
import EditSectionScreen from './EditSection'
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

            <Stack.Screen
                name="EditSection"
                component={EditSectionScreen}
                options={{
                    header: ({ navigation }) => (
                        <HeaderComponent
                            navigation={navigation}
                            config={{ drawer: false, right: [] }}
                        />
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
