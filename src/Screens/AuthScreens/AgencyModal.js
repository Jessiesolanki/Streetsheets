import { View, Text,Modal,FlatList,Dimensions,Image,TouchableOpacity } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import {AuthContext} from '../../Providers/AuthProvider';
import {changeStack, ROUTES} from '../../Navigation/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

const AgencyModal = () => {
  const {GetLocation} = useContext(AuthContext);
  const [apiKey, setapiKey] = useState(true)
  const onListItemPress = value => {
  
    AsyncStorage.setItem('Location', value.id)
    AsyncStorage.setItem('name', value.name)
    changeStack(ROUTES.DASHBOARD.HOME)
   
 }
  return (
    <View>
      <Modal
        animationType="default"
        transparent={true}
        visible={apiKey}>
        <View
          style={{flex: 1, alignItems: 'center', backgroundColor: '#000000C7'}}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              width: width * 0.89,
              height: height * 0.76,
              borderRadius: 22,
              padding: 12,
              marginTop: 44,
            }}>
        
            <Text
              style={{
                fontSize: 28,
                color: '#000000',
                fontWeight: 'bold',
                marginLeft: 22,
                marginBottom: 10,
              }}>
          Select Agency
            </Text>

            <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ overflow: 'hidden', borderRadius: 15, borderTopLeftRadius: 0, borderTopRightRadius: 0, }}
                        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#e5e5e5' }} />}
                        contentContainerStyle={{  flexGrow: 1, }}
                        renderItem={({ item }) => <ListItem selected={ item.name} item={item} onPress={() => onListItemPress(item)} />}
                        data={GetLocation?.data}
                    />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default AgencyModal
const ListItem = ({ item, onPress, selected }) => {

  return (
      <TouchableOpacity onPress={onPress} style={{ padding: 15, backgroundColor: selected ? '#eee' : 'white' }} >
          <Text style={{color:'#30046B',fontSize:14}}>{item?.name}</Text>

      </TouchableOpacity>
  )
}