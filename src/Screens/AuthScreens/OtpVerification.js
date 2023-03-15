
import React, { useState,useContext,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { View, Text, TouchableOpacity } from 'react-native'

// import CustomButton from '../../Components/CustomButton'
// import ImageIcon from '../../Components/ImageIcon'
import ButtonInput from '../../Components/ButtonInput'
import OTPTextView from 'react-native-otp-textinput'
import { changeStack,ROUTES } from '../../Navigation'
import { AuthContext } from '../../Providers/AuthProvider';
import useLoadingFn from '../../Hooks/useLoadingFn'
import { Alert } from "react-native"
const  OtpVerification = ({navigation,route}) => {

  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [otp, setOtp] = useState('')
  const { password } = useContext(AuthContext)
  useEffect(() => {
    Alert.alert('otp',password?.message)

}, [password])
const mail = route.params.email
console.log(mail,otp,password?.data?.otp)
  const onSubmit = () => {
if(otp==password?.data?.otp){  
navigation.navigate('ResetPassword',{email:mail,otp:otp})
}else{
    Alert.alert('OTP', 'Enter otp is invaild ==>', password?.data?.otp)
  }
  }


  return (
    <View style={{ flex: 1 }} >
      <View style={{ flex: 1, backgroundColor:'#30046B', justifyContent: 'center', alignItems: 'center' }} >
        {/* <ImageIcon size={80} containerStyle={{ marginBottom: 40 }} icon={Icons.logo_in_bubble} /> */}
        <Text style={{color:'#fff',textAlign:'center',fontSize:28,fontWeight:'bold'}}>OTP Verification</Text>

      </View>
      <View style={{ flex: 1.8, backgroundColor:'#fff', borderTopLeftRadius: 60, marginTop: -60, padding: 30,borderTopRightRadius:60 }} >

 
          <Text style={{ textAlign: 'left', fontWeight: 'bold', color:'#000',fontSize:20,marginTop:25 }}>Enter 4 Digit Code </Text>
          <Text style={{ textAlign: 'left', color:'#000',fontSize:14, marginTop:5 }}>Enter the 4 digit code that you received on your email </Text>
     <View style={{padding:25,marginBottom:20,marginTop:10}}> 
        <OTPTextView
            style={{ borderWidth: 1, width: 40, height: 40, borderColor:'#000', borderRadius: 5, backgroundColor: '#fff', fontSize: 14, alignItems: 'center', }}
            handleTextChange={text => setOtp(text)}
            inputCount={4}
            keyboardType="numeric"
            fontSize={14}
            textAlign='center'
            alignItems='center'
            tintColor={'#000'}
          />
</View>
   
        <ButtonInput  navigate={handleSubmit(onSubmit)} btnName={"CONTINUE"} />

      </View>
    </View>

  )
}
export default OtpVerification;