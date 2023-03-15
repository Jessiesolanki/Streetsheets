// import { View, Text,Dimensions,Image,TouchableOpacity,FlatList,Modal } from 'react-native'
// import React,{useState,useContext,useEffect} from 'react'
// import Header from '../../Components/Header'
// import CustomInput from '../../Components/CustomInput'
// const {width,height} = Dimensions.get('window');
// import  { LeadContext } from '../../Providers/LeadProvider';
// import useLoadingFn from '../../Hooks/useLoadingFn'
// import ButtonInput from '../../Components/ButtonInput';
// import { useForm } from 'react-hook-form'
// import { hp } from '../../Components/Responsive';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

// const NotesHistory = ({route, navigation }) => {
//   const { Getnotes,API_CALLS,UpdateNote} = useContext(LeadContext)
//   const [show, setShow] = useState(false)
//   const [id, setid] = useState('')
//   const [ismodalVisibleNotes, setismodalVisibleNotes] = useState(false)
//   const [toggle, settoggle] = useState(false)
//   const [idlead, setidlead] = useState('')
//   const deleteNote = useLoadingFn(API_CALLS.deleteNote)
//   const updateNote = useLoadingFn(API_CALLS.updateNote)
//   const getNotesHistory = useLoadingFn(API_CALLS.getNotesHistory)
//  console.log(route.params)
//   const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();

// const onSubmit =(data)=>{
//   updateNote({
//     params:{...data,id:id},
//     onSuccess: () =>{
//       setismodalVisibleNotes(false)
//       settoggle(true)
//       navigation.navigate('NotesHistory')
//     },screenName:'Add Lead'
// })

//     setShow(false)

// }

// useEffect(() => {
//   if(toggle==true)
//   getNotesHistory({params:{lead_id:idlead}, onSuccess: () => {settoggle(false)}})
// }, [toggle])
// const editFn =(value)=>{
//   setShow(false)
//   setid(value)
//    setismodalVisibleNotes(true)

// }
// const renderItem= ({item,index})=>{
//   const onDelete =(value)=>{
//     deleteNote({params:{id:value},
//       onSuccess: () =>{
//     setnoteId(value)
//     setShow(false)
//     navigation.navigate('NotesHistory')
//   }})}
//   const editAndDelete =(index,item,id)=>{

//   setidlead(id)
//     if(item===show){

//     setShow('')
//     }else{
//       setShow(item)
//     }
//     }

//   let d = new Date(item.created_at);
//   let date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
//   let time = `${d.getHours()}:${d.getMinutes()}`;
//     return(
//       <View style={{width:width,borderBottomWidth:.2,borderColor:'#0D172433',flexDirection:'row',padding:10,marginBottom:22,justifyContent:'space-between'}}>

//       <View style={{justifyContent:'space-evenly',marginLeft:12}}>
//         <Text style={{fontSize:14,color:'#9A9A9A'}}>{date}</Text>
//         <Text style={{fontSize:20,fontWeight:'500',color:'#000'}}>{item?.leads?.name}</Text>
//         <Text style={{fontSize:14,color:'#9A9A9A'}}>{item.email}</Text>
//         <Text style={{fontSize:13,color:'#000'}}>{item?.description}</Text>
//       </View>
//       <View>
//       <TouchableOpacity style={{}} key={index} onPress={() =>{editAndDelete(index,item.id,item.lead_id)}}>

//            <Image source={require('../../Constant/Assests/Images/dot.png')} style={{ height: 24, width: 24,}} resizeMode='contain' />

//          </TouchableOpacity>
//         { show === item.id && <View elevation={2} style={{height:60,width:hp(12),position:'absolute',right:18,top:32,borderRadius:7,borderWidth:.9,borderColor:'#00000029',backgroundColor:'white',padding:6}}>
//          <TouchableOpacity onPress={()=>{editFn(item.id)}}>
//          <Text style={{fontSize:14,color:'#9A9A9A',marginBottom:5}}>Edit</Text>
//          </TouchableOpacity>
//         <TouchableOpacity onPress={()=>{onDelete(item.id)}}>
//          <Text style={{fontSize:14,color:'#9A9A9A'}}>Delete</Text>
//          </TouchableOpacity>
//          </View>}
//          </View>
//       </View>
//     )
// }

