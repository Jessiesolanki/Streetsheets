import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreens/HomeScreen';
import LeaderBoard from '../Screens/HomeScreens/LeaderBoard';
import Appointment from '../Screens/HomeScreens/Appointment';
import EditAppointment from '../Screens/HomeScreens/EditAppointment';
import EntireStaffDetails from '../Screens/HomeScreens/EntireStaffDetails'
import AddAppointment from '../Screens/HomeScreens/AddAppointment'
import Videolibrary from '../Screens/ContactScreen/Videolibrary'
import CalendarView from  '../Screens/HomeScreens/CalendarView'
const Homestack = createStackNavigator();

const HomeStack = () => {
  return (
    <Homestack.Navigator initialRouteName='HomeScreen' >
    <Homestack.Screen
     name="HomeScreen"
     component={HomeScreen}
     options={{
      headerShown: false }} 
   />
    <Homestack.Screen
     name="LeaderBoard"
     component={LeaderBoard}
     options={{ headerShown: false }}
   />
    <Homestack.Screen
     name="EntireStaffDetails"
     component={EntireStaffDetails}
     options={{ headerShown: false }}
   />
     <Homestack.Screen
     name="EditAppointment"
     component={EditAppointment}
     options={{ headerShown: false }}
   />
      <Homestack.Screen
     name="Appointment"
     component={Appointment}
     options={{ headerShown: false }}
   />
        <Homestack.Screen
     name="AddAppointment"
     component={AddAppointment}
     options={{ headerShown: false }}
   />
        <Homestack.Screen
     name="Videolibrary"
     component={Videolibrary}
     options={{ headerShown: false }}
   />
      <Homestack.Screen
     name="CalendarView"
     component={CalendarView}
     options={{ headerShown: false }}
   />
   </Homestack.Navigator>
  )
}

export default HomeStack