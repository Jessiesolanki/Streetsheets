import { Dimensions,View, Text ,Image,TouchableOpacity,StyleSheet,Pressable,StatusBar,ImageBackground} from 'react-native'
import React from 'react'
import ButtonInput from '../../Components/ButtonInput'
import  Colors from '../../Constant/Colors/Index'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeStack, navigate, ROUTES } from '../../Navigation/Index';
const { height, width } = Dimensions.get('window')

const GetStarted = ({navigation}) => {
  const saveLogin = async () => {
    await AsyncStorage.setItem('FirstTime', "true")

    changeStack(ROUTES.AUTH.LOGIN)
}


  return (
    <View  style={{flex:1,backgroundColor:Colors.white}}>
        <StatusBar barStyle='light-content' translucent backgroundColor={Colors.splash_bg} />
        <View style={{height:height/1.53,width:'100%',backgroundColor:'blue                                                        '}}>
        <Image source={require('../../Constant/Assests/Images/getStarted.png')} style={{alignItems:'center',height:'100%',width:'100%'}} resizeMode='cover'/>
        </View>
        <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',height:'16%',width:width/1.2,marginBottom:12}}>
        <Text style={{fontSize:36,fontWeight:'bold',color:'#20130B',marginBottom:15}}>Lorem Ipsum</Text>
        <Text style={{fontSize:16,fontWeight:'bold',color:'#A3A3A3'}}>Lorem ipsum dolor sit amet, consetetur elitr, sedeirmod tempor invidunt ut</Text>
        </View>
        <ButtonInput navigate ={()=>{saveLogin()}} btnName ={'Get Started!'} />
  
        </View>
    
  )
}

export default GetStarted
const styles = StyleSheet.create({
   
})