//   return (
//     <View style={{flex:1,backgroundColor:'#fff'}}>
//      <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, padding: 10, marginLeft: '2%', height: '10%', justifyContent: 'space-between' }}>
//       <TouchableOpacity onPress={() =>  navigation.goBack()} >
//         <Image source={ require('../../Constant/Assests/Images/back.png')} style={{ height:  43, width:  43, marginTop:'1%' }} />
//       </TouchableOpacity>
//       </View>
//   <View style={{height:height/1.2,alignItems:'center',paddingVertical:12}}>
//   { Getnotes?.length > 0 ?<FlatList
//    data={Getnotes}
//    renderItem={renderItem}
//    keyExtractor={item => item.id}
//      horizontal={false}
//      showsVerticalScrollIndicator={false}
//  />:
//  <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
//         <FontAwesome5 name={'book'} size={45} color={'lightgrey'} />
// <Text style={{ padding: 20, fontSize: 16, color:'lightgrey', paddingBottom: 10,textAlign:'center' }}> No Notes List at the moment </Text>
// </View>}
//  </View>
//  <Modal
//       animationType="default"
//       transparent={true}
//       visible={ismodalVisibleNotes}
//     >
//       <View style={{ flex: 1,alignItems: 'center', backgroundColor: '#000000C7' }}>
//         <View style={{ backgroundColor: '#FFFFFF', width: width * .83, height: height * .32, borderRadius: 22, padding: 12,marginTop:44 }}>
//           <TouchableOpacity onPress={()=>setismodalVisibleNotes(false)} style={{alignSelf:'flex-end'}}>
//           <Image source={require('../../Constant/Assests/Images/greyClose.png')} style={{ height: 25, width: 25 }} />
//           </TouchableOpacity>
//           <Text style={{ fontSize: 28, color: "#000000", fontWeight: 'bold' ,marginLeft:22,marginBottom:10}}>Notes</Text>

//              <CustomInput
//              label={' Note '}
//              textInputProps={{ placeholder: 'Write...',keyboardType: 'email-address', autoCapitalize: 'none', }}
//              controllerProps={{ name: 'note', control, errors, rules: { required: true, }}}
//              labelbgcolor
//              heightnote
//              bordercolor
//              multiline={true}

//     />

//             <ButtonInput navigate={handleSubmit(onSubmit) } btnName={'save'} heightnote/>

//         </View>
//       </View>
//     </Modal>
//     </View>
//   )
// }

// export default NotesHistory
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import Header from '../../Components/Header';
import CustomInput,{CustomInput2} from '../../Components/CustomInput';
const {width, height} = Dimensions.get('window');
import {LeadContext} from '../../Providers/LeadProvider';
import useLoadingFn from '../../Hooks/useLoadingFn';
import ButtonInput from '../../Components/ButtonInput';
import {useForm} from 'react-hook-form';
import {hp} from '../../Components/Responsive';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const NotesHistory = ({route, navigation}) => {
  const {Getnotes, API_CALLS, UpdateNote} = useContext(LeadContext);
  const [show, setShow] = useState(false);
  const [id, setid] = useState('');
  const [ismodalVisibleNotes, setismodalVisibleNotes] = useState(false);
  const [toggle, settoggle] = useState(false);
  const [idlead, setidlead] = useState('');
  const deleteNote = useLoadingFn(API_CALLS.deleteNote);
  const updateNote = useLoadingFn(API_CALLS.updateNote);
  const getNotesHistory = useLoadingFn(API_CALLS.getNotesHistory);
  //  console.log(route.params)
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    watch,
  } = useForm();
  const [noteReset, setnoteReset] = useState('');
  console.warn(route.params);
  const onSubmit = data => {
  //  console.log(Message,id,'here is the message--->')
   

   
   updateNote({
      params: {note:Message, id: id},
      onSuccess: () => {
        setismodalVisibleNotes(false);
        settoggle(true);
        // navigation.navigate('NotesHistory');
      },
      screenName: 'Add Lead',
    });

    setShow(false);
  };

  useEffect(() => {
    if (toggle == true)
      getNotesHistory({
        params: {lead_id: idlead},
        onSuccess: () => {
          settoggle(false);
        },
      });
  }, [toggle]);
 
   const [Message,setMessage]= useState("")
