import 'react-native-gesture-handler';
import React, { useEffect, useContext, useState } from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Pressable,
  Button,
  Linking,
  Modal,
  FlatList,

  KeyboardAvoidingView,
} from 'react-native';
import MapView from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useLoadingFn from '../../Hooks/useLoadingFn';
import { AuthContext } from '../../Providers/AuthProvider';
import { Marker, Callout } from 'react-native-maps';
import Header from '../../Components/Header';
import { LeadContext } from '../../Providers/LeadProvider';
import { hp } from '../../Components/Responsive';
import { useNavigation } from '@react-navigation/native';
import { Polyline, PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
const { width, height } = Dimensions.get('window');
import MapViewDirections from 'react-native-maps-directions';
import { image_base_url } from '../../Providers/Index';

// import { Button } from 'react-native-elements/dist/buttons/Button';
const Map = () => {
  const { userData, API_CALL, latitude, GetAddress } = useContext(AuthContext);
  const navigation = useNavigation();
  const { API_CALLS,setmarkerLocation,markerLocation } = useContext(LeadContext);
  const getUser = useLoadingFn(API_CALL.getUser);
  const getLeadEditId = useLoadingFn(API_CALLS.getLeadEditId);
  const getCountry = useLoadingFn(API_CALLS.getCountry);
  const getPipelineList = useLoadingFn(API_CALLS.getPipelineList);
  const getAddress = useLoadingFn(API_CALLS.getAddress);
  const getTimeZoneList = useLoadingFn(API_CALLS.getTimeZoneList);
  const [Type, setType] = useState('standard');
  const [Visible, setVisible] = useState(false);
  const [toogleOn, settoogleOn] = useState('');
  const [refMap, setrefMap] = useState('');
  const [polytoggle, setpolytoggle] = useState({
    latitude: 22.718,
    longitude: 75.8823,
  });
  const [locationPin, setlocationPin] = useState(false);
  const [markers, setmarkers] = useState();
  const id = 1;
  useEffect(() => {
    getTimeZoneList({ params: {}, onSuccess: () => { } });
     getPipelineList({ params: {}, onSuccess: () => { } })
}, [])

//  console.log(markers ) is important so don't remove it
  console.log(markers)
  useEffect(() => {
    getUser({
      params: {},
      onSuccess: () => {
        setrefMap(false);
      },
    });
  }, [refMap]);
  const jumpLeadDetaild = value => {
    getLeadEditId({
      params: { id: value },
      onSuccess: () => {
        navigation.navigate('LeadStack', { screen: 'LeadtDetails', params: 1 });
      },
      screenName: 'Lead',
    });
  };
  const Codes = () => {

    getCountry({
      params: {},
      onSuccess: () => {
      
          setVisible(false),
          navigation.navigate('LeadStack',{screen:'AddLead',params:markers})
         
         
      },
    });
  };

  const toggleFn = () => {
    if (Type === 'standard') {
      setType('satellite');
    } else {
      setType('standard');
    }
  };
  const markerValue = value => {
    if (toogleOn !== value) {
      settoogleOn(value);
    } else {
      settoogleOn('');
    }
  };
  const onMapPress = e => {
    getAddress({ params: {lat:  e.nativeEvent.coordinate.latitude,lng: e.nativeEvent.coordinate.longitude}, onSuccess: () => {     setVisible(true);
      setlocationPin(false)} })
     setmarkers({ coordinate: e.nativeEvent.coordinate });
   
  };

  const insets = useSafeAreaInsets();
  const ASPECT_RATIO = width / height;
  const LATITUDE = userData?.data_boundary[0]?.lead[0]?.latitude;
  const LONGITUDE = userData?.data_boundary[0]?.lead[0]?.longitude;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const GOOGLE_API_KEY = 'AIzaSyCLZNogMgDWmnvi_lVAUkpgCbic_yme5Ew';
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={false}
        backgroundColor={'#30046B'}
      />
      <Header HideSatus={userData?.user?.lead_status} sidebar toggle id={2} />

      {userData?.data_boundary?.length > 0 ? (
        <MapView
          provider='google'
       
          mapPadding={{ top: insets.top + 5 }}
          style={[{ flex: 1 }, styles.map]}
          showsUserLocation
          // followsUserLocation
          // onLongPress={e => onMapPress(e)}
          mapType={Type}
          scrollEnabled={true}
          showsScale={false}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker
            coordinate={{
              latitude: latitude.latitude || polytoggle.latitude,
              longitude: latitude.longitude || polytoggle.longitude,
            }}>
            <Image
              source={{ uri: image_base_url + userData?.user?.image }}
              style={{ height: 28, width: 28, borderRadius: 33 }}
            />
          </Marker>

          {userData?.data_boundary?.map((value, index) => (
            <View key={index} >
              <MapViewDirections
                optimizeWaypoints={true}
                origin={{
                  latitude: parseFloat(latitude.latitude),
                  longitude: parseFloat(latitude.longitude),
                }}
                
                destination={{
                  latitude: parseFloat(toogleOn.latitude),
                  longitude: parseFloat(toogleOn.longitude),
                }}
                apikey={GOOGLE_API_KEY} // insert your API Key here
                strokeWidth={4}
                splitWaypoints={true}
                strokeColor="#30046B"
                onReady={res => {
                  // console.log(res.coordinates);
                }}
                precision="high"
              />
              {value?.boundary == null ? null : (
                <Polygon
                  strokeWidth={5}
                  tappable={true}
                  onPress={e => onMapPress(e)}
                  strokeColor="#BFAB78"
                  coordinates={value?.boundary?.map((value, index) => {
                    return {
                      latitude: parseFloat(value?.lat),
                      longitude: parseFloat(value?.lng),
                    };
                  })}
                />
              )}
            </View>
          ))}

          {userData?.data_boundary?.length > 0 &&
            userData?.data_boundary?.map((marker, index) =>
              marker?.lead.map(LeadMarker => (
                <Marker
                  title={LeadMarker?.name}
                  key={index}
                  coordinate={{
                    latitude: LeadMarker?.latitude,
                    longitude: LeadMarker?.longitude,
                  }}
                  onPress={() => markerValue(LeadMarker)}
                  pinColor="#30046B"
           
                >
               
                 <View>
                { LeadMarker?.stag_image == 'profile.png' ? <Image  style={{height:29,width:25}} resizeMode={'contain'} source={require('../../Constant/Assests/Images/noicon.png')} />:  <Image  style={{height:30,width:30,borderRadius:25}}  source={{ uri:image_base_url+LeadMarker?.stag_image }} />}
                   </View>
                  <Callout
                    tooltip={false}
                    onPress={() => jumpLeadDetaild(LeadMarker?.id)}>
                    <View
                      elevation={10}
                      style={[
                        styles.shadowProp,
                        {
                          borderWidth: 1,
                          borderColor: 'white',
                          borderRadius: 14,
                          paddingHorizontal: 30,
                          height: hp(24),
                          marginBottom: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 12,
                          width: hp(40),
                        },
                      ]}>
                      <View>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 13,
                            fontWeight: 'bold',
                            marginBottom: 5,
                          }}>
                          Name:{' '}
                          <Text style={{ color: '#30046B', fontWeight: '500' }}>
                            {LeadMarker?.name}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 13,
                            fontWeight: 'bold',
                            marginBottom: 5,
                          }}>
                          Email:{' '}
                          <Text style={{ color: '#30046B', fontWeight: '500' }}>
                            {LeadMarker?.email}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 13,
                            fontWeight: 'bold',
                            marginBottom: 5,
                          }}>
                          Contact Number:{' '}
                          <Text style={{ color: '#30046B', fontWeight: '500' }}>
                            {LeadMarker?.phone}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 13,
                            fontWeight: 'bold',
                            marginBottom: 5,
                          }}>
                          Address:{' '}
                          <Text style={{ color: '#30046B', fontWeight: '500' }}>
                            {LeadMarker?.address}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 13,
                            fontWeight: 'bold',
                            marginBottom: 5,
                          }}>
                          Description:{' '}
                          <Text style={{ color: '#30046B', fontWeight: '500' }}>
                            {LeadMarker?.description}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </Callout>
                </Marker>
              )),
            )}
        </MapView>
      ) : (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <FontAwesome5 name={'map-marked-alt'} size={45} color={'lightgrey'} />
          <Text
            style={{
              padding: 20,
              fontSize: 16,
              color: 'lightgrey',
              paddingBottom: 10,
              textAlign: 'center',
            }}>
            No lead mapped at the moment
          </Text>
          <TouchableOpacity
            onPress={() => {
              setrefMap(true);
            }}>
            <FontAwesome name={'refresh'} size={45} color={'#30046B'} />
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          right: -0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => Codes()} style={{}}>
          <Image
            source={require('../../Constant/Assests/Images/addblue.png')}
            style={{ height: 45, width: 45, marginBottom: '4%' }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFn()} style={{}}>
          <Image
            source={require('../../Constant/Assests/Images/MapIcons/street.png')}
            style={{ height: 68, width: 68, marginBottom: '4%' }}
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={Visible}
        style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: width,
            marginTop: 390,
            borderTopRightRadius: 33,
            borderTopLeftRadius: 33,
          }}>
          <KeyboardAvoidingView enabled={false} style={{ height: height }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 12,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  color: '#000',
                  fontWeight: '500',
                  marginLeft: 20,
                }}>
                Lead
              </Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Image
                  source={require('../../Constant/Assests/Images/close.png')}
                  style={{ height: 30, width: 30, marginRight: 12 }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              elevation={5}
              onPress={() => getCountry({
      params: {},
      onSuccess: () => {
        setVisible(false),
          navigation.navigate('LeadStack', {
            screen: 'AddLead',
            params: {"coordinate": {"latitude": latitude.latitude, "longitude": latitude.longitude}},
          });
      },
    })}
              style={[
                styles.button,
                {
                  backgroundColor: '#30046B',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 20,
                  marginTop: 20,
                  width: width / 1.1,
                  alignSelf: 'center',
                },
              ]}>
              <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
                {'Add Lead'}
              </Text>
              <Image
                source={require('../../Constant/Assests/Images/add.png')}
                style={{ height: 25, width: 25 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFill,
    marginTop: '18%',
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 13,
    alignSelf: 'center',
    marginTop: -30,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
