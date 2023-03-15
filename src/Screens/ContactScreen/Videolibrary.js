import { View, Text, Dimensions, Image, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Header from '../../Components/Header'
const { width, height } = Dimensions.get('window');
import useLoadingFn from '../../Hooks/useLoadingFn';
import { image_base_url } from "../../Providers/Index";
import { useNavigation } from '@react-navigation/native';

import { LeadContext } from '../../Providers/LeadProvider';
const Videolibrary = ({  }) => {

  const { LibraryVideo, API_CALLS } = useContext(LeadContext)
  const navigation = useNavigation()




 
  const renderItem = ({ item }) => {
    return (
  <View style={{ marginTop: 12 ,borderRadius:12}}>
      <TouchableOpacity onPress={() => navigation.navigate('VideoScreen', { screen: 'VideoScreen',item },item)}>
          <ImageBackground elevation={3} source={{uri: image_base_url+item.video_image}} imageStyle={{ borderRadius: 8 }} style={{ height: 160, width: 160, marginBottom: 12, marginLeft: 12, marginTop: 3 }}  resizeMode='contain'>
          <Text style={{ fontSize: 18, color: '#fff', position: 'absolute', bottom: 12, alignSelf: 'center' }}>{item?.title}</Text>
        </ImageBackground>
      </TouchableOpacity>

    </View>
  
  )
}
return (
  <View style={{ flex: 1, backgroundColor: 'white' }}>
    {/* <Header backbutton name={'Video Library'} text backnavigation /> */}
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, padding: 10, marginLeft: '2%', height: '10%', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} >
        <Image source={ require('../../Constant/Assests/Images/back.png')} style={{ height:  43, width:  43, marginTop:'1%' }} />
      </TouchableOpacity>
      <Text style={{ fontSize: 28, color: '#393939', fontWeight: '500', marginLeft: '2%', marginRight:  110 , textAlign:'center'  }}>{'Video Library'}</Text>

      </View>
    <View style={{ height: height / 1.2, alignItems: 'center', paddingBottom: 63 }}>
     { LibraryVideo?.permission.includes('view_video_role')?  <FlatList
        data={LibraryVideo?.data}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.id}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      />:null}

    </View>

  </View>
  )
}

export default Videolibrary