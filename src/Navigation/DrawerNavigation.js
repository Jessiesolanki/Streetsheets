import 'react-native-gesture-handler';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTab from './BottomTab';
import {AuthContext} from '../Providers/AuthProvider';
import {ChatContext} from '../Providers/ChatProvider';
import {useNavigation} from '@react-navigation/native';
import EntryScreen from '../Screens/QuizScreens/EntryScreen';
import { AppContext}  from '../Providers/AppProvider';
import QuizScreen from '../Screens/QuizScreens/QuizScreen';
import VideoScreen from '../Screens/QuizScreens/VideoScreen';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import  {image_base_url} from '../Providers/Index';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {LeadContext} from '../Providers/LeadProvider';
import useLoadingFn from '../Hooks/useLoadingFn';
import AgencyModal from '../Screens/AuthScreens/AgencyModal';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerStack = ({navigation}) => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, drawerStyle: {width: '80%'}}}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="BottomTab"
        component={BottomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EntryScreen"
        component={EntryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoScreen"
        component={VideoScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: Colors.splash_bg,
    paddingHorizontal: 3,
    marginStart: 10,
    zIndex: 1,
    elevation: 1,
    shadowColor: 'white',
    position: 'absolute',
    top: -8,
    left: 50,
    alignSelf: 'flex-start',
  },
  hidden: {
    height: 0,
  },
  list: {
    overflow: 'hidden',
    height: 188,
  },
});

