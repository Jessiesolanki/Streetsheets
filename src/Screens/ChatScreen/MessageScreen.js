import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
  Modal
} from 'react-native';
import { useForm } from 'react-hook-form';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { image_base_url } from '../../Providers/Index';
const { width, height } = Dimensions.get('window');
import { AuthContext } from '../../Providers/AuthProvider';
import { ChatContext } from '../../Providers/ChatProvider';
import useLoadingFn from '../../Hooks/useLoadingFn';
import { Socket } from 'socket.io-client';
import { AppContext } from '../../Providers/AppProvider';
import ButtonInput from '../../Components/ButtonInput'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import RenderHtml from 'react-native-render-html';
const MessageScreen = ({ route, navigation }) => {
  const { userData } = useContext(AuthContext);
  const { MessageHistory, API_CALL_CHAT, MessageDataSocket, MessageData, GetmailTemplate } = useContext(ChatContext);
  const { Chattype } = useContext(AppContext)
  const [message, setMessage] = useState('');
  const [onlineDataSocket, setonlineDataSocket] = useState('offline');
  const [refresh, setrefresh] = useState(false)
  const [ismodalVisible, setismodalVisible] = useState(false)
  const [subject, setsubject] = useState('')
  const sendMessage = useLoadingFn(API_CALL_CHAT.sendMessage);
  const deleteMessage = useLoadingFn(API_CALL_CHAT.deleteMessage);
  const getMessageHistory = useLoadingFn(API_CALL_CHAT.getMessageHistory);
  const getMailTemplate = useLoadingFn(API_CALL_CHAT.getMailTemplate);
  let { id, to_id, user_id, image, name, type, to_user_image, to_email } = route.params.item;
  useEffect(() => {
    if (
      user_id == MessageDataSocket?.dataresponse?.from_id && userData?.user?.id == MessageDataSocket?.dataresponse?.to_id &&
      MessageDataSocket?.Type == 'Incomming message'
    ) {
      MessageHistory.unshift(MessageDataSocket?.dataresponse);
    }

    if (
      user_id == MessageDataSocket?.Data?.userId &&
      MessageDataSocket?.Type == 'user_online_status'
    ) {
      setonlineDataSocket(MessageDataSocket?.Data?.type)
    }
  }, [MessageDataSocket]);

  useEffect(() => {
    getMessageHistory({
      params: { to_id: to_id }, onSuccess: () => { setrefresh(false) }, screenName: 'Messages List'
    })
  }, [refresh]);
  const onSendMail = () => {
    setismodalVisible(true)
    getMailTemplate({ params: { email: userData?.user?.email }, onSuccess: () => { }, screenName: 'mail List' })
  }
  const source = {
    html:
      GetmailTemplate
  };

  const onSend = (params) => {
    params.params == 'mail' ? setismodalVisible(false) : null
    if (message.length > 0) {
      console.log( message, userData?.user?.id,user_id,params.params,Chattype,type,'opopopopopo')
      sendMessage({

        params: {
          message: message,
          from_id: userData?.user?.id,
          to_id: user_id,
          type: type || Chattype,
          message_type: params.params
        },
        onSuccess: () => {
          const msg = { "created_at": new Date().toISOString(), "deleted_by": null, "from_id": userData?.user?.id, "message": message, "to_id": to_id }
          MessageHistory.unshift(msg);
          getMessageHistory({
            params: { to_id: to_id }, onSuccess: () => { }, screenName: 'Messages List'
          })
          setMessage('')
          setsubject('');
        },screenName: 'Messages screen'
      });
    } else {
      null
    }
  }
  const deleteMsg = (item) => {
    deleteMessage({ params: { message_id: item?.id, from_id: item?.from_id, to_id: item?.to_id }, onSuccess: () => { setrefresh(true) }, screenName: 'Messages List' });
  }

  const goBack = () => {
    navigation.push('ChatScreen');
  }
  const rightSwipeActions = (item) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 7
        }}
      >
        <AntDesign name={'arrowleft'} size={15} color={'grey'} style={{ marginRight: 22 }} />
        <TouchableOpacity onPress={() => deleteMsg(item)}>
          <AntDesign name={'delete'} size={15} color={'grey'} style={{ marginRight: 5 }} />

        </TouchableOpacity>

      </View>
    );
  };

  const ChatList = ({ item, index }) => {

    return (
      <Swipeable

        renderRightActions={() => rightSwipeActions(item)}

      >
        <View
          style={{
            width: '80%',
            marginVertical: 5,
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          {item?.from_id != userData?.user?.id ? <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <View
              style={{
                padding: 4,
                borderRadius: 6,
                backgroundColor: Colors.primary,
                borderWidth: 1,
                borderColor: '#000',
                paddingHorizontal: 13
              }}>
            
              <Text style={{ textAlign: 'center', color: '#000', fontSize: 14 }}>{item?.message}</Text>
              {item?.message_type == 'mail' && <View style={{ position: 'absolute', bottom: -3, right: -9 }}>
                <Entypo
                  name={'mail-with-circle'}
                  size={18}
                  color={'white'}
                  style={{ backgroundColor: 'grey', borderRadius: 22 }}
                />
              </View>}

            </View>
          </View> : null}

          {item?.from_id == userData?.user?.id ? <View style={{ flex: 1, alignItems: 'flex-end' }}>
            {item?.message_type == "mail" ?
              <View
                style={{
                  padding: 5,
                  borderRadius: 6,
                  backgroundColor: '#fef9e6',
                  borderWidth: 1,
                  borderColor: 'grey',
                  paddingHorizontal: 13
                }}>
                <Text style={{ textAlign: 'center', color: '#000', fontSize: 14 }} >{item?.message}</Text>
                <View style={{ position: 'absolute', bottom: -3, right: -9 }}>
                  <Entypo
                    name={'mail-with-circle'}
                    size={18}
                    color={'white'}
                    style={{ backgroundColor: 'grey', borderRadius: 22 }}
                  />
                </View>
              </View>
              // </View>
              :
              <View
                style={{
                  padding: 4,
                  borderRadius: 6,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#30046B',
                  paddingHorizontal: 13
                }}>
                <Text style={{ textAlign: 'center', color: '#30046B', fontSize: 14 }} >{item?.message}</Text>

              </View>
            }

          </View> : null}

        </View>
      </Swipeable>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: width,
          backgroundColor: '#fff',
          flexDirection: 'row',
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}>
          <Image
            source={require('../../Constant/Assests/Images/back.png')}
            style={{ height: 35, width: 35, marginTop: '1%' }}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 55,
              alignItems: 'center',
              alignSelf: 'center',
              resizeMode: 'cover',
              backgroundColor: 'black',
            }}
            source={{ uri: image_base_url + to_user_image }}
          />
          <TouchableOpacity onPress={() => navigation.navigate('ChatProfile', { params: route.params.item })}
            style={{ marginLeft: 10, justifyContent: 'center', width: '70%' }}>
            <Text
              numberOfLines={2}
              style={{
                color: '#fff',
                fontSize: 19,
                fontWeight: 'bold',
                color: '#000',
              }}>
              {name}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: '230', color: '#000' }}>
              {onlineDataSocket}
            </Text>
          </TouchableOpacity>
        </View>
      </View>


      <View
        style={{
          position: 'absolute',
          top: 100,
          left: 0,
          right: 0,
          bottom: 90,
          zIndex: 2,
        }}>
        {MessageHistory?.length > 0 ? <FlatList
          inverted
          invertStickyHeaders
          keyExtractor={e => Math.random()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 20,
            paddingHorizontal: 5,
            flexGrow: 1,
          }}
          data={MessageHistory}
          renderItem={({ item }) => <ChatList item={item} />}
        /> : null}
      </View>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 10,
          zIndex: -1,
          flex: 1,
          width: width,
        }}>
        <View style={{}}>
          <View
            style={{
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 10,
            }}>
            <View
              style={{
                backgroundColor: 'lightgrey',
                flexDirection: 'row',
                width: '87%',
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Type Here..."
                style={{
                  borderRadius: 25,
                  paddingHorizontal: 15,
                  backgroundColor: 'lightgrey',
                  flex: 1,
                  height: 49,
                }}
                multiline={true}
                maxLength={300}
              />
              <View
                style={{
                  backgroundColor: '#BFAB88',
                  padding: 10,
                  borderRadius: 33,
                  margin: 5,
                  flexDirection: 'row',
                }}>
              
                <TouchableOpacity
                  onPress={() => { onSendMail() }}>
                  <Feather
                    name={'mail'}
                    size={20}
                    color={'lightgrey'}
                    style={{}}
                  />
                </TouchableOpacity>
              </View>

            </View>

            <TouchableOpacity onPress={() => onSend({ params: 'sms' })} style={{ marginLeft: 10, height: 44, width: 44, backgroundColor: '#30046B', justifyContent: 'center', alignItems: 'center', borderRadius: 33 }}>
              <Feather name={'send'} size={25} color={'lightgrey'} />
            </TouchableOpacity>

          </View>
        </View>
      </View>
      <Modal
        animationType="default"
        transparent={true}
        visible={ismodalVisible}>
        <View
          style={{ flex: 1, alignItems: 'center', backgroundColor: '#000000C7' }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              width: width * 0.83,
              height: height * 0.45,
              borderRadius: 22,
              padding: 12,
              marginTop: 44,
            }}>
            <TouchableOpacity
              onPress={() => setismodalVisible(false)}
              style={{ alignSelf: 'flex-end' }}>
              <Image
                source={require('../../Constant/Assests/Images/greyClose.png')}
                style={{ height: 25, width: 25 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 28,
                color: '#000000',
                fontWeight: 'bold',
                marginLeft: 22,
                marginBottom: 10,
              }}>
              Mail
            </Text>
            {/* Message */}

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

              <View style={{ alignSelf: 'flex-start', marginBottom: 12 }}>
                <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', marginBottom: 10 }}>From Id:- {userData?.user?.email} </Text>
                <Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold' }}>To Id :- {to_email}</Text>

              </View>
              <View style={{ height: 45, width: width / 1.7, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: '#000' }}>Subject:-  </Text>
                <TextInput
                  value={subject}
                  onChangeText={setsubject}
                  placeholder="Type Here..."
                  style={{
                    borderRadius: 25,
                    paddingHorizontal: 15,
                    backgroundColor: 'lightgrey',
                    flex: 1,
                    height: 49,
                  }}
                  multiline={true}
                  maxLength={300}
                />
              </View>
              <View style={{ height: 45, width: width / 1.4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 14, color: '#000' }}>Type Mail:-  </Text>
                <TextInput
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Type Here..."
                  style={{
                    borderRadius: 25,
                    paddingHorizontal: 15,
                    backgroundColor: 'lightgrey',
                    flex: 1,
                    height: 49,
                  }}
                  multiline={true}
                  maxLength={300}
                />
              </View>
              {/* <RenderHtml
      contentWidth={width}
      source={source}
    /> */}
              {/* <RenderHtml contentWidth={width} source={{html: <p><strong>This is my textarea to be replaced with CKEditor.</strong></p>}} /> */}

              {/* <Ionicons
                    name={'ios-document'}
                    size={30}
                    color={'lightgrey'}
                    style={{marginBottom:10}}
                 
                  />
                  <Text style={{fontSize:14,color:'lightgrey'}}>No Template At The Moment</Text>GetmailTemplate?.data */}
            </View>


            <ButtonInput
              navigate={() => onSend({ params: 'mail' })}
              btnName={'Send Mail'}
              heightnote
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MessageScreen;
