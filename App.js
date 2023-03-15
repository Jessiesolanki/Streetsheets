import 'react-native-gesture-handler';
import React, { useContext ,useEffect} from 'react';
import { ActivityIndicator, Modal, StatusBar, View, Linking} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from './src/Navigation/Index';
import RootStack from './src/Navigation/RootStack';
import Providers from './src/Providers/Index';
import { AppContext } from './src/Providers/AppProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
const TOPIC = 'MyNews';
const App = () => {

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    console.log('Authorization status(authStatus):', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  Linking.addEventListener('url', (e)=>console.log(e))
  useEffect(() => {
    if (requestUserPermission()) {
    
      messaging()
        .getToken()
        .then((fcmToken) => {
          console.log('FCM Token -> ', fcmToken);

          AsyncStorage.setItem('fcmToken' ,fcmToken)
        });
    } else console.log('Not Authorization status:', authStatus);

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'getInitialNotification:' +
              'Notification caused app to open from quit state',
          );
          
        }
      });
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      if (remoteMessage) {
        console.log(
          'onNotificationOpenedApp: ' +
            'Notification caused app to open from background state',
        );
      
      }
    });
    messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        console.log(
          'Message handled in the background!',
          remoteMessage
        );
    });
    const unsubscribe = messaging().onMessage(
      async (remoteMessage) => {
        PushNotification.localNotification({
          message: remoteMessage.notification.body,
          title: remoteMessage.notification.title,
          bigPictureUrl: remoteMessage.notification.android.imageUrl,
          smallIcon: remoteMessage.notification.android.imageUrl,
        })

        console.log(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage)
        );        
      }
    );
    messaging()
      .subscribeToTopic(TOPIC)
      .then(() => {
        console.log(`Topic: ${TOPIC} Suscribed`);
      });

    return () => {
      unsubscribe;
    };
  }, []);

  console.warn=()=>{}
  
  return (
  <Providers>
      <NavigationContainer ref={navigationRef} >
        <StatusBar barStyle='light-content' translucent backgroundColor={'transparent'} />
        <RootStack />
        <LoadingModal />
      </NavigationContainer>
  </Providers>
  )
}

export default App
const LoadingModal = () => {
  const { loading } = useContext(AppContext)

  return (
    <Modal
      visible={loading}
      transparent={true}
      hardwareAccelerated
      statusBarTranslucent
      animationType="fade">
      <View style={{ flex: 1, backgroundColor: "#00000080", alignItems: 'center', justifyContent: 'center' }} >
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
          <ActivityIndicator color={'#30046B'} />
        </View>
      </View>
    </Modal>
  )
}


