

  import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
  const { width, height } = Dimensions.get('window');


  import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
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
import { white } from 'react-native-paper/lib/typescript/styles/colors';


function Generalinfo(navigation, route,type){
    const { API_CALLS, GetCountry, GetStateList, GetStatus } =
    useContext(LeadContext);
  const getState = useLoadingFn(API_CALLS.getState);
  const addLead = useLoadingFn(API_CALLS.addLead);
  const getLeadStatus = useLoadingFn(API_CALLS.getLeadStatus);

  const { latitude } = useContext(AuthContext);
  const [selectedValue, setValue] = useState('');
  const [Countrylist, setCountryLIst] = useState(GetCountry);
  const [StateList, setStateList] = useState(GetStateList);
  const [selectedCountryValue, setCountryValue] = useState('');
  const [selectedLeadStateValue, setLeadStateValue] = useState('');
  const [selectedStateValue, setStateValue] = useState('');
  const [Submit, setSubmit] = useState(false);
  const [isPhonevalid, setPhonevalid] = useState(false);
const [MaplatLong, setMaplatLong] = useState()
  const [items, setItems] = useState([
    { label: 'In-Active', value: 0 },
    { label: 'Active', value: 1 },
  ]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  useEffect(() => {
   setMaplatLong(route.params)
  }, []);
  useEffect(() => {
    setStateList(GetStateList);
  }, [GetStateList]);
  useEffect(() => {
    getLeadStatus({ params: {}, onSuccess: () => { } });
  }, []);
  // console.log(GetCountry[0],'GetCountryGetCountryGetCountry')

  const onSubmit = data => {
    const { Address, Email, Name, Phone, city, description, dob, zip_code } =
      data;
    setSubmit(true);
    const phoneValue = '+1' + Phone;
    addLead({
      params: {
        name: Name,
        email: Email,
        phone: phoneValue,
        country: selectedCountryValue,
        state: selectedStateValue,
        city: city,
        address: Address,
        status: selectedValue,
        lead_status: selectedLeadStateValue,
        latitude: MaplatLong !==null? MaplatLong.coordinate.latitude: latitude.latitude,
        longitude: MaplatLong !==null? MaplatLong.coordinate.longitude:latitude.longitude,
        description: description,
        dob: dob,
        zip_code: zip_code,
      },
      onSuccess: () => {
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
  console.log();
  const Swapindex = (value, state, index) => {
    let a = [...value];

    let copiendindex = a[0];
    a[0] = a[index];
    a[index] = copiendindex;
    state(a);
  };
    return(
        <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1, marginTop: 15 }}>
        <CustomInput
          label={' Name '}
          textInputProps={{
            placeholder: 'Enter Name',
            keyboardType: 'email-address',
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
        <CustomInput
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
            keyboardType: 'email-address',
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
                  paddingHorizontal: 4,
                  height: 58,
                  width: width / 2.9,
                }}>
                {/* const [Countrylist,setCountryLIst]= useState(GetCountry) */}
                <Picker
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
                </Picker>

                {/* selectedCountryValue */}
              </View>
            </View>
            {selectedCountryValue == '' && Submit && (
              <Text
                style={{
                  color: 'red',
                  marginBottom: 0,
                  fontSize: 15,
                  marginTop: 10,
                }}>
                {'Country is required'}
              </Text>
            )}
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
                  paddingHorizontal: 4,
                  height: 58,
                  width: width / 2.9,
                }}>
                <Picker
                  style={{ marginBottom: 20 }}
                  selectedValue={selectedStateValue}
                  onValueChange={(itemValue, s) => {
                    Swapindex(StateList, setStateList, s);

                    changeStateValue(itemValue);
                  }}>
                  <Picker.Item key={200} label={'_Select State_'} value={''} />
                  {StateList?.length > 0
                    ? StateList?.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={`${item?.name}`}
                          value={`${item?.id}`}
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
          </View>
        </View>
        <CustomInput
          label={' City '}
          textInputProps={{
            placeholder: 'Enter City',
            keyboardType: 'email-address',
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
        />
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
        <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
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
              {/* <Picker
                style={{ marginBottom: 20 }}
                selectedValue={selectedLeadStateValue}
                onValueChange={(itemValue, s) => {
                  Swapindex(StateList, setStateList, s);

                  setLeadStateValue(itemValue);
                }}>
                <Picker.Item
                  key={200}
                  label={'_Select Lead State_'}
                  value={''}
                />
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
              </Picker> */}
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
        </View>
        <CustomInput
          label={' Description '}
          textInputProps={{
            placeholder: 'Write...',
            keyboardType: 'email-address',
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
    )
    }


    
function Additionalinfo(){
    return(
        <View>
            <Text>
            Additionalinfo
            </Text>
        </View>
    )
    }

    const Tab = createMaterialTopTabNavigator();

  const Toptab = ({ navigation, route,type }) => {
    
//----------------------------------------------------------------------
// function Contact(){
//     return(
//         <View style={{ flex: 1, backgroundColor: 'white' }}>
//         <View
//           style={{
//             width: '100%',
//             flexDirection: 'row',
//             marginTop: 10,
//             padding: 10,
//             marginLeft: '2%',
//             height: '10%',
//             justifyContent: 'space-between',
//           }}>
//           <TouchableOpacity
//             onPress={() =>
//               route.params === 1
//                 ? navigation.navigate('MapStack', { screen: 'MapScreen' })
//                 : navigation.navigate('LeadScreen')
//             }>
//             <Image
//               source={require('../../Constant/Assests/Images/back.png')}
//               style={{ height: 40, width: 40, marginTop: '1%' }}
//             />
//           </TouchableOpacity>
//           <Toptab/>
//         </View>
//         <ScrollView style={{ flex: 1, marginTop: 15 }}>
//           <CustomInput
//             label={' Name '}
//             textInputProps={{
//               placeholder: 'Enter Name',
//               keyboardType: 'email-address',
//               autoCapitalize: 'none',
//             }}
//             controllerProps={{
//               name: 'Name',
//               control,
//               errors,
//               rules: { required: true },
//             }}
//             bordercolor
//             labelbgcolor
//           />
    
//           <CustomInput
//             label={' Email '}
//             textInputProps={{
//               placeholder: 'Enter Email',
//               keyboardType: 'email-address',
//               autoCapitalize: 'none',
//             }}
//             controllerProps={{
//               name: 'Email',
//               control,
//               errors,
//               rules: {
//                 required: true,
//                 pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//               },
//             }}
//             bordercolor
//             labelbgcolor
//           />
//           <CustomInput
//             label={' Date Of Birth '}
//             textInputProps={{
//               placeholder: '25-06-1996',
//               keyboardType: 'number-pad',
//               autoCapitalize: 'none',
//             }}
//             controllerProps={{
//               name: 'dob',
//               control,
//               errors,
//               rules: {
//                 required: true,
//                 pattern:
//                   /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/,
//               },
//             }}
//             bordercolor
//             labelbgcolor
//           />
//           <CustomInput
//             label={' Postal Code '}
//             textInputProps={{
//               placeholder: '35061',
//               keyboardType: 'number-pad',
//               autoCapitalize: 'none',
//             }}
//             controllerProps={{
//               name: 'zip_code',
//               control,
//               errors,
//               rules: {
//                 required: true,
//               },
//             }}
//             bordercolor
//             labelbgcolor
//           />
    
//           <CustomInput
//             maxLength={12}
//             Cvalue={setPhonevalid}
//             message={'Phone no must contain 10 digits'}
//             label={' Phone Number '}
//             textInputProps={{
//               placeholder: 'Enter Phone',
//               keyboardType: 'number-pad',
//               autoCapitalize: 'none',
//             }}
//             controllerProps={{
//               name: 'Phone',
//               control,
//               errors,
//               rules: { required: true },
//             }}
//             bordercolor
//             labelbgcolor
//           />
//           {isPhonevalid.length >= 1 && isPhonevalid.length <= 7 && (
//             <Text
//               style={{
//                 color: 'red',
//                 marginBottom: 25,
//                 fontSize: 15,
//                 marginTop: -20,
//                 paddingLeft: 27,
//               }}>
//               {'Please enter a valid phone number'}
//             </Text>
//           )}
    
//           <CustomInput
//             label={' Address '}
//             textInputProps={{
//               placeholder: 'Enter Address',
//               keyboardType: 'email-address',
//               autoCapitalize: 'none',
//             }}
//             controllerProps={{
//               name: 'Address',
//               control,
//               errors,
//               rules: { required: true },
//             }}
//             bordercolor
//             labelbgcolor
//           />
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginBottom: 14,
//             }}>
//             <View style={{ paddingHorizontal: 25 }}>
//               <View style={styles.text}>
//                 <Text style={{ color: '#30046B' }}> Select Country </Text>
//               </View>
//               <View
//                 style={{
//                   borderWidth: 1,
//                   borderRadius: 4,
//                   borderColor: '#30046B',
//                   flexDirection: 'row',
//                 }}>
//                 <View
//                   style={{
//                     backgroundColor: 'white',
//                     borderRadius: 8,
//                     paddingHorizontal: 4,
//                     height: 58,
//                     width: width / 2.9,
//                   }}>
//                   {/* const [Countrylist,setCountryLIst]= useState(GetCountry) */}
//                   <Picker
//                     style={{ marginBottom: 20 }}
//                     selectedValue={selectedCountryValue}
//                     onValueChange={(itemValue, s) => {
//                       Swapindex(Countrylist, setCountryLIst, s);
//                       changeCountryValue(itemValue);
//                     }}>
//                     <Picker.Item
//                       key={200}
//                       label={'_Select Country_'}
//                       value={''}
//                     />
//                     {Countrylist?.length > 0
//                       ? Countrylist?.map((item, index) => {
//                         return (
//                           <Picker.Item
//                             key={index}
//                             label={`${item?.name}`}
//                             value={`${item?.id}`}
//                           />
//                         );
//                       })
//                       : null}
//                   </Picker>
    
//                   {/* selectedCountryValue */}
//                 </View>
//               </View>
//               {selectedCountryValue == '' && Submit && (
//                 <Text
//                   style={{
//                     color: 'red',
//                     marginBottom: 0,
//                     fontSize: 15,
//                     marginTop: 10,
//                   }}>
//                   {'Country is required'}
//                 </Text>
//               )}
//             </View>
    
//             <View style={{ paddingHorizontal: 25 }}>
//               <View style={styles.text}>
//                 <Text style={{ color: '#30046B' }}> Select State </Text>
//               </View>
//               <View
//                 style={{
//                   borderWidth: 1,
//                   borderRadius: 4,
//                   borderColor: '#30046B',
//                   flexDirection: 'row',
//                 }}>
//                 <View
//                   style={{
//                     backgroundColor: 'white',
//                     borderRadius: 8,
//                     paddingHorizontal: 4,
//                     height: 58,
//                     width: width / 2.9,
//                   }}>
//                   <Picker
//                     style={{ marginBottom: 20 }}
//                     selectedValue={selectedStateValue}
//                     onValueChange={(itemValue, s) => {
//                       Swapindex(StateList, setStateList, s);
    
//                       changeStateValue(itemValue);
//                     }}>
//                     <Picker.Item key={200} label={'_Select State_'} value={''} />
//                     {StateList?.length > 0
//                       ? StateList?.map((item, index) => {
//                         return (
//                           <Picker.Item
//                             key={index}
//                             label={`${item?.name}`}
//                             value={`${item?.id}`}
//                           />
//                         );
//                       })
//                       : null}
//                   </Picker>
//                 </View>
//               </View>
//               {selectedStateValue == '' && Submit && (
//                 <Text
//                   style={{
//                     color: 'red',
//                     marginBottom: 0,
//                     fontSize: 15,
//                     marginTop: 10,
//                   }}>
//                   {'State is required'}
//                 </Text>
//               )}
//             </View>
//           </View>
//           <CustomInput
//             label={' City '}
//             textInputProps={{
//               placeholder: 'Enter City',
//               keyboardType: 'email-address',
//               autoCapitalize: 'none',
//             }}
//             controllerProps={{
//               name: 'city',
//               control,
//               errors,
//               rules: { required: true },
//             }}
//             bordercolor
//             labelbgcolor
//           />
//           <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
//             <View style={styles.text}>
//               <Text style={{ color: '#30046B' }}> Select Status </Text>
//             </View>
//             <View
//               style={{
//                 borderWidth: 1,
//                 borderRadius: 4,
//                 borderColor: '#30046B',
//                 flexDirection: 'row',
//               }}>
//               <View
//                 style={{
//                   backgroundColor: 'white',
//                   borderRadius: 8,
//                   paddingHorizontal: 4,
//                   height: 58,
//                   width: width / 1.26,
//                 }}>
//                 <Picker
//                   style={{ marginBottom: 10 }}
//                   selectedValue={selectedValue}
//                   onValueChange={itemValue => changeValue(itemValue)}>
//                   {items?.length > 0
//                     ? items?.map((item, index) => {
//                       return (
//                         <Picker.Item
//                           key={index}
//                           label={`${item?.label}`}
//                           value={`${item?.value}`}
//                         />
//                       );
//                     })
//                     : null}
//                 </Picker>
//               </View>
//             </View>
//           </View>
//           <View style={{ paddingHorizontal: 25, marginBottom: 20 }}>
//             <View style={styles.text}>
//               <Text style={{ color: '#30046B' }}> Select Lead State </Text>
//             </View>
//             <View
//               style={{
//                 borderWidth: 1,
//                 borderRadius: 4,
//                 borderColor: '#30046B',
//                 flexDirection: 'row',
//               }}>
//               <View
//                 style={{
//                   backgroundColor: 'white',
//                   borderRadius: 8,
//                   paddingHorizontal: 4,
//                   height: 58,
//                   width: width / 1.25,
//                 }}>
//                   <Picker
//                    label={'_Select Country_'}
//                   style={{ marginBottom: 10 }}
//                   selectedValue={selectedLeadStateValue}
//                   onValueChange={itemValue =>   setLeadStateValue(itemValue)}>
//                   {GetStatus?.length > 0
//                     ? GetStatus?.map((item, index) => {
//                       return (
//                         <Picker.Item
//                           key={index}
//                           label={`${item?.status}`}
//                           value={`${item?.status}`}
//                         />
//                       );
//                     })
//                     : null}
//                 </Picker>
//                 {/* <Picker
//                   style={{ marginBottom: 20 }}
//                   selectedValue={selectedLeadStateValue}
//                   onValueChange={(itemValue, s) => {
//                     Swapindex(StateList, setStateList, s);
    
//                     setLeadStateValue(itemValue);
//                   }}>
//                   <Picker.Item
//                     key={200}
//                     label={'_Select Lead State_'}
//                     value={''}
//                   />
//                   {GetStatus?.length > 0
//                     ? GetStatus?.map((item, index) => {
//                       return (
//                         <Picker.Item
//                           key={index}
//                           label={`${item?.status}`}
//                           value={`${item?.status}`}
//                         />
//                       );
//                     })
//                     : null}
//                 </Picker> */}
//               </View>
//             </View>
//             {selectedStateValue == '' && Submit && (
//               <Text
//                 style={{
//                   color: 'red',
//                   marginBottom: 0,
//                   fontSize: 15,
//                   marginTop: 10,
//                 }}>
//                 {'State is required'}
//               </Text>
//             )}
//           </View>
//           <CustomInput
//             label={' Description '}
//             textInputProps={{
//               placeholder: 'Write...',
//               keyboardType: 'email-address',
//               autoCapitalize: 'none',
//             }}
//             controllerProps={{
//               name: 'description',
//               control,
//               errors,
//               rules: { required: true },
//             }}
//             bordercolor
//             labelbgcolor
//           />
//           <ButtonInput navigate={handleSubmit(onSubmit)} btnName={'Save'} />
//         </ScrollView>
//       </View>
//     )
//     }

        return (
          <Tab.Navigator 
          initialRouteName='Contact' screenOptions={{
            tabBarShowLabel: true,
            tabBarStyle: { height: 60, width: '100%', backgroundColor:'#30046B',},
            tabBarHideOnKeyboard: true,
            tabBarLabelStyle:{color:'white',fontWeight:'bold',fontSize:16}
          }}
          >
            {/* <Tab.Screen name="Contact" component={Contact} options={{tabBarLabel:'Contact'}} /> */}
            <Tab.Screen name="Generalinfo" component={Generalinfo} options={{tabBarLabel:'Contact'}}/>
            <Tab.Screen name="AdditionalInfo" component={Additionalinfo} options={{tabBarLabel:'Additional Info'}} />
          </Tab.Navigator>
        );
      }
      export default Toptab
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