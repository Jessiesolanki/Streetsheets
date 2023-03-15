
import { Dimensions, FlatList, Text, View, ScrollView, StyleSheet, ImageBackground, Image, Linking, TouchableOpacity, Modal, Button, StatusBar, KeyboardAwareScrollView } from "react-native";
import React, { useState, useEffect, useContext ,useCallback} from 'react'
import Header from '../../Components/Header'
import useLoadingFn from '../../Hooks/useLoadingFn'
import { LeadContext } from '../../Providers/LeadProvider';
import ButtonInput from "../../Components/ButtonInput";
import CustomInput from "../../Components/CustomInput";
import { useForm } from 'react-hook-form'
import ToggleSwitch from 'toggle-switch-react-native'
import { hp } from "../../Components/Responsive";
import Notes from "../../Components/Notes"
import Task from "../../Components/Task";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppointmentList from "../../Components/AppointmentList";
import { image_base_url } from "../../Providers/Index";
const { width, height } = Dimensions.get('window');
const LeadtDetails = ({ navigation, item,route }) => {
  const { API_CALLS, GetContactList, GetDndStatusChange, GetLeadId, tabs, settabs,     GetNoteStatus, GetLead } = useContext(LeadContext)
  const [ismodalVisibleNotes, setismodalVisibleNotes] = useState(false)
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [isOn, setisOn] = useState(GetDndStatusChange?.status === 1 ? true : false)
  const [selectedStateValue, setStateValue] = useState('');
  const [toggle, settoggle] = useState(false)
  const getDndStatus = useLoadingFn(API_CALLS.getDndStatus)
  const getAddNote = useLoadingFn(API_CALLS.getAddNote)
  const getTask = useLoadingFn(API_CALLS.getTask);
  const getStatusNote = useLoadingFn(API_CALLS.getStatusNote);
  const getNotesHistory = useLoadingFn(API_CALLS.getNotesHistory)
  console.warn(route.params)
  useEffect(() => { }, [GetContactList?.data, GetLeadId?.data])
  useEffect(() => {
    setisOn(GetDndStatusChange?.status === 1 ? true : false)
  }, [GetDndStatusChange, GetContactList?.data])
  useEffect(() => {
    getNotesHistory({ params: { lead_id:  GetLeadId?.data?.id }, onSuccess: () =>{} , screenName: 'note'})
    }, [toggle])
  useEffect(() => {
    getNotesHistory({ params: { lead_id:  GetLeadId?.data?.id }, onSuccess: () =>{} , screenName: 'note'})
    getTask({params: {}, onSuccess: () => { }, screenName: 'task'});  
    getStatusNote({params: {}, onSuccess: () => {}, screenName: 'status'});
    }, [])

  const onToggle = (value) => {
    getDndStatus({ params: { status: value === 1 ? true : false, id: GetLeadId?.data?.id }, onSuccess: () => { setisOn(value) }, screenName: 'Dnd' })
  }

  const openNotes = () => {
    setismodalVisibleNotes(true)
  }

  const onSubmit = (data) => {
    getAddNote({
      params: { ...data, id: GetLeadId?.data?.id },
      onSuccess: () => {
        settoggle(true)
        setismodalVisibleNotes(false)

        navigation.navigate('LeadtDetails')
      }
    })
  }
  const mailsupportedURL = `mailto:${ GetLeadId?.data?.email}`;
  const supportedURL = `tel:${ GetLeadId?.data?.phone}`;
  const unsupportedURL = `sms:${ GetLeadId?.data?.phone}`
  const OpenURLButton = ( { url , children } ) => {
    const handlePress
    = useCallback(async () =>
    {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
    await Linking.openURL(url);
    }
    }, [url])
    return   <TouchableOpacity onPress={handlePress}>
 
<MaterialIcons
name={children}
size={28}
color={'#BFAB88'}
style={{marginLeft:25}}
/>
</TouchableOpacity>
  }

  return (<>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ImageBackground source={require('../../Constant/Assests/Images/mapbg.png')} style={{ flex: 1 }}>
      <Header TopTab route label={GetLeadId?.data?.name}  />
         <View style={{ justifyContent: 'space-evenly', alignItems: 'center', }}>

     <View style={{ width: width, backgroundColor: 'white', borderTopLeftRadius: 44, borderTopRightRadius: 44, padding: 20, height: height/1.3, }}>
         {tabs.active== true && tabs.id == 1 && <View style={{ width: width * .89, justifyContent: 'space-between',alignItems:'center'  }}>
            <View style={{ width: width * .89, justifyContent: 'space-between', flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin:8}}>
                <Image source={require('../../Constant/Assests/Images/namecontact.png')} style={{ height: 40, width: 40 }} />
                <View>
                  <Text style={{ fontSize: 13, color: '#9A9A9A', marginLeft: 6, marginTop: 5, fontWeight: '500' }}>Name</Text>
                  <Text style={{ fontSize: 14, color: '#4E4E4E', marginLeft: 6, marginTop: 5, fontWeight: '500' }}>{GetLeadId?.data?.name}</Text>
                </View>
              </View>

            </View>
            <View style={{ width: width * .89, justifyContent: 'space-between', flexDirection: 'row',alignItems:'center'  }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin:8 }}>
                <Image source={require('../../Constant/Assests/Images/mailaddress.png')} style={{ height: 40, width: 40 }} />
                <View>
                  <Text style={{ fontSize: 13, color: '#9A9A9A', marginLeft: 6, marginTop: 5, fontWeight: '500' }}>Email</Text>
                  <Text style={{ fontSize: 14, color: '#4E4E4E', marginLeft: 6, marginTop: 5, fontWeight: '500' }}>{GetLeadId?.data?.email}</Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end', justifyContent: 'center' ,flexDirection:'row'}}>
          
              <OpenURLButton url={mailsupportedURL} children={'mail'}></OpenURLButton>


              </View>
            </View>
          
            <View style={{ width: width * .89, justifyContent: 'space-between', flexDirection: 'row' ,alignItems:'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin:8,}}>
              <Image source={require('../../Constant/Assests/Images/callcontact.png')} style={{ height: 40, width: 40 }} />
                <View>
                  <Text style={{ fontSize: 13, color: '#9A9A9A', marginLeft: 6, marginTop: 5, fontWeight: '500' }}>Phone Number</Text>
                  <Text style={{ fontSize: 14, color: '#4E4E4E', marginLeft: 6, marginTop: 5, fontWeight: '500' }}>{GetLeadId?.data?.phone}</Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end', justifyContent: 'center' ,flexDirection:'row'}}>
        
           <OpenURLButton url={supportedURL} children={'call'}></OpenURLButton>

          <OpenURLButton url={unsupportedURL} children={'sms'} ></OpenURLButton>

              </View>
            </View>

            <View style={{ width: width * .89, justifyContent: 'space-between', flexDirection: 'row',alignItems:'center'  }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin:8 }}>
                <Image source={require('../../Constant/Assests/Images/dndcall.png')} style={{ height: 40, width: 40 }} />
                <View>
                  <Text style={{ fontSize: 13, color: '#9A9A9A', marginLeft: 6, marginTop: 5, fontWeight: '500' }}>DND</Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                <ToggleSwitch
                  isOn={isOn}
                  onColor="#6AC259"
                  offColor="#BFAB88"
                  size="small"
                  onToggle={isOn => onToggle(isOn)}
                  animationSpeed={200}
                />
              </View>
            </View>
            <View style={{ width: width * .89, justifyContent: 'space-between', flexDirection: 'row',alignItems:'center'  }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin:8 }}>
                <Image source={require('../../Constant/Assests/Images/calendarcontact.png')} style={{ height: 40, width: 40 }} />
                <View>
                  <Text style={{ fontSize: 13, color: '#9A9A9A', marginLeft: 6, marginTop: 5, fontWeight: '500' }}>Date Of Birth</Text>
                  <Text style={{ fontSize: 14, color: '#4E4E4E', marginLeft: 6, marginTop: 5, fontWeight: '500' }}>{GetLeadId?.data?.dob}</Text>
                </View>
              </View>
            </View>
          
            <View style={{ width: width * .89, justifyContent: 'space-between', flexDirection: 'row' ,alignItems:'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin:8 }}>
                <Image source={require('../../Constant/Assests/Images/note.png')} style={{ height: 40, width: 40 }} />
                <View>
                  <Text style={{ fontSize: 13, color: '#9A9A9A', marginLeft: 6, marginTop: 5, fontWeight: '500' }}>Notes</Text>
                </View>
              </View>
              <TouchableOpacity onPress={openNotes} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                <Image source={require('../../Constant/Assests/Images/noteedit.png')} style={{ height: 29, width: 29 }} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{}}>
              <View style={{ width: width * .89, justifyContent: 'space-between', flexDirection: 'row',alignItems:'center'  }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin:8 }}>
   {      GetLeadId?.data?.stage_name == null ?<Text style={{ fontSize: 13, color: '#9A9A9A', marginLeft: 6, marginTop: 5, fontWeight: '500'}}>Stage Not Availble </Text>: <Image source={{uri:image_base_url + GetLeadId?.data?.stage_image}} style={{ height: 40, width: 40,borderRadius:22}} />
   }
                  <View>
                    <Text style={{ fontSize: 13, color: '#4E4E4E', marginLeft: 6, fontWeight: '700' }}>{GetLeadId?.data?.stage_name}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            
          </View>}  
    {tabs.active== true && tabs.id == 3 && <Task id={GetLeadId?.data?.id} />}
    {tabs.active== true && tabs.id == 2 && 
    <View>
       <TouchableOpacity onPress={openNotes} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                <Image source={require('../../Constant/Assests/Images/noteedit.png')} style={{ height: 30, width: 30 }} />
              </TouchableOpacity>
              <Notes note={GetLeadId?.data?.id}/>
      </View>}
    {tabs.active== true && tabs.id == 4 && <AppointmentList lead_id={GetLeadId?.data?.id} />}
    
      </View>



        </View>
      </ImageBackground>

      <Modal
        animationType="default"
        transparent={true}
        visible={ismodalVisibleNotes}
      >
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#000000C7' }}>
          <View style={{ backgroundColor: '#FFFFFF', width: width * .83, height: height * .38, borderRadius: 22, padding: 12, marginTop: 44 }}>
            <TouchableOpacity onPress={() => setismodalVisibleNotes(false)} style={{ alignSelf: 'flex-end' }}>
              <Image source={require('../../Constant/Assests/Images/greyClose.png')} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 28, color: "#000000", fontWeight: 'bold', marginLeft: 22, marginBottom: 10 }}>Notes</Text>
            <CustomInput
              label={' Note '}
              textInputProps={{ placeholder: 'Write...', keyboardType: 'email-address', autoCapitalize: 'none', }}
              controllerProps={{ name: 'note', control, errors, rules: { required: true, } }}
              labelbgcolor
              heightnote
              bordercolor
            />


            <ButtonInput navigate={handleSubmit(onSubmit)} btnName={'save'} heightnote />

          </View>
        </View>
      </Modal>

    </View>
    </>)
}

export default LeadtDetails
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
    marginBottom: 10,
    marginLeft: 12
  }
})

