import { View, Text ,StyleSheet,TouchableOpacity,Image,LayoutAnimation,FlatList,Dimensions} from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import {Calendar, Agenda} from 'react-native-calendars';
import { LeadContext } from '../../Providers/LeadProvider';
import {LocaleConfig} from 'react-native-calendars'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {Card} from 'react-native-paper';
const {width,height} = Dimensions.get('window');
import moment from 'moment';
import EventCalendar from 'react-native-events-calendar';
import { isTomorrow, setDate } from 'date-fns';
import BackButton from '../../Components/BackButton';
import { useNavigation } from '@react-navigation/native';
const CalendarView = (route) => {
    const {GetAppointmentValue } = useContext(LeadContext)
    const navigation =useNavigation();
    const [result, setresult] = useState('')
    const [index, setindex] = useState(0)
    const [value, setvalue] = useState('')
    const [items, setItems] = useState({});
    const [weekCalendar, setweekCalendar] = useState(false)
    const [dayCalendar, setdayCalendar] = useState(false)
    const [monthCalendar, setmonthCalendar] = useState(true)
    const [state, setstate] = useState({})
    console.log(route,'kkkk')
         const [Dateitem, setDate] = useState('')
    const dumyData =[{"address": "100.peace point", "city": "surat", "created_at": "2022-08-23T04:34:53.000000Z", "email": "lead1@gmail.com", "id": 14, "latitude": "22.7974246", "longitude": "75.8588311", "meeting_date": "2022-09-01", "meeting_time": "11:26:00+11:26", "phone": "1236547860", "receiver_id": 16, "sender_details": {"added_by": 3, "added_by_role": 1, "city": "indore", "country": 11, "created_at": "2022-07-29T13:49:01.000000Z", "deleted_at": 0, "device_token": null, "email": "test@gmail.com", "email_verified_at": null, "first_name": "test", "id": 18, "image": "uploads/user/1658324493.jpg", "is_active": 1, "last_login": null, "last_name": "test", "lead_status": 1, "name": "test", "phone": null, "role": 2, "state": 3651, "updated_at": "2022-08-30T17:24:03.000000Z"}, "sender_id": 18, "status": "1", "updated_at": "2022-08-23T00:00:00.000000Z"}]
    LocaleConfig.locales['fr'] = {
        monthNames: [  "January",	"February","March"	,	"April"	,"May",		"June"	,"July"	,	"August",	 "September"	,	"October",	'	November',	"December"],
        monthNamesShort: ['Jan.', 'Féb.', 'Mar', 'Apr', 'May', 'Jun', 'Jul.', 'Aug', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNames : ['Sunday.', 'Monday.', 'Tuesday.', 'Wednesday.', 'Thursday.', 'Friday.', 'Saturday.'],
        today: "Aujourd'hui"
      };
      LocaleConfig.defaultLocale = 'fr';

      const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
      };
useEffect(() => {
    getDates()
    getEventDateAndTime()
    dayEvent()
}, [])
var eventdata = []; 
const dayEvent = ()=>{
for (let i = 0; i < GetAppointmentValue?.data?.length; i++) {
    eventdata += GetAppointmentValue?.data[i] ;
}

}
if(eventdata!==null){
    console.log(eventdata)
}

const loadItems = (day,state) => {
 
   console.log(day,'jjjj',resultObj)
  setTimeout(() => {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      if (!items[strTime]) {
        items[strTime] = [];
        const numItems = Math.floor(Math.random()+1);
        for (let j = 0; j < numItems; j++) {
      
          items[strTime].push({
            name:  strTime ,
            value:Dateitem?.start,
            // height: Math.max(60, Math.floor(Math.random() * 150)),

          },)
        }
      }
    }
    const newItems = {};
    // const markedDates = {};
    // GetAppointmentValue?.data.forEach((state,index) => {
    //   markedDates[state] = {
    //     ...markedDates[state],
    //     marked: true,
        
    //   };
    // });

      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);

    });
  
  };
  
  const renderItemCard = (item) => {
    function search(nameKey, myArray){
      for (var i = 0; i<  myArray.length; i++) {
          if (myArray[i].start.slice(0,10) === nameKey) {
              return myArray[i];
          }
      }
    }
    const resultObj= search(item.name, Dateitem);
    console.log(resultObj?.summary,'hhhh')
    return (
      <View style={{marginRight: 10, marginTop: 35,padding:1}}>
    
                    <Card.Content>
                       {resultObj?.summary && resultObj?.title ? <View style={{}}>
                            <Text style={{fontSize:12,fontWeight:'bold',color:'#BFAB88',marginRight:14}}>Address:- {resultObj?.summary?.length>0 ? resultObj?.summary: 'no appointment '}</Text>
                            <Text style={{fontSize:12,fontWeight:'bold',color:'#BFAB88',marginRight:14,marginBottom:10}}>Email:- {resultObj?.title?.length>0 ? resultObj?.title: 'no appointment '}</Text>

                        </View> :
                         <View style={{flex:1,justifyContent:'center'}}>
                          <Text style={{fontSize:10}}>No Appointment booked on this date </Text>
                          </View>}
                    </Card.Content>
               
        
      </View>
    );
  };
  const getDates = (state) => {
    const start = [];

    GetAppointmentValue?.data.forEach((state,index) => {
        start.push({"start":state.meeting_date+" "+state.meeting_time,"end" : state.meeting_date+" "+state.meeting_end_time,"title":state.email,'summary':state.address});

       
    //   };
    });
    setDate(start)
    console.log(start)
    return start;
  };
  
  

