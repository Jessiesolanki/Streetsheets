import { Text, View ,StyleSheet,Image, Dimensions} from "react-native";
import React from 'react'
const {width} = Dimensions.get('window');
const Card = ({item}) => {
  return (
    <View elevation={8} style={[{width:width/2.5,height:'48%',backgroundColor:'white',alignItems:'center',borderRadius:12},styles.shadowProp]}>
    <View style={{}}>
    <Image source={item.img} style={{height: 149, width:173,borderTopRightRadius:12,borderTopLeftRadius:12}} resizeMode='cover'/>
    </View>
    <Text style={{fontSize:10,color:'#9A9A9A',marginLeft:6,marginTop:5}}>Assigned to</Text>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:5}}>
    <Text style={{fontSize:14,color:'#203152',marginLeft:6,marginTop:5}}>Marco Moreno</Text>
    <Image source={require('../Constant/Assests/Images/starone.png')} style={{height: 14, width:14}} />

    </View>
    </View>
  )
}

export default Card
const styles = StyleSheet.create({

    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
  })