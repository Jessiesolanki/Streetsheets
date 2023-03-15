import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import React, { useContext, useState, useEffect } from 'react';
import { Alert } from "react-native"
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import { useForm } from 'react-hook-form'
import ButtonInput from '../../Components/ButtonInput'
import { AuthContext } from '../../Providers/AuthProvider';
import { LeadContext } from '../../Providers/LeadProvider';
import useLoadingFn from '../../Hooks/useLoadingFn'
import { Picker } from '@react-native-picker/picker';
import ControlledPicker from '../../Components/ControlledPicker'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isMouseConnectedSync } from 'react-native-device-info';
//  import Toptab from '../../../src/Screens/LeadScreen.js/Toptab'

const { width, height } = Dimensions.get('window');



const EditLead = ({ navigation }) => {
  const [selectedCountryValue, setCountryValue] = useState('');
  const [selectedStateValue, setStateValue] = useState('');
  const [selectedValue, setValue] = useState('');
  const [selectedLeadStateValue, setLeadStateValue] = useState('');
  const [StateList, setStateList] = useState(GetStateList);
  const [Submit, setSubmit] = useState(false);
  const [stag, setstag] = useState(false)

  const [items, setItems] = useState([
    { label: 'In-Active', value: 0 },
    { label: 'Active', value: 1 }
  ]);
  const { control, handleSubmit, formState: { errors }, reset, watch,getValues } = useForm();
  const { API_CALLS, GetCountry, GetStateList, GetLeadEditDetails, GetStatus,PipelineList,GetTimeZone,StageList } = useContext(LeadContext)
  const getState = useLoadingFn(API_CALLS.getState)
  const getCountry = useLoadingFn(API_CALLS.getCountry)
  const updateLead = useLoadingFn(API_CALLS.updateLead)
  const getLeadStatus = useLoadingFn(API_CALLS.getLeadStatus);
  const GetStageList = useLoadingFn(API_CALLS.GetStageList);
  const pipelineValue = getValues()
  const { latitude } = useContext(AuthContext)
  useEffect(() => { getCountry({ params: {}, onSuccess: () => { } })

  
}, [])
  const changeCountryValue = (itemValue) => {
    setCountryValue(itemValue)
    getState({ params: { country_id: itemValue }, onSuccess: () => { } })
  }
  const changeValue = (itemValue) => {
    setValue(itemValue)
  }

  useEffect(() => {
    setStateValue(GetLeadEditDetails?.state)
  }, [GetCountry, GetStateList])

  const changeStateValue = (itemValue) => {
    setStateValue(itemValue)
  }
  useEffect(() => {
    // setCountryValue(GetLeadEditDetails?.country)
    reset(GetLeadEditDetails)
     getState({ params: { country_id: GetLeadEditDetails?.country }, onSuccess: () => { } })
    GetStageList({ params: {pipeline_id:GetLeadEditDetails.pipeline  }, onSuccess: () => {setstag(true) } });
    // setValue(GetLeadEditDetails?.status);
    // setLeadStateValue(GetLeadEditDetails?.lead_status)
  }, [])
  useEffect(() => {
    setStateList(GetStateList);
  }, [GetStateList]);
  useEffect(() => {
    getLeadStatus({ params: {}, onSuccess: () => { } });
  }, []);
  const Swapindex = (value, state, index) => {
    let a = [...value];

    let copiendindex = a[0];
    a[0] = a[index];
    a[index] = copiendindex;
    state(a);
  };
  const onSubmit = (data) => {
    const { address, email, name, phone, city, time_zone,description, dob, zip_code, monetaryValue, stageId, pipeline,companyName,country,state} =
    data;

     const phoneValue = phone.slice(0,2)== "+1"?phone:'+1' + phone;
    updateLead({
  
      params: {
        // ...data,
        // country: selectedCountryValue, state: selectedStateValue,
          latitude: latitude.latitude, 
          longitude: latitude.longitude, 
         status: selectedValue,
          lead_status: selectedLeadStateValue,
          id:GetLeadEditDetails.id,
          dob:dob,
          zip_code:zip_code,
        name : name,
        email:email,
         phone:  phoneValue,
        country:country,
        state:state,
        city:city,
        address:address,
        status:"1",
        description: description,
       time_zone:time_zone,
        tag:"abc,cdd,eed",
        stageId:stageId,
        monetaryValue:monetaryValue,
        companyName:companyName,
        pipeline:pipeline,
        apportunity_status:"open",
        
        // name : "12345jjjjjjjjjgggia",
        //  email:"kiarrrrh234@gmail.com",
        // phone:"+133878673475",
        // country:"United States",
        // state:"Florida",
        // city:"florida",
        // address:"florida",
        // status:"1",
        // latitude:"22.6926",
        // longitude:"75.867",
        // description:"mkjfkf",
        // tag:"abc,cdd,eed",
        // apportunity_status:"open",
        // stageId:"cbe0b2ce-5f2e-428b-ae4a-5abbd591865e",
        // monetaryValue:"12.2",
        // companyName:"Tesla",
        // pipeline:"t9COEdNhmpoqwRoaL5tM",
        type:"bymap",
        source:"open source"
      },
      onSuccess: () => {
        Alert.alert('Update Lead', 'Lead Updated Successfully')
        navigation.navigate('LeadScreen')
      }, screenName: 'Update Lead'
    })
  }


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header backbutton />
      {/* <Toptab/> */}
      <ScrollView style={{ flex: 1, marginTop: 15 }}
        showsVerticalScrollIndicator={false}
       >
        <CustomInput
          label={' Name '}
          textInputProps={{ placeholder: 'Enter name', keyboardType: 'email-address', autoCapitalize: 'none', }}
          controllerProps={{ name: 'name', control, errors, rules: { required: true, } }}
          bordercolor
          labelbgcolor
        />

        <CustomInput
          label={' Email '}
          textInputProps={{ placeholder: 'Enter email address', keyboardType: 'email-address', autoCapitalize: 'none', }}
          controllerProps={{ name: 'email', control, errors, rules: { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ }, }}
          bordercolor
          labelbgcolor />

        <CustomInput
          label={' Date Of Birth '}
          textInputProps={{
            placeholder: "25-06-1996",
            keyboardType: 'number-pad',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'dob',
            control,
            errors,
            rules: {
              required: true,
              pattern: /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/,

            },
          }}
          bordercolor
          labelbgcolor
        />
        <CustomInput
          label={' Postal Code '}
          textInputProps={{
            placeholder: '35061',
            keyboardType: 'number-pad',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'zip_code',
            control,
            errors,
            rules: {
              required: true,
            },
          }}
          bordercolor
          labelbgcolor
        />

        <CustomInput
          label={' Phone Number '}
          textInputProps={{ placeholder: 'Enter Phone', keyboardType: 'number-pad', autoCapitalize: 'none', }}
          controllerProps={{ name: 'phone', control, errors, rules: { required: true, } }}
          bordercolor
          labelbgcolor
        />

        
        <CustomInput
          label={' Address '}
          textInputProps={{ placeholder: 'Enter Address', keyboardType: 'email-address', autoCapitalize: 'none', }}
          controllerProps={{ name: 'address', control, errors, rules: { required: true, } }}
          bordercolor
          labelbgcolor
        />

    <CustomInput
          label={' Tags '}
          textInputProps={{
            placeholder: 'Add Tags',
            keyboardType: 'default',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'tag',
            control,
            errors,
            rules: { required: true },
          }}
          bordercolor
          labelbgcolor
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14,width:'87%',alignSelf:'center' }}>
          <View style={{}}>
            <View style={styles.text}>
              <Text style={{ color: '#30046B' }}> Select Country </Text>
            </View>
            <View style={{ borderWidth: 1, borderRadius: 4, borderColor: '#30046B', flexDirection: 'row' }}>

              <View style={{ backgroundColor: 'white', borderRadius: 8, height: 58, width: width / 2.7}}>
                   <ControlledPicker
                  emptyMessage={"Please select value."}
                  options={ GetCountry?.map((item, index) =>({ value:`${item?.name}`, label:`${item?.name}`,})) }
                  controllerProps={{ name:'country', control, errors, rules: { required: true }}}
                  label={' Select Country'}
                  containerStyle={{borderWidth:0 }}
                  style={{height:57,borderWidth:0}}
                    /> 

              </View>
            </View>
          </View>


          <View style={{ }}>
            <View style={styles.text}>
              <Text style={{ color: '#30046B' }}> Select State </Text>
            </View>
            <View style={{ borderWidth: 1, borderRadius: 4, borderColor: '#30046B', flexDirection: 'row' }}>

              <View style={{ backgroundColor: 'white', borderRadius: 8, paddingHorizontal: 4, height: 58, width: width / 2.7 }}>
                 <ControlledPicker
                  emptyMessage={"Please select value."}
                  options={ 
                    GetStateList?.map((item, index) =>({ value:`${item?.name}`, label:`${item?.name}`,}))
                    }
                  controllerProps={{ name:"state", control, errors, rules: { required: true }}}
                  label={' Select State'}
                  containerStyle={{borderWidth:0 }}
                  style={{height:57,borderWidth:0}}
                   /> 

              </View>
            </View>
          </View>
        </View>
        <CustomInput
          label={' City '}
          textInputProps={{ placeholder: 'Enter City', keyboardType: 'email-address', autoCapitalize: 'none', }}
          controllerProps={{ name: 'city', control, errors, rules: { required: true, } }}
          bordercolor
          labelbgcolor
        />
        <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
          <View style={styles.text}>
            <Text style={{ color: '#30046B' }}> Select Time-Zone </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 4,
              borderColor: '#30046B',
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                paddingHorizontal: 4,
                height: 58,
                width: width / 1.25,
               
              }}>
                     <ControlledPicker
           emptyMessage={"Please select value."}
           options={ GetTimeZone?.timezones?.map((item, index) =>({ value:`${item}`, label: `${item}`,})) }
          controllerProps={{ name:"time_zone", control, errors, rules: { required: true }}}
          label={' Select Time-Zone'}
          containerStyle={{borderWidth:0 }}
          style={{height:57,borderWidth:0}}
         /> 
           
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
          <View style={styles.text}>
            <Text style={{ color: '#30046B' }}> Select Status </Text>
          </View>
          <View style={{ borderWidth: 1, borderRadius: 4, borderColor: '#30046B', flexDirection: 'row' }}>
            <View style={{ backgroundColor: 'white', borderRadius: 8, paddingHorizontal: 4, height: 58, width: width / 1.29 }}>

                <ControlledPicker
                  emptyMessage={"Please select value."}
                  options={ items?.map((item, index) =>({ value:`${item?.value}`, label:`${item?.label}`,})) }
                  controllerProps={{ name:"status", control, errors, rules: { required: true }}}
                  label={' Status'}
                  containerStyle={{borderWidth:0 }}
                  style={{height:57,borderWidth:0}}
                     /> 
            </View>
          </View>
        </View>

        <CustomInput
          label={' Lead Value '}
          textInputProps={{
            placeholder: 'Lead Value ',
            keyboardType: 'number-pad',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'monetaryValue',
            control,
            errors,
            rules: { required: true },
          }}
          bordercolor
          labelbgcolor
        />
             <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
          <View style={styles.text}>
            <Text style={{ color: '#30046B' }}> Pipeline </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 4,
              borderColor: '#30046B',
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                paddingHorizontal: 4,
                height: 58,
                width: width / 1.25,
               
              }}>
                     <ControlledPicker
           emptyMessage={"Please select value."}
          options={ PipelineList?.pipelines?.map((item, index) =>({ value:`${item?.id}`, label: `${item?.name}`,})) }
          controllerProps={{ name:"pipeline", control, errors, rules: { required: true }}}
          label={' Pipeline'}
          containerStyle={{borderWidth:0 }}
          style={{height:57,borderWidth:0}}
         /> 
           
            </View>
          </View>
          {/* {selectedStateValue == '' && Submit && (
            <Text
              style={{
                color: 'red',
                marginBottom: 0,
                fontSize: 15,
                marginTop: 10,
              }}>
              {' State is required'}
            </Text>
          )} */}
        </View>
       <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
          <View style={styles.text}>
            <Text style={{ color: '#30046B' }}> Stage </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 4,
              borderColor: '#30046B',
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                paddingHorizontal: 4,
                height: 58,
                width: width / 1.25,
              }}>
                  { stag &&  <ControlledPicker
           emptyMessage={"Please select value."}
          // resetOn={[formValues.receiver_id]}
          options={StageList.map((item, index) =>({ value:`${item?.id}`, label: `${item?.name}`}))}
          controllerProps={{ name:"stageId", control, errors, rules: { required: true },}}
          label={' Stage'}
          containerStyle={{borderWidth:0 }}
          style={{height:57,borderWidth:0}} /> }
           
            </View>
          </View>
          {/* {selectedStateValue == '' && Submit && (
            <Text
              style={{
                color: 'red',
                marginBottom: 0,
                fontSize: 15,
                marginTop: 10,
              }}>
              {'State is required'}
            </Text>
          )} */}
        </View>
       
        {/* <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
          <View style={styles.text}>
            <Text style={{ color: '#30046B' }}> Select Lead State </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 4,
              borderColor: '#30046B',
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                paddingHorizontal: 4,
                height: 58,
                width: width / 1.25,
              }}>
              <ControlledPicker
                      // onChange={StageListItem}
           emptyMessage={"Please select value."}
          // resetOn={[formValues.pipeline]}
          options={ GetStatus?.map((item, index) =>({ value:`${item?.status}`, label: `${item?.status}`,})) }
          controllerProps={{ name:"lead_status", control, errors, rules: { required: true }}}
          label={' Lead Status'}
          containerStyle={{borderWidth:0 }}
          style={{height:57,borderWidth:0}}
         /> 
            </View>
          </View>
          {selectedStateValue == '' && Submit && (
            <Text
              style={{
                color: 'red',
                marginBottom: 0,
                fontSize: 15,
                marginTop: 10,
              }}>
              {'State is required'}
            </Text>
          )}
        </View> */}
        <CustomInput
          label={' Description '}
          textInputProps={{ placeholder: 'Write...', keyboardType: 'email-address', autoCapitalize: 'none', }}
          controllerProps={{ name: 'description', control, errors, rules: { required: true, } }}
          bordercolor
          labelbgcolor
        />
        <ButtonInput navigate={handleSubmit(onSubmit)} btnName={'Update'} />
      </ScrollView>
    </View>
  )
}

export default EditLead
const styles = StyleSheet.create({
  text: {

    backgroundColor: 'white',
    zIndex: 1,
    shadowColor: "#30046B",
    position: "absolute",
    top: -12,
    left: 50,

    margin: 3,
  },
}); 

