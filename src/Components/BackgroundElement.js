import React from "react";
import { Dimensions, Image, View } from "react-native";
const {width}= Dimensions.get('window')

const BackgroundElement = ({ bottomRightTriangle }) => {
    return (
        <View style={{ position: 'absolute', 
              top: 0, 
              left:0, 
              right: 0, 
              bottom: 0 ,}} >
            {bottomRightTriangle && <Image source={require('../Constant/Assests/Images/splashDownImg.png')} 
                                           style={{ width:width, 
                                           height:'15%', 
                                           position: 'absolute', 
                                           bottom: 0, 
                                          
                                           resizeMode: 'contain' }} />}
        </View>
    )
}
export default BackgroundElement;