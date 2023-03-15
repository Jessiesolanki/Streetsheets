import { View, Text,TextInput,Image,Dimensions,TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { AuthContext } from '../Providers/AuthProvider';
import  { LeadContext } from '../Providers/LeadProvider';
import useLoadingFn from '../Hooks/useLoadingFn'
const { width, height } = Dimensions.get('window');
const Search = ({route,navigation}) => {
  const { userData, API_CALL} = useContext(AuthContext)
  const { API_CALLS, GetLead, } = useContext(LeadContext)
  const {latitude} = useContext(AuthContext);

  const getUser = useLoadingFn(API_CALL.getUser)
  const getLead = useLoadingFn(API_CALLS.getLead)
  const getContact = useLoadingFn(API_CALLS.getContact)
  const getTask = useLoadingFn(API_CALLS.getTask);
 
let {id} = route.params;

  const setisOnClickSearch = (value) => {
    switch(value){
      case 1:
        getLead({params:{search:searchText}, onSuccess: () =>{
          navigation.navigate('LeadScreen')
         }})
         break;
         case 2:
          getUser({
            params: {search:searchText}, onSuccess: () => { 
              navigation.navigate("MapStack",{screen:'MapScreen'})
        
            }})
            break;
            case 3:
            getContact({params:{search:searchText,latitude: latitude?.latitude, longitude: latitude?.longitude}, onSuccess: () =>{
              navigation.navigate('ContactScreen')
            },screenName:'contact'})
            break;
            case 4:
              getTask({params: {search:searchText}, onSuccess: () => {navigation.navigate('AllTask')}, screenName: 'task'});
              break;
            default:
              getUser({
                params: {search:searchText}, onSuccess: () => { 
                  navigation.navigate("MapStack",{screen:'MapScreen'})
            
                }})  
    }
  }
  //navigation.navigate("MapStack",{screen:'MapScreen'})
    const [searchText, setSearchText] = useState('')
  return (
    <View style={{height:height,backgroundColor:'#fff',alignItems:'center'}}>
   <TouchableOpacity onPress={()=>navigation.goBack()} style={{alignSelf:'flex-start',marginLeft:12}}>
<Image source={require('../Constant/Assests/Images/back.png')} style={{height: 38, width:38,marginTop:'2%'}}/>
</TouchableOpacity>
    <View    elevation={2}  style={{justifyContent:'space-evenly', alignItems: 'center', flexDirection: 'row',backgroundColor:'white',padding: 6, borderRadius: 36, borderWidth:.2, borderColor: '#00000029',marginTop:15,justifyContent:'center' }} >
   
    <TextInput
        returnKeyType='search'
        style={{width:width/1.3,marginLeft:15}}
        placeholder='Search.....'
        onChangeText={setSearchText}
        value={searchText}
        accessibilityTraits="search"
        accessibilityRole="search"  
    />
     <TouchableOpacity onPress={()=>{setisOnClickSearch(id)}}>
    <EvilIcons name='search' size={25} color={'black'} /> 
    </TouchableOpacity>
    <View style={{borderWidth:.4,height:25,marginHorizontal:3}}></View>
<TouchableOpacity onPress={()=>setSearchText(null)}>
<Image source={require('../Constant/Assests/Images/closesearch.png')} style={{ height: 14, width: 24 ,marginRight:6}} resizeMode='contain' />
</TouchableOpacity>

</View>
</View>
  )
}

export default Search