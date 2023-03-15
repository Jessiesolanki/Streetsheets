import {  View, Text, Image, TouchableOpacity, FlatList, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'

const { width, height } = Dimensions.get('window');
import { ChatContext } from '../../Providers/ChatProvider';
import { image_base_url } from '../../Providers/Index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useLoadingFn from '../../Hooks/useLoadingFn';

const MessageRequestScreen = ({navigation}) => {

const { RequestMessage, API_CALL_CHAT} = useContext(ChatContext);

const getMessageHistory = useLoadingFn(API_CALL_CHAT.getMessageHistory);
const getMessage = item => {


  const { id, type, to_id, from_id,user_id } = item;
  const ListDetails={ to_id:to_id,user_id:from_id,image:item.image,name:item.name, type :null,to_user_image:item.image}

getMessageHistory({ params: {to_id:from_id}, onSuccess: () =>
 {
  navigation.navigate('MessageScreen', {item:ListDetails});
  },screenName:'Messages List'});


};
 const renderItem =({item})=>{
  return(

<TouchableOpacity
        onPress={() => getMessage(item)}
        style={{
          width: width * 0.92,
          flexDirection: 'row',
          padding: 12,
          marginBottom: 22,
        }}>
        <Image
          source={{ uri: image_base_url + item?.image }}
          style={{ height: 60, width: 60, borderRadius: 33 }}
        />
        <View style={{ justifyContent: 'space-evenly', marginLeft: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '500', color: '#003585' }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 14, color: '#2D354C' }}>
            {item.last_message}
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
              source={{ uri: image_base_url + item?.image }}
              style={{ height: 20, width: 20, borderRadius: 33 }}
            />
          )}
        </View>
      </TouchableOpacity>

  )
 }
  return (
    <View style={{flex :1}}>
    <View style={{ width: width,backgroundColor:'#fff', flexDirection: 'row', justifyContent: 'space-between',padding:20}}>
    <TouchableOpacity onPress={() => { navigation.goBack() }} >
        <Image source={require('../../Constant/Assests/Images/back.png')} style={{ height: 35, width: 35, marginTop: '1%' }} />
      </TouchableOpacity>      
 </View>
     <FlatList
          data={RequestMessage}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={false}
          showsVerticalScrollIndicator={false}
     />
</View>
  )
}

export default MessageRequestScreen
