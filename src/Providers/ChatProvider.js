import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { API, ERROR, LOADING, APICHAT } from './Index';
import { DeviceEventEmitter } from 'react-native';
import { io } from 'socket.io-client';
import EVENTS from './AppProvider';
import { AuthContext } from './AuthProvider';
import axios from 'axios';
import { Base_Url_Chat, image_base_url } from './Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from './AppProvider';
export const ChatContext = React.createContext();

const ChatProvider = ({ children }) => {
  const [AgentToagentdata, setagentToagentdata] = useState(LOADING);
  const [AgentToManager, setAgentToManager] = useState(LOADING);
  const [AgentToStaff, setAgentToStaff] = useState(LOADING);
  const [MessageData, setMessageData] = useState(LOADING);
  const { userData } = useContext(AuthContext);
  const [message, setmessage] = useState([]);
  const [listening, setListening] = useState(false);
  const [SendMessage, setSendMessage] = useState(LOADING);
  const [MessageHistory, setMessageHistory] = useState(LOADING);
  const [Chattoken, setChattoken] = useState(null);
const [GoBack, setgoBack] = useState(false)
  const [Chatmessagelist, setchatmessagelist] = useState(null);
  const [latestmessagelist, setlatestmessagelist] = useState(null)
const [GetmailTemplate, setmailTemplate] = useState(LOADING)
  const [MessageDataSocket, setMessageDataSocket] = useState(LOADING);

  const [RequestMessage, setRequestMessage] = useState(LOADING);
 
  const [messagedata, setmessagedata] = useState({
    Type: null,
    dataresponse: {
      created_at: '2022-08-19',
      from_id: null,
      id: null,
      message: 'hello ram how r u',
      sender_name: 'jayshree',
      status: '1',
      to_id: null,
      updated_at: '2022-08-19',
    },
  });
  //


  const GetToken = async () => {
    const Token = await AsyncStorage.getItem('token');
    setChattoken(Token);
  };

  useEffect(() => {
    GetToken();
  }, []);
 
  useEffect(() => {
    if (userData?.user?.id) {

      setListening(true);
     
      const socket = io('http://admin.dedicatedmarketingleadership.com/', {
        extraHeaders: { 'my-custom-header': 'cde' },

        auth: {
          token: userData?.user?.id || '18',
        },
      });

      socket.on('message', data => {
       
        setMessageDataSocket(data);
        DeviceEventEmitter.emit(EVENTS.NEW_MESSAGE, data);
      });
      socket.on('latest_message', data => {
        // setmessagedata(data);
        setlatestmessagelist(data)
        setRequestMessage(data?.response);
      });
      return () => socket.removeListener('message').disconnect();
    }

  }, [userData]);

 

  const API_CALL_CHAT = {
    getAgentToAgentChat: async (params, onSuccess) =>
      API.get(
        'getAllSalesPersonList?' +
        new URLSearchParams({ ...params, db: '' }).toString(),
      ).then(res => {
        setAgentToManager(res.data.data);
    
      }),
    getAgentToManagerChat: async (params, onSuccess) =>
      API.get(
        'getAllManagerList?' +
        new URLSearchParams({ ...params, db: '' }).toString(),
      ).then(res => {
        setAgentToManager(res.data.data);
      }),
    getAgentToStaffChat: async (params, onSuccess) =>
      API.get(
        'getAllEntireTeamList?' +
        new URLSearchParams({ ...params, db: '' }).toString(),
      ).then(res => {

        setAgentToManager(res.data.data);
        // setAgentToStaff(res.data.data);
      }),
      deleteMessage: async (params, onSuccess) => await APICHAT.post('deleteMessage/' , params).then(res => {
         }),
    dashChatlist: async (params, onSuccess) =>
      API.get('getAllChatMessageList').then(res => {
      
        let array = []
        res.data.data.map((e, s) => {
          const { created_at, from_id, id, image, last_message, name, seen, to_id, to_name, to_user_image, type, updated_at,to_email } = e
          if (userData?.user?.id == from_id) {

            array.push({
              created_at,
              from_id,
              id,
              image,
              last_message,
              name: userData.user.name == name ? to_name : name,
              seen,
              to_id,
              to_name: to_name,
              to_user_image:to_user_image,
              type,
              user_id:to_id,
              updated_at,
              to_email
            })
          } else {
            array.push({
              created_at,
              from_id,
              id,
              image,
              last_message,
              name: userData.user.name == name ? to_name : name,
              seen,
              to_id,
              to_name: name,
              to_user_image:image,
              type,
              user_id:from_id,
              updated_at,
              to_email
            })
          }
        })


        setMessageData(array);
      }),
    getMessageChat: async (params, onSuccess) =>
      API.get(
        'getAllNewRequestList?' +
        new URLSearchParams({ ...params, db: '' }).toString(),
      ).then(res => {
       
        setRequestMessage(res?.data?.data);
        // setMessageData(res.data);
      }),


    sendMessage: async (params, onSuccess) =>
      APICHAT.post('sendMsg', params).then(res => {
        setSendMessage(res.data);
     
      }),

    getMessageHistory: async (params, onSuccess) =>
      API.post('getAllMessages', params).then(res => {
        setMessageHistory(res?.data?.data);
      }),
      getMailTemplate: async (params, onSuccess) =>
      API.post('chatTemplate', params).then(res => {
        setmailTemplate(res?.data?.data);
      }),
  
   
  };

  
  return (
    <ChatContext.Provider
      value={{
        API_CALL_CHAT,
        AgentToagentdata,
        AgentToManager,
        AgentToStaff,
        MessageData,
        MessageHistory,
        messagedata,
        Chatmessagelist,
        setchatmessagelist,
        userid: userData?.user?.id,
        latestmessagelist,
        setMessageData,
        MessageDataSocket,
        RequestMessage,
        GoBack,
        setgoBack,
        GetmailTemplate, 

      }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

