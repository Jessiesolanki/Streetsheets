import {View, Text, ScrollView} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import {useForm} from 'react-hook-form';
import ButtonInput from '../../Components/ButtonInput';
import {LeadContext} from '../../Providers/LeadProvider';
import useLoadingFn from '../../Hooks/useLoadingFn';
import { AuthContext } from '../../Providers/AuthProvider';
import { template } from '@babel/core';
const EditContact = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    watch,
  } = useForm();
  const {API_CALLS, GetLeadId} = useContext(LeadContext);
  const { latitude } = useContext(AuthContext);
  const getLeadUpdate = useLoadingFn(API_CALLS.getLeadUpdate);
  const onsubmit = data => {
    getLeadUpdate({
      params: {...data, id: GetLeadId?.data?.id, latitude:latitude.latitude,
        longitude:latitude.longitude, apportunity_status:"open",},
      onSuccess: () => {
        navigation.navigate('ContactDetails');
      },
      screenName: 'Lead',
    });
  };
  useEffect(() => {
    reset(GetLeadId?.data);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header backbutton />
      <ScrollView style={{flex: 1, marginTop: 15}}>
        <CustomInput
          label={' Name '}
          textInputProps={{
            placeholder: 'Enter Name',
            keyboardType: 'email-address',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'name',
            control,
            errors,
            rules: {required: true},
          }}
          bordercolor
          labelbgcolor
        />
        <CustomInput
          label={' Email '}
          textInputProps={{
            placeholder: 'Enter Email',
            keyboardType: 'email-address',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'email',
            control,
            errors,
            rules: {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            },
          }}
          bordercolor
          labelbgcolor
        />
        <CustomInput
          label={' Phone Number '}
          textInputProps={{
            placeholder: 'Enter Phone',
            keyboardType: 'number-pad',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'phone',
            control,
            errors,
            rules: {required: true},
          }}
          bordercolor
          labelbgcolor
        />
        <CustomInput
          label={' Date Of Birth '}
          textInputProps={{
            placeholder: 'Enter DOB',
            keyboardType: 'number-pad',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'dob',
            control,
            errors,
            rules: {required: true},
            pattern: /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/,

          }}
          bordercolor
          labelbgcolor
        />
        <CustomInput
          label={' Contact Source '}
          textInputProps={{
            placeholder: 'Friend',
            keyboardType: 'email-address',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'contact_source',
            control,
            errors,
            rules: {required: true},
          }}
          bordercolor
          labelbgcolor
        />

        <ButtonInput navigate={handleSubmit(onsubmit)} btnName={'Save'} />
      </ScrollView>
    </View>
  );
};

export default EditContact;

 
