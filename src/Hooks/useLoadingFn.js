import { useContext } from "react"
import { Alert } from "react-native"
import { AppContext } from "../Providers/AppProvider"


export default useLoadingFn = (fn) => {
    const { setLoading } = useContext(AppContext)


    const loadingFunction = async ({ params, onSuccess, onFail, screenName }) => {

//screenName =='Add Appointment'? 'Please Select Appointment Date': 
        setLoading(true)
        try {
            await fn(params)
            if (onSuccess)
                onSuccess()
        } catch (error) {
            if (onFail) onFail()
            Alert.alert(screenName ? screenName : 'Login',error?.response?.data?.message || 'Something went wrong, Please try again.')

        } finally {
            setLoading(false)
        }
    }



    return loadingFunction
}