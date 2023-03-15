import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import { useForm } from 'react-hook-form';
import ButtonInput from '../../Components/ButtonInput';
import { LeadContext } from '../../Providers/LeadProvider';
import { AuthContext } from '../../Providers/AuthProvider';
import useLoadingFn from '../../Hooks/useLoadingFn';
import { Picker } from '@react-native-picker/picker';
import ControlledPicker from '../../Components/ControlledPicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import DatePicker from "../../Components/DatePicker";
const {width, height} = Dimensions.get('window');
import {hp} from '../../Components/Responsive';
const AddLead = ({ navigation, route,type }) => {
  const { API_CALLS, GetCountry, GetStateList, GetAddress,PipelineList,StageList,setAddress ,GetTimeZone} =
    useContext(LeadContext);
    const {locationId} = useContext(AuthContext);

  const getState = useLoadingFn(API_CALLS.getState);
  const addLead = useLoadingFn(API_CALLS.addLead);
  // const getLeadStatus = useLoadingFn(API_CALLS.getLeadStatus);
  const GetStageList = useLoadingFn(API_CALLS.GetStageList);
  const getAddress = useLoadingFn(API_CALLS.getAddress);  

  const { latitude } = useContext(AuthContext);
  const [selectedValue, setValue] = useState('');
  const [Countrylist, setCountryLIst] = useState(GetCountry);
  const [StateList, setStateList] = useState(GetStateList);
  const [selectedCountryValue, setCountryValue] = useState('');
  const [selectedLeadStateValue, setLeadStateValue] = useState('');
  const [selectedStateValue, setStateValue] = useState('');
  const [Submit, setSubmit] = useState(false);
  const [isPhonevalid, setPhonevalid] = useState(false);
  const [Gettype, setType] = useState('')
  const [isDisplayDate, setShow] = useState(false);
  const [startDate, setstartDate] = useState(new Date());
  const [newdate, setnewdate] = useState('')
  const [value, setValuedate] = useState('');

  const [stag, setstag] = useState(false)
  const [state, setstate] = useState(false)
const [MaplatLong, setMaplatLong] = useState({
  latitude:latitude.latitude,
  longitude:latitude.longitude
})
  const [items, setItems] = useState([
    { label: 'In-Active', value: 0 },
    { label: 'Active', value: 1 },
  ]);
  const {
    control,
    
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  useEffect(() => {
   
    if(route.params!==undefined){
      setType('bymap')
      setMaplatLong({
        latitude:route.params.coordinate.latitude,
        longitude:route.params.coordinate.longitude
       })
       
  }
  }, []);

  const onDateSelected = (event, res) => {
      setstartDate(res) 
      setnewdate(moment(res).format("DD-MM-YYYY")) 
    setShow(false)
};
  const pipelineValue = getValues()
  useEffect(() => {
    setStateList(GetStateList);
  }, [GetStateList]);
  useEffect(() => {
    if(pipelineValue.country !==undefined){
    getState({ params: { country_id: pipelineValue.country }, onSuccess: () => {setstate(true) } , screenName: 'state',});
    }
  }, [pipelineValue.country]);
  useEffect(() => { 
    if(pipelineValue.pipeline !== undefined){

      GetStageList({ params: {pipeline_id:pipelineValue.pipeline}, onSuccess: () => {setstag(true) }, screenName: 'stagelist', });

    }
  
    
  }, [pipelineValue.pipeline]);



  const onSubmit = data => { 
    const { Address, country,Email, state,Name, Phone, city, description, dob, zip_code, monetaryValue, stageId, pipeline,companyName,tags,source,time_zone} =
    data;

    setSubmit(true);
    const phoneValue = '+1' + Phone;
    addLead({  
      params: {
        name : Name,
        email:Email,
        phone:phoneValue,
        country:GetAddress ? GetAddress?.country: country,
        state:GetAddress ? GetAddress?.state: state,
        city:GetAddress ? GetAddress?.city: city,
        address:Address,
        status:selectedValue,
        description: description,
        latitude:GetAddress ? GetAddress?.lat:MaplatLong.latitude,
        longitude:GetAddress ? GetAddress?.long:MaplatLong.longitude,
        tag:tags,
        stageId:stageId,
        monetaryValue:monetaryValue,
        companyName:companyName,
        pipeline:pipeline,
        apportunity_status:"open",
        source:source,
        dob: newdate,
        zip_code: GetAddress ? GetAddress?.zip_code:zip_code,
        lead_status:selectedLeadStateValue,
        type:Gettype,
        time_zone:time_zone
      },
      onSuccess: () => {setMaplatLong('')
      setAddress('')
        navigation.navigate('LeadScreen');
      },
      screenName: 'Add Lead',
    });
  };
  const changeValue = itemValue => {
    setValue(itemValue);
  };
  const changeCountryValue = itemValue => {
    setCountryValue(itemValue);
    getState({ params: { country_id: itemValue }, onSuccess: () => { } });
  };
  const changeStateValue = itemValue => {
    setStateValue(itemValue);
  };
  useEffect(() => {
    setStateValue(selectedStateValue);
  }, [GetCountry, GetStateList]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
     <View style={{flexDirection: 'row', marginTop:10, marginLeft: '2%',alignItems:'center'}}>
       <TouchableOpacity onPress={()=>navigation.navigate('LeadStack',{screen:'LeadScreen'})} style={{ width:60 }} >
      <Image source={require('../../Constant/Assests/Images/back.png') } style={{height: 43,  width:  43,  marginTop: '1%',   }} />
    </TouchableOpacity>
    <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',color:'#30046B'}}>{'Add Lead'}</Text>

    </View>
      <ScrollView style={{ flex: 1, marginTop: 15 }}>
        <Text style={{fontSize:18,fontWeight:'bold',color:'#30046B',padding:10,marginLeft:15}}>Contact Info</Text>
        <CustomInput
          label={' Name '}
          textInputProps={{
            placeholder: 'Enter Name',
            keyboardType: 'default',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'Name',
            control,
            errors,
            rules: { required: true },
          }}
          bordercolor
          labelbgcolor
        />

        <CustomInput
          label={' Email '}
          textInputProps={{
            placeholder: 'Enter Email',
            keyboardType: 'email-address',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'Email',
            control,
            errors,
            rules: {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            },
          }}
          bordercolor
          labelbgcolor
        />
        {/* <CustomInput
          label={' Date Of Birth '}
          textInputProps={{
            placeholder: '25-06-1996',
            keyboardType: 'number-pad',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'dob',
            control,
            errors,
            rules: {
              required: true,
              pattern:
                /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/,
            },
          }}
          bordercolor
          labelbgcolor
        /> */}
       { <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
          <View style={styles.text}>
            <Text style={{ color: '#30046B' }}>Date Of Birth</Text>
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
                width: width / 1.26,
                flexDirection:'row',
                justifyContent:'space-between'
              }}>
                 {isDisplayDate && (
            <DateTimePicker
              value={startDate}
              mode={'date'}
              display={'spinner'}
              is24Hour={true}
              onChange={onDateSelected}
            />)}
           
                  {/* <DatePicker
                    start={startDate}
                    setstart={setstartDate}
                    value={value}
                

                    setValue={setValuedate}
                    style={{borderWidth:0,width:300,justifyContent:'space-between',padding:10,height:56}}
                  /> */}
         
            <Text style={{padding:18,fontSize:14,fontWeight:'400',color:'#30046B'}}>{newdate == ''? <Text style={{fontSize:15,color:'grey'}}>21-03-1992</Text>:newdate}</Text>
            <TouchableOpacity style={{justifyContent:'flex-end',alignSelf:'center'}} onPress={() => setShow(true)}>
            <Image
              source={require('../../Constant/Assests/Images/calendermeeting.png')}
              style={{ height: 30, width: 30, marginLeft: 12 }}
            />
          </TouchableOpacity>
            </View>

          </View>
        </View> }
    {GetAddress ? <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
          <View style={styles.text}>
            <Text style={{ color: '#30046B' }}>Postal Code </Text>
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
                width: width / 1.26,
              }}>
            <Text style={{padding:18,fontSize:14,fontWeight:'400',color:'#30046B'}}>{GetAddress?.zip_code}</Text>

            </View>

          </View>
        </View>:
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
        }
        <CustomInput
          maxLength={12}
          Cvalue={setPhonevalid}
          message={'Phone no must contain 10 digits'}
          label={' Phone Number '}
          textInputProps={{
            placeholder: 'Enter Phone',
            keyboardType: 'number-pad',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'Phone',
            control,
            errors,
            rules: { required: true },
          }}
          bordercolor
          labelbgcolor
        />
        {isPhonevalid.length >= 1 && isPhonevalid.length <= 7 && (
          <Text
            style={{
              color: 'red',
              marginBottom: 25,
              fontSize: 15,
              marginTop: -20,
              paddingLeft: 27,
            }}>
            {'Please enter a valid phone number'}
          </Text>
        )}

        <CustomInput
          label={' Address '}
          textInputProps={{
            placeholder: 'Enter Address',
            keyboardType: 'default',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'Address',
            control,
            errors,
            rules: { required: true },
          }}
          bordercolor
          labelbgcolor
        />

        {/* ------------------------------------ */}

        {/* <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
          <View style={styles.text}>
            <Text style={{ color: '#30046B' }}>Address </Text>
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
                width: width / 1.26,
              }}>
            <Text style={{padding:18,fontSize:14,fontWeight:'400',color:'#30046B'}}>{GetAddress?.city}</Text>

            </View>

          </View>
        </View> */}
        {/* --------------------------------------- */}
         <CustomInput
          label={' Tags '}
          textInputProps={{
            placeholder: 'Add Tags',
            keyboardType: 'default',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'tags',
            control,
            errors,
            rules: { required: true },
          }}
          bordercolor
          labelbgcolor
        />
          <CustomInput
          label={' Company Name '}
          textInputProps={{
            placeholder: 'Company Name',
            keyboardType: 'default',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'companyName',
            control,
            errors,
            rules: { required: true },
          }}
          bordercolor
          labelbgcolor
        />
        
