import React, { useEffect, useState } from "react";
import { Text } from "react-native";

export const AppContext = React.createContext()

export default AppProvider = ({ children }) => {
    //  useEffect(() => requestUserPermission(), [])
    const [loading, setLoading] = useState(false)
   const [Chattype,setChattype]= useState(null)
    return (
        <AppContext.Provider value={{
            loading,
            setLoading,
            setChattype,
            Chattype
           
        }} >
            {children}
        </AppContext.Provider>
    )
}
export const EVENTS = {
    ON_GOING_CHALLENGE_MENU_PRESSED: 'on going menu pressed',
    NEW_MESSAGE: 'new message'
}
// async function requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//         
//     }
// }