// console.log(Message,'here is the message of current index-->')

  const editFn = value => {
    // console.warn(value);
    setMessage(value.description)
  //  console.log(value.description,'here is the values are ---->')
   
    setShow(false);
    setid(value?.id);
    setismodalVisibleNotes(true);
  };
  const renderItem = ({item, index}) => {
    const onDelete = value => {
      deleteNote({
        params: {id: value},
        onSuccess: () => {
          settoggle(true);
          setShow(false);
          navigation.navigate('NotesHistory');
        },
        screenName: 'delete',
      });
    };
    const editAndDelete = (index, item, id) => {
      setidlead(id);
      if (item === show) {
        setShow('');
      } else {
        setShow(item);
      }
    };

    let d = new Date(item.created_at);
    let date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    let time = `${d.getHours()}:${d.getMinutes()}`;
    return (
      <View
        style={{
          width: width,
          borderBottomWidth: 0.2,
          borderColor: '#0D172433',
          flexDirection: 'row',
          padding: 10,
          marginBottom: 22,
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'space-evenly', marginLeft: 12}}>
          <Text style={{fontSize: 14, color: '#9A9A9A'}}>{date}</Text>
          <Text style={{fontSize: 20, fontWeight: '500', color: '#000'}}>
            {item?.leads?.name}
          </Text>
          <Text style={{fontSize: 14, color: '#9A9A9A'}}>{item.email}</Text>
          <Text style={{fontSize: 13, color: '#000'}}>{item?.description}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{}}
            key={index}
            onPress={() => {
              // console.log(item,'item')
              editAndDelete(index, item.id, item.lead_id);
            }}>
            <Image
              source={require('../../Constant/Assests/Images/dot.png')}
              style={{height: 24, width: 24}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {show === item.id && (
            <View
              elevation={2}
              style={{
                height: 60,
                width: hp(12),
                position: 'absolute',
                right: 18,
                top: 32,
                borderRadius: 7,
                borderWidth: 0.9,
                borderColor: '#00000029',
                backgroundColor: 'white',
                padding: 6,
              }}>
              <TouchableOpacity
                onPress={() => {
                  editFn(item);
                  // console.log(item,'fgfgfg')
                }}>
                <Text style={{fontSize: 14, color: '#9A9A9A', marginBottom: 5}}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onDelete(item.id);
                }}>
                <Text style={{fontSize: 14, color: '#9A9A9A'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 10,
          padding: 10,
          marginLeft: '2%',
          height: '10%',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            //  console.log(route.params.params,'route')
            if (route?.params?.params) {
              navigation.navigate('AllTaskDetails');
            } else {
              navigation.navigate('ContactDetails');
            }
            //
            // route.params == 2
            //   ? navigation.navigate('AllTaskDetails')
            //   :
          }}>
          <Image
            source={require('../../Constant/Assests/Images/back.png')}
            style={{height: 43, width: 43, marginTop: '1%'}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: height / 1.2,
          alignItems: 'center',
          paddingVertical: 12,
        }}>
        {Getnotes.length > 0 ? (
          <FlatList
            data={Getnotes}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <FontAwesome5 name={'book'} size={45} color={'lightgrey'} />
            <Text
              style={{
                padding: 20,
                fontSize: 16,
                color: 'lightgrey',
                paddingBottom: 10,
                textAlign: 'center',
              }}>
              {' '}
              No Notes List at the moment{' '}
            </Text>
          </View>
        )}
      </View>
      <Modal
        animationType="default"
        transparent={true}
        visible={ismodalVisibleNotes}>
        <View
          style={{flex: 1, alignItems: 'center', backgroundColor: '#000000C7'}}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              width: width * 0.83,
              height: height * 0.39,
              borderRadius: 22,
              padding: 12,
              marginTop: 44,
            }}>
            <TouchableOpacity
              onPress={() => setismodalVisibleNotes(false)}
              style={{alignSelf: 'flex-end'}}>
              <Image
                source={require('../../Constant/Assests/Images/greyClose.png')}
                style={{height: 25, width: 25}}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 28,
                color: '#000000',
                fontWeight: 'bold',
                marginLeft: 22,
                marginBottom: 10,
              }}>
              Notes
            </Text>
            {/* Message */}
            <CustomInput2
            Ctext={Message}
            onChnage={setMessage}
              label={' Note '}
              textInputProps={{
                placeholder: 'Write...',
                keyboardType: 'email-address',
                autoCapitalize: 'none',
              }}
              controllerProps={{
                name: 'note',
                control,
                errors,
                // rules: {required: true},
              }}
              labelbgcolor
              heightnote
              bordercolor
              multiline={true}
            />

            <ButtonInput
              navigate={onSubmit}
              btnName={'save'}
              heightnote
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NotesHistory;
