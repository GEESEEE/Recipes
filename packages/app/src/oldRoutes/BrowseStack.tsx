// import React from 'react'
// import { createStackNavigator } from '@react-navigation/stack'
// import { HeaderComponent } from './components'
// import { BrowseScreen, ViewRecipeScreen } from '@/screens'
// import { routeUtils } from '@/utils'

// const Stack = createStackNavigator()

// function BrowseStack(): JSX.Element {
//     return (
//         <Stack.Navigator
//             initialRouteName="Browse"
//             screenOptions={{
//                 presentation: 'transparentModal',
//                 cardStyleInterpolator: routeUtils.slideVertical,
//             }}
//         >
//             <Stack.Screen
//                 name="Browse"
//                 component={BrowseScreen}
//                 options={{
//                     header: ({ navigation }) => (
//                         <HeaderComponent navigation={navigation} />
//                     ),
//                 }}
//             />

//             <Stack.Screen
//                 name="ViewRecipe"
//                 component={ViewRecipeScreen}
//                 options={{ headerShown: false }}
//             />
//         </Stack.Navigator>
//     )
// }

// export default BrowseStack
