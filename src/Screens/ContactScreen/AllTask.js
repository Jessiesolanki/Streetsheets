import { View, Text,Dimensions,Image,TouchableOpacity,FlatList ,ActivityIndicator,StyleSheet,Modal} from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
const {width,height} = Dimensions.get('window');
import useLoadingFn from '../../Hooks/useLoadingFn'
import { LeadContext } from '../../Providers/LeadProvider'
import { image_base_url } from "../../Providers/Index";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Picker } from '@react-native-picker/picker';
import ButtonInput from '../../Components/ButtonInput';
import {useForm} from 'react-hook-form';
const Task = ({navigation,id}) => {

  const { API_CALLS, GetNoteStatus, GetTaskList,GetLeadId} = useContext(LeadContext)
  const [refreshing, setRefreshing] = useState(false);
  const getTaskListById = useLoadingFn(API_CALLS.getTaskListById);
  const getAddStatus = useLoadingFn(API_CALLS.getAddStatus);

const [toggle, settoggle] = useState(false)
const [selectedStateValue, setStateValue] = useState('');
const [ismodalVisibleStatus, setismodalVisibleStatus] = useState(false);
const [taskId, settaskId] = useState('')

const getTask = useLoadingFn(API_CALLS.getTask);
const onRefresh =()=>{
  getTask({params: {}, onSuccess: () => { setRefreshing(false);}, screenName: 'task'});  

}
useEffect(() => {
getTask({params: {}, onSuccess: () => { setRefreshing(false);}, screenName: 'task'});  

}, [toggle])

const openModal=(id)=>{
  settaskId(id)
  setismodalVisibleStatus(true)
}
const onSubmit = (item) => {
  getAddStatus({
    params: {
      task_status: item,
      id:taskId,
    },
    onSuccess: () => {
      setismodalVisibleStatus(false);
      getTask({params: {}, onSuccess: () => { setRefreshing(false);}, screenName: 'task'});  

    },
    screenName: 'AllTask',
  });
};

const renderItem= ({item})=>{
  let d = new Date(item.created_at);
  let date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  let time = `${d.getHours()}:${d.getMinutes()}`;
    return(
        <View  style={{width:width*.92,borderBottomWidth:.2,borderColor:'#0D172433',flexDirection:'row',padding:12,marginBottom:22,}}>
        <Image  source={{uri:image_base_url+item?.user?.image}} style={{height:70, width:70,borderRadius:12}} />
        <View style={{justifyContent:'space-evenly',marginLeft:12}}>
          <Text style={{fontSize:13,color:'#9A9A9A',marginBottom:7}}>{date}</Text>
          <Text style={{fontSize:18,fontWeight:'500',color:'#000',marginBottom:3}}>{item.name}</Text>
          <Text style={{fontSize:14,color:'#9A9A9A',marginBottom:8}}>{item.email}</Text>
          <View >

            <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center', marginTop: 6,backgroundColor:item?.task_status == 'In-progress' ? '#20EB27' : '#30046B',borderRadius:20,padding:4,width:150}}>
              <Text style={{ fontSize: 14, color: '#fff', marginLeft: 6, fontWeight: '500' }}>{item?.task_status == null ? 'Empty Status':item?.task_status}</Text>
       </View>
          </View>
        </View>
             <TouchableOpacity
                     onPress={() => openModal(item.id)}
                    style={{marginLeft:45}}>
                    <Image
                      source={require('../../Constant/Assests/Images/noteedit.png')}
                      style={{height: 29, width: 29}}
                    />
                  </TouchableOpacity>
       </View>
    )
}

  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
         {/* {   listData?.data?.length > 0 ?   <View
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
                
                   
                  </View>
                  <TouchableOpacity
                     onPress={() => setismodalVisibleStatus(true)}
                    style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                    <Image
                      source={require('../Constant/Assests/Images/noteedit.png')}
                      style={{height: 29, width: 29}}
                    />
                  </TouchableOpacity>
                </View>:null} */}
       {refreshing ? <ActivityIndicator /> : null}
       <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, padding: 10, marginLeft: '2%', height: '10%', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} >
        <Image source={ require('../../Constant/Assests/Images/back.png')} style={{ height : 43, width:  43, marginTop: '1%' }} />
      </TouchableOpacity>    
      <Text style={{ fontSize: 28, color: '#393939', fontWeight: '500', marginLeft: '2%' , textAlign:'center'  }}>{'All Task'}</Text>
       <TouchableOpacity onPress={() => navigation.navigate('search',{id:4})} style={{}}>
        <Image source={require('../../Constant/Assests/Images/searchicon.png')} style={{ height: 43, width: 43, marginHorizontal: 20, marginTop:  '1%' }} />
      </TouchableOpacity >
    </View>
   {  <View style={{height:height/1.2,alignItems:'center',paddingVertical:12}}>
   {GetTaskList?.data?.length > 0 ? <FlatList
   data={GetTaskList?.data} 
   renderItem={renderItem}
   keyExtractor={item => item.id} 
  horizontal={false}
  showsVerticalScrollIndicator={false}

  
 /> : <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
 <FontAwesome5 name={'tasks'} size={45} color={'lightgrey'} /> 
<Text style={{ padding: 20, fontSize: 16, color:'lightgrey', paddingBottom: 10,textAlign:'center' }}>No Task at the moment</Text>
       <TouchableOpacity
            onPress={() => {
              settoggle(true);
            }}>
            <FontAwesome name={'refresh'} size={45} color={'#30046B'} />
          </TouchableOpacity>
</View>
}
 </View>}
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
                   <Picker style={{ marginBottom: 10 }} selectedValue={selectedStateValue} onValueChange={(itemValue) => setStateValue(itemValue)}>
                   {GetNoteStatus?.length > 0 ? GetNoteStatus?.map((item, index) => {
                     return <Picker.Item key={index} label={`${item?.status}`} value={`${item?.status}`} />
                   }) : null}
                 </Picker> :null}
                </View>
              </View>
            </View>
             <View style={{marginTop:25}}>
               <ButtonInput
                 navigate={()=>onSubmit(selectedStateValue)}
                 btnName={'save'}
                 heightnote
               />
             </View>
            
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Task
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