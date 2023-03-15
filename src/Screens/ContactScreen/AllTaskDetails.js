import {
  Dimensions,
  FlatList,
  Text,
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  StatusBar,
  KeyboardAwareScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Header from '../../Components/Header';
import useLoadingFn from '../../Hooks/useLoadingFn';
import {LeadContext} from '../../Providers/LeadProvider';
import ButtonInput from '../../Components/ButtonInput';
import CustomInput from '../../Components/CustomInput';
import {useForm} from 'react-hook-form';
import ToggleSwitch from 'toggle-switch-react-native';
import {image_base_url} from '../../Providers/Index';
import ControlledPicker from '../../Components/ControlledPicker'
import {hp} from '../../Components/Responsive';
import { Picker } from '@react-native-picker/picker';

const {width, height} = Dimensions.get('window');
const AllTaskDetails = ({navigation, item}) => {
  const {
    API_CALLS,
    GetContactList,
    GetDndStatusChange,
    GetNoteStatus,
    GetLeadId,
    GetTaskList,
    TaskStatus,
    color, 
    setColor
  } = useContext(LeadContext);
  const [ismodalVisibleNotes, setismodalVisibleNotes] = useState(false);
  const [ismodalVisibleStatus, setismodalVisibleStatus] = useState(false);

  const {control, handleSubmit, formState: {errors}, reset, watch, } = useForm();
  const [isOn, setisOn] = useState(
    GetDndStatusChange?.status === 1 ? true : false,
  );
  const [selectedStateValue, setStateValue] = useState('');
  const [NoteID, setNoteID] = useState('');
  const [highlighted, sethighlighted] = useState(GetLeadId?.data?.id);
  const getDndStatus = useLoadingFn(API_CALLS.getDndStatus);
  const getAddNote = useLoadingFn(API_CALLS.getAddNote);
  const getAddStatus = useLoadingFn(API_CALLS.getAddStatus);

  const getNotesHistory = useLoadingFn(API_CALLS.getNotesHistory);

  const getLeadEditId = useLoadingFn(API_CALLS.getLeadEditId);
  useEffect(() => {
    setisOn(GetDndStatusChange?.status === 1 ? true : false);
  }, [GetDndStatusChange, GetContactList?.data]);
  useEffect(() => {}, [GetContactList, GetLeadId, TaskStatus]);
  useEffect(() => {}, [TaskStatus]);

  const noteHistory = value => {
    getNotesHistory({
      params: {lead_id: value},
      onSuccess: () => {
        setNoteID(value);
        navigation.navigate('NotesHistory', {params: true});
      },
    });
  };
  const onToggle = value => {
    getDndStatus({
      params: {status: value === 1 ? true : false, id: GetLeadId?.data?.id},
      onSuccess: () => {
        setisOn(value);
      },
      screenName: 'Dnd',
    });
  };
  const onEditContact = (value, item) => {
    getLeadEditId({
      params: {id: value},
      onSuccess: () => {
        sethighlighted(value);
      },
      screenName: 'Lead',
    });
  };

  const changeStateValue = itemValue => {
    setStateValue(itemValue);
  };
  const onSubmit = data => {
    getAddStatus({
      params: {
        ...data,
        task_status: selectedStateValue,
        id: GetLeadId?.data?.id,
      },
      onSuccess: () => {
        setismodalVisibleStatus(false);
        getLeadEditId({
          params: {id: highlighted},
          onSuccess: () => {},
          screenName: 'Lead',
        });
        navigation.navigate('AllTaskDetails');
      },
      screenName: 'AllTaskDetails',
    });
  };
  const onSubmitNotes = data => {
    getAddNote({
      params: {...data, id: GetLeadId?.data?.id},
      onSuccess: () => {
        setismodalVisibleNotes(false);
        navigation.navigate('AllTaskDetails');
      },
      screenName: 'AllTaskDetails',
    });
  };

 


  const renderItem = ({item, index}) => {
    return (
      <View
        elevation={10}
        key={index}
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          borderRadius: 12,
          marginLeft: 12,
          shadowColor: '#171717',
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 3,
          marginBottom: highlighted == item.id ? 2 : 17,
        }}>
        <TouchableOpacity onPress={() => onEditContact(item.id)}>
          <Image
            source={{uri: image_base_url + item?.user?.image}}
            style={{
              height: highlighted == item.id ? height * 0.18 : height * 0.16,
              width: width * 0.4,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 3,
              paddingHorizontal: 12,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#203152',
                fontWeight: '500',
                marginTop: 10,
              }}>
              {item?.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // GetLeadId?.data?.task_status == 'In-progress'
  // ? '#20EB27'
  // : GetLeadId?.data?.task_status == 'completed'
  // ? '#30046B'
  // : GetLeadId?.data?.task_status == 'submitted'
  // ? 'grey'
  // : 'transparent',

  let statusvalue =GetLeadId?.data?.task_status||"In-progress"

  

  useEffect(() => {
    if (GetLeadId?.data?.task_status == 'In-progress') {
      setColor('#20EB27')
    } else if (GetLeadId?.data?.task_status == 'completed') {
      setColor('#30046B')
    } else if (GetLeadId?.data?.task_status == 'submitted') {
      setColor('grey')
    }else{
      setColor('#20EB27')
    }
  }, [navigation]);






  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        source={require('../../Constant/Assests/Images/mapbg.png')}
        style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginTop: 10,
            padding: 10,
            marginLeft: '2%',
            height: '10%',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ContactScreen')}>
            <Image
              source={require('../../Constant/Assests/Images/back.png')}
              style={{height: 43, width: 43, marginTop: '1%'}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: 35,
          }}>
          <View style={{height: hp(26), paddingHorizontal: 3}}>
            <FlatList
              data={GetTaskList?.data}
              renderItem={renderItem}
              keyExtractor={item => {
                item.id;
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View
            style={{
              width: width,
              backgroundColor: 'white',
              top: hp(3),
              right: 0,
              borderTopLeftRadius: 44,
              borderTopRightRadius: 44,
              padding: 20,
              marginBottom: 110,
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{height: hp(48)}}>
              <View
                style={{width: width * 0.89, justifyContent: 'space-between'}}>
                <View
                  style={{
                    width: width * 0.89,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 2,
                    }}>
                    <Image
                      source={require('../../Constant/Assests/Images/namecontact.png')}
                      style={{height: 40, width: 40}}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#9A9A9A',
                          marginLeft: 6,
                          marginTop: 5,
                          fontWeight: '500',
                        }}>
                        Name
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#4E4E4E',
                          marginLeft: 6,
                          marginTop: 5,
                          fontWeight: '500',
                        }}>
                        {GetLeadId?.data?.name}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: width * 0.89,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 2,
                    }}>
                    <Image
                      source={require('../../Constant/Assests/Images/mailaddress.png')}
                      style={{height: 40, width: 40}}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#9A9A9A',
                          marginLeft: 6,
                          marginTop: 5,
                          fontWeight: '500',
                        }}>
                        Email
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#4E4E4E',
                          marginLeft: 6,
                          marginTop: 5,
                          fontWeight: '500',
                        }}>
                        {GetLeadId?.data?.email}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: width * 0.89,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 2,
                    }}>
                    <Image
                      source={require('../../Constant/Assests/Images/callcontact.png')}
                      style={{height: 40, width: 40}}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#9A9A9A',
                          marginLeft: 6,
                          marginTop: 5,
                          fontWeight: '500',
                        }}>
                        Phone Number
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#4E4E4E',
                          marginLeft: 6,
                          marginTop: 5,
                          fontWeight: '500',
                        }}>
                        {GetLeadId?.data?.phone}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: width * 0.89,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 2,
                    }}>
                    <Image
                      source={require('../../Constant/Assests/Images/dndcall.png')}
                      style={{height: 40, width: 40}}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#9A9A9A',
                          marginLeft: 6,
                          fontWeight: '500',
                        }}>
                        DND
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{alignItems: 'flex-end', justifyContent: 'center'}}>
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
                <View
                  style={{
                    width: width * 0.89,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 2,
                    }}>
                    <Image
                      source={require('../../Constant/Assests/Images/calendarcontact.png')}
                      style={{height: 40, width: 40}}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#9A9A9A',
                          marginLeft: 6,
                          marginTop: 5,
                          fontWeight: '500',
                        }}>
                        Date Of Birth
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#4E4E4E',
                          marginLeft: 6,
                          marginTop: 5,
                          fontWeight: '500',
                        }}>
                        {GetLeadId?.data?.dob}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* <View
                  style={{
                    width: width * 0.89,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 2,
                    }}>
                    <Image
                      source={require('../../Constant/Assests/Images/friends.png')}
                      style={{height: 40, width: 40}}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#9A9A9A',
                          marginLeft: 6,
                          marginTop: 5,
                          fontWeight: '500',
                        }}>
                        Contact source
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#4E4E4E',
                          marginLeft: 6,
                          marginTop: 5,
                          fontWeight: '500',
                        }}>
                        {GetLeadId?.data?.contact_source}
                      </Text>
                    </View>
                  </View>
                </View> */}
                {/* <View
                  style={{
                    width: width * 0.89,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 2,
                    }}>
                    <Image
                      source={require('../../Constant/Assests/Images/note.png')}
                      style={{height: 40, width: 40}}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#9A9A9A',
                          marginLeft: 6,
                          fontWeight: '500',
                        }}>
                        Notes
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => setismodalVisibleNotes(true)}
                    style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Image
                      source={require('../../Constant/Assests/Images/noteedit.png')}
                      style={{height: 29, width: 29}}
                    />
                  </TouchableOpacity>
                </View> */}
                {/* <View
                  style={{
                    width: width * 0.89,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 6,
                    }}>
                    {GetLeadId?.data?.lead_status == 'Processing' && (
                      <Image
                        source={require('../../Constant/Assests/Images/processingstatus.png')}
                        style={{height: 40, width: 40}}
                      />
                    )}
                    {GetLeadId?.data?.lead_status == 'Pending' && (
                      <Image
                        source={require('../../Constant/Assests/Images/pendingstatus.png')}
                        style={{height: 40, width: 40}}
                      />
                    )}
                    {GetLeadId?.data?.lead_status == 'Come back' && (
                      <Image
                        source={require('../../Constant/Assests/Images/comeback.png')}
                        style={{height: 40, width: 40}}
                      />
                    )}
                    {GetLeadId?.data?.lead_status == 'Not Interested' && (
                      <Image
                        source={require('../../Constant/Assests/Images/notintrested.png')}
                        style={{height: 40, width: 40}}
                      />
                    )}
                    {GetLeadId?.data?.lead_status == 'Submitted' && (
                      <Image
                        source={require('../../Constant/Assests/Images/submittedstatus.png')}
                        style={{height: 40, width: 40}}
                      />
                    )}
                    {GetLeadId?.data?.lead_status == 'No Soliciting' && (
                      <Image
                        source={require('../../Constant/Assests/Images/nosoliciting.png')}
                        style={{height: 40, width: 40}}
                      />
                    )}
                    {GetLeadId?.data?.lead_status == 'No home' && (
                      <Image
                        source={require('../../Constant/Assests/Images/nosoliciting.png')}
                        style={{height: 40, width: 40}}
                      />
                    )}
                    {GetLeadId?.data?.lead_status == 'DNC' && (
                      <Image
                        source={require('../../Constant/Assests/Images/dncstatus.png')}
                        style={{height: 40, width: 40}}
                      />
                    )}
                    {GetLeadId?.data?.lead_status == "Can't Process" && (
                      <Image
                        source={require("../../Constant/Assests/Images/can'tprocess.png")}
                        style={{height: 40, width: 40}}
                      />
                    )}
                    {GetLeadId?.data?.lead_status == 'CRM Payable' && (
                      <Image
                        source={require('../../Constant/Assests/Images/pendingstatus.png')}
                        style={{height: 40, width: 40}}
                      />
                    )}
                    {GetLeadId?.data?.lead_status == 'Issue/Error' && (
                      <Image
                        source={require('../../Constant/Assests/Images/errorstatus.png')}
                        style={{height: 40, width: 40}}
                      />
                    )}

                    <View>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#9A9A9A',
                          marginLeft: 6,
                          fontWeight: '500',
                        }}>
                        {GetLeadId?.data?.lead_status}
                      </Text>
                    </View>
                  </View>
                </View> */}

                <View
                  style={{
                    width: width * 0.89,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 2,
                    }}>
                    <Image
                      source={require('../../Constant/Assests/Images/statusicon.png')}
                      style={{height: 40, width: 40}}
                    />
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor:GetLeadId?.data?.task_status == 'In-progress' ? '#20EB27' : '#30046B',
                          paddingHorizontal: 15,
                          borderRadius: 20,
                          padding: 4,
                          marginLeft: 6,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#fff',
                            marginLeft: 6,
                            fontWeight: '500',
                          }}>
                     
                          {GetLeadId?.data?.task_status == null? 'Empty Status':GetLeadId?.data?.task_status}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => setismodalVisibleStatus(true)}
                    style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Image
                      source={require('../../Constant/Assests/Images/noteedit.png')}
                      style={{height: 29, width: 29}}
                    />
                  </TouchableOpacity>
                </View>
                {/* ============================== */}

                {/* <TouchableOpacity
                  onPress={() => {
                    noteHistory(GetLeadId?.data?.id);
                  }}
                  style={{marginTop: 10, alignSelf: 'center'}}>
                  <View
                    style={{
                      height: 40,
                      width: 155,
                      backgroundColor: '#BFAB88',
                      borderRadius: 22,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#fff',
                        textAlign: 'center',
                      }}>
                      Notes History
                    </Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>

      <Modal
        animationType="default"
        transparent={true}
        visible={ismodalVisibleStatus}>
        <View
          style={{flex: 1, alignItems: 'center', backgroundColor: '#000000C7'}}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              width: width * 0.83,
              height: height * 0.39,
              borderRadius: 22,
              padding: 12,
              marginTop: 44,
             
            }}>
            <TouchableOpacity
              onPress={() => setismodalVisibleStatus(false)}
              style={{alignSelf: 'flex-end'}}>
              <Image
                source={require('../../Constant/Assests/Images/greyClose.png')}
                style={{height: 25, width: 25}}
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
              {' '}
              Update Status
            </Text>
            <View style={{paddingHorizontal: 25, marginBottom: 10}}>
              <View style={styles.text}>
                <Text style={{color: '#30046B'}}> Select Status </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: '#30046B',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 8,
                    paddingHorizontal: 4,
                    height: 55,
                    width: width / 1.8,
                  }}>                
                   {GetNoteStatus?.length > 0 ?
                   <Picker style={{ marginBottom: 10 }} selectedValue={selectedStateValue} onValueChange={(itemValue) => changeStateValue(itemValue)}>
                   {GetNoteStatus?.length > 0 ? GetNoteStatus?.map((item, index) => {
                     return <Picker.Item key={index} label={`${item?.status}`} value={`${item?.status}`} />
                   }) : null}
                 </Picker> :null}
                </View>
              </View>
            </View>
             <View style={{marginTop:25}}>
               <ButtonInput
                 navigate={()=>onSubmit()}
                 btnName={'save'}
                 heightnote
               />
             </View>
            
          </View>
        </View>
      </Modal>
      <Modal
        animationType="default"
        transparent={true}
        visible={ismodalVisibleNotes}>
        <View
          style={{flex: 1, alignItems: 'center', backgroundColor: '#000000C7'}}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              width: width * 0.83,
              // height: height * 0.52, // i have commented this
              borderRadius: 22,
              padding: 12,
              marginTop: 44,
            }}>
            <TouchableOpacity
              onPress={() => setismodalVisibleNotes(false)}
              style={{alignSelf: 'flex-end'}}>
              <Image
                source={require('../../Constant/Assests/Images/greyClose.png')}
                style={{height: 25, width: 25}}
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
              Notes
            </Text>

            <CustomInput
              label={' Note '}
              textInputProps={{
                placeholder: 'Write...',
                keyboardType: 'email-address',
                autoCapitalize: 'none',
              }}
              controllerProps={{
                name: 'note',
                control,
                errors,
                rules: {required: true},
              }}
              labelbgcolor
              heightnote
              bordercolor
              multiline={true}
            />

            <ButtonInput
              navigate={handleSubmit(onSubmitNotes)}
              btnName={'save'}
              heightnote
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AllTaskDetails;
const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textBold: {
    fontSize: 22,
    color: '#000',
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 12,
  },
});
