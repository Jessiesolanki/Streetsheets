import { View, Text ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const BackButton = ({navigateScreen}) => {
    const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row', marginTop:10, marginLeft: '2%', justifyContent: 'space-between',width:60 }}>
    <TouchableOpacity onPress={()=>navigation.navigate(navigateScreen)}>
      <Image source={require('../Constant/Assests/Images/back.png') } style={{height: 43,  width:  43,  marginTop: '1%',   }} />
    </TouchableOpacity>
    </View>
  )
}

export default BackButton