import { View, Text, Image, Dimensions, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../../Components/Header'
import Video from 'react-native-video'
import { image_base_url } from "../../Providers/Index";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const VideoScreen = (props) => {
  const navigation = useNavigation();
  let { video, title, percentage, description, id } = props.route.params.item


  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, padding: 10, marginLeft: '2%', height: '10%', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeStack', { screen: 'Videolibrary' })} >
          <Image source={require('../../Constant/Assests/Images/back.png')} style={{ height: 43, width: 43, marginTop: '1%' }} />
        </TouchableOpacity>

      </View>
      <Video
        source={{ uri: image_base_url + video }}
        style={{ width: 440, height: 400 }}
        controls={true}
        audioOnly={true}
        resizeMode="cover"
        ref={(ref) => {

        }} />
      <View style={{ height: height * .65, width: '100%', backgroundColor: 'white', position: 'absolute', bottom: -230, borderRadius: 44, padding: 22, paddingBottom: 150 }}>
        <ScrollView style={{ height: height }}>
          <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 28, color: '#000000', fontWeight: 'bold' }}>{title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EntryScreen', { id })}>
              <AntDesign name={'rightcircle'} size={43} color={'#BFAB88'} />
            </TouchableOpacity>
          </View>
          {/* <Text style={{ color: '#A4A4A4', fontSize: 14 }}>Suzat, Senior Manager</Text> */}
          <Text style={{ fontSize: 18, color: '#000000', fontWeight: 'bold' }}>About This Video</Text>
          <Text style={{ fontSize: 15, color: '#0E2A47', fontWeight: '500' }}>{description}</Text>
        </ScrollView>
      </View>

    </View>
  )
}

export default VideoScreen