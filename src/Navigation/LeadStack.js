import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LeadScreen from '../Screens/LeadScreen.js/LeadScreen';
import AddLead from '../Screens/LeadScreen.js/AddLead';
import EditLead from '../Screens/LeadScreen.js/EditLead'
import LeadtDetails from '../Screens/LeadScreen.js/LeadDeatils';
import LeadNotes from '../Screens/LeadScreen.js/LeadNotes'
const leadstack = createStackNavigator();

const LeadStack = () => {
  return (
    <leadstack.Navigator initialRouteName='LeadScreen' >
    <leadstack.Screen
     name="LeadScreen"
     component={LeadScreen}
     options={{ headerShown: false }}
   />
     <leadstack.Screen
     name="AddLead"
     component={AddLead}
     options={{ headerShown: false }}
   />
      <leadstack.Screen
     name="EditLead"
     component={EditLead}
     options={{ headerShown: false }}
   />
     <leadstack.Screen
     name="LeadtDetails"
     component={LeadtDetails}
     options={{ headerShown: false }}
   />
        <leadstack.Screen
     name="LeadNotes"
     component={LeadNotes}
     options={{ headerShown: false }}
   />
   </leadstack.Navigator>
  )
}

export default LeadStack