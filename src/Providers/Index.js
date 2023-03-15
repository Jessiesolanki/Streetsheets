import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";
import AppProvider from "./AppProvider";
import AuthProvider from "./AuthProvider";
import ChatProvider from "./ChatProvider";
import LeadProvider from "./LeadProvider";

export const STATUS = {
    LOADING: 'laoding',
    ERROR: 'error'
}

export default Providers = ({ children }) => {
    return (
        <AppProvider>
            <AuthProvider>
                <LeadProvider>
                    <ChatProvider>
                        {children}
                    </ChatProvider>
                </LeadProvider>
            </AuthProvider>
        </AppProvider>
    )
}

export const base_url = 'http://admin.dedicatedmarketingleadership.com/api/'
export const Base_Url_Chat = "http://admin.dedicatedmarketingleadership.com/api/"
export const image_base_url = 'http://admin.dedicatedmarketingleadership.com/'

export const API = instance = axios.create({
    baseURL: base_url,
    headers: { 'Content-Type': 'application/json' }
});
API.interceptors.request.use(async config => ({ ...config, headers: { ...config.headers, 'Authorization': 'Bearer ' + await AsyncStorage.getItem('token'),'Location':  await AsyncStorage.getItem('Location') } }))
export const APICHAT = instance = axios.create({
    baseURL: Base_Url_Chat,
    headers: { 'Content-Type': 'application/json' }
});

APICHAT.interceptors.request.use(async config => ({ ...config, headers: { ...config.headers, 'Authorization': 'Bearer ' + await AsyncStorage.getItem('token') } }))
