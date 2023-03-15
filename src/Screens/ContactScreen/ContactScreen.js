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
  Button,
  StatusBar,
  KeyboardAwareScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Header from '../../Components/Header';
import useLoadingFn from '../../Hooks/useLoadingFn';
import {LeadContext} from '../../Providers/LeadProvider';
import {useForm} from 'react-hook-form';
import {image_base_url} from '../../Providers/Index';
import {hp} from '../../Components/Responsive';
import {AuthContext} from '../../Providers/AuthProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const {width, height} = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const ContactScreen = ({navigation}) => {
  const {setRefreshContact} = useContext(AuthContext);
  const {API_CALLS, GetContactList, GetTaskList, GetLeadId, GetNoteStatus} =
    useContext(LeadContext);
    const [refreshing, setRefreshing] = useState(false);
const [toggle, settoggle] = useState('')
  const getLeadEditId = useLoadingFn(API_CALLS.getLeadEditId);
  const getStatusNote = useLoadingFn(API_CALLS.getStatusNote);
  const getContact = useLoadingFn(API_CALLS.getContact);
  const getTask = useLoadingFn(API_CALLS.getTask);
  const {latitude} = useContext(AuthContext);
  useEffect(() => {
    setRefreshContact(true)
    getTask({params: {}, onSuccess: () => {}, screenName: 'task'});  

      getContact({
      params: {latitude: latitude?.latitude, longitude: latitude?.longitude},
      onSuccess: () => {},
      screenName: 'contact',
    }) 
    getTask({params: {}, onSuccess: () => {}, screenName: 'task'});  
  }, []);


  useEffect(() => {
    
    getTask({params: {}, onSuccess: () => {}, screenName: 'task'});  
      getContact({
      params: {latitude: latitude?.latitude, longitude: latitude?.longitude},
      onSuccess: () => {},
      screenName: 'contact',
    }) 
    
  }, [toggle]);


  const allTask=()=>{
    getTask({params: {}, onSuccess: () => {navigation.navigate('AllTask')}, screenName: 'task'});  
  }
  useEffect(() => {}, [GetContactList, GetTaskList]);
  const onTaskDetails = value => {
    // getLeadEditId({
    //   params: {id: value},
    //   onSuccess: () => {
    //    navigation.navigate('AllTaskDetails');
    //   },
    //   screenName: 'Lead', 
    // });
  };
  const onRefresh =()=>{
    getContact({
      params: {latitude: latitude?.latitude, longitude: latitude?.longitude},
      onSuccess: () => {setRefreshing(false)},
      screenName: 'contact',
    });
  }
  const onEditContact = value => {
    getLeadEditId({
      params: {id: value},
      onSuccess: () => {
        navigation.navigate('ContactDetails',{id:2});
      },
      screenName: 'Lead',
    });
  };
  useEffect(() => {
    getStatusNote({params: {}, onSuccess: () => {}, screenName: 'status'});
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View
        elevation={10}
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          borderRadius: 12,
          marginLeft: 12,
          shadowColor: '#171717',
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 3,
          marginBottom: 12,
        }}>
        <TouchableOpacity onPress={() => onTaskDetails(item.id)}>
          <Image
            source={{uri: image_base_url + item?.user?.image}}
            style={{
              height: height * 0.16,
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
                marginTop: 15,
              }}>
              {item.name}
            </Text>
            {/* <Image source={require('../../Constant/Assests/Images/starone.png')} style={{ height: 14, width: 14 }} /> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const renderItemVertical = ({item, index}) => {
    // onPress={openmodal}
    return (
      <View
        elevation={3}
        style={{
          marginBottom: 15,
          backgroundColor: 'white',
          alignItems: 'flex-start',
          justifyContent: 'center',
          borderWidth: 0.4,
          borderRadius: 5,
          borderColor: '#0000001A',
          paddingHorizontal: 20,
          paddingVertical: 12,
        }}>
        <TouchableOpacity
          onPress={() => {
            onEditContact(item.id);
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginTop: 5,
              height: height * 0.14,
              width: width * 0.77,
            }}>
              <View>
              <Image
              source={{uri: image_base_url + item?.user?.image}}
              style={{height: 76, width: 76, borderRadius: 44, marginRight: 10}}
              resizeMode="contain"
            />
              
              </View>
         

            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: '#203152',
                  marginLeft: 6,
                  marginTop: 0,
                  fontWeight: '700',
                }}>
                {item?.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#203152',
                  marginLeft: 6,
                  marginTop: 5,
                  fontWeight:'700'
                }}><Text style={{color:'#929292'}}>{"Assigned To -> "}</Text> 
                {item?.user?.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#929292',
                  marginLeft: 6,
                  marginTop: 5,
                }}>
                {item?.email}
              </Text>
             
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 6,
                }}>
                <Image
                  source={require('../../Constant/Assests/Images/listlocation.png')}
                  style={{height: '70%', width: '16%'}}
                  resizeMode="contain"
                />
                <View>
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#929292',
                      marginLeft: 6,
                      marginTop: 5,
                    }}>
                    Distance From Location
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#30046B',
                      marginLeft: 6,
                      marginTop: 5,
                      fontWeight: '500',
                    }}>
                    {item.distance.toFixed(1)}km
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header backbutton name={'All Contacts'} search id={3} />
        <View style={{padding: 13}}>
          <View
            style={{
              flexDirection: 'row',
              width: width,
              justifyContent: 'space-between',
            }}>
            <Text style={styles.textBold}>All Task</Text>
            <TouchableOpacity onPress={() =>allTask()}>
              <Text style={{fontSize: 15, marginRight: 33, color: '#BFAB88'}}>
                {' '}
                See All
              </Text>

            </TouchableOpacity>
          </View>
          {GetTaskList?.permission.includes('view_task_role') ? (
            <View style={{height: height * 0.25}}>
              {GetTaskList?.data?.length > 0 ? (
                <FlatList
                  data={GetTaskList?.data}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <FontAwesome5 name={'tasks'} size={25} color={'lightgrey'} />
                  <Text
                    style={{
                      padding: 20,
                      fontSize: 16,
                      color: 'lightgrey',
                      paddingBottom: 10,
                      textAlign: 'center',
                    }}>
                    No Task at the moment
                  </Text>
                </View>
              )}
            </View>
          ) : null}
          <Text style={styles.textBold}>My Contact</Text>
          {GetContactList?.permission.includes('view_contact_role') ? (
            <View
              style={{height: hp(44), alignItems: 'center', paddingBottom: 50}}>
              {GetContactList?.data?.length > 0 ? (
                <FlatList
                  data={GetContactList?.data}
                  renderItem={renderItemVertical}
                  keyExtractor={item => item.id}
                  horizontal={false}
                  showsVerticalScrollIndicator={false}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <FontAwesome5
                    name={'user-slash'}
                    size={25}
                    color={'lightgrey'}
                  />
                  <Text
                    style={{
                      padding: 20,
                      fontSize: 16,
                      color: 'lightgrey',
                      paddingBottom: 10,
                      textAlign: 'center',
                    }}>
                    No Contact at the moment
                  </Text>
                  <TouchableOpacity
            onPress={() => {
              settoggle(true);
            }}>
            <FontAwesome name={'refresh'} size={45} color={'#30046B'} />
          </TouchableOpacity>
                </View>
              )}
            </View>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default ContactScreen;
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
