import { View, Text,TouchableOpacity,Image,StyleSheet } from 'react-native'
import React from 'react'

const ButtonInput = ({navigate,btnName,clr,add,white,heightnote,style}) => {
  return (<>
   { add ? 
    <View style={{}}>
    <TouchableOpacity elevation={5} onPress={navigate} style={[styles.button,styles.shadowProp,{ backgroundColor:clr? '#BFAB88':'#30046B',flexDirection:'row',justifyContent:'space-between',padding:20,marginTop:20,...style}]} >
    <Text style={{fontSize:16,color:'white',fontWeight:'bold'}}>{btnName}</Text>
    <Image source={require('../Constant/Assests/Images/add.png')} style={{height: 25, width:25}} resizeMode='cover'/>
    </TouchableOpacity>                                         
    </View>
:
 <View style={{}}>
<TouchableOpacity elevation={5} onPress={navigate} style={[styles.button,styles.shadowProp,{  backgroundColor:clr ? '#BFAB88':'#30046B', height:heightnote?44:68,}]} >
<Text style={{fontSize:16,color:'white',fontWeight:'bold'}}>{btnName}</Text>
</TouchableOpacity>                                         
</View>
}
</> )
}

export default ButtonInput
const styles = StyleSheet.create({
    button:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom:15,
        shadowColor: '#52006A',
        borderRadius:5,
        width:'88%',
        alignSelf:'center',
      
      },
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
  })