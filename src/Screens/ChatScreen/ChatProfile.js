import React, {useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { navigationRef } from '../../Navigation';
const {width, height} = Dimensions.get('window');
const ChatProfile = ({navigation,route}) => {
  const item = route.params.params
  console.log(item)
    const data =[
        {
            name :'person',
            text:item.name
        },
        {
            name :'mail',
            text:item.to_email
        },
        {
            name :'call',
            text:'9100XXXXXXX'
      
        }
    ]
  return (
    <View style={{flex:1}}>
         <View
          style={{
          width: width,
          backgroundColor: '#fff',
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
          navigation.goBack()
          }}>
          <Image
            source={require('../../Constant/Assests/Images/back.png')}
            style={{height: 35, width: 35, marginTop: '1%'}}
          />
        </TouchableOpacity>
       
      </View>
      <View style={{marginTop:40}}>
       { data?.map((res)=>(
        <View style={{flexDirection:'row',alignItems:'center',padding:20}}>
        <MaterialIcons
                    name={res?.name}
                    size={20}
                    color={'#BFAB88'}
                    style={{marginRight: 14}}
                  />
                  <Text style={{fontSize:18,color:'#30046B'}}>{res?.text}</Text>
             { res?.name=='call' && <View style={{flexDirection:'row',marginLeft:140}}>
                <TouchableOpacity
                 onPress={() => {navigation.navigate("MessageScreen",{item})}}>
                  <MaterialCommunityIcons
                    name={'message-processing-outline'}
                    size={28}
                    color={'#BFAB88'}
                    style={{}}
                  />
                </TouchableOpacity>
                </View>}

        </View>))}
    
      </View>
    </View>
  )
}

export default ChatProfile;
