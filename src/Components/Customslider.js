import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";
import React, { useRef, useState } from 'react'
import { hp, wp } from './Responsive'
import MotionSlider from 'animate-slider';

export default function Customslider({ Cvalue }) {
    const [value, setvalue] = useState(24.8)


    return (
        <View style={{ width: 300, height: 80, marginTop: -12, justifyContent: "center", alignItems: "center" }}>
            {/* <Text>Customslider</Text>
             */}

            <MotionSlider
                // title={'Choose the desired temperature'}
                min={2}
                max={48}
                height={70}
                value={5}
                decimalPlaces={2}
                units={'º'}
                backgroundColor={['rgb(0, 0, 0)']}
                onValueChanged={Cvalue}
                // onPressIn={() => console.log('Pressed in')}
                // onPressOut={() => console.log('Pressed out')}
                // onDrag={() => console.log('Dragging')}
            />
        </View>
    )
}

const styles = StyleSheet.create({})