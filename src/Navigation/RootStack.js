import 'react-native-gesture-handler';
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Splash from '../Screens/Splash';
import AuthStack from './AuthStack';
 import DrawerStack from './DrawerNavigation';
 import search from '../Screens/Search';
 import AppIntroStack from './AppIntroStack';
 import ContactStack from './ContactStack';
import ContactDetails from '../Screens/ContactScreen/ContactDetails';
const Stack = createStackNavigator();
//...TransitionPresets.ModalSlideFromBottomIOS stack navigator props for ios HeaderTabStack
const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName='Splash' screenOptions={{  headerShown: false, }} >
      <Stack.Screen name="Splash" component={Splash}   />
      <Stack.Screen name="AppIntroStack" component={AppIntroStack}   />
      <Stack.Screen name={'AuthStack'} component={AuthStack} />
      <Stack.Screen name={'DrawerNavigation'} component={DrawerStack} />
      <Stack.Screen name="search" component={search}   />
      <Stack.Screen name="ContactStack" component={ContactStack}   />
      <Stack.Screen name="ContactDetails"component={ContactDetails}  options={{ headerShown: false,}}  />
    </Stack.Navigator>
  )
}

export default RootStack