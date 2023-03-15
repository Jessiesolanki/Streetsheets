import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ContactScreen from '../Screens/ContactScreen/ContactScreen';
import AllTask from '../Screens/ContactScreen/AllTask';
import AboutScreen from '../Screens/ContactScreen/AboutScreen';
import EditContact from '../Screens/ContactScreen/EditContact';
import NotesHistory from '../Screens/ContactScreen/NotesHistory';
// import TaskDetails from '../Screens/ContactScreen/TaskDeatils';
import AllTaskDetails from '../Screens/ContactScreen/AllTaskDetails';
const Contactstack = createStackNavigator();
const ContactStack = () => {
  return (
    <Contactstack.Navigator initialRouteName="ContactScreen">
      
      <Contactstack.Screen
        name="AllTaskDetails"
        component={AllTaskDetails}
        options={{headerShown: false}}
      />

      <Contactstack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{headerShown: false}}
      />
      <Contactstack.Screen
        name="AllTask"
        component={AllTask}
        options={{headerShown: false}}
      />
      <Contactstack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{headerShown: false}}
      />

      <Contactstack.Screen
        name="EditContact"
        component={EditContact}
        options={{headerShown: false}}
      />

      <Contactstack.Screen
        name="NotesHistory"
        component={NotesHistory}
        options={{headerShown: false}}
      />
      {/* <Contactstack.Screen
        name="TaskDetails"
        component={TaskDetails}
        options={{headerShown: false}}
      /> */}
    </Contactstack.Navigator>
  );
};

export default ContactStack;