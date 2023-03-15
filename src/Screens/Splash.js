import { View, Text ,Image,StatusBar} from 'react-native'
import React, { useContext, useEffect } from "react";
import Colors from '../Constant/Colors/Index';
import BackgroundElement from '../Components/BackgroundElement';
import { AuthContext } from "../Providers/AuthProvider";
const Splash = () => {
  const { userData,API_CALL } = useContext(AuthContext)

  const { redirect } = useContext(AuthContext)
  useEffect(() => { 
    setTimeout(redirect, 1500)
  }, [userData])
  return (
    <View style={{flex:1,backgroundColor:Colors.splash_bg,justifyContent:'center',alignItems:'center'}}>
      <BackgroundElement bottomRightTriangle/>
      <StatusBar barStyle='light-content'  translucent={false}  backgroundColor={'#30046B'} />
      <Image source={require('../Constant/Assests/Images/logo3x.png')} style={{height:175,width:140}}/>
      <Text style={{fontSize:40,fontWeight:'bold',color:'#fff',marginTop:15}}>Street Sheets</Text>
    </View>
  )
}

export default Splash