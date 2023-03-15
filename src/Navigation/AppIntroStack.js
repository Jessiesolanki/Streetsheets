import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AppIntro from '../Screens/AuthScreens/AppIntro';
import GetStarted from '../Screens/AuthScreens/GetStarted';
const AppIntroStack = createStackNavigator();
const AuthStack = () => {
  return (
    <AppIntroStack.Navigator>
         <AppIntroStack.Screen
          name="AppIntro"
          component={AppIntro}
          options={{ headerShown: false }}
        />
         <AppIntroStack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{ headerShown: false }}
        />
      
      
    </AppIntroStack.Navigator>
  )
}

export default AuthStack