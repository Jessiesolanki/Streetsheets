import { Text    ,TouchableOpacity} from 'react-native'
import React ,{useState,useContext} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign'

const DatePicker = ({start,setstart,value,setValue,datepicker,style}) => {
    const [datePicker, setDatePicker] = useState(false);
    const [isDisplayDate, setShow] = useState(false);
  
 const props = '1';
       const  showDatePicker=()=> {
        setShow(true)
        setDatePicker(true);
      };
      const onDateSelected =(event, value)=> {
       
          setstart(value);
          setShow(false)
          setDatePicker(false);
    
      };
      var month = start.getMonth() + 1;
if(month <= 9)
    month = '0'+month;

var day=start.getDate();
if(day <= 9)
    day = '0'+day;
  return (
    <TouchableOpacity onPress={()=>showDatePicker(props)} style={{borderWidth:0.5,width:'80%',height:'70%',borderRadius:4,borderColor:'#30046B',flexDirection:'row',justifyContent:'space-around',alignItems:'center',...style}}>
    {/* <TextInput
  placeholderTextColor={'#30046B'}
style={{marginLeft:12,color:'#30046B'}}
onChangeText={  props == '1' ? onDateSelected : setValue}
value={ props == '1' ? start.getFullYear() + "-" + month + "-" + day:value }
placeholder="2022/06/20"
keyboardType="numeric"
/> */}

<Text style={{color:'#000',fontSize:16}}>{props == '1' ? start.getFullYear() + "-" + month + "-" + day:value}</Text>
{isDisplayDate && (
<DateTimePicker
   value={start}
   mode={'date'}
   display={'default'}
   is24Hour={true}
   onChange={onDateSelected}
  //  tileDisabled={tileDisabled}
  
 />)}
 
<AntDesign name={"caretdown"}  size={10} color={'grey'} />

   
    </TouchableOpacity>
  )
}

export default DatePicker