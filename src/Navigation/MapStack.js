import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../Screens/MapScreen/MapScreen';
const Mapstack = createStackNavigator();

const MapStacks = () => {
  return (
    <Mapstack.Navigator  >
    <Mapstack.Screen
     name="MapScreen"
     component={MapScreen}
     options={{ headerShown: false }}
   />
   
   </Mapstack.Navigator>
  )
}

export default MapStacks