function CustomDrawerContent(props) {
  const {API_CALL_CHAT} = useContext(ChatContext);
  const {API_CALLS} = useContext(LeadContext);
  const {API_CALL,locationKey,setlocationKey,locationId, setlocationId} = useContext(AuthContext);

  const getAgentToAgentChat = useLoadingFn(API_CALL_CHAT.getAgentToAgentChat);
  const getAgentToManagerChat = useLoadingFn(API_CALL_CHAT.getAgentToManagerChat);
  const getAgentToStaffChat = useLoadingFn(API_CALL_CHAT.getAgentToStaffChat);
  const GetVideoLibrary = useLoadingFn(API_CALLS.GetVideoLibrary)
  const getAllLocation = useLoadingFn(API_CALL.getAllLocation)
AsyncStorage.getItem('name').then((res) =>setlocationKey(res))
AsyncStorage.getItem('Location').then((res) =>setlocationId(res))
// console.log(locationId)
  const navigation = useNavigation();
  const data = [
    {
      name: 'Leader Board',
      logo: require('../Constant/Assests/Images/target.png'),
      root: 'LeaderBoard',
      stack: 'HomeStack',
    },
  
    {
      name: 'Entire Staff Details',
      logo: require('../Constant/Assests/Images/entrystaff.png'),
      stack: 'HomeStack',
      root: 'EntireStaffDetails',
      right: '1',
    },
    {
      name: 'Chat',
      logo: require('../Constant/Assests/Images/sidebarchat.png'),
      right: '1',
      root: 'ChatScreen',
      stack: 'ChatStack',
    },
    {
      name: 'Learn',
      logo: require('../Constant/Assests/Images/learn.png'),
      right: '1',
      root: 'Videolibrary',
      stack: 'ContactStack',
      onpress: '2',
    },
    {
      name: 'About',
      logo: require('../Constant/Assests/Images/about.png'),
      root: 'AboutScreen',
      stack: 'ContactStack',
    },
    {
      name: 'Appointment',
      logo: require('../Constant/Assests/Images/appointmentuser.png'),
      root: 'Appointment',
      stack: 'HomeStack',
      onpress: '3',
    },
    {
      name: `Switch Agency`,
      logo: require('../Constant/Assests/Images/switch.png'),
      onpress: '4',
    },
    {
      name: 'Logout',
      logo: require('../Constant/Assests/Images/logout.png'),
      onpress: '1',
    },
   
  ];
  const LearnApi=()=>{
    GetVideoLibrary({ params: {}, onSuccess: () => { navigation.navigate('HomeStack',{screen:'Videolibrary'})} })
  
  }
  async function SwitchLocation () {
   
    getAllLocation({ params: {}, onSuccess: () => {
      AsyncStorage.removeItem('Location')
       AsyncStorage.removeItem('name')
      navigation.navigate('AuthStack',{screen:"AgencyModal"})} })
  
  }
  const Logout = props => {
    props.navigation.toggleDrawer();
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Confirm',
          onPress: async () => {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('userDetails');
            navigation.replace('AuthStack', {screen: 'Login'});
          },
        },
      ],
      {cancelable: false},
    );
  };
  const [isOpen, setIsOpen] = useState(false);
  const {userData} = useContext(AuthContext);
  const toggleOpen = () => {
    setIsOpen(value => !value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };
  const agentToAgentChat = () => {
    getAgentToAgentChat({
      params: {},
      onSuccess: () => {
        navigation.navigate('ChatStack', {screen: 'ChatContact', params: 1});
      },
      screenName: 'Lead',
    });
  };
  const agentToManagerChat = () => {
    getAgentToManagerChat({
      params: {},
      onSuccess: () => {
        navigation.navigate('ChatStack', {screen: 'ChatContact', params: 2});
      },
      screenName: 'Lead',
    });
  };
  const agentToStaffChat = () => {
    getAgentToStaffChat({
      params: {},
      onSuccess: () => {
        navigation.navigate('ChatStack', {screen: 'ChatContact', params: 3});
      },
      screenName: 'Lead',
    });
  };

  const {setChattype,Chattype} = useContext(AppContext)

  return (
    <View style={{flex: 1}}>
      <DrawerProfile userData={userData} />
      <DrawerContentScrollView {...props}>
        {data.map((item, index) => (
          <View
            key={index}
            style={{borderBottomWidth: 0.2, borderColor: '#707070'}}>



            {index === 2 ? (
              <View style={{height: isOpen == true ? 250 : 60}}>
                <TouchableOpacity
                  onPress={toggleOpen}
                  activeOpacity={0.6}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 60,
                  }}>
                  <Image
                    style={{
                      width: 22,
                      height: 22,
                      resizeMode: 'contain',
                      marginLeft: 22,
                    }}
                    source={item.logo}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#000',
                      marginLeft: 15,
                    }}>
                    Chat
                  </Text>
                </TouchableOpacity>
                <View
                  style={[styles.list, !isOpen ? styles.hidden : undefined]}>
                  <TouchableOpacity
                    onPress={() => {
                      agentToAgentChat();
                      setChattype("agent_to_agent")
                    }}
                    style={{
                      padding: 20,
                      borderColor: 'grey',
                      borderTopWidth: 0.3,
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{
                        width: 22,
                        height: 22,
                        resizeMode: 'contain',
                        marginLeft: 22,
                      }}
                      source={item.logo}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000',
                        marginLeft: 15,
                      }}>
                      Agent To Agent
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      agentToManagerChat();
                      setChattype("agent_to_manager")
                    }}
                    style={{
                      padding: 20,
                      borderColor: 'grey',
                      borderTopWidth: 0.3,
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{
                        width: 22,
                        height: 22,
                        resizeMode: 'contain',
                        marginLeft: 22,
                      }}
                      source={item.logo}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000',
                        marginLeft: 15,
                      }}>
                      Agent To Manager
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      agentToStaffChat();
                      setChattype("agent_to_entire_team")
                    }}
                    style={{
                      padding: 20,
                      borderColor: 'grey',
                      borderTopWidth: 0.3,
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{
                        width: 22,
                        height: 22,
                        resizeMode: 'contain',
                        marginLeft: 22,
                      }}
                      source={item.logo}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000',
                        marginLeft: 15,
                      }}>
                      Agent to Entire Staff
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : index === 6 ? (<View style={{height: isOpen == true ? 250 : 60}}>
            <TouchableOpacity
              onPress={SwitchLocation}
              activeOpacity={0.6}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 60,
              }}>
              <Image
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  marginLeft: 22,
                }}
                source={item.logo}
              />
              <View>

            
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#000',
                  marginLeft: 15,
                }}>
              Switch Agency
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: '#000',
                  marginLeft: 15,
                }}>
          {locationKey}
              </Text>
              </View>
            </TouchableOpacity>
            </View>)
               :( 




              <DrawerItem
                label={item.name}
                labelStyle={{color: '#000', fontSize: 16, fontWeight: '700'}}
                style={{height: 55}}
                icon={() => (
                  <Image
                    style={{
                      width: 22,
                      height: 22,
                      marginRight: -15,
                      resizeMode: 'contain',
                      marginLeft: 5,
                    }}
                    source={item.logo}
                  />
                )}
                onPress={() => {
                  item.onpress == '1'
                    ? Logout(props)
                    : item.onpress == '2'? LearnApi(props):item.onpress==3?  navigation.navigate(item.stack, {screen: item.root,params:1}):item.onpress=='4'?SwitchLocation() : navigation.navigate(item.stack, {screen: item.root});
                }}
              />

            )}
          </View>
        ))}
      </DrawerContentScrollView>
    </View>
  );
}
const DrawerProfile = userData => {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'flex-start',
        backgroundColor: Colors.splash_bg,
        paddingTop: 45,
        alignItems: 'center',
        paddingBottom: 35,
      }}>
      <Image
        style={{
          width: 85,
          height: 85,
          borderRadius: 7,
          alignItems: 'center',
          alignSelf: 'center',
          resizeMode: 'cover',
        }}
        source={{uri: image_base_url + userData?.userData?.user?.image}}
      />

      <View style={{marginLeft: 15, justifyContent: 'center', width: '70%'}}>
        <Text
          numberOfLines={2}
          style={{color: '#fff', fontSize: 14, fontWeight: '230'}}>
          {userData?.userData?.user?.email}
        </Text>
        <Text
          style={{
            color: Colors.white,
            fontSize: 19,
            paddingBottom: 6,
            marginTop: 10,
            fontWeight: 'bold',
          }}>
          {userData?.userData?.user?.name}
        </Text>
      </View>
    </View>
  );
};
