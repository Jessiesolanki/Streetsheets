import { View, Text, Image, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { LeadContext } from '../../Providers/LeadProvider';
import useLoadingFn from '../../Hooks/useLoadingFn'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import ButtonInput from '../../Components/ButtonInput';
import {AuthContext} from '../../Providers/AuthProvider';

const { width, height } = Dimensions.get('window');

const Appointment = ({ navigation }) => {
  const { API_CALLS, GetLead, AddCountry, GetAppointmentValue } = useContext(LeadContext)
  const {setRefreshHome,getRefreshHome} = useContext(AuthContext);

  const getAppointment = useLoadingFn(API_CALLS.getAppointment)
  // const getMeetingWithLeadList = useLoadingFn(API_CALLS.getMeetingWithLeadList)
  const getEditAppointmentdetails = useLoadingFn(API_CALLS.getEditAppointmentdetails)
  useEffect(() => {
   if(getRefreshHome == false) 
    setRefreshHome(true)  }, []);
  
  useEffect((value) => {

    getAppointment({ params: { params: { id: value } }, onSuccess: () => { },screenName:'appointment' })
    // getMeetingWithLeadList({ params: {}, onSuccess: () => { } ,screenName:'appointment'})

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
        navigation.navigate('EditAppointment')

      }
    })
  }
  useEffect(() => {
    GoogleSignin.configure({ webClientId: '680265219562-4s5gm4ivikga4bpeg28da69pf717edtr.apps.googleusercontent.com',});
  }, [])
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const Tokens = await GoogleSignin.getTokens()
      const token = await AsyncStorage.getItem('token')
      
      
      navigation.navigate('AddAppointment', userInfo)
      const Token = {
        "access_token": Tokens.accessToken
      }

    } catch (err) {}

  }
//item.meeting_time.slice(0,2)+':'+rem    + val>60?hour+':'+ rem:item.meeting_time.slice(0,2)+':'+rem
  const CardView = ({ item }) => {  
    var add = 30
    var val =+ item.meeting_time.slice(3,5)+add
    
    var rem = val>60 ? val-60:val
    if ( rem  <= 9)  rem  = '0' + rem ;

    var hour =+ item.meeting_time.slice(0,2)+1

    return (

      <View elevation={7} style={[{ width: width / 2.3, marginTop: 12, backgroundColor: 'white', justifyContent: 'flex-end', borderRadius: 22, marginBottom: 18, margin: 8, }, styles.shadowProp]}>
        {GetAppointmentValue?.permission.includes('edit_appointment_role') ? <TouchableOpacity onPress={() => { EditAppointmentDetails(item.id) }}>
          <Image source={require('../../Constant/Assests/Images/appointment.png')} style={{ height: 35, width: 35, alignSelf: 'flex-end', marginTop: 12, marginRight: 8 }} />
        </TouchableOpacity> : null}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../Constant/Assests/Images/locationmeeting.png')} style={{ height: 30, width: 30, marginRight: 10, marginLeft: 10 }} />
          <Text style={{ fontSize: 15, color: '#30046B', fontWeight: '500' }}>{item.city}</Text>
        </View>
        <View style={{ borderLeftWidth: 1.8, flexDirection: 'column', color: 'black', height: 32, marginLeft: 27, borderStyle: 'dashed', borderColor: '#BFAB88' }}></View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../Constant/Assests/Images/locationmeeting.png')} style={{ height: 30, width: 30, marginRight: 10, marginLeft: 10 }} />
          <Text style={{ fontSize: 15, color: '#30046B', fontWeight: '500' }}>{item.sender_details.city}</Text>
        </View>
        <View style={{ flexDirection: 'row', backgroundColor: '#30046B', marginTop: 18, borderBottomLeftRadius: 22, borderBottomRightRadius: 22, paddingVertical: 12 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
            <Image source={require('../../Constant/Assests/Images/meetingboy.png')} style={{ height: 35, width: 35, }} />
          </View>
          <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '700', }}>{item.meeting_time.slice(0, 5)+'-'}<Text>{val>60?hour+':'+ rem :item.meeting_time.slice(0,2)+':'+rem}</Text></Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
      <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, padding: 14, height: '10%', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} >
        <Image source={ require('../../Constant/Assests/Images/back.png')} style={{ height:  43, width:  43, marginTop:'1%' }} />
      </TouchableOpacity>
      <Text style={{ fontSize: 28, color: '#393939', fontWeight: '500', marginLeft: '2%' , textAlign:'center'  }}>{'Appointment'}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('CalendarView')} >
        <Image source={ require('../../Constant/Assests/Images/calendarcontact.png')} style={{ height:  43, width:  43, marginTop:'1%' }} />
      </TouchableOpacity>
      </View>
   {/* {GetAppointmentValue?.permission.includes('add_appointment_role') ?  <ButtonInput btnName={'Add Appointment'} add  elevation={5} navigate={()=>{onGoogleButtonPress()}} /> :null }  */}
      {GetAppointmentValue?.permission.includes('view_appointment_role') ? <View style={{ height: '90%', justifyContent: 'center', alignItems: 'center' }}>

        {GetAppointmentValue?.data?.length > 0 ? <FlatList
          style={{ marginTop: 5 }}
          data={GetAppointmentValue?.data}
          numColumns={2}
          renderItem={(item) => CardView(item)}
          showsVerticalScrollIndicator={false}
        />
          : 
            <Text style={{ padding: 20, fontSize: 16, color: 'grey', paddingBottom: 10, textAlign: 'center' }}>No Booked Appointment at the moment</Text>}
          
          

      </View> : null}

    </View>
  )
}

export default Appointment
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
