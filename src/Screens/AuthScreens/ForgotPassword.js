import { View, Text,Image,TouchableOpacity,StatusBar } from 'react-native'
import React ,{useState,useContext} from 'react'
import CustomInput from '../../Components/CustomInput'
import { useForm } from 'react-hook-form'
import ButtonInput from '../../Components/ButtonInput'
import BackgroundElement from '../../Components/BackgroundElement'
import useLoadingFn from '../../Hooks/useLoadingFn'
import  { AuthContext } from '../../Providers/AuthProvider';

const ForgotPassword = ({navigation}) => {
  const { API_CALL } = useContext(AuthContext)


    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const forgotpassword = useLoadingFn(API_CALL.forgotpassword)

    const onSubmit = (data) => {
      forgotpassword({
          params: data ,
          onSuccess: () =>  navigation.navigate('OtpVerification',{email:data.email}),
      })
    }
  return (
    <View style={{flex:1,backgroundColor:'#30046B',}}>
    <StatusBar barStyle='light-content'  translucent={false}  backgroundColor={'#30046B'} />

    <BackgroundElement bottomRightTriangle/>
         <View style={{marginLeft:20,marginTop:25}}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{width:50}}>
        <Image source={require('../../Constant/Assests/Images/backIcon.png')} style={{ height:40,width:50,}} resizeMode='contain' />
        </TouchableOpacity>
       <Text style={{fontSize:38,fontWeight:'bold',color:'white',marginTop:45,marginLeft:13,marginBottom:20}}>Forgot Password</Text>
       </View>
       <CustomInput
             label={' EMAIL '}
             textInputProps={{ placeholder: 'sales123@email.com',keyboardType: 'email-address', autoCapitalize: 'none' }}
             controllerProps={{ name: 'email', control, errors, rules: { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ }, }}
              />
             <ButtonInput navigate={handleSubmit(onSubmit)} btnName ={'Send Mail'} clr />

    </View>
  )
}

export default ForgotPassword