const toggleOpen = (day) => {
  setvalue(day.dateString)
setresult(resultObj)
};
var foundValue = GetAppointmentValue?.data.filter(obj=>obj.meeting_date===value);

function search(nameKey, myArray){
  for (var i = 0; i<  myArray.length; i++) {
      if (myArray[i].meeting_date === nameKey) {
          return myArray[i];
      }
  }
}
const resultObj= search(value, GetAppointmentValue?.data||dumyData);
const getMarkedDates = (state) => {
    const markedDates = {};
    markedDates[markedDates] = { selected: true };
    GetAppointmentValue?.data.forEach((state,index) => {
      markedDates[state.meeting_date] = {
        ...markedDates[state.meeting_date],
        marked: true,
        value:state
      };
    });
    return markedDates;
  };
  const getEventDateAndTime = (state) => {
    const markedDates = {};
    markedDates[markedDates] = { selected: true };
    GetAppointmentValue?.data.forEach((state,index) => {
      markedDates[state.meeting_date] = {
        ...markedDates[state.meeting_date],
        marked: true,
        value:state
      };
    });
    
    setvalue(markedDates)
    return markedDates;
  };
  const renderItem= ({item})=>{
    let d = new Date(item.meeting_date);
    let date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    let time = `${d.getHours()}:${d.getMinutes()}`;
      return(
          <View  style={{width:width*.92,borderBottomWidth:.2,borderColor:'#BFAB88',flexDirection:'row',padding:5,marginBottom:15,justifyContent:'center',alignItems:'center'}}>
    <View style={{height:33,width:33,backgroundColor:'#BFAB88',borderRadius:22,marginRight:17,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#fff'}}>{value.slice(8, 10)}</Text></View>
          <View style={{marginLeft:12,justifyContent:'flex-end'}}>
            <Text style={{fontSize:14,color:'#9A9A9A'}}>{`Date :- ${date}`}</Text>
            <Text style={{fontSize:14,color:'#9A9A9A'}}>{`Time :- ${item.meeting_time.slice(0, 5)}`}</Text>
            <Text style={{fontSize:14,color:'#9A9A9A'}}>{`Address :- ${item.address}`}</Text>
            <Text style={{fontSize:14,color:'#9A9A9A'}}>{`Email Address :- ${item.email}`}</Text>
            <View >  
            </View>
          </View>
         </View>
      )
  }
  return (
    <View style={styles.container}>
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, padding: 14, height: '10%', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Appointment')} >
        <Image source={ require('../../Constant/Assests/Images/back.png')} style={{ height:  43, width:  43, marginTop:'1%' }} />
      </TouchableOpacity>
      <Text style={{ fontSize: 28, color: '#393939', fontWeight: '500', marginLeft: '2%' , textAlign:'center'  }}>{'Appointment'}</Text>
       <TouchableOpacity onPress={()=> navigation.navigate('Appointment')} style={{height:40,width:40,borderRadius:33,backgroundColor:'#BFAB88',alignItems:'center',justifyContent:'center'}}>
       <Feather name={'list'} size={30} color={'#fff'} /> 
       </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:15}}>
      <TouchableOpacity onPress={()=>{setweekCalendar(false),setmonthCalendar(true),setdayCalendar(false)}} style={{alignItems:'center',marginRight:15}}>
      <AntDesign name={'calendar'} size={25} color={'grey'} /> 
      <Text style={{color:'grey',fontSize:14}}>Month</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{setweekCalendar(true),setmonthCalendar(false),setdayCalendar(false)}}  style={{alignItems:'center',marginRight:15}}>
      <AntDesign name={'calendar'} size={25} color={'grey'} /> 
      <Text style={{color:'grey',fontSize:14}}>Week</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{setdayCalendar(true),setmonthCalendar(false),setweekCalendar(false)}} style={{alignItems:'center'}}>
      <AntDesign name={'calendar'} size={25} color={'grey'} /> 
      <Text style={{color:'grey',fontSize:14}}>Day</Text>
      </TouchableOpacity>
      </View>
    { dayCalendar &&

    
    <EventCalendar

    events={Dateitem}
    width={width}
    size={60}
    scrollToFirst={true}
    renderEvent={(event, j) => {
     
      let startTime = event.start.slice(11,16)
      let email = event.title
      let address =  event.summary
      let endTime =  event.end.slice(11,16)
      return (
        <View key={j}>
          <View style={{flex:1,justifyContent:'space-between'}}>   
          <Text style={{fontSize:12,fontWeight:'bold',color:'#BFAB88',marginRight:14}}>Start time:- {startTime}</Text>   
           <Text style={{fontSize:12,fontWeight:'bold',color:'#BFAB88'}}>End Time :-{endTime}</Text>  
           </View>
           {/* <View style={{flexDirection:'row'}}>
           <Text style={{fontSize:12,fontWeight:'bold',color:'#BFAB88',marginRight:14}}>Address :-{address}</Text>   
           <Text style={{fontSize:12,fontWeight:'bold',color:'#BFAB88'}}>Email  :-{email}</Text>   

            </View> */}
   
        </View>
      )
    }}
  />}

