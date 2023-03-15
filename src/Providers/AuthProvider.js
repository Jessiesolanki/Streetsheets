import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { API, base_url,ERROR,LOADING } from './Index';
import { changeStack, navigate, ROUTES } from '../Navigation/Index'
import { AppContext } from "./AppProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext()

import useGeolocation from '../Hooks/useGeolocation';


const AuthProvider = ({ children }) => {

    const { setLoading } = useContext(AppContext)
    const { position } = useGeolocation({ interval: 10000 }) 
    const [token, setToken] = useState()
    const [userData, setUserData] = useState()
    const [getRefreshHome, setRefreshHome] = useState(false)
    const [getRefreshLead, setRefreshLead] = useState(false)
    const [getRefreshContact, setRefreshContact] = useState(false)
    const [getRefreshChat, setRefreshChat] = useState(false)
    const [GetLocation, setLocation] = useState()
    const [locationKey, setlocationKey] = useState('')
const [locationId, setlocationId] = useState('')
    const [latitude, setlatitude] = useState('')
const [password, setpassword] = useState('')
    useEffect(() => {
        getCachedUserData()
    }, [latitude])

    useEffect(() => {
        updateLocation()
    }, [position])
    
    const updateLocation = async () => {
        if(!userData) return 
         if (position == ERROR || position == LOADING) return
         const params = { latitude: position?.coords?.latitude, longitude: position?.coords?.longitude, }    
         setlatitude(params) 
          

    }
  
    const API_CALL = {

        login: async (params,onSuccess) => await API.post('login',params).then(res => { 
          
            AsyncStorage.setItem('token', res.data.token)
          
            setToken(res.data.token)
            
        }),

        forgotpassword: async (params,onSuccess) => await API.post('forgotPassword', params).then(res => {
            setpassword(res.data)
            AsyncStorage.setItem('token', res.data.token)
          
            setToken(res.data.token)
            
        }),
        resetpassword: async (params,onSuccess) => await API.post('resetPassword', params).then(res => {
            AsyncStorage.setItem('token', res.data.token)
            setToken(res.data.token)
        }),
        getUser: async (params,onSuccess) => await API.get('getUser?' + new URLSearchParams({ ...params, db: '' }).toString()).then(res => { 
            setUserData(res.data);
        }),
            listofallassignedList: async (params,onSuccess) => await API.post('listofallassignedList', params).then(res => {
            setMapList(res.data.token)
                  }),
            getAllLocation: async (params,onSuccess) => await API.get('getAllLocation?' + new URLSearchParams({ ...params, db: '' }).toString()).then(res => { 
                setLocation(res.data);
            }),
    }

    const logout = ()=>{
        AsyncStorage.removeItem('token')
        changeStack(ROUTES.AUTH.LOGIN)
         setUserData(null)
       
    }
   
    const redirect = async () => {
        
        const cachedUserData = await AsyncStorage.getItem('token')
        await AsyncStorage.getItem('FirstTime').then(result => {
            
            if (result !=="true") {
                
                changeStack(ROUTES.GETSTART.APPINTRO)
            }else {
              
                if (cachedUserData) {
                    changeStack(ROUTES.DASHBOARD.HOME)
                }else changeStack(ROUTES.AUTH.LOGIN)
                
            }
    })

    }

    const getCachedUserData = async () => {
        const cachedUserData = await AsyncStorage.getItem('userDetails')
     
        if (cachedUserData) setUserData(JSON.parse(cachedUserData))
    }
    const saveLogin = async () => {
        try {
            await AsyncStorage.setItem('FirstTime', 'true')
            alert('saved')
        } catch (err) {
            alert(err)
        }
      }
    return (
         <AuthContext.Provider value={{
            API_CALL,
            userData,
            redirect,
            GetLocation,
            logout,
            token,
            password,
            saveLogin,
            getRefreshHome,
             setRefreshHome,
             getRefreshLead,
              setRefreshLead,
              getRefreshContact,
              locationKey, 
              setlocationKey,
               setRefreshContact,
               getRefreshChat, 
               setRefreshChat,
            latitude,
            locationId,
             setlocationId
        }}  >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider