// import React from 'react'
// import { createStackNavigator } from '@react-navigation/stack'
// import Drawer from '../screens/Drawer'
// import { routeUtils } from '@/utils'
// import { Popup } from '@/screens'

// const Stack = createStackNavigator()

// function LoginStack(): JSX.Element {
//     return (
//         <Stack.Navigator
//             initialRouteName="Drawer"
//             screenOptions={{
//                 headerShown: false,
//                 presentation: 'transparentModal',
//                 cardStyleInterpolator: routeUtils.slideHorizontal,
//             }}
//         >
//             <Stack.Screen
//                 name="Main"
//                 component={Drawer}
//                 options={{
//                     presentation: 'transparentModal',
//                     cardStyleInterpolator: routeUtils.slideVertical,
//                 }}
//             />

//             <Stack.Screen
//                 name="Popup"
//                 component={Popup}
//                 options={{
//                     cardStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
//                     presentation: 'transparentModal',
//                     cardStyleInterpolator: routeUtils.fade,
//                 }}
//             />
//         </Stack.Navigator>
//     )
// }

// export default LoginStack
