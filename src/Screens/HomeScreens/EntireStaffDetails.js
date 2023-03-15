import {
  View,
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import Header from '../../Components/Header';
import useLoadingFn from '../../Hooks/useLoadingFn';
import { LeadContext } from '../../Providers/LeadProvider';
import { image_base_url } from '../../Providers/Index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { hp, wp } from '../../Components/Responsive';
const { width, height } = Dimensions.get('window');

const EntireStaffDetails = (props) => {

let routeback= props.route.params
const [Convertedvalue, setConvertedvalue] = useState('Converted');
  const [Weeklyvalue, setWeekly] = useState('Monthly');
  const { API_CALLS, GetDashBoardValue, GetGraphdata } = useContext(LeadContext);
  const [responseValue, setresponseValue] = useState('')

  const [Chartvalue, setChartvalue] = useState({
    Firstchart: [],
    SecondChart: [],
  });
  const GetStaffGraph = useLoadingFn(API_CALLS.GetStaffGraph);
console.log(GetDashBoardValue,'jjjj')
  let First = [];
  let Second = [];
  const Converted = [
    { label: 'Rank' },
    { label: 'Assigned' },
    { label: 'Converted' },
  ];
  const Weekly = [{ label: 'Monthly' }, { label: 'Yearly' }];
  useEffect(() => {
     GetStaffGraph({params: { search_by_month: 'monthly', search:'converted'}, onSuccess: () => { setresponseValue(GetGraphdata?.response)}});

  }, []);
  useEffect(() => {
    if (Convertedvalue || Weeklyvalue)
      setresponseValue(GetGraphdata?.response)
  }, [GetGraphdata?.response]);

  useEffect(() => {
    GetGraphdata?.graphcount?.map((e, s) => {
      if (s <= 7) {
        First.push(e)
      } else {
        Second.push(e)
        
      }
    });
    setChartvalue({
      Firstchart: First,
      SecondChart: Second,
    });
  }, [GetGraphdata?.graphcount]);


  useEffect(() => {

                           GetStaffGraph({
                              params: {
                                search_by_month:  Weeklyvalue.toLowerCase(),
                                search: Convertedvalue.toLowerCase()
                              },
                              onSuccess: () => { setresponseValue(GetGraphdata?.response) }
                            });


  }, [Weeklyvalue || Convertedvalue])


  useEffect(() => { }, [GetGraphdata, GetDashBoardValue, GetGraphdata?.response]);


  const renderItemVertical = ({ item, index }) => {

    return (

      <View elevation={2} style={styles.List}>
      
        <TouchableOpacity>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <View
              style={{
                height: 42,
                width: 42,
                borderRadius: 28,
                backgroundColor: '#37259D',
                marginRight: 12,
                justifyContent: 'center',
              }}>
              {Convertedvalue == "Rank" && index == 0 ?  <Image
              source={require('../../Constant/Assests/Images/trophy.png')}
              style={{height:22,width:25,alignSelf:'center'}}
              resizeMode="cover"
            /> : <Text style={{ textAlign: 'center', fontSize: 22, color: '#fff' }}>
                {Convertedvalue == "Rank"? index+1:item.total}
              </Text>}

            </View>
            <Image
              source={{ uri: image_base_url + item.image }}
              style={styles.Image}
              resizeMode="cover"
            />
            <View>
              <Text style={styles.Litext}>{item?.name}</Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#929292',
                  marginLeft: 6,
                  marginTop: 5,
                }}>
                {item?.email}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };


const routenavigate=()=>{
  if(routeback){

    props.navigation.goBack()

  }else{

    props.navigation.openDrawer()

  }
  // 
  
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F6E1BD' }}>
      <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, padding: 10, marginLeft: '2%', height: '10%', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={routenavigate} >
        <Image source={ require('../../Constant/Assests/Images/backdashboard.png')}  style={{ height: 66 , width: 66 , marginTop: -15 }} />
      </TouchableOpacity>
      <Text style={{ fontSize: 28, color: '#393939', fontWeight: '500', marginLeft: '2%', marginRight: 110 , textAlign:  'center'  }}>{'Entire Staff Details'}</Text>

      </View>
      <View showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignSelf: 'center',
            width: "92%"
          }}>
          <FlatList
            data={responseValue}
            renderItem={renderItemVertical}
            keyExtractor={item => item.id}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: hp(20) }}
            ListHeaderComponent={() => (
              <>
                <View style={styles.GraphV}>
                  <View>
                    <View
                      style={{
                        height: hp(7),
                        flexDirection: 'row',
                        // backgroundColor: "red",
                        justifyContent: 'space-between',
                      }}>
                      <CustomeDropdown
                        onChange={e => {
                          if (e.label !== 'Select') {

                             console.warn('e.label>>>>>', e.label)
                            // ChangeLeads()
                            setConvertedvalue(e.label)
                            GetStaffGraph({
                              params: {
                                search_by_month: Weeklyvalue.toLowerCase(),
                                search: e.label.toLowerCase()
                              },
                              onSuccess: () => {

                                setresponseValue(GetGraphdata?.response)
                              }
                            });
                            
                        
                          }
                          setConvertedvalue(e.label);
                        }}
                        data={Converted}
                        label={Convertedvalue}
                      />
                      <CustomeDropdown
                        onChange={e => {
                          if (e.label !== 'Select') {
                            setWeekly(e.label);

                            GetStaffGraph({
                              params: {
                                search_by_month: e.label.toLowerCase(),
                                search: Convertedvalue.toLowerCase()
                              },
                              onSuccess: () => { setresponseValue(GetGraphdata?.response) }
                            });
                          
                          }

                        }}
                        data={Weekly}
                        label={Weeklyvalue}
                      />

                    </View>

                    <View
                      style={{ height: hp(28), justifyContent: 'space-around' }}>
                      <Chartline />
                      <GraphChart Data={Chartvalue?.Firstchart} />
                    </View>
                    {Chartvalue?.SecondChart.length > 0 && <View style={{ height: hp(28), justifyContent: 'space-between', marginTop: hp(5) }}>
                      <Chartline />
                      <GraphChart Data={Chartvalue?.SecondChart} />
                    </View>
                    }
                  </View>
                </View>
                <Text style={styles.textBold}>{Convertedvalue}</Text>
                {/* <View style={{height:50}}></View> */}
              </>
            )}
          // showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default EntireStaffDetails;


