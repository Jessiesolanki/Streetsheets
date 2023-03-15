import { View, Text, Dimensions, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Header from '../../Components/Header'
import { LeadContext } from '../../Providers/LeadProvider';
import useLoadingFn from '../../Hooks/useLoadingFn';
const { width, height } = Dimensions.get('window');

const AboutScreen = () => {
  const { GetAbout, API_CALLS } = useContext(LeadContext)
  const GetAboutDetail = useLoadingFn(API_CALLS.GetAboutDetail)

  
  useEffect(() => {
    GetAboutDetail({ params: {}, onSuccess: () => { } })
  }, [])


  return (
    <View style={{ flex: 1 }}>
      <Header backbutton />
     {GetAbout?.permission.includes('view_about_role')? <View style={{ width: width, padding: 18 }}>
        <Image source={require('../../Constant/Assests/Images/aboutimg.png')} style={{ height: 266, width: 395, alignSelf: 'center', marginTop: -20, marginBottom: 22 }} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000' }}>About</Text>
        <View style={{ height: height / 2 }}>
          <Text style={{ fontSize: 15, color: '#0E2A47' }}>{GetAbout?.data?.description}</Text>
        </View>
      </View>:null}
    </View>
  )
}

export default AboutScreen