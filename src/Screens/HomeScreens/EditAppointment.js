import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, StyleSheet, FlatList,Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Alert } from "react-native"
import Header from '../../Components/Header'
import { useForm } from 'react-hook-form'
import CustomInput from '../../Components/CustomInput'
import ButtonInput from '../../Components/ButtonInput'
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { LeadContext } from '../../Providers/LeadProvider';
import useLoadingFn from '../../Hooks/useLoadingFn'
import { AuthContext } from '../../Providers/AuthProvider'
import { wp, hp } from '../../Components/Responsive'
const { width, height } = Dimensions.get('window');
import DatePicker from "../../Components/DatePicker";
import DateTimePicker from '@react-native-community/datetimepicker';
import Customslider from '../../Components/Customslider';
import ControlledPicker from '../../Components/ControlledPicker';

const EditAppointment = ({ navigation }) => {
  const [sliderVal, setSliderVal] = React.useState({
    value: 0,
    time: "1:00"
  });
  // sliderVal.time.replace(/\"/g, ' ')
  const Slidetime = sliderVal.time.replace(/\"/g, '')
  const [selectedStateValue, setStateValue] = useState('');
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const { API_CALLS, GetAppointmentdetails, GetMeetingList } = useContext(LeadContext)
  const AppointmentUpdate = useLoadingFn(API_CALLS.AppointmentUpdate)
  const Count = getDaysInCurrentMonth();
  const [result, setresult] = useState(Count)
  const [startDate, setstartDate] = useState( new Date(Date.now()));
  const [getdate, setdate] = useState()
  const [isDisplayDate, setShow] = useState(false);
  const [Times, setTimes] = useState("1:00")
  const [newdate, setnewdate] = useState('')
  const [sliderTime, setsliderTime] = useState('')
  const [mydate, setDate] = useState(new Date());
  const [isDisplayTime, setShowTime] = useState(false);
  const [displaymode, setMode] = useState('time');
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var monthsname = monthNames[startDate.getMonth()];
  var year = new Date().getFullYear();
  var time = (monthsname + '-' + year);
  var date = new Date();
  const [Datedetail, setDatedetail] = useState({
    month: date.getMonth(),
    year: date.getFullYear(),
    currentdate: 1
  })
  // 
  const showMode = (currentMode) => { setShowTime(true);
    setMode(currentMode);
};
  const displayTimepicker = () => { showMode('time')};
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
  const onsubmit = data => {
    

    // let meeting_date = Datedetail.year + "-" + Datedetail.month + "-" + Datedetail.currentdate
    const TimeValue = Times.length == 4? '0'+Times+':'+'00':Times+':'+'00' 
    var add = 30
    if ( val  <= 9)  val  = '0' + val ;
    var val =+ TimeValue.slice(3,5)+add
    var rem = val>60 ? val-60:val
    if ( rem  <= 9)  rem  = '0' + rem ;
    var hour =+ TimeValue.slice(0,2)+1
    const endTime = val>60?hour+':'+ rem :TimeValue.slice(0,2)+':'+rem
    if(currentDate + '-'+ new Date().getHours()+":"+new Date().getMinutes()+':'+'00' >= newdate + '-'+ TimeValue){
      alert('select correct time and date  ')
    }else{

     
    AppointmentUpdate({
      params: { ...data, meeting_end_time :endTime ,id: GetAppointmentdetails.id, meeting_date: newdate, meeting_time: TimeValue, latitude:GetAppointmentdetails?.latitude, longitude: GetAppointmentdetails?.longitude,time_zone:GetAppointmentdetails.time_zone }, onSuccess: () => {
        Alert.alert('Update Appointment', 'Appointment Updated Successfully')
        navigation.navigate('Appointment')
      }, screenName: 'Appointment'
    })
  }
  }

  useEffect(() => {
    reset(GetAppointmentdetails)
    setStateValue(GetAppointmentdetails?.receiver_id)
  }, [])


 const SlidVlaue = ()=>{
    return(
      <View><Text>{Slidetime}</Text></View>
    )
 }


 const onDateSelected = (event, res) => {
     var month = res.getMonth() + 1;
     if (month <= 9) month = '0' + month;
     var day = res.getDate();
     if (day <= 9) day = '0' + day;
     var start_date = res.getFullYear() + '-' + month + '-' + day;
     if (start_date >= currentDate) {
     setShow(false)
     setnewdate(start_date)
   } else {
     setShow(false)
     Alert.alert('Date', 'Please Select Correct Date')
   }
 };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ height: hp(40), width: '100%', backgroundColor: '#EEE9E0', borderBottomEndRadius: 57, borderBottomLeftRadius: 57 }}>
      <View style={{ width: '100%', flexDirection: 'row', padding: 10, marginLeft: '2%', height: '8%', justifyContent:'flex-start', position: 'absolute', bottom: 30,padding:15 }}>
        <TouchableOpacity onPress={()=>setShow(true)} >
          <Image source={require('../../Constant/Assests/Images/calendermeeting.png')} style={{ height: 30, width: 30, marginLeft:12, }} />
          </TouchableOpacity>
          {isDisplayDate && (
        <DateTimePicker
        value={startDate}
        mode={'date'}
        display={ 'spinner'}
        is24Hour={true}
        onChange={onDateSelected}
      />)}
          <Text style={{ fontSize: 17, color: '#393939', fontWeight: '500', height: 33 ,marginLeft:80 }}>Edit Meetings</Text>
        </View>
        <View style={{ height: '78%', width: '100%', backgroundColor: '#30046B', borderBottomEndRadius: 57, borderBottomLeftRadius: 57 }}>
          <Header backbutton  />
          <Text style={{ fontSize: 23, color: '#fff', alignSelf: 'center', marginTop: -5 }}>{newdate.length ===  0  ? GetAppointmentdetails?.meeting_date: newdate}</Text>
          <View style={{ marginTop: 19, alignItems: 'center' }}>
           <TouchableOpacity onPress={displayTimepicker} >

            <Text
              style={{
                fontSize: 33,
                fontWeight: 'bold',
                color: '#fff',
                alignSelf: 'center',
              }}>
              {Times.length == 4? '0'+Times:Times}
            </Text>
            </TouchableOpacity>
            {isDisplayTime && (
            <DateTimePicker
               value={mydate}
               mode={displaymode}
               is24Hour={true}
               display="default"
               onChange={changeSelectedDate}
            />
         )}
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
          textInputProps={{ placeholder: 'Enter Email', keyboardType: 'email-address', autoCapitalize: 'none', }}
          controllerProps={{ name: 'email', control, errors, rules: { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ }, }}
          bordercolor
          labelbgcolor />

        <CustomInput
          label={' Address '}
          textInputProps={{ placeholder: 'Enter Address', keyboardType: 'email-address', autoCapitalize: 'none', }}
          controllerProps={{ name: 'address', control, errors, rules: { required: true, } }}
          bordercolor
          labelbgcolor
        />
        <CustomInput
          label={' Phone Number '}
          textInputProps={{ placeholder: 'Enter Number', keyboardType: 'number-pad', autoCapitalize: 'none', }}
          controllerProps={{ name: 'phone', control, errors, rules: { required: true, } }}
          bordercolor
          labelbgcolor
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 22 }}>
          <TouchableOpacity onPress={handleSubmit(onsubmit)} >
            <View style={{ height: 49, width: 155, backgroundColor: '#30046B', borderRadius: 22, justifyContent: 'center' }}>
              <Text style={{ fontSize: 15, color: '#fff', textAlign: 'center' }}>Update</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

   

    </View>
  )
}

export default EditAppointment


function getDaysInCurrentMonth() {
  const date = new Date();
  const arr = [];
  let count = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate()


  for (let i = 0; i < count; i++) {
    arr.push({
      index: i + 1,
      Active: i == 0 ? true : false
    });
  }

  return arr;
}

function getDecimalPart(num) {
  if (Number.isInteger(num)) {
    return 0;
  }

  const decimalStr = num.toString().split('.')[1];
  return Number(decimalStr);
}

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
    shadowColor: "#30046B",
    position: "absolute",
    top: -11,
    left: 50,
    margin: 2,
  },
  
});
