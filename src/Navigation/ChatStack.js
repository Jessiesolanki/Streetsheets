import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../Screens/ChatScreen/ChatScreen';
import MessageScreen from '../Screens/ChatScreen/MessageScreen';
import MessageRequestScreen from '../Screens/ChatScreen/MessageRequestScreen';
import ChatContact from '../Screens/ChatScreen/ChatContact'
import ChatProfile from '../Screens/ChatScreen/ChatProfile'
const Chatstack = createStackNavigator();

const ChatStack = () => {
  return (
    <Chatstack.Navigator>
      <Chatstack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }} 
      />
      <Chatstack.Screen
        name="MessageScreen"
        component={MessageScreen} 
        options={{
          headerShown: false }}
      />
      <Chatstack.Screen
        name="MessageRequestScreen"
        component={MessageRequestScreen}
        options={{ headerShown: false }}
      />
      <Chatstack.Screen
        name="ChatContact"
        component={ChatContact}
        options={{ headerShown: false }}
      />
       <Chatstack.Screen
        name="ChatProfile"
        component={ChatProfile}
        options={{ headerShown: false }}
      />
    </Chatstack.Navigator>
  )
}

export default ChatStack