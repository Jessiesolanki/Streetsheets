import { View, Text, Image, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
// import Header from '../../Components/Header'
import { LeadContext } from '../Providers/LeadProvider';
import useLoadingFn from '../Hooks/useLoadingFn'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import ButtonInput from '../Components/ButtonInput';
import {AuthContext} from '../Providers/AuthProvider';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const AppointmentList = ({lead_id,screenRoute,navigate}) => {
  const { API_CALLS, GetLead, appointmentByLead, GetAppointmentValue } = useContext(LeadContext)
  const {setRefreshHome,getRefreshHome} = useContext(AuthContext);
  const navigation = useNavigation();
  const getAppointment = useLoadingFn(API_CALLS.getAppointment)
  const getMeetingWithLeadList = useLoadingFn(API_CALLS.getMeetingWithLeadList)
  const getEditAppointmentdetails = useLoadingFn(API_CALLS.getEditAppointmentdetails)
  const GetAllAppointmentByLead = useLoadingFn(API_CALLS.GetAllAppointmentByLead)

  useEffect(() => {
   if(getRefreshHome == false) 
    setRefreshHome(true)  }, []);
  useEffect((value) => {
    GetAllAppointmentByLead({ params: { lead_id:lead_id}  , onSuccess: () => { }, screenName: 'task' })

    getAppointment({ params: { params: { id: value } }, onSuccess: () => { },screenName: 'appoint' })
    // getMeetingWithLeadList({ params: {}, onSuccess: () => { },screenName: 'meeting' })

  }, [])

useEffect(()=>{
const Getid =async()=>{
  await messaging().registerDeviceForRemoteMessages();
}

Getid()

},[])
  const EditAppointmentDetails = (value) => {
    getEditAppointmentdetails({
      params: { id: value },
      onSuccess: () => {
        navigation.navigate('HomeStack',{screen:'EditAppointment'})

      }
    })
  }
  // useEffect(() => {
  //   GoogleSignin.configure({ webClientId: '680265219562-4s5gm4ivikga4bpeg28da69pf717edtr.apps.googleusercontent.com',});
  // }, [])
  async function onGoogleButtonPress() {
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   const Tokens = await GoogleSignin.getTokens()
    //   const token = await AsyncStorage.getItem('token')
    // navigation.navigate('HomeStack',{screen:'AddAppointment'}, userInfo)
 
      
      navigation.navigate('HomeStack',{screen:'AddAppointment'})
    //   const Token = {
    //     "access_token": Tokens.accessToken
    //   }

    // } catch (err) {}

  }
//item.meeting_time.slice(0,2)+':'+rem    + val>60?hour+':'+ rem:item.meeting_time.slice(0,2)+':'+rem
  const CardView = ({ item }) => {  
    var add = 30
    var val =+ item.meeting_time.slice(3,5)+add
    
    var rem = val>60 ? val-60:val
    if ( rem  <= 9)  rem  = '0' + rem ;

    var hour =+ item.meeting_time.slice(0,2)+1

    return (

      <View elevation={7} style={[{ width: width / 1.17, marginTop: 10, backgroundColor: 'white', justifyContent: 'flex-end', borderRadius: 22, marginBottom: 10, margin: 8, }, styles.shadowProp]}>
        {appointmentByLead?.permission.includes('edit_appointment_role') ? <TouchableOpacity onPress={() => { EditAppointmentDetails(item.id) }}>
          <Image source={require('../Constant/Assests/Images/appointment.png')} style={{ height: 35, width: 35, alignSelf: 'flex-end', marginTop: 12, marginRight: 8 }} />
        </TouchableOpacity> : null}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../Constant/Assests/Images/locationmeeting.png')} style={{ height: 30, width: 30, marginRight: 10, marginLeft: 10 }} />
          <Text style={{ fontSize: 15, color: '#30046B', fontWeight: '500' }}>{item.city}</Text>
        </View>
        <View style={{ borderLeftWidth: 1.8, flexDirection: 'column', color: 'black', height: 32, marginLeft: 27, borderStyle: 'dashed', borderColor: '#BFAB88' }}></View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../Constant/Assests/Images/locationmeeting.png')} style={{ height: 30, width: 30, marginRight: 10, marginLeft: 10 }} />
          <Text style={{ fontSize: 15, color: '#30046B', fontWeight: '500' }}>{item.sender_details.city}</Text>
        </View>
        <View style={{ flexDirection: 'row', backgroundColor: '#30046B', marginTop: 18, borderBottomLeftRadius: 22, borderBottomRightRadius: 22, paddingVertical: 12 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
            <Image source={require('../Constant/Assests/Images/meetingboy.png')} style={{ height: 35, width: 35, }} />
          </View>
          <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '700', }}>{item.meeting_time.slice(0, 5)+'-'}<Text>{val>60?hour+':'+ rem :item.meeting_time.slice(0,2)+':'+rem}</Text></Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center',marginTop:-30,padding:10 }}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeStack',{screen:'CalendarView',params    :1})} >
        <Image source={ require('../Constant/Assests/Images/calendarcontact.png')} style={{ height:  43, width:  43, marginTop:'1%' }} />
      </TouchableOpacity>
      {GetAppointmentValue?.permission.includes('add_appointment_role') ?  <ButtonInput  style={{width:250,height:45,padding:10,backgroundColor:'#BFAB88',justifyContent:'space-around'}} btnName={'Add Appointment'} add  elevation={5} navigate={()=>{onGoogleButtonPress()}} /> :null } 

      </View>
      {appointmentByLead?.permission.includes('view_appointment_role') ? <View style={{ height: '75%', justifyContent: 'center', alignItems: 'center' }}>

        {appointmentByLead?.data?.length > 0 ? <FlatList
          style={{ marginTop: 5 }}
          data={appointmentByLead?.data}
          // numColumns={2}
          renderItem={(item) => CardView(item)}
          showsVerticalScrollIndicator={false}
        />
          : 
            <Text style={{  fontSize: 16, color: 'grey', textAlign: 'center' }}>No Booked Appointment at the moment</Text>}
          
          

      </View> : null}

    </View>
  )
}

export default AppointmentList
const styles = StyleSheet.create({

  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textBold: {
    fontSize: 22,
    color: '#000',
    fontWeight: '600',
    marginBottom: 15
  }
})
