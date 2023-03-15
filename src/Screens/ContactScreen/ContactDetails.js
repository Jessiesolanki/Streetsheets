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
import ButtonInput from '../../Components/ButtonInput';
import CustomInput from '../../Components/CustomInput';
import {useForm} from 'react-hook-form';
import ToggleSwitch from 'toggle-switch-react-native';
import { image_base_url } from '../../Providers/Index';
import {hp} from '../../Components/Responsive';
import { LeadContext } from '../../Providers/LeadProvider';
const {width, height} = Dimensions.get('window');
const ContactDetails = ({navigation, route}) => {
  const {
    API_CALLS,
    GetContactList,
    GetDndStatusChange,
    GetLeadId,
    GetNoteStatus,
    AddNoteValue,
  } = useContext(LeadContext);

  const [ismodalVisibleNotes, setismodalVisibleNotes] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    watch,
  } = useForm();
  const [isOn, setisOn] = useState(
    GetDndStatusChange?.status === 1 ? true : false,
  );
  const [leadId, setleadId] = useState('')
  const [selectedStateValue, setStateValue] = useState('');
  const [highlighted, sethighlighted] = useState(GetLeadId?.data?.id);
  const getDndStatus = useLoadingFn(API_CALLS.getDndStatus);
  const getAddNote = useLoadingFn(API_CALLS.getAddNote);
  const getNotesHistory = useLoadingFn(API_CALLS.getNotesHistory);
  const GeteditDetails = useLoadingFn(API_CALLS.GeteditDetails)
  const getLeadEditId = useLoadingFn(API_CALLS.getLeadEditId);
  useEffect(() => {}, [GetContactList?.data, GetLeadId?.data]);
  useEffect(() => {
    setisOn(GetDndStatusChange?.status === 1 ? true : false);
  }, [GetDndStatusChange, GetContactList?.data]);
  const getPipelineList = useLoadingFn(API_CALLS.getPipelineList);
  useEffect((value) => { getPipelineList({params:{}, onSuccess: () =>{ }})},[])
  const noteHistory = value => {
    getNotesHistory({
      params: {lead_id: value},
      onSuccess: () => navigation.navigate('NotesHistory', {params: 1}),
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

  const openNotes = () => {
    setismodalVisibleNotes(true);
  };

  const onSubmit = data => {
    getAddNote({
      params: {...data, id: GetLeadId?.data?.id},
      onSuccess: () => {
        setismodalVisibleNotes(false);
        navigation.navigate('ContactDetails');
      },
      screenName: 'Add Lead',
    });
  };

  const changeStateValue = itemValue => {
    setStateValue(itemValue);
  };

  const EditContactDetails = (id) => {
    GeteditDetails({params:{id:id}, onSuccess: () =>{ 
      
      navigation.navigate("EditContact")
    
    },screenName:'Lead'})
  
  };
  const renderItem = ({item, index}) => {
    const onEditContact = (value, item) => {
      getLeadEditId({
        params: {id: value},
        onSuccess: () => {
          sethighlighted(value);
        },
        screenName: 'Lead',
      });
    };
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
          <Text
            style={{
              fontSize: 10,
              color: '#9A9A9A',
              marginTop: 2,
              paddingHorizontal: 12,
            }}>
            Assigned to
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 3,
              paddingHorizontal: 12,
            }}>
            <Text style={{fontSize: 14, color: '#203152', fontWeight: '500'}}>
              {item?.user?.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
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
          <View style={{height: hp(26)}}>
            <FlatList
              data={GetContactList?.data}
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
              top: 45,
              right: 0,
              borderTopLeftRadius: 44,
              borderTopRightRadius: 44,
              padding: 20,
              paddingBottom: 150,
            }}>
            {/* <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={()=>EditContactDetails(GetLeadId?.data?.id)}>
              <Image
                source={require('../../Constant/Assests/Images/edit.png')}
                style={{height: 24, width: 24}}
              />
            </TouchableOpacity> */}
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
                    onPress={openNotes}
                    style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Image
                      source={require('../../Constant/Assests/Images/noteedit.png')}
                      style={{height: 29, width: 29}}
                    />
                  </TouchableOpacity>
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
                      marginTop: 6,
                    }}>
                    
                    {GetLeadId?.data?.stage_name == null ?null:  <Image
                        source={{uri:image_base_url+GetLeadId?.data?.stage_image}}
                        style={{height: 40, width: 40,borderRadius:22}}
                      />}
                    
                
                    <View>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#9A9A9A',
                          marginLeft: 6,
                          fontWeight: '500',
                        }}>
                        {GetLeadId?.data?.stage_name}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
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
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>

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
              height: height * 0.4,
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
              navigate={handleSubmit(onSubmit)}
              btnName={'save'}
              heightnote
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ContactDetails;
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
