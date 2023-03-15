import React, { useEffect, useMemo, useState,useContext } from "react";
import { Controller } from "react-hook-form";
import { Alert, FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { LeadContext } from '../Providers/LeadProvider';
import { Icon } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Error } from './CustomInput'
import { call } from "react-native-reanimated";
 const  CustomPicker = ({ label, options, containerStyle, controllerProps, leftIconProps, emptyMessage, style, resetOn = [] }) => {
    const [listModalVisible, setListModalVisibility] = useState(false)
    const {  setcontrollerValue,controllerValue } = useContext(LeadContext);

    const onPress = () => {
        if (emptyMessage && options.length == 0) Alert.alert(label, emptyMessage)
        if (options.length != 0) setListModalVisibility(true)
    }


    return (

        <View style={containerStyle} >
            <Controller  {...controllerProps}
                render={({ field: { onChange, onBlur, value } }) => {
                    setcontrollerValue(value)
                    useEffect(() => onChange(undefined), resetOn)

                    return (
                        <View>
                            {/* <Text style={{ fontWeight: '500', paddingBottom: 4 }} >{label}</Text> */}
                            <View style={{ backgroundColor: 'white', borderRadius: 4,  borderWidth: 1, paddingHorizontal: 5, color:'black', ...style }}>
                                <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingLeft: 8 }} >
                                    {leftIconProps && <Icon containerStyle={{ marginRight: 10, }} {...leftIconProps} color={Colors.blue} />}
                                    <Text style={{ color: value ? '#30046B' : 'grey', fontSize: 15, justifyContent: 'center',paddingHorizontal:8 }}  >{value ? options?.find(option => option.value == value)?.label : 'Select'}</Text>
                                    <Icon name='expand-more' containerStyle={{ marginLeft: 'auto' }} size={30} color={Colors.black50} />
                                </TouchableOpacity>

                                <ListModal
                                    onSelect={onChange}
                                    value={value}
                                    options={options}
                                    dismiss={() => setListModalVisibility(false)}
                                    label={label}
                                    visible={listModalVisible} />

                            </View>
                        </View>

                    )
                }}
            />
            <Error
                error={controllerProps.errors[controllerProps.name]}
                label={label ? label : textInputProps.placeholder}
            />
        </View>
    )
}
export default CustomPicker;
const ListModal = ({ visible, dismiss, label, onSelect, value, options }) => {
    const insets = useSafeAreaInsets()
    const onListItemPress = value => {

        onSelect(value)
        dismiss()
    }

    return (
        <Modal
            visible={visible}
            transparent
            statusBarTranslucent
            presentationStyle='overFullScreen'
            animationType="fade" >
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', padding : 20 }} >
                <TouchableOpacity activeOpacity={1} onPressIn={dismiss} style={{ backgroundColor : '#00000040', position : 'absolute', top : 0, right : 0, left : 0, bottom : 0 }} />
                <TouchableOpacity activeOpacity={1} style={{ maxHeight: 400, backgroundColor: 'white', borderRadius: 15, shadowOpacity: .6, shadowRadius: 40 }} >

                    <View style={{ padding: 15, backgroundColor:'#30046B', borderTopLeftRadius: 15, borderTopRightRadius: 15, }} >
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#BFAB88' }} >{label}</Text>
                    </View>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ overflow: 'hidden', borderRadius: 15, borderTopLeftRadius: 0, borderTopRightRadius: 0, }}
                        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#e5e5e5' }} />}
                        contentContainerStyle={{  flexGrow: 1, }}
                        renderItem={({ item }) => <ListItem selected={value == item.value} item={item} onPress={() => onListItemPress(item.value)} />}
                        data={options}
                    />
                </TouchableOpacity>
            </View>
        </Modal >
    )
}

const ListItem = ({ item, onPress, selected }) => {

    return (
        <TouchableOpacity onPress={onPress} style={{ padding: 25, backgroundColor: selected ? '#eee' : 'white',borderRadius:12 }} >
            <Text style={{color:'#30046B',fontSize:14}}>{item.label}</Text>

        </TouchableOpacity>
    )
}
