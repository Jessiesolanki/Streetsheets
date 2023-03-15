import { View, Text, Image, Dimensions, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Header from '../../Components/Header'
import QuizScreen from './QuizScreen';
import useLoadingFn from '../../Hooks/useLoadingFn';
import { LeadContext } from '../../Providers/LeadProvider';
const { width, height } = Dimensions.get('window');

const EntryScreen = ({ route, navigation }) => {
  const { API_CALLS } = useContext(LeadContext);

  const getQuestionList = useLoadingFn(API_CALLS.getQuestionList);

  const Quiz = () => {

    getQuestionList({ params: { video_id: id }, onSuccess: () => { navigation.navigate('QuizScreen', { video: id }) } })

  }

  let { id } = route.params;
  console.log(id)
  return (
    <View style={{ flex: 1 }}>
      <Header backbutton />


      
      <View style={{ flex: 1, marginTop: -16, justifyContent: 'space-between' }}>
        <Image source={require('../../Constant/Assests/Images/quiz.png')} style={{ height: 180, width: 280, alignSelf: 'center', }} />
        <ImageBackground source={require('../../Constant/Assests/Images/bottomquiz.png')} style={{ height: 530, width: '100%', justifyContent: 'center', alignItems: 'center' }} resizeMode='cover'>
          <Text style={{ fontSize: 28, color: '#FFFFFF', fontWeight: '700', marginBottom: 15 }}>Learn Skill Quiz</Text>
          <Text style={{ fontSize: 15, color: '#FFFFFF', width: '80%', textAlign: 'center' }}>Improve your learn skill and upgrade your personal growth</Text>
          <TouchableOpacity elevation={5} onPress={() => Quiz()} style={[styles.button, { backgroundColor: 'white', marginTop: 33 }]} >
            <Text style={{ fontSize: 16, color: '#30046B', fontWeight: 'bold' }}>Start Quiz</Text>
          </TouchableOpacity>
        </ImageBackground>



      </View>
    </View>
  )
}

export default EntryScreen
const styles = StyleSheet.create({
  button: {
    height: 69,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#52006A',
    borderRadius: 14,
    width: '88%',
    alignSelf: 'center',

  },
})