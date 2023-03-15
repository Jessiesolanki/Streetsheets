import { View, Text, Dimensions, Image, FlatList, StyleSheet } from 'react-native'
import Header from '../../Components/Header';
import React, { useContext, useEffect, useState } from 'react';
import useLoadingFn from '../../Hooks/useLoadingFn'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LeadContext } from '../../Providers/LeadProvider';

const { width, height } = Dimensions.get('window');
// GetStaffGraph
const LeaderBoard = ({ navigation }) => {
  const { API_CALLS, GetDashBoardValue, } = useContext(LeadContext)
  const getDashBoard = useLoadingFn(API_CALLS.getDashBoard)

  useEffect(() => {
    getDashBoard({ params: {}, onSuccess: () => { } })
  }, [])
  useEffect(() => { }, [GetDashBoardValue?.data])


  const data = [
    {
      name: 'Monthly Target assigned',
      value: GetDashBoardValue?.permission.includes('view_monthly_target_assigned_role') ? GetDashBoardValue?.data?.monthly : null,
      imgone: require('../../Constant/Assests/Images/targetone.png'),
      imgtwo: require('../../Constant/Assests/Images/barone.png'),
      color: '#FF0050',
      stack: 'HomeStack',
      root: 'EntireStaffDetails'
    },
    {
      name: 'Converted Leads',
      value: GetDashBoardValue?.permission.includes('view_converted_role') ? GetDashBoardValue?.data?.converted : null,
      imgone: require('../../Constant/Assests/Images/convertlead.png'),
      imgtwo: require('../../Constant/Assests/Images/graphtwo.png'),
      color: '#5955DE',
      stack: 'HomeStack',
      root: 'EntireStaffDetails'
    },
    {
      name: 'Leads Assigned',
      value: GetDashBoardValue?.permission.includes('view_leads_assigned_role') ? GetDashBoardValue?.data?.assigned : null,
      imgone: require('../../Constant/Assests/Images/leadfour.png'),
      imgtwo: require('../../Constant/Assests/Images/graphthree.png'),
      color: '#00E6BF',
      stack: 'HomeStack',
      root: 'EntireStaffDetails'
    },
    {
      name: 'Entire Staff Details',
      imgone: require('../../Constant/Assests/Images/contactthree.png'),
      imgtwo: require('../../Constant/Assests/Images/graphfour.png'),
      color: '#FF8201',
      stack: 'HomeStack',
      root: 'EntireStaffDetails'
    },
    {
      name: 'Achieved',
      value: GetDashBoardValue?.permission.includes('view_achieved_role') ? GetDashBoardValue?.data?.achieved : null,
      imgone: require('../../Constant/Assests/Images/achievedtwo.png'),
      imgtwo: require('../../Constant/Assests/Images/graphfive.png'),
      color: '#E84BE3',
      stack: 'HomeStack',
      root: 'EntireStaffDetails'
    },
  ]


  const CardView = ({ item, index }) => {

    return (

      <View elevation={6} style={[{ backgroundColor: item.color, borderRadius: 10, padding: 10, marginLeft: 6, marginBottom: 12 }, styles.shadowProp]}>
        <TouchableOpacity
          // onPress={() => }
          onPress={() => {
            if (item.name == "Entire Staff Details") {
              // alert("Entire Staff Details")
              navigation.navigate(item.stack, { screen: item.root ,params:true})
            }
            // console.warn(item, 'item============>', index)
            // alert("sdlfhsdfkh", index)
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={{ fontSize: 35, color: '#FFFFFF', fontWeight: '500' }}>{item?.value}</Text>
            <Image source={item.imgone} style={{ height: 45, width: 45 }} />
          </View>

          <View style={{ width: 110, height: 77 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 3, marginBottom: 25 }}>{item.name}</Text>
          </View>
          <Image source={item.imgtwo} style={{ height: 85, width: 140, alignSelf: 'center' }} />
        </TouchableOpacity>

      </View>


    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 33, padding: 12, }}>
      <Header backbutton name={'Leaderboard'} backnavigation dash text />
      <View style={{ height: '90%', marginTop: 15, alignItems: 'center' }}>
        {/* {console.log(GetDashBoardValue, 'permission')} */}
        <FlatList
          style={{ marginTop: 5}}
          data={data}
          numColumns={2}
          renderItem={CardView}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default LeaderBoard
const styles = StyleSheet.create({

  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textBold: {
    fontSize: 22,
    color: '#000',
    fontWeight: '600',
    marginBottom: 15
  }
})
