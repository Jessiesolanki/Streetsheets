import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/AuthScreens/Login';
import OtpVerification from '../Screens/AuthScreens/OtpVerification'
import ResetPassword from '../Screens/AuthScreens/ResetPassword';
import ForgotPassword from '../Screens/AuthScreens/ForgotPassword'
import picker from '../Components/picker'
import AgencyModal from '../Screens/AuthScreens/AgencyModal';
const Authstack = createStackNavigator();

const AuthStack = () => {
  return (
    <Authstack.Navigator>
        
       <Authstack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Authstack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
         <Authstack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
          <Authstack.Screen
          name="OtpVerification"
          component={OtpVerification}
          options={{ headerShown: false }}
        />
             <Authstack.Screen
          name="picker"
          component={picker}
          options={{ headerShown: false }}
        />
        <Authstack.Screen
     name="AgencyModal"
     component={AgencyModal}
     options={{ headerShown: false }}
   />
    </Authstack.Navigator>
  )
}

export default AuthStack