import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import CustomInput from '../../Components/CustomInput';
import Colors from '../../Constant/Colors/Index';
import ButtonInput from '../../Components/ButtonInput';
import BackgroundElement from '../../Components/BackgroundElement';
import {AuthContext} from '../../Providers/AuthProvider';
import useLoadingFn from '../../Hooks/useLoadingFn';
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('window');
import messaging from '@react-native-firebase/messaging';
const Login = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    watch,
  } = useForm();
  const {API_CALL, userData,GetLocation,locationKey, setlocationKey} = useContext(AuthContext);
  const login = useLoadingFn(API_CALL.login);
  const getUser = useLoadingFn(API_CALL.getUser);
  const getAllLocation = useLoadingFn(API_CALL.getAllLocation);
  const [FcmToken,setFcmToken]= useState(null)

  let deviceId = DeviceInfo.getDeviceToken();
console.log(deviceId,'oooooo')
  const [passwordVisible, setPasswordVisibility] = useState(false);
  useEffect(() => {}, [userData]);
  const Getid =async()=>{  
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    setFcmToken(token)
    var uniqueId = await DeviceInfo.getUniqueId();
  }
  useEffect(()=>{Getid()},[])
  const onSubmit = data => {
    login({ params: {...data, device_token: FcmToken},
      onSuccess: () => {
        getAllLocation({ params:{}, onSuccess: () => {navigation.navigate('AgencyModal')}}) }, });
       };
  return (
    <View style={{flex: 1, backgroundColor: Colors.splash_bg}}>
      <StatusBar
        barStyle="light-content"
        translucent={false}
        backgroundColor={'#30046B'}
      />

      <BackgroundElement bottomRightTriangle />
      <Image
        source={require('../../Constant/Assests/Images/logo3x.png')}
        style={{height: '30%', width: '100%'}}
        resizeMode='center'
      />
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 40,
          fontWeight: 'bold',
          marginLeft: '10%',
          marginBottom: 13,
        }}>
        Login
      </Text>
      <CustomInput
        label={' EMAIL '}
        textInputProps={{
          placeholder: 'Enter email address',
          keyboardType: 'email-address',
          autoCapitalize: 'none',
        }}
        controllerProps={{
          name: 'email',
          control,
          errors,
          rules: {
            required: true,
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          },
        }}
      />
      <CustomInput
        label={' PASSWORD '}
        rightIconProps={{
          name: passwordVisible ? 'eye' : 'eye-off',
          color:'white',
          onPress: () => setPasswordVisibility(!passwordVisible),
        }}
        textInputProps={{
          placeholder: '* * * * * * * *',
          autoCapitalize: 'none',
          secureTextEntry: !passwordVisible,
        }}
        controllerProps={{
          name: 'password',
          control,
          errors,
          rules: {required: true},
        }}
      />
      <ButtonInput navigate={handleSubmit(onSubmit)} btnName={'Login'} clr />
      <Pressable onPress={() => navigation.navigate('ForgotPassword')} 
      style={{width:150}}>
        <Text style={{color: 'white', fontSize: 12, marginLeft: 35}}>
          Forgot Password ?
        </Text>
      </Pressable>
    </View>
    
  );
};
export default Login;
const styles = StyleSheet.create({
  text: {
    backgroundColor: Colors.splash_bg,
    paddingHorizontal: 3,
    marginStart: 10,
    zIndex: 1,
    elevation: 1,
    shadowColor: 'white',
    position: 'absolute',
    top: -8,
    left: 50,
    alignSelf: 'flex-start',
  },
});
