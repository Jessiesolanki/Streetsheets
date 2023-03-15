import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  FlatList,
  Button,
  label,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {useNavigation} from '@react-navigation/native';
import DatePicker from '../Components/DatePicker';
const {width, height} = Dimensions.get('window');
import {AuthContext} from '../Providers/AuthProvider';
import useLoadingFn from '../Hooks/useLoadingFn';
import {hp} from './Responsive';
import { LeadContext } from '../Providers/LeadProvider';
import BackButton from './BackButton';
import { image_base_url } from '../Providers/Index';

const Header = ({
  dash,
  id,
  search,
  searchbar,
  sidebar,
  backbutton,
  name,
  toggle,
  text,
  backnavigation,
  textone,
  TopTab,
  route,
  label,
  note
}) => {
  const [ismodalVisible, setIsmodalVisible] = useState(false);
  const [value, setValuedate] = useState('');
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [arr, setArr] = useState([]);
  const [active, setactive] = useState(false)
// const [tabs, settabs] = useState({active:true,id:})  userData,
const { tabs, settabs,API_CALLS,GetStatus} = useContext(LeadContext)

const getNotesHistory = useLoadingFn(API_CALLS.getNotesHistory)
const getLeadStatus = useLoadingFn(API_CALLS.getLeadStatus)

// const noteHistory =(value)=>{
 
//   getNotesHistory({ params: { lead_id: value }, onSuccess: () =>{ settabs({active:true,id:2})} })

 
// }
useEffect(() => {
  getLeadStatus({ params: {  }, onSuccess: () =>{ } })
}, [])


  const {userData, API_CALL} = useContext(AuthContext);
  const [isOn, setisOn] = useState(
    userData?.user?.lead_status === 1 ? true : false,
  );
  const getUser = useLoadingFn(API_CALL.getUser);
  const setisOnClick = value => {
    getUser({
      params: {tstatus: value === true ? 1 : 0},
      onSuccess: () => {
        setisOn(value);
      },
    });
  };
  var month = startDate.getMonth() + 1;
  if (month <= 9) month = '0' + month;
  var day = startDate.getDate();
  if (day <= 9) day = '0' + day;
  var start_date = startDate.getFullYear() + '-' + month + '-' + day;

  var endmonth = endDate.getMonth() + 1;
  if (endmonth <= 9) endmonth = '0' + endmonth;
  var endday = endDate.getDate();
  if (endday <= 9) endday = '0' + endday;
  var end_date = endDate.getFullYear() + '-' + endmonth + '-' + endday;

  const setisOnClickFilter = () => {
    getUser({
      params: {
        start_date: start_date,
        end_date: end_date,
        lead_status: arr.toString(),
      },
      onSuccess: () => {
        setIsmodalVisible(false),
          setactivequesetio({active: false, True: false}),
          setArr([]);
        navigation.navigate('MapStack', {screen: 'MapScreen'});
      },
      screenName: 'filter',
    });
  };

  const [activequestion, setactivequesetio] = useState({
    active: true,
    True: true,
    id: 0,
 
  });

  const onoptionclick = (value, wrong) => {
    setArr([...arr, value.name]);
    if (value.id  ) {
      setactivequesetio({
        active: true,
        True: true,
        id: value.id,
        color: 'lightgrey',
        name: value.name,
      });
    } else {
      setactivequesetio({active: false, True: false, id: 0});
    }
  };
  const CardView = ({item, index}) => {
    
    return (
      <View style={{height: 80, width: 75}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => onoptionclick(item, index)}
            style={[
              styles.btnstyles,
              {
                backgroundColor:
                  (activequestion.id == item.id  && activequestion.color) ||
                  (activequestion.id == 1 &&
                    setactivequesetio({color: 'transparent'})),
              },
            ]}>
            <Image
              source={{uri:image_base_url+item.stage_image}}
              style={{height: 40, width: 40, marginTop: '1%',borderRadius:22}}
            />
          </TouchableOpacity>
          <Text style={{color: '#000', textAlign: 'center', fontSize: 11}}>
            {item.status}
          </Text>
        </View>
      </View>
    );
  };
  useEffect(() => {
    setisOn(userData?.user?.lead_status === 1 ? true : false);
  }, [userData]);
  const navigation = useNavigation();
  return (
    <>
      {sidebar && (
        <View
          style={{
            width: width,
            flexDirection: 'row',
            marginTop: '2%',
            marginLeft: '5%',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Image
              source={require('../Constant/Assests/Images/menu.png')}
              style={{height: 45, width: 45, marginTop: '1%'}}
            />
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('search', {id: id})}
              style={{marginLeft: toggle ? '34%' : '46%'}}>
              <Image
                source={require('../Constant/Assests/Images/searchicon.png')}
                style={{
                  height: 45,
                  width: 45,
                  marginHorizontal: 8,
                  marginTop: '1%',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsmodalVisible(true)}>
              <Image
                source={require('../Constant/Assests/Images/filter.png')}
                style={{height: 45, width: 45, marginTop: '1%'}}
              />
            </TouchableOpacity>
            {toggle && (
              <View
                style={{
                  justifyContent: 'flex-start',
                  marginLeft: 7,  
                  marginTop: 7,
                }}>
                <ToggleSwitch
                  isOn={isOn}
                  onColor="#30046B"
                  offColor="#BFAB88"
                  size="large"
                  onToggle={isOn => {
                    setisOnClick(isOn);
                  }}
                  animationSpeed={200}
                />
              </View>
            )}
          </View>
        </View>
      )}

      {backbutton && (
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
            onPress={() =>
              backnavigation
                ? navigation.navigate('HomeStack', {screen: 'HomeScreen'})
                : navigation.goBack()
            }>
            <Image
              source={
                dash
                  ? require('../Constant/Assests/Images/backdashboard.png')
                  : require('../Constant/Assests/Images/back.png')
              }
              style={{
                height: dash ? 66 : 43,
                width: dash ? 66 : 43,
                marginTop: dash ? -15 : '1%',
              }}
            />
          </TouchableOpacity>
          {textone && (
            <Text style={{fontSize: 28, color: '#393939', fontWeight: '500'}}>
              Entire Staff Details
            </Text>
          )}
          <Text
            style={{
              fontSize: 28,
              color: '#393939',
              fontWeight: '500',
              marginLeft: '2%',
              marginRight: text ? 110 : null,
              textAlign: text ? 'center' : null,
            }}>
            {name}
          </Text>
          {search && (
            <TouchableOpacity
              onPress={() => navigation.navigate('search', {id: id})}
              style={{}}>
              <Image
                source={
                  dash
                    ? require('../Constant/Assests/Images/searchone.png')
                    : require('../Constant/Assests/Images/searchicon.png')
                }
                style={{
                  height: 43,
                  width: 43,
                  marginHorizontal: 20,
                  marginTop: dash ? -4 : '1%',
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
      {searchbar && (
        <TouchableOpacity
          onPress={() => navigation.navigate('search')}
          style={{
            flexDirection: 'row',
            width: width,
            justifyContent: 'flex-end',
          }}>
          <View style={{alignSelf: 'center', marginRight: 40}}>
            <Text style={{fontSize: 28, fontWeight: 'bold', color: '#393939'}}>
              DashBoard
            </Text>
          </View>
          <Image
            source={require('../Constant/Assests/Images/searchone.png')}
            style={{height: 43, width: 43, marginHorizontal: 20, marginTop: 12}}
          />
        </TouchableOpacity>
      )}
{  TopTab && <View
        style={{
          width: '100%',
          
          marginTop: 10,
          padding: 10,
          // marginLeft: '2%',                  

    //  borderBottomWidth:1,
    // borderBottomColor:'#30046B'
        }}>
        {/* <TouchableOpacity style={{}}
          onPress={() =>
            route.params === 1
              ? navigation.navigate('MapStack', { screen: 'MapScreen' })
              : navigation.navigate('LeadScreen')  
          }>
          <Image
            source={require('../Constant/Assests/Images/back.png')}
            style={{ height: 40, width: 40,marginLeft:'2%' }}
          />
                  <Text style={{textAlign:'center',marginTop:-35,marginBottom:35,fontSize:20,fontWeight:'bold',color:'#30046B'}}>{label}</Text>

        </TouchableOpacity> */}
        <View style={{marginBottom:22}}>
        <View style={{flexDirection: 'row', marginTop:10, marginLeft: '2%',alignItems:'center'}}>
       <TouchableOpacity onPress={()=>navigation.navigate('LeadStack',{screen:'LeadScreen'})} style={{ width:60 }} >
      <Image source={require('../Constant/Assests/Images/back.png') } style={{height: 43,  width:  43,  marginTop: '1%',   }} />
    </TouchableOpacity>
    <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',color:'#30046B'}}>{label}</Text>

    </View>
        {/* <BackButton navigateScreen={'LeadScreen'}/> */}
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <View style={{borderWidth: tabs.active== true && tabs.id == 1 ? 3 :0,borderColor:tabs.active== true && tabs.id == 1 ? '#30046B':null}}>
        <View style={{borderWidth:2,borderColor:'white',borderRadius:2}}>
        <Button title = "Contact" color = {"#30046B"} onPress={()=>{settabs({active:true,id:1}),navigation.navigate('LeadtDetails')}}  />
        </View>
        </View>
        <View style={{borderWidth: tabs.active== true && tabs.id == 2 ? 3 :0,borderColor:tabs.active== true && tabs.id == 2 ? '#30046B':null}}>
        <View style={{borderWidth:2,borderColor:'white',borderRadius:2 }}>
        <Button title = "Notes" color = {"#30046B"} onPress={()=>{settabs({active:true,id:2})}}  />
        </View>
        </View>
        <View style={{borderWidth: tabs.active== true && tabs.id == 3 ? 3 :0,borderColor:tabs.active== true && tabs.id == 3 ? '#30046B':null}}>
        <View style={{borderWidth:2,borderColor:'white',borderRadius:2 }}>
        <Button title = "Task" color = {"#30046B"} onPress={()=>{settabs({active:true,id:3}),navigation.navigate('LeadtDetails')}}  />
        </View>
        </View>
        <View style={{borderWidth: tabs.active== true && tabs.id == 4 ? 3 :0,borderColor:tabs.active== true && tabs.id == 4 ? '#30046B':null}}>
        <View style={{borderWidth:2,borderColor:'white',borderRadius:2 }}>
        <Button title = "Appointment" color = { "#30046B"} onPress={()=>{settabs({active:true,id:4}),navigation.navigate('LeadtDetails')}}/>
        </View>
        </View>
        </View>

        {/* <Toptab/> */}
      </View>}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ismodalVisible}
        style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#fff',
            width: width,
            marginTop: 210,
            borderTopRightRadius: 33,
            borderTopLeftRadius: 33,
          }}>
          <KeyboardAvoidingView enabled={false} style={{height: height}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 12,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  color: '#000',
                  fontWeight: '500',
                  marginLeft: 20,
                }}>
                Filter
              </Text>
              <TouchableOpacity
                onPress={() => {
                  let date = new Date();
                  setstartDate(date);
                  setendDate(date);
                }}>
                <Text style={{color: '#30046B', marginLeft: -30}}>
                  {' '}
                  Reset Date{' '}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsmodalVisible(false)}>
                <Image
                  source={require('../Constant/Assests/Images/close.png')}
                  style={{height: 30, width: 30, marginRight: 12}}
                />
              </TouchableOpacity>
            </View>

              <View
                style={{
                  flexDirection: 'row',
                  height: 90,
                  marginTop: 13,
                  justifyContent: 'space-around',
                }}>
                <View style={{paddingLeft: 25, width: hp(26), marginTop: 15}}>
                  <View style={styles.text}>
                    <Text style={{color: '#30046B'}}>From Date </Text>
                  </View>
                  <DatePicker
                    start={startDate}
                    setstart={setstartDate}
                    value={value}
                    setValue={setValuedate}
                  />
                </View>
                <View
                  style={{paddingHorizontal: 15, width: '55%', marginTop: 15}}>
                  <View style={styles.text}>
                    <Text style={{color: '#30046B'}}>To Date </Text>
                  </View>
                  <DatePicker
                    start={endDate}
                    setstart={setendDate}
                    value={value}
                    setValue={setValuedate}
                  />
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: 15,
                  width: '96%',
                  marginTop: 15,
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    margin: 2,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: '#30046B'}}> Select status </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setArr([]),
                          setactivequesetio({
                            active: false,
                            True: false,
                            id: 1,
                          });
                      }}>
                      <Text style={{color: '#30046B'}}> Deselect status </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={()=>{ }>
              <Text style={{ color: '#30046B' }}> All select </Text>
              </TouchableOpacity> */}
                  </View>

                  <View style={{height: 250, width: '100%'}}>
                    <FlatList
                      style={{marginTop: 5}}
                      data={GetStatus?.data}
                      numColumns={4}
                      renderItem={item => CardView(item)}
                      keyExtractor={item => item.id}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setisOnClickFilter();
                  }}
                  style={{marginTop: 27, alignSelf: 'center'}}>
                  <View
                    style={{
                      height: 35,
                      width: 155,
                      backgroundColor: '#30046B',
                      borderRadius: 22,
                      marginBottom:100,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#fff',
                        textAlign: 'center',
                      }}>
                      search
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
};

export default Header;
const checkBoxBaseStyles = {
  height: 50,
  width: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 33,
};

const labelDimentions = {
  width: 100,
};
const styles = StyleSheet.create({
  text: {
    backgroundColor: 'white',
    zIndex: 1,
    shadowColor: '#30046B',
    position: 'absolute',
    top: -11,
    left: 35,

    margin: 2,
  },
  btnstyles: {
    ...checkBoxBaseStyles,
    borderWidth: 2,
    borderColor: 'white',
  },
  btnstylesSelect: {
    ...checkBoxBaseStyles,
  },
  btnTxtStyles: {
    ...labelDimentions,
  },
  choicesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: labelDimentions.width,
  },
  choicesHeaderItem: {
    textAlign: 'center',
  },
});
 