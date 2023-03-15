import { View, Text, Image, TouchableOpacity, StatusBar, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import CustomInput from '../../Components/CustomInput'
import { useForm } from 'react-hook-form'
import ButtonInput from '../../Components/ButtonInput'
import BackgroundElement from '../../Components/BackgroundElement'
import useLoadingFn from '../../Hooks/useLoadingFn'
import { AuthContext } from '../../Providers/AuthProvider';

const ResetPassword = ({ navigation, route }) => {
  const [passwordVisible, setPasswordVisibility] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const { API_CALL, userData } = useContext(AuthContext)
  const resetpassword = useLoadingFn(API_CALL.resetpassword)

  var email = route.params.email
  
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();
  // const onSubmit =  data => {
  //   ResetApi({...data,email:email})
  //  


  // }
  const onSubmit = (data) => {
    
    resetpassword({
      params:  { ...data, email: email  },
      onSuccess: () => {
        Alert.alert("Success", 'Reset Password Successfully');
        navigation.navigate('Login')
      },
    })
  }
  // const ResetApi = async (data) => {
  //   setisLoading(true)
  //     
  //     return fetch('http://54.201.160.69:3240/api/forgotPassword', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'

  //       },
  //       body: JSON.stringify(data)
  //     })
  //       .then((response) => response.json())
  //       .then((responseJson) => {
  //         
  //           if (responseJson.success==true) {
  //             navigation.navigate('Login')
  //           }else{
  //             alert(responseJson.message)
  //           }
  //         })
  //     .catch((error) => {

  //     });

  //   }
  return (
    <View style={{ flex: 1, backgroundColor: '#30046B', }}>
      <StatusBar barStyle='light-content' translucent={false} backgroundColor={'#30046B'} />

      <BackgroundElement bottomRightTriangle />
      <View style={{ marginLeft: 20, marginTop: 25 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../Constant/Assests/Images/backIcon.png')} style={{ height: 40, width: 50, }} resizeMode='contain' />
        </TouchableOpacity>
        <Text style={{ fontSize: 38, fontWeight: 'bold', color: 'white', marginTop: 45, marginLeft: 13, marginBottom: 20 }}>Reset Password</Text>
      </View>
      <CustomInput
        label={' PASSWORD '}
        rightIconProps={{ name: passwordVisible ? 'eye' : 'eye-off', onPress: () => setPasswordVisibility(!passwordVisible) }}
        textInputProps={{ placeholder: '* * * * * * * *', autoCapitalize: 'none', secureTextEntry: !passwordVisible }}
        controllerProps={{ name: 'new_password', control, errors, rules: { required: true }, }}
      />
      <CustomInput
        label={' CONFIRM PASSWORD '}
        rightIconProps={{ name: confirmPassword ? 'eye' : 'eye-off', onPress: () => setConfirmPassword(!confirmPassword) }}
        textInputProps={{ placeholder: '* * * * * * * *', autoCapitalize: 'none', secureTextEntry: !confirmPassword }}
        controllerProps={{ name: 'confirm_password', control, errors, rules: { required: true }, }}
      />
      <ButtonInput navigate={handleSubmit(onSubmit)} btnName={'Save'} clr />

    </View>
  )
}

export default ResetPassword
