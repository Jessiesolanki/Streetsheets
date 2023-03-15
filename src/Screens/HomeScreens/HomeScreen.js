

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
import React, {useState, useContext, useEffect} from 'react';
import Header from '../../Components/Header';
import useLoadingFn from '../../Hooks/useLoadingFn';
import {LeadContext} from '../../Providers/LeadProvider';
import {API, image_base_url} from '../../Providers/Index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {hp, wp} from '../../Components/Responsive';
import {AuthContext} from '../../Providers/AuthProvider';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const {setRefreshHome} = useContext(AuthContext);
const [rateValue, setrateValue] = useState('conversion_rate')
  const [Convertedvalue, setConvertedvalue] = useState('conversion_rate');
  const [Weeklyvalue, setWeekly] = useState('monthly');
  const [totalValue, settotalValue] = useState('')
  const {API_CALLS, Getactivity, Getgraph,GetOpportunitiesdata,GetConversiondata,GetpipelineData} = useContext(LeadContext);
  const [Chartvalue, setChartvalue] = useState({
    Firstchart: [],
    SecondChart: [],
  });
  const getRecentActivity = useLoadingFn(API_CALLS.getRecentActivity);
  const GetConversionGraph = useLoadingFn(API_CALLS.GetConversionGraph);
  const GetOpportunitiesGraph = useLoadingFn(API_CALLS.GetOpportunitiesGraph);
  const GetPipelineGraph = useLoadingFn(API_CALLS.GetPipelineGraph);
  const getDashBoardGraph = useLoadingFn(API_CALLS.getDashBoardGraph);

  let First = [];
  let Second = [];
const Converted = [
  {label: 'Convertion Rate',value :'conversion_rate'},
  {label: 'Opportunities',value :'opportunities'},
  {label: 'Converted',value :'pipeline_value'},
];
  const Weekly = [{label: 'Monthly',value:'monthly'}, {label: 'Yearly',value:'yearly'}];
  useEffect(() => {
    setRefreshHome(true)  }, []);
  useEffect(() => {
    GetConversionGraph({params: { search :'Monthly'}, onSuccess: () => {settotalValue(GetConversiondata?.total)}});
    getRecentActivity({params: {}, onSuccess: () => {}});
    API_CALLS.getDashBoardGraph({
      search_by_month: 'monthly',
      search: 'assigned',
    });
  }, []);
  useEffect(() => {
    Getgraph?.graphcount?.map((e, s) => {
      if (s <= 7) {
        First.push(e);
      } else {
        Second.push(e);
      }
    });
    setChartvalue({
      Firstchart: First,
      SecondChart: Second,
    });
  }, [Getgraph]);

  const Dropdownvalue = e => {
    setrateValue(e.value)
    if (e.label !== 'Select') {
       
      switch (e.label) {
        case  'Convertion Rate':  
          GetConversionGraph({params: { search :Weeklyvalue}, onSuccess: () => {settotalValue(GetConversiondata?.total)}});
           break;
         
        case 'Opportunities':
          GetOpportunitiesGraph({params: { search :Weeklyvalue}, onSuccess: () => {settotalValue(GetOpportunitiesdata?.total)}});
          break;
        case 'PipeLines':
          GetPipelineGraph({params: { search :Weeklyvalue}, onSuccess: () => {settotalValue(GetpipelineData?.total)}});
          break;
          default:
            GetConversionGraph({params: { search :Weeklyvalue}, onSuccess: () => {settotalValue(GetConversiondata?.total)}});
            break;
      }
    }
    setConvertedvalue(e.label);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#F6E1BD'}}>
      <View style={{padding: 20, alignItems: 'center'}}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#393939'}}>
          Dash Board
        </Text>
      </View>
      <View showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignSelf: 'center',
          }}>
          <FlatList
            data={Getactivity}
            renderItem={renderItemVertical}
            keyExtractor={item => item.id}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: hp(20)}}
            ListHeaderComponent={() => (
              <>
                <View style={styles.GraphV}>
                  <View>
                    <View
                      style={{
                        height: hp(7),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <CustomeDropdown
                        onChange={Dropdownvalue}
                        data={Converted}
                        label={Convertedvalue}
                      />
                      <CustomeDropdown
                        onChange={e => {
                          if (e.label !== 'Select') {
                          
                            getDashBoardGraph({params: { search_by_month: e.value.toLowerCase(),search: rateValue,}, onSuccess: () => {}});

                           }
                          setWeekly(e.value);
                        }}
                        data={Weekly}
                        label={Weeklyvalue}
                      />
                    </View>
                    <View style={{ backgroundColor:'#37259D',padding:5}}>
                      <Text style={{color:'white',fontWeight:'bold'}}>   {Convertedvalue}:<Text>  {totalValue}</Text></Text>
                    </View>
                    <View
                      style={{height: hp(28), justifyContent: 'space-around'}}>
                      <Chartline />
                      <GraphChart Data={Chartvalue?.Firstchart} />
                    </View>
                    {Chartvalue?.SecondChart.length > 0 && (
                      <View
                        style={{
                          height: hp(28),
                          justifyContent: 'space-around',
                          marginTop: hp(5),
                        }}>
                        <Chartline />
                        <GraphChart Data={Chartvalue?.SecondChart} />
                      </View>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.textBold}>Recent Activities</Text>
                </View>
              </>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const renderItemVertical = ({item, index}) => {
  return (
    <View elevation={2} style={styles.List}>
      <TouchableOpacity>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
          <Image
            source={{uri: image_base_url + item.image}}
            style={styles.Image}
            resizeMode="cover"
          />
          <View>
          <Text
          style={{
            color: '#929292',
            fontSize: 12,
            marginLeft: 6,
            marginTop: 5,
          }}>
          {item.updated_at.slice(0, 10)}
        </Text>
            <Text style={styles.Litext}>{item?.name}</Text>
            <Text
              style={{
                fontSize: 12,
                color: '#929292',
                marginLeft: 6,
                marginTop: 5,
              }}>
              {item?.message}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Chartline = () => (
  <>
    {[...new Array(5)].map((e, s) => (
      <View
        key={s}
        style={{
          height: 1,
          backgroundColor: 'rgba(255,255,255, 0.3)',
          justifyContent:'flex-start'
        }}><Text style={{position:'absolute',bottom:0,marginLeft:-15,fontSize:11,color:'grey'}}>{s == 0?'100%':s==1?'75%':s==2?'50%':s==3?'25%':0}</Text>
        </View>
    ))}
  </>
);
const GraphChart = ({Data}) => {
  
  return (
    <View style={styles.Chart}>
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
            style={{justifyContent: 'flex-end', alignItems: 'center'}}>
            <View
              style={{
                height: (hp(22) / 100) * value,
                backgroundColor: 'white',
                width: wp(2.5),
                marginHorizontal: '4.7%',
                borderRadius: 10,
                marginBottom: '35%',
              }}></View>
            <Text
              style={{
                marginBottom: -23,
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

const CustomeDropdown = ({label, data, onChange}) => {
  const [Active, setActive] = useState(false);

  return (
    <View style={{zIndex: 100}}>
      <TouchableOpacity
        onPress={() => !Active && setActive(!Active)}
        style={styles.Customdrop}>
        <Text style={{color: 'white', fontWeight: '400'}}>{label}</Text>
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
                style={{color: 'white', padding: '5%', paddingLeft: wp(2)}}>
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
    shadowOffset: {width: -2, height: 4},
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
    paddingBottom: hp(5),
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
    width: wp(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp(2),
  },
});