const Chartline = () => (
  <>
    {[...new Array(5)].map((e, s) => (
      <View
        key={s}
        style={{
          height: 1,
          backgroundColor: 'rgba(255,255,255, 0.3)',
          marginVertical:22
        }}><Text style={{position:'absolute',bottom:0,marginLeft:-15,fontSize:11,color:'grey'}}>{s == 0?'100%':s==1?'75%':s==2?'50%':s==3?'25%':0}</Text></View>
    ))}
  </>
);
const GraphChart = ({ Data }) => {
  var weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return (
    <View style={[styles.Chart,{height:210}]}>
      {Data?.map((e, s) => {
        let value = 0;
        var a = new Date(e.lable);

        if (e.value == 0) {
          value = 1;
        } else {
          value = e.value;
        }
        return (
          <View
            key={s}
            style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            {/* <ScrollView> */}
            <View
              style={{
                height: (hp(22) / 100) * value,
                backgroundColor: 'white',
                width: wp(2.8),
                marginHorizontal: '4.7%',
                borderRadius: 10,
                marginBottom: '35%',
              }}></View>
            {/* </ScrollView> */}

            <Text
              style={{
               marginVertical:-15,
                paddingTop: wp(4),
                color: 'white',
                fontSize: 12,
              }}>
              {e.lable.substring(0, 3)}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const CustomeDropdown = ({ label, data, onChange }) => {
  const [Active, setActive] = useState(false);
  // if (Active) onChange({ "label": "Select" })
  return (
    <View style={{ zIndex: 100 }}>
      <TouchableOpacity
        onPress={() => !Active && setActive(!Active)}
        style={styles.Customdrop}>
        <Text style={{ color: 'white', fontWeight: '400' }}>{label}</Text>
        <FontAwesome name="caret-down" size={20} color="#fff" />
      </TouchableOpacity>
      {Active && (
        <View
          style={{
            borderRadius: 5,
            overflow: 'hidden',
            marginTop: -wp(2),
            backgroundColor: '#37259D',
          }}>
          {data.map((e, s) => (
            <TouchableOpacity
              key={s}
              onPress={() => {
                onChange(e);
                setActive(!Active);
              }}>
              <Text
                key={s}
                style={{ color: 'white', padding: '5%', paddingLeft: wp(2) }}>
                {e.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Litext: {
    fontSize: 17,
    color: '#203152',
    marginLeft: 6,
    marginTop: 5,
    fontWeight: '700',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  Image: {
    height: wp(16),
    width: wp(16),
    borderRadius: 12,
    marginRight: 15,
  },
  List: {
    height: height * 0.11,
    width: width * 0.93,
    marginBottom: 15,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderRadius: 20,
    borderColor: 'white',
    paddingHorizontal: 12,
  },
  GraphV: {
    padding: 19,
    backgroundColor: '#4333A1',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 18,
    paddingBottom: hp(6),
  },
  textBold: {
    fontSize: 22,
    color: '#000',
    fontWeight: '600',
    marginLeft: 10,
    marginVertical: 25,
  },
  Chart: {
    position: 'absolute',
    top: hp(1),
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  Customdrop: {
    borderRadius: 5,
    height: hp(5),
    backgroundColor: '#37259D',
    width: wp(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp(2),
  },
});