{ weekCalendar && <Agenda

    items={items}
    onDayPress={(day)=>toggleOpen(day)}
    loadItemsForMonth={(day)=>loadItems(day,state)}
    selected={new Date()}
    refreshControl={null}
    showClosingKnob={true}
    refreshing={false}
    markedDates={getMarkedDates()}
    renderItem={renderItemCard}
  />}
      { monthCalendar && <Calendar
          onDayPress={(day)=>toggleOpen(day)}
          style={styles.calendar}
          hideExtraDays
         markedDates={getMarkedDates(state)}
         enableSwipeMonths={true}
          theme={{
            selectedDayBackgroundColor: '#BFAB88',
            todayTextColor: '#BFAB88',
            arrowColor: '#BFAB88',
          }}
        />}
  
{  monthCalendar &&    <View style={{alignItems:'center',padding:12,backgroundColor:'#BFAB88'}}><Text style={{color:'#fff',fontSize:15,fontWeight:'bold'}}>Appointments</Text></View>
}
 { monthCalendar && foundValue?.length > 0 ?   <FlatList
   data={foundValue} 
   renderItem={renderItem}
   keyExtractor={item => item.id} 
  horizontal={false}
  showsVerticalScrollIndicator={false}

  
 /> :  monthCalendar && <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
 <MaterialIcons name={'event-busy'} size={45} color={'lightgrey'} /> 
<Text style={{ padding: 20, fontSize: 16, color:'lightgrey', paddingBottom: 10,textAlign:'center' }}>No Appointment at the moment</Text>
</View> 
 }
    </View>
  )
}

export default CalendarView
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    calendar: {
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 350
      }
  });
 