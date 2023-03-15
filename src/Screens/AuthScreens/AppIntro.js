import { StatusBar, View, Text, Image, TouchableOpacity, FlatList, I18nManager, ImageBackground, FlatListProps, NativeScrollEvent, Dimensions, ActionSheetIOS, ActivityIndicator } from 'react-native'
import React, { useState, useRef,useEffect } from 'react'
import AppIntroSlider from 'react-native-app-intro-slider';
import Colors from '../../Constant/Colors/Index'

const { height, width } = Dimensions.get('window')

const slides = [
  {
    key: 1,
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consetetur elitr, sedeirmod tempor invidunt ut',
    imageone: require('../../Constant/Assests/Images/appintroone.png'),
    imagetwo: require('../../Constant/Assests/Images/vectorOne.png'),
  },
  {
    key: 2,
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consetetur elitr, sedeirmod tempor invidunt ut',
    imageone: require('../../Constant/Assests/Images/appintrotwo.png'),
    imagetwo: require('../../Constant/Assests/Images/vectorTwo.png'),
  },
];
const AppIntro = ({ navigation }) => {



  const slider = useRef();


  const renderDoneButton = () => {
    return (
      <View style={{ bottom: 45, flexDirection: 'row', right: 25 }}>
        <TouchableOpacity onPress={() => slider.current.goToSlide(0, true)} >
          <Image source={require('../../Constant/Assests/Images/backButton.png')} style={{ height: 50, width: 50, marginRight: 12 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>{ navigation.navigate('GetStarted')}}>
          <Image source={require('../../Constant/Assests/Images/nextButton.png')} style={{ height: 50, width: 50 }} />
        </TouchableOpacity>
      </View>
    );
  };
  

  const VieWItem = ({ item, index }) => {
    return (
      <View style={{height:height/1.2}}>
          <Image source={item.imageone} style={{ alignItems: 'center', height:'76%',width:'100%',}} resizeMode='cover'/>
        <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', height: '18%', width: '80%', marginTop:'2%'}}>
          <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#20130B' }}>{item.title}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#A3A3A3' }}>{item.text}</Text>
        </View>

      </View>
    )
  }
  return (
    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center',backgroundColor:Colors.white }}>
            <StatusBar barStyle='light-content' translucent backgroundColor={Colors.splash_bg} />

      <AppIntroSlider
        data={slides}
        renderItem={VieWItem}
        dotStyle={{ backgroundColor: '#998FA2', right: 140, bottom: 50 }}
        activeDotStyle={{ backgroundColor: '#30046B', right: 140, bottom: 50 }}
        dotClickEnabled={false}
        renderNextButton={renderNextButton}
        renderDoneButton={renderDoneButton}
        ref={(ref) => (slider.current = ref)}
      />
    </View>

  )
}

export default AppIntro
const renderNextButton = () => {
  return (
    <View style={{ bottom: 45, right: 20 }}>
      <Image source={require('../../Constant/Assests/Images/nextButton.png')} style={{ height: 50, width: 50 }} />
    </View>
  );
};
