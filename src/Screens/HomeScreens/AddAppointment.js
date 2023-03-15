import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert
} from 'react-native';
import React, { useContext, useState, useEffect,useRef } from 'react';
import Header from '../../Components/Header';
import { useForm } from 'react-hook-form';
import CustomInput from '../../Components/CustomInput';
import { LeadContext } from '../../Providers/LeadProvider';
const { width, height } = Dimensions.get('window');
import { AuthContext } from '../../Providers/AuthProvider';
import useLoadingFn from '../../Hooks/useLoadingFn';
import { Picker } from '@react-native-picker/picker';
import RNCalendarEvents from 'react-native-calendar-events';
import DateTimePicker from '@react-native-community/datetimepicker';
import Customslider from '../../Components/Customslider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';
import ControlledPicker from '../../Components/ControlledPicker';
import { getDate } from 'date-fns';
import BackButton from '../../Components/BackButton';
const AddAppointment = props => {
  // const { idToken } = props.route.params;
  const { API_CALLS, GetLeadId, GetMeetingList, GetAppointmentdetails,controllerValue, setcontrollerValue } = useContext(LeadContext);
  const { latitude } = useContext(AuthContext);
  const navigation = useNavigation();
  const {control,handleSubmit, formState: { errors }, reset, watch,} = useForm();
  const addAppointment = useLoadingFn(API_CALLS.addAppointment);
  const getLeadEditId = useLoadingFn(API_CALLS.getLeadEditId);
  const [Times, setTimes] = useState("1:00")
  const [selectedStateValue, setStateValue] = useState('');
  const [startDate, setstartDate] = useState(new Date(Date.now()));
  const [newdate, setnewdate] = useState('')
  const [isDisplayDate, setShow] = useState(false);
  const [sliderTime, setsliderTime] = useState('')
  const [mydate, setDate] = useState(new Date());
  const [isDisplayTime, setShowTime] = useState(false);
  const Count = getDaysInCurrentMonth();
  const [getdate, setdate] = useState();
  const [displaymode, setMode] = useState('time');
  const [Eventdate, setEventdate] = useState(new Date());
  const [sliderVal, setSliderVal] = React.useState({
    value: 0,
    time: '1:00',
  });
  const Slidetime = sliderVal.time.replace(/\"/g, '');
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const Time =  Slidetime.length === 4 ? '0' + Slidetime + ':00' + '+0' + Slidetime : '' + Slidetime + ':00' + '+' + Slidetime;
  const Eventtimeformat = async () => {
    let Time = Slidetime.replace(/\:/g, '.');
    let Hour = parseInt(Time);
    let minutes = await getDecimalPart(parseFloat(Time));
    return { Hour, minutes, };
  };
  const changeStateValue = itemValue => {
    setStateValue(itemValue);
    getLeadEditId({params: {id: itemValue}, onSuccess: () => {}});
  };

   const showMode = (currentMode) => { setShowTime(true);
         setMode(currentMode);
   };
   const displayTimepicker = () => { showMode('time')};
  function getDecimalPart(num) {
    if (Number.isInteger(num)) {
      return 0;
    }

    const decimalStr = num.toString().split('.')[1];
    return Number(decimalStr);
  }

  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;
    setDate(currentDate);
    setShowTime(false)
    const newDate = new Date(currentDate);
    var time = newDate.getHours();
    if (time <= 9) time = '0' + time;
    var min =  newDate.getMinutes();
    if (min <= 9) min = '0' + min;
   const Time = time + ":"+ min
    setTimes(Time)
    setsliderTime(currentDate)
 };

 const d = new Date();
 var month_d = d.getMonth() + 1;
     if (month_d  <= 9) month_d  = '0' + month_d ;
     var day_d = d.getDate();
     if ( day_d  <= 9)  day_d  = '0' +  day_d ;
     const currentDate = d.getFullYear() + '-' + month_d + '-' + day_d;
  const onSubmit = async data => {
    const newDate = new Date(Eventdate);
    newDate.setHours(newDate.getHours() + 2);
    const dateandtime = await Eventtimeformat();
    const Formatedtime = newDate.setHours(dateandtime.Hour);
    let f = new Date(new Date(Formatedtime).setMinutes(dateandtime.minutes));
    RNCalendarEvents.saveEvent('Meeting', {
      calendarId: '3',
      startDate: Eventdate,
      endDate: f.toISOString(),
      location: data?.address,
      notes: 'Hi your Meeting is scheduled with ' + data?.name, //message for meeting
    })
      .then(value => {
        console.log('Event Id--->', value);
      })
      .catch(error => {
        console.log('Did Not work Threw an error --->', error);
      });
  
    const TimeValue = Times.length == 4? '0'+Times+':'+'00':Times+':'+'00' 
    var add = 30
    if ( val  <= 9)  val  = '0' + val ;
    var val =+ TimeValue.slice(3,5)+add
    var rem = val>60 ? val-60:val
    if ( rem  <= 9)  rem  = '0' + rem ;
    var hour =+ TimeValue.slice(0,2)+1
    const endTime = val>60?hour+':'+ rem :TimeValue.slice(0,2)+':'+rem
 
if(currentDate){
  if(new Date().getHours()+":"+new Date().getMinutes()+':'+'00' >=TimeValue){
    alert('Select correct time ')
  }
    
else{
    
    addAppointment({  params: {  ...data,
        // token: idToken,
        latitude:latitude?.latitude,
        longitude: latitude?.longitude,
        meeting_date: newdate,
        meeting_time: TimeValue,
        meeting_end_time :endTime,
        receiver_id:GetLeadId?.data.id,
        time_zone:GetLeadId?.data.time_zone
      },
      onSuccess: () => {
        props.navigation.navigate('Appointment');
      },
      screenName: 'Add Appointment',
    });
  }
  };

}


  useEffect(() => {  reset(GetLeadId?.data);}, [GetLeadId?.data]);

  React.useEffect(() => {
    RNCalendarEvents.requestPermissions()
      .then(res => {
        console.log('Premission Response', res);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const onDateSelected = (event, res) => {
    
       setstartDate(res)
      var month = res.getMonth() + 1;
      if (month <= 9) month = '0' + month;
      var day = res.getDate();
      if (day <= 9) day = '0' + day;
      var start_date = res.getFullYear() + '-' + month + '-' + day;
      if (start_date >= currentDate) {
     
      setnewdate(start_date)
      setShow(false)
    } else {
      setShow(false)
      Alert.alert('Date', 'Please Select Correct Date')
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          height: 270,
          width: '100%',
          backgroundColor: '#EEE9E0',
          borderBottomEndRadius: 57,
          borderBottomLeftRadius: 57,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            padding: 10,
            marginLeft: '2%',
            height: '8%',
            justifyContent: 'flex-start',
            position: 'absolute',
            bottom: 30,
            padding: 15,
            
          }}>
          <TouchableOpacity onPress={() => setShow(true)}>
            <Image
              source={require('../../Constant/Assests/Images/calendermeeting.png')}
              style={{ height: 30, width: 30, marginLeft: 12 }}
            />
          </TouchableOpacity>
          {isDisplayDate && (
            <DateTimePicker
              value={startDate}
              mode={'date'}
              display={'spinner'}
              is24Hour={true}
              onChange={onDateSelected}
            />)}
          <Text
            style={{
              fontSize: 17,
              color: '#393939',
              fontWeight: '500',
              height: 30,
              marginLeft: 80,
            }}>
            Add Meetings
          </Text>
        </View>
        <View
          style={{
            height: '80%',
            width: '100%',
            backgroundColor: '#30046B',
            borderBottomEndRadius: 57,
            borderBottomLeftRadius: 57,
          }}>
        
          <BackButton navigateScreen={'LeadtDetails'} />
          <Text
            style={{
              fontSize: 23,
              color: '#fff',
              alignSelf: 'center',
              marginTop: -5,
            }}>
            {newdate}
          </Text>
   
          {isDisplayTime && (
            <DateTimePicker
               value={mydate}
               mode={displaymode}
               is24Hour={true}
               display="default"
               onChange={changeSelectedDate}
            />
         )}
          <View style={{ marginTop: 13, alignItems: 'center' }}>
          <TouchableOpacity onPress={displayTimepicker} >

            <Text
              style={{
                fontSize: 33,
                fontWeight: 'bold',
                color: '#fff',
                alignSelf: 'center',
              }}>
              { Times.length == 4? '0'+Times:Times}
            </Text>
            </TouchableOpacity>
            <Customslider Cvalue={(e) => { 
              setTimes(e)
            }} />
          </View>
        </View>
      </View>

      <ScrollView style={{ marginBottom: 22, marginTop: 22 }}>
        
      <CustomInput
          label={' Meeting With '}
          textInputProps={{
            placeholder: 'Meeting With',
            keyboardType: 'default',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'name',
            control,
            errors,
            rules: {
              required: true,
              // pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            },
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
            name: 'email',
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
          label={' Address '}
          textInputProps={{
            placeholder: 'Enter Address',
            keyboardType: 'email-address',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'address',
            control,
            errors,
            rules: { required: true },
          }}
          bordercolor
          labelbgcolor
        />
        <CustomInput
          label={' Phone Number '}
          textInputProps={{
            placeholder: 'Enter Number',
            keyboardType: 'number-pad',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'phone',
            control,
            errors,
            rules: { required: true },
          }}
          bordercolor
          labelbgcolor
        />
        <View
          style={{ flexDirection: 'row', justifyContent: 'center', padding: 22 }}>
          {/* SaveEvent */}
          <TouchableOpacity
            // onPress={SaveEvent}
            onPress={handleSubmit(onSubmit)}>
            <View
              style={{
                height: 49,
                width: 155,
                backgroundColor: '#30046B',
                borderRadius: 22,
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 15, color: '#fff', textAlign: 'center' }}>
                Add Meeting
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>


    </View>
  );
};

export default AddAppointment;
function getDaysInCurrentMonth() {
  const date = new Date();
  const arr = [];
  let count = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  for (let i = 0; i < count; i++) {
    arr.push({
      index: i + 1,
      Active: i == 0 ? true : false,
    });
  }

  return arr;
}
const arr = [1, 2, 3, 4, 5, 6, 7];
const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
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