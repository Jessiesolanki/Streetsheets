import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Modal,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import Header from '../../Components/Header';
import ProgressBar from 'react-native-progress/Bar';
import useLoadingFn from '../../Hooks/useLoadingFn';
import { LeadContext } from '../../Providers/LeadProvider';

const { width, height } = Dimensions.get('window');

const QuizScreen = ({route, navigation }) => {
  const { API_CALLS, GetQuestion, AddCountry ,submitQuizresult} = useContext(LeadContext);
  const getQuestionList = useLoadingFn(API_CALLS.getQuestionList);
  const submitQuiz = useLoadingFn(API_CALLS.submitQuiz)
  let {video}= route.params;
  const [ismodalVisible, setIsmodalVisible] = useState('');
  const [newarray, setnewarray] = useState();
  const [keyindex, setindex] = useState(0);
  const [progress, setprogress] = useState(25);
  const [typeSubmit, settypeSubmit] = useState(0)
  const [result, setresult] = useState()
  const [selectId, setselectId] = useState('')
  const [activequestion, setactivequesetio] = useState({
    active: true,
    True: true,
    id: 0,
  });

  const [progressBarValue, setprogressBarValue] = useState('')
  const onclickindex = () => {if (keyindex > 0) setindex(keyindex - 1);};
  useEffect(() => {getQuestionList({params: {video_id:video},onSuccess: () => {  setnewarray(GetQuestion?.answer)
    setprogressBarValue(100 / GetQuestion?.length)}});
  }, []);
  useEffect(() => { }, [GetQuestion]);
console.log(GetQuestion,'kkk',video)
  const closequiz = () => {
    setIsmodalVisible(false);
  
    navigation.navigate('HomeStack',{screen:'Videolibrary'});
  }

  const  value = 100 / GetQuestion?.length;
  const  p = value;
  useEffect(() => {
    setindex(0) 
     settypeSubmit(0)}, [])

  const onoptionclick = (value, wrong) => {
   setselectId(wrong)
    if (value == wrong) {
      setactivequesetio({ active: true, True: true, id: value });
    } else {
      setactivequesetio({ active: false, True: false, id: wrong });
    }
  };
  const onnextbutton = (id) => {
    if (value <= 100 && GetQuestion?.length - 1 > keyindex ) {
      setselectId('')
      setindex(keyindex + 1);
      
      setprogress(progress + p);
   
    }
    if( GetQuestion?.length -1 ===  id){
      settypeSubmit(1)
     }
     

    submitQuiz({ params:{question_id:GetQuestion[keyindex]?.id,submit_type:typeSubmit,answer:activequestion.id,video_id:video},onSuccess: () =>{    
      if( GetQuestion?.length  === id){
        setresult(submitQuizresult?.data?.result)
        setindex(0) 
        setprogress(value)
        setIsmodalVisible(true)

    

     }
  
      },screenName:'SUBMITQUIZ'     
})

    setactivequesetio({
      active: true,
      True: true,
      id: -1,
    });
    
  };
  
  return (
    <>
      <View style={{ flex: 1 }} >
        <ImageBackground
          source={require('../../Constant/Assests/Images/quizbg.png')}
          style={{ flex: 1 }}>
          {GetQuestion?.map(
            (item, index) =>
              index === keyindex && (
                <View >
                  {index < 1 ? (
                    <Header backbutton />
                  ) : (
                    <TouchableOpacity onPress={() => onclickindex()}>
                      <Image
                        source={require('../../Constant/Assests/Images/back.png')}
                        style={{
                          height: 43,
                          width: 43,
                          marginTop: '5%',
                          marginLeft: 19,
                          marginBottom: 30,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                  <View style={{ marginTop: 35, alignItems: 'center' }}>
                    <ProgressBar
                      progress={(1 / 100) * progress}
                      width={300}
                      height={23}
                      borderRadius={13}
                      color="#A360FC"
                      borderColor="white"
                    />
                  </View>
                  <View
                    style={{
                      width: '80%',
                      borderBottomWidth: 2,
                      borderColor: '#C1C1C1',
                      borderStyle: 'dashed',
                      alignSelf: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                        marginLeft: 6,
                        marginTop: 30,
                        marginBottom: 15,
                      }}>
                      Question {index+1}
                      <Text style={{ fontSize: 15, fontWeight: '400' }}>/{ GetQuestion?.length}</Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      height: height / 1.4,
                      justifyContent: 'space-around',
                    }}>
                    <View
                      elevation={7}
                      style={[
                        {
                          backgroundColor: 'white',
                          alignSelf: 'center',
                          borderRadius: 20,
                          paddingVertical: 28,
                          paddingHorizontal: 18,
                          marginTop: 22,
                        },
                        styles.shadowProp,
                      ]}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#000',
                          fontWeight: '700',
                          width: width * 0.6,
                          marginBottom: 12,
                        }}>
                        {item?.question}?
                      </Text>
                      {item?.q_option.map((value, index) => (
                        <View 
                        
                          style={{
                            flexDirection: 'row',
                            width: width * 0.63,
                            height: 48,
                            borderWidth: 1,
                            borderColor:'#C1C1C1',
                             
                            borderRadius: 10,
                            justifyContent: 'space-between',
                            padding: 8,
                            marginTop: 12,
                          }}>
                          <Text style={{ color: '#C1C1C1' }}>
                            {value?.option}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              onoptionclick(item.answer, value.id);
                            }}>
                            <View
                              style={{
                                height: 28,
                                width: 28,
                                borderWidth: 1,
                                borderColor:'#C1C1C1',
                                backgroundColor:activequestion?'transparent':'#C1C1C1',
                                borderRadius: 20,
                                justifyContent:'center'
                              }}>
                              {  activequestion.active == true && activequestion.True == true &&activequestion.id == value.id ? <Image source={require('../../Constant/Assests/Images/greycolor.png')} style={{height: 29, width: 28,alignSelf: 'center' }}/>:
                                 activequestion.active == false &&  activequestion.True == false && activequestion.id == value.id ? <Image source={require('../../Constant/Assests/Images/greycolor.png')} style={{height: 29, width: 28,alignSelf: 'center' }}/> :null
                              }
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                    <TouchableOpacity
                      elevation={5}
                      onPress={() => {  selectId  ? onnextbutton(keyindex+1):null;
                      }}
                      style={[
                        styles.button,
                        { backgroundColor: 'white', marginTop: 33 },
                      ]}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#30046B',
                          fontWeight: 'bold',
                        }}>
                       {GetQuestion?.length  === keyindex+1? 'Submit': 'Next'}
                      </Text>
                    </TouchableOpacity> 
                  </View>
                </View>
              ),
          )}
        </ImageBackground>
      </View>

      <Modal
        animationType="default"
        transparent={true}
        visible={ismodalVisible}
        style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000C7',
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              width: width * 0.75,
              height: height * 0.47,
              borderRadius: 22,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 12,
            }}>
            <Image
              source={require('../../Constant/Assests/Images/righticon.png')}
              style={{
                height: 88,
                width: 88,
                alignSelf: 'center',
                position: 'absolute',
                top: -39,
              }}
            />
            <Text style={{ fontSize: 28, color: '#000000', fontWeight: 'bold' }}>
              Congrats!
            </Text>
            <Text style={{ fontSize: 38, color: '#068E1C', fontWeight: '500' }}>
              {parseInt(submitQuizresult?.data?.result)+'%'}
            </Text>
            <Text style={{ fontSize: 18, color: '#000000', fontWeight: '500' }}>
              Your quiz completed successfully.
            </Text>
            <Text style={{ fontSize: 15, color: '#000000', fontWeight: '300' }}>
              Your attempt {GetQuestion?.length} questions. 
              {/* and from that {submitQuizresult?.data?.incorrect} answer is incorrect in */}
            </Text>
            <TouchableOpacity onPress={closequiz}>
              <View
                style={{
                  height: 39,
                  width: 175,
                  backgroundColor: '#30046B',
                  borderRadius: 22,
                  justifyContent: 'center',
                  marginTop: 19,
                }}>
                <Text
                  style={{ fontSize: 15, color: '#fff', textAlign: 'center' }}>
                  OK
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default QuizScreen;
const styles = StyleSheet.create({
  button: {
    height: 69,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#52006A',
    borderRadius: 15,
    width: '80%',
    alignSelf: 'center',
  },
  shadowProp: {
    shadowColor: '#717689',
    shadowOffset: { width: -3, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
const data = [
  {
    name: 'A. Stefanie Taylor',
  },
  {
    name: 'B. Mithali Raj',
    index: '2',
  },
  {
    name: 'C. Suzia Betes',
  },
  {
    name: 'D. Harmanpreet Kaur',
  },
];