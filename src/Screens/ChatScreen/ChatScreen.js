import {View,Text, Image,TouchableOpacity,FlatList, Dimensions} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { ChatContext } from '../../Providers/ChatProvider';
import useLoadingFn from '../../Hooks/useLoadingFn';
import { image_base_url } from '../../Providers/Index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../Providers/AuthProvider';
const { width, height } = Dimensions.get('window');
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const ChatScreen = ({ route, navigation }) => {
  const {setRefreshChat} = useContext(AuthContext);
  const { MessageData, API_CALL_CHAT, setchatmessagelist, latestmessagelist, setMessageData, userid ,RequestMessage,GoBack} = useContext(ChatContext);
  const getMessageChat = useLoadingFn(API_CALL_CHAT.getMessageChat);
  const getMessageChatlist = useLoadingFn(API_CALL_CHAT.dashChatlist);
  const getMessageHistory = useLoadingFn(API_CALL_CHAT.getMessageHistory);
  const [msglistApiRefresh, setmsgApiRefresh] = useState()
  // const {paramsone,paramstwo} = route;
  useEffect(() => {
    setRefreshChat(true)
    getMessageChat({params: {},onSuccess: () => {},screenName: 'Messagechat',});
    getMessageChatlist({params: {},onSuccess: () => { },screenName: 'Messagechatlist',}); 

  }, []);
  const requestMsg = () =>{
    getMessageChat({
      params: {},    
      onSuccess: () => {
        navigation.navigate('MessageRequestScreen')
      },
      screenName: 'Message',
    });
   
  }

  
  useEffect(() => { }, [RequestMessage]);
  

  const getMessage = item => {

    const { id, type, to_id, from_id,user_id,to_email } = item;

getMessageHistory({ params: {to_id:user_id}, onSuccess: () =>
 {
  navigation.navigate('MessageScreen', {item});
  },screenName:'Messages List'});

  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => getMessage(item)}
        style={{
          width: width * 0.92,
          flexDirection: 'row',
          padding: 12,
          marginBottom: 22,
        }}>
        <Image
          source={{ uri: image_base_url + item?.to_user_image }}
          style={{ height: 60, width: 60, borderRadius: 33 }}
        />
        <View style={{ justifyContent: 'space-evenly', marginLeft: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '500', color: '#003585' }}>
            {item.to_name}
          </Text>
          <Text style={{ fontSize: 14, color: '#2D354C' }}>
            {item?.last_message}
          </Text>
        </View>
        <View style={{ position: 'absolute', right: 0, top: 30 }}>
          {item.seen == 0 ? (
            <Ionicons
              name={'checkmark-done-outline'}
              size={20}
              color={'#2D354C'}
            />
          ) : (
            <Image
              source={{ uri: image_base_url + item?.from_user_image }}
              style={{ height: 20, width: 20, borderRadius: 33 }}
            />
          )}
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
            navigation.openDrawer();
          }}>
          <Image
            source={require('../../Constant/Assests/Images/menu.png')}
            style={{ height: 45, width: 45, marginTop: '1%' }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>
          Chat
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            height: 45,
            width: 45,
            marginHorizontal: 8,
            marginTop: '1%',
          }}
        // onPress={() => navigation.navigate('search')}
        >
          {/* <Image
            source={require('../../Constant/Assests/Images/searchicon.png')}
            style={{
              height: 45,
              width: 45,
              marginHorizontal: 8,
              marginTop: '1%',
            }}
          /> */}
        </TouchableOpacity>
      </View>

      {RequestMessage?.length > 0 ?   <TouchableOpacity
          onPress={() => requestMsg()}
          style={{
            width: width * 0.92,
            flexDirection: 'row',
            padding: 12,
            marginBottom: 22,
          }}>
          <Image
            source={require('../../Constant/Assests/Images/chat.png')}
            style={{ height: 30, width: 30, borderRadius: 33 }} resizeMode='contain'
          />
          <View style={{ justifyContent: 'space-evenly', marginLeft: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#003585' }}>
              New message Request
            </Text>
            
          
          </View>
        </TouchableOpacity>:null}
        {MessageData?.length > 0 ?<FlatList
        data={MessageData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      />: <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <FontAwesome5 name={'users'} size={45} color={'lightgrey'} />
      <Text
        style={{
          padding: 20,
          fontSize: 16,
          color: 'lightgrey',
          paddingBottom: 10,
          textAlign: 'center',
        }}>
        No chat list found
      </Text>
    </View>}
    </View>
  );
};

export default ChatScreen;
