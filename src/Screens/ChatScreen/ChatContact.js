import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { ChatContext } from '../../Providers/ChatProvider';
import useLoadingFn from '../../Hooks/useLoadingFn';
import { hp } from './Responsive';
import { image_base_url } from '../../Providers/Index';
import { AuthContext } from '../../Providers/AuthProvider';
import { AppContext } from '../../Providers/AppProvider';
const { width, height } = Dimensions.get('window');
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const ChatContact = ({ route, navigation }) => {
  const { AgentToagentdata, AgentToManager, AgentToStaff, API_CALL_CHAT, setchatmessagelist, Chatmessagelist, messagedata, MessageData } = useContext(ChatContext);
  const [changeValue, setchangeValue] = useState(AgentToManager);
  const getMessageHistory = useLoadingFn(API_CALL_CHAT.getMessageHistory);

  useEffect(() => {

  }, [changeValue])
  const { userData } = useContext(AuthContext);
  useEffect(() => {
    const { Type } = messagedata
    if (Type == "Incomming message") {

    }

  }, [messagedata])




  useEffect(() => {
    switch (route.params) {
      case 1:
        setchangeValue(AgentToagentdata);
        break;
      case 2:
        setchangeValue(AgentToManager);
        break;
      case 3:
        setchangeValue(AgentToStaff);
        break;
      default:
        setchangeValue(AgentToagentdata);
        break;
    }
  }, [route.params]);
  useEffect(() => { }, [AgentToagentdata, AgentToManager, AgentToStaff, MessageData]);

  useEffect(() => {
    if (changeValue == null) {
      setchangeValue(AgentToManager);
    }

  })

  const { setChattype, Chattype } = useContext(AppContext);
  const GetChat = item => {
    const { id } = item;
    const ListDetails = { to_id: id, user_id: id, image: item.image, name: item.name, type: null, to_user_image: item.image }

    getMessageHistory({
      params: { to_id: id }, onSuccess: () => {
        navigation.navigate('MessageScreen', { item: ListDetails });
      }, screenName: 'Messages List'
    });

  };

  const renderItem = ({ item }) => {

    return (
      <TouchableOpacity
        onPress={() => {
          GetChat(item)
        }}
        style={{
          width: width * 0.92,
          flexDirection: 'row',
          padding: 12,
          marginBottom: 22,
        }}>
        {item?.image !== null ? <Image
          source={{ uri: image_base_url + item?.image }}
          style={{ height: 60, width: 60, borderRadius: 33 }}
        /> : <FontAwesome name={'user-circle-o'} size={45} color={'lightgrey'} />}
        <View style={{ justifyContent: 'space-evenly', marginLeft: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '500', color: '#003585' }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 14, color: '#2D354C' }}></Text>

        </View>

      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: width,
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChatScreen');
          }}>
          <Image
            source={require('../../Constant/Assests/Images/back.png')}
            style={{ height: 45, width: 45, marginTop: '1%' }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>
          Contact List
        </Text>
        <TouchableOpacity
          style={{
            height: 45,
            width: 45,
            marginHorizontal: 8,
            marginTop: '1%',
          }}

        >

        </TouchableOpacity>
      </View>


      {changeValue?.length > 0 ? <FlatList
        data={changeValue}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      /> : <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <FontAwesome5 name={'users'} size={45} color={'lightgrey'} />
        <Text
          style={{
            padding: 20,
            fontSize: 16,
            color: 'lightgrey',
            paddingBottom: 10,
            textAlign: 'center',
          }}>
          No contact list found
        </Text>
      </View>}
    </View>
  );
};

export default ChatContact;
