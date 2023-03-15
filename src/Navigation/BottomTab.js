import 'react-native-gesture-handler';
import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import ChatStack from './ChatStack';
import ContactStack from './ContactStack';
import LeadStack from './LeadStack';
import HomeStack from './HomeStack';
import MapStack from './MapStack';
import HomeScreen from '../Screens/HomeScreens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useLoadingFn from '../Hooks/useLoadingFn'
import { LeadContext } from '../Providers/LeadProvider';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../Providers/AuthProvider';

const Tab = createBottomTabNavigator();


const BottomTab = () => {
  const {getRefreshHome ,getRefreshLead,getRefreshContact,getRefreshChat,} = useContext(AuthContext);

  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName='MapStack'
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 90, width: '100%', },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        listeners={{
        tabPress: e => {
          getRefreshHome ? navigation.push('HomeScreen'):null
      
          },
        } }
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => <Image style={{ width: 33, height: 33, tintColor: focused ? '#30046B' : '#BFAB88', resizeMode: 'contain' }} source={require('../Constant/Assests/Images/homeicon.png')} />

        }} />
      <Tab.Screen

        name="LeadStack"
        component={LeadStack}
        listeners={{
          tabPress: e => {
            getRefreshLead  ? navigation.push('LeadScreen'):null
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => <Image style={{ width: 33, height: 33, tintColor: focused ? '#30046B' : '#BFAB88', resizeMode: 'contain' }} source={require('../Constant/Assests/Images/lead.png')} />

        }} />

      <Tab.Screen
        name="MapStack"
        component={MapStack}
        listeners={{
          tabPress: e => {
             navigation.push('MapScreen')
   
   
          },
        }}
         options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => focused ? <Image style={{ width: 33, height: 33, }} source={require('../Constant/Assests/Images/mapTwo.png')} resizeMode='stretch' /> : <Image style={{ width: 33, height: 33, resizeMode: 'contain' }} source={require('../Constant/Assests/Images/mapone.png')} resizeMode='stretch' />

        }} />
      <Tab.Screen
        name="ChatStack"
        component={ChatStack}
        listeners={{
          tabPress: e => {
            getRefreshChat  ? navigation.push('ChatScreen'):null
   
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => <Image style={{ width: 33, height: 33, tintColor: focused ? '#30046B' : '#BFAB88', resizeMode: 'contain' }} source={require('../Constant/Assests/Images/chat.png')} />

        }} />

      <Tab.Screen
        name="ContactStack"
        component={ContactStack}
        listeners={{
          tabPress: e => {
            getRefreshContact  ? navigation.push('ContactScreen'):null
   
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => <Image style={{ width: 33, height: 33, tintColor: focused ? '#30046B' : '#BFAB88', resizeMode: 'contain' }} source={require('../Constant/Assests/Images/contacticon.png')} />

        }} />

    </Tab.Navigator>
  )
}

export default BottomTab
