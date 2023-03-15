import { View, Text, Alert, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ButtonInput from '../../Components/ButtonInput'  
import Header from '../../Components/Header';
import  { LeadContext } from '../../Providers/LeadProvider';
import useLoadingFn from '../../Hooks/useLoadingFn'
import { hp } from '../../Components/Responsive';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {AuthContext} from '../../Providers/AuthProvider';
import { image_base_url } from '../../Providers/Index';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const { width, height } = Dimensions.get('window');

const LeadScreen = ({ navigation }) => {
  const {setRefreshLead} = useContext(AuthContext);

  const { API_CALLS, GetLead,offSet, setoffSet,setAddress} = useContext(LeadContext)
  const getCountry = useLoadingFn(API_CALLS.getCountry)
  const deleteLead = useLoadingFn(API_CALLS.deleteLead)
  const GeteditDetails = useLoadingFn(API_CALLS.GeteditDetails)
  const getLeadEditId = useLoadingFn(API_CALLS.getLeadEditId)
  const getStatusNote = useLoadingFn(API_CALLS.getStatusNote)
  const getPipelineList = useLoadingFn(API_CALLS.getPipelineList);
  const getLead = useLoadingFn(API_CALLS.getLead)
  const getTimeZoneList = useLoadingFn(API_CALLS.getTimeZoneList);
  const [show, setShow] = useState(false)
const [loading, setLoading] = useState(false);

useEffect((value) => {
  getTimeZoneList({ params: {}, onSuccess: () => { } });
   getLead({params:{}, onSuccess: () =>{ }})},[])
useEffect(() => {}, [GetLead])
useEffect(() => {  getPipelineList({ params: {}, onSuccess: () => { } })}, [])
 const Codes = ()=>{
  setAddress('')
  getCountry({params:{}, onSuccess: () =>{navigation.navigate('AddLead') }})

}
const getData =()=>{
  setLoading(true);
  getLead({params:{page:offSet}, onSuccess: () =>{setoffSet(offSet+1);
   setLoading(false)   }})
}
const renderFooter = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={getData}
        style={styles.loadMoreBtn}>
        <Text style={styles.btnText}>Load More</Text>
        {loading ? (
          <ActivityIndicator
            color="white"
            style={{marginLeft: 8}} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};
const onDelete  =(value)=>{
  deleteLead({params:{id:value}, onSuccess: () =>{ 
    getLead({params: {}, onSuccess: () => {} })
  },screenName:'Lead'})
  setShow(false)
}
const onRefresh =()=>{
  getLead({params:{}, onSuccess: () =>{setoffSet(2)  }})
}
useEffect(() => {
  setRefreshLead(true)
  getStatusNote({params:{},onSuccess: () =>{ },screenName:'status'})
}, [])
  const renderItemVertical = ({ item, index }) => {

    const editAndDelete =(index,item)=>{
  
      if(item===show){
        
      setShow('')
      }else{
        setShow(item)
      }
      }
      
      const onLeadDetails =(value)=>{
        getLeadEditId({params:{id:value}, onSuccess: () =>{ 
        navigation.navigate('LeadtDetails')
      },screenName:'Lead'})
    }
  
    const editFn =(value)=>{
      GeteditDetails({params:{id:value}, onSuccess: () =>{ 
        setShow(false)
        navigation.navigate("EditLead")
      
      },screenName:'Lead'})
  }




    return (<>
      <TouchableOpacity elevation={5} onPress={()=>onLeadDetails(item.id)} style={{ paddingRight:120, marginBottom: 15, backgroundColor: 'white', alignItems: 'flex-start', justifyContent: 'center', borderWidth: .4, borderRadius: 5, borderColor: 'white', padding: 12 }}>
        <View>
        {GetLead?.permission.includes('edit_lead_role')?
         <TouchableOpacity key={index} style={{alignSelf:'flex-end',marginRight:-88}} onPress={() =>{editAndDelete(index,item.id)}}>
           
            <Image source={require('../../Constant/Assests/Images/dot.png')} style={{ height: 27, width: 27}} resizeMode='contain' />
           
          </TouchableOpacity>:null}
         { show === item.id && <View elevation={2} style={{height:60,width:hp(12),position:'absolute',right:-108,top:32,borderRadius:7,borderWidth:.9,borderColor:'#00000029',backgroundColor:'white',padding:6}}>
          <TouchableOpacity onPress={()=>{editFn(item.id)}}>
          <Text style={{fontSize:14,color:'#9A9A9A',marginBottom:5}}>Edit</Text>
          </TouchableOpacity>
          {GetLead?.permission.includes('delete_lead_role')? <TouchableOpacity onPress={()=>{onDelete(item.id)}}>
          <Text style={{fontSize:14,color:'#9A9A9A'}}>Delete</Text>
          </TouchableOpacity>:null}
          </View>}

          <Text style={{ fontSize: 17, color: '#203152', marginLeft: 6, fontWeight: '700' }}>{item?.name}</Text>
          <Text style={{ fontSize: 12, color: '#929292', marginLeft: 6, marginTop: 5 }}>{item?.email}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, }}>
            <Image source={require('../../Constant/Assests/Images/calllead.png')} style={{ height: 30, width: 30 }} />
            <Text style={{ fontSize: 13, color: '#30046B', marginLeft: 6, marginTop: 5, fontWeight: '500' }}>{item?.phone}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, width: width / 1.8,marginBottom:8 }}>
            <Image source={require('../../Constant/Assests/Images/addresss.png')} style={{ height: 30, width: 30 }} />
            <Text style={{ fontSize: 13, color: '#30046B', marginLeft: 6, marginTop: 5, fontWeight: '500' }}>{item?.address}</Text>
          </View>
        
          <View style={{width:'90%',paddingHorizontal:10,backgroundColor:'#BFAB88',borderRadius:3,flexDirection:'row',alignItems:'center',height:35}}>
        { item?.stage_name ==null ?<Text style={{ fontSize: 13, color: '#30046B', marginLeft: 6, fontWeight: '500'}}>Stage Not Available</Text> :<Image  source={{uri: image_base_url + item?.stage_image}} style={{ height:30, width:30 ,borderRadius:22}} />}

       <Text style={{ fontSize: 13, color: '#fff', marginLeft: 6, fontWeight: '500' }}>{item?.stage_name}</Text>
       </View>
     
        </View>
      </TouchableOpacity>
     

    </>)
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: width, flexDirection: 'row', marginTop: '2%', marginLeft: '5%', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={() => { navigation.openDrawer() }} >
        <Image source={require('../../Constant/Assests/Images/menu.png')} style={{ height: 45, width: 45, marginTop: '1%' }} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.navigate('search' , {id:1})} style={{ marginLeft: '15%' }}>
          <Image source={require('../../Constant/Assests/Images/searchicon.png')} style={{ height: 45, width: 45, marginHorizontal: 8, marginTop: '1%' }} />
        </TouchableOpacity >
        </View>
        </View>
    {GetLead?.permission.includes('add_lead_role')? <ButtonInput btnName={'Add a New Lead'} add navigate={()=>{ setAddress('')
  getCountry({params:{}, onSuccess: () =>{navigation.navigate('AddLead') }})}} />:null}
     {GetLead?.permission.includes('view_lead_role')? <View style={{ flex:1, alignItems: 'center' }}>
      {GetLead?.data?.length > 0 ? <FlatList
          data={GetLead?.data}
          renderItem={renderItemVertical}
          keyExtractor={item => item.id}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={GetLead?.data.length == 10 ? renderFooter :null}
          onEndReachedThreshold={0.1}
           enableEmptySections={true}
        
        />
        : <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
        <FontAwesome5 name={'users'} size={45} color={'lightgrey'} /> 
<Text style={{ padding: 20, fontSize: 16, color:'lightgrey', paddingBottom: 10,textAlign:'center' }}>No Lead at the moment</Text>
<TouchableOpacity
            onPress={() => {
              onRefresh();
            }}>
            <FontAwesome name={'refresh'} size={45} color={'#30046B'} />
          </TouchableOpacity>
</View>
      }
      </View>:null}
    </View>
  )
}

export default LeadScreen
const styles = StyleSheet.create({

  text: {

    backgroundColor: 'white',
    zIndex: 1,
    shadowColor: "#30046B",
    position: "absolute",
    top: -11,
    left: 50,

    margin: 2,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#30046B',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});  