{/* ------------------------------------------------------------------- */}
{GetAddress ? <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 14,
          }}>
          <View style={{ paddingHorizontal: 25 }}>
            <View style={styles.text}>
              <Text style={{ color: '#30046B' }}>  Country </Text>
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
                  width: width / 2.8,
                }}>
                {/* const [Countrylist,setCountryLIst]= useState(GetCountry) */}
             
                <Text style={{padding:18,fontSize:14,fontWeight:'400',color:'#30046B'}}>{GetAddress?.country}</Text>

                {/* selectedCountryValue */}
              </View>
            </View>
            {/* {selectedCountryValue == '' && Submit && (
              <Text
                style={{
                  color: 'red',
                  marginBottom: 0,
                  fontSize: 15,
                  marginTop: 10,
                }}>
                {'Country is required'}
              </Text>
            )} */}
          </View>

          <View style={{ paddingHorizontal: 25 }}>
            <View style={styles.text}>
              <Text style={{ color: '#30046B' }}>  State </Text>
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
                  width: width / 2.7,
                }}>
                        <Text style={{padding:18,fontSize:14,fontWeight:'400',color:'#30046B'}}>{GetAddress?.state}</Text>

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
        </View> :
       <View
       style={{
         flexDirection: 'row',
         justifyContent: 'space-between',
         marginBottom: 14,
       }}>
       <View style={{ paddingHorizontal: 25 }}>
         <View style={styles.text}>
           <Text style={{ color: '#30046B' }}> Select Country </Text>
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
               paddingHorizontal: 1      ,
               height: 58,
               width: width / 2.7,
             }}>
             {/* const [Countrylist,setCountryLIst]= useState(GetCountry) */}
             {/* <Picker
               style={{ marginBottom: 20 }}
               selectedValue={selectedCountryValue}
               onValueChange={(itemValue, s) => {
                 Swapindex(Countrylist, setCountryLIst, s);
                 changeCountryValue(itemValue);
               }}>
               <Picker.Item
                 key={200}
                 label={'_Select Country_'}
                 value={''}
               />
               {Countrylist?.length > 0
                 ? Countrylist?.map((item, index) => {
                   return (
                     <Picker.Item
                       key={index}
                       label={`${item?.name}`}
                       value={`${item?.id}`}
                     />
                   );
                 })
                 : null}
             </Picker> */}
               <ControlledPicker
                      // onChange={StageListItem}
           emptyMessage={"Please select value."}
          // resetOn={handleSubmit(statepipeline)}
           options={ Countrylist?.map((item, index) =>({ value:`${item?.name}`, label: `${item?.name}`,})) }
          controllerProps={{ name:"country", control, errors, rules: { required: true }}}
          label={' Country'}
          containerStyle={{borderWidth:0 }}
          style={{height:57,borderWidth:0}}
         />
             {/* selectedCountryValue */}
           </View>
         </View>
         {/* {selectedCountryValue == '' && Submit && (
           <Text
             style={{
               color: 'red',
               marginBottom: 0,
               fontSize: 15,
               marginTop: 10,
             }}>
             {'Country is required'}
           </Text>
         )} */}
       </View>

       <View style={{ paddingHorizontal: 25 }}>
         <View style={styles.text}>
           <Text style={{ color: '#30046B' }}> Select State </Text>
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
               paddingHorizontal: 1,
               height: 58,
               width: width / 2.7,
             }}>
            
              <ControlledPicker
                      // onChange={StageListItem}
           emptyMessage={"Please select value."}
          // resetOn={handleSubmit(statepipeline)}
           options={state && StateList?.map((item, index) =>({ value:`${item?.name}`, label: `${item?.name}`,})) }
          controllerProps={{ name:"state", control, errors, rules: { required: true }}}
          label={' State'}
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
             {'State is required'}
           </Text>
         )} */}
       </View>
     </View> }
{/* ---------------------------------------- */}
        

{GetAddress ?  <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
          <View style={styles.text}>
            <Text style={{ color: '#30046B' }}>City </Text>
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
                width: width / 1.26,
              }}>
            <Text style={{padding:18,fontSize:14,fontWeight:'400',color:'#30046B'}}>{GetAddress?.city}</Text>

            </View>

          </View>
        </View> :
        <CustomInput
        label={' City '}
        textInputProps={{
          placeholder: 'Enter City',
          keyboardType: 'default',
          autoCapitalize: 'none',
        }}
        controllerProps={{
          name: 'city',
          control,
          errors,
          rules: { required: true },
        }}
        bordercolor
        labelbgcolor
      /> }


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
                      // onChange={StageListItem}
           emptyMessage={"Please select value."}
          // resetOn={handleSubmit(statepipeline)}
           options={ GetTimeZone?.timezones?.map((item, index) =>({ value:`${item}`, label: `${item}`,})) }
          controllerProps={{ name:"time_zone", control, errors, rules: { required: true }}}
          label={' Select Time-Zone'}
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
              {'State is required'}
            </Text>
          )} */}
        </View>
        <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
          <View style={styles.text}>
            <Text style={{ color: '#30046B' }}> Select Status </Text>
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
                width: width / 1.26,
              }}>
              <Picker
                style={{ marginBottom: 10 }}
                selectedValue={selectedValue}
                onValueChange={itemValue => changeValue(itemValue)}>
                {items?.length > 0
                  ? items?.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={`${item?.label}`}
                        value={`${item?.value}`}
                      />
                    );
                  })
                  : null}
              </Picker>
            </View>
          </View>
        </View>

        <Text style={{fontSize:18,fontWeight:'bold',color:'#30046B',padding:10,marginLeft:15,marginBottom:10}}>Opportunity Info</Text>

        <CustomInput
          label={' Source '}
          textInputProps={{
            placeholder: 'Source',
            keyboardType: 'default',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'source',
            control,
            errors,
            rules: { required: true },
          }}
          bordercolor
          labelbgcolor
        />
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
                      // onChange={StageListItem}
           emptyMessage={"Please select value."}
          // resetOn={handleSubmit(statepipeline)}
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
              {'State is required'}
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
                     <ControlledPicker
           emptyMessage={"Please select value."}
          // resetOn={[formValues.receiver_id]}
           options={ stag && StageList.map((item, index) =>({ value:`${item?.id}`, label: `${item?.name}`}))}
          controllerProps={{ name:"stageId", control, errors, rules: { required: true },}}
          label={' Stage'}
          containerStyle={{borderWidth:0 }}
          style={{height:57,borderWidth:0}} /> 
           
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
            <Text style={{ color: '#30046B' }}> Lead State </Text>
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
                <Picker
                 label={'_Select Country_'}
                style={{ marginBottom: 10 }}
                selectedValue={selectedLeadStateValue}
                onValueChange={itemValue =>   setLeadStateValue(itemValue)}>
                {GetStatus?.length > 0
                  ? GetStatus?.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={`${item?.status}`}
                        value={`${item?.status}`}
                      />
                    );
                  })
                  : null}
              </Picker>
        
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
        {/* <CustomInput
          label={' Opportunity Source '}
          textInputProps={{
            placeholder: ' Opportunity Source ',
            keyboardType: 'default',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: ' Opportunity Source ',
            control,
            errors,
            rules: { required: true },
          }}
          bordercolor
          labelbgcolor
        /> */}
        <CustomInput
          label={' Description '}
          textInputProps={{
            placeholder: 'Write...',
            keyboardType: 'default',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'description',
            control,
            errors,
            rules: { required: true },
          }}
          bordercolor
          labelbgcolor
        />
        <ButtonInput navigate={handleSubmit(onSubmit)} btnName={'Save'} />
      </ScrollView>
    </View>
  );
};

export default AddLead;
const styles = StyleSheet.create({
  text: {
    backgroundColor: 'white',
    zIndex: 1,
    shadowColor: '#30046B',
    position: 'absolute',
    top: -11,
    left: 50,
    margin: 2,
  },
});
       