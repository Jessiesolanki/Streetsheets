import React, {useMemo} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const CustomInput = ({
  style,
  label,
  textInputProps,
  controllerProps,
  rightIconProps,
  disabled,
  bordercolor,
  labelbgcolor,
  city,
  heightnote,
  multiline,
  message,
  Cvalue,
  Ctext,
  ...res
}) => {
  const {maxLength} = {...res};
 
  return (
    <View style={{paddingHorizontal: 25}}>
      <View
        style={[
          styles.text,
          {backgroundColor: labelbgcolor ? '#fff' : '#30046B'},
        ]}>
        <Text style={{color: labelbgcolor ? '#30046B' : 'white'}}>{label}</Text>
      </View>
      <View style={[{}, style]}>
        <Controller
          {...controllerProps}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <View
                style={[
                  {
                    width: city ? 130 : null,
                    paddingRight: 12,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: bordercolor ? '#30046B' : '#dbd7e2',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                    bottom: 18,
                    height: heightnote ? 80 : 63,
                    alignSelf: 'center',
                    borderRadius: 5,
                    zIndex: 0,
                  },
                ]}>
                  
                <TextInput
                  editable={!disabled}
                  placeholderTextColor={'grey'}
                  onBlur={onBlur}
                  onChangeText={value => {
                    onChange(value)
                    if(Cvalue){
                        Cvalue(value)
                    }
                    // value(value)
                }}
                // Ctext?Ctext+value:value
                  value={value}
                  {...textInputProps}
                  multiline={multiline}
                  numberOfLines={3}
                  style={[
                    {
                      flex: 1,
                      fontSize: 16,
                      color: bordercolor ? '#30046B' : 'white',
                      height: 80,
                      justifyContent: 'center',
                      paddingHorizontal: 25,
                    },
                  ]}
                  {...res}
                />

                {rightIconProps && (
                  <Feather {...rightIconProps} size={20} />
                )}
              </View>

             
            </>
          )}
        />
      </View>

      <Error
                error={controllerProps.errors[controllerProps.name]}
                label={label ? label : textInputProps.placeholder}
            
            />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 0,
    marginStart: 7,
    zIndex: 1,

    shadowColor: 'white',
    position: 'absolute',
    top: -8,
    left: 50,
    alignSelf: 'flex-start',
    margin: 3.4,
  },
});
export default CustomInput;
export const Error = ({error, label}) => {

// Phone
  if (!error) return null;
  const capitalizeFistLetter = string =>
    string.charAt(1).toUpperCase() + string.slice(2).toLowerCase(); //.toLowerCase() i have remove it from here
  const errorText = useMemo(() => {
    if (error.type == 'pattern')
      return `Please enter a valid ${label.toLowerCase()}`;
    if (error.type == 'max') return error.message;
    if (error.type == 'min') return error.message;
    if (error.type == 'maxLength') return error.message;
    if (error.type == 'required')
      return `${capitalizeFistLetter(label)} is required`;
  }, [error]);

  return (
    <Text
      style={{color: 'red', marginBottom: 25, fontSize: 15, marginTop: -20}}>
      {errorText}
    </Text>
  );
};



 
export  const CustomInput2=({
  style,
  label,
  textInputProps,
  controllerProps,
  rightIconProps,
  disabled,
  bordercolor,
  labelbgcolor,
  city,
  heightnote,
  multiline,
  message,
  Cvalue,
  Ctext,
  onChnage,
  ...res
})=>(
  <View style={{paddingHorizontal: 25}}>
      <View
        style={[
          styles.text,
          {backgroundColor: labelbgcolor ? '#fff' : '#30046B'},
        ]}>
        <Text style={{color: labelbgcolor ? '#30046B' : 'white'}}>{label}</Text>
      </View>
      <View style={[{}, style]}>
        <Controller
          {...controllerProps}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <View
                style={[
                  {
                    width: city ? 130 : null,
                    paddingRight: 12,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: bordercolor ? '#30046B' : '#dbd7e2',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                    bottom: 18,
                    height: heightnote ? 80 : 63,
                    alignSelf: 'center',
                    borderRadius: 5,
                    zIndex: 0,
                  },
                ]}>
                  
                <TextInput
                  editable={!disabled}
                  placeholderTextColor={'grey'}
                  onBlur={onBlur}
                  onChangeText={onChnage}
                // Ctext?Ctext+value:value
                  value={Ctext}
                  {...textInputProps}
                  multiline={multiline}
                  numberOfLines={3}
                  style={[
                    {
                      flex: 1,
                      fontSize: 16,
                      color: bordercolor ? '#30046B' : 'white',
                      height: 80,
                      justifyContent: 'center',
                      paddingHorizontal: 25,
                    },
                  ]}
                  {...res}
                />

                {rightIconProps && (
                  <Feather {...rightIconProps} size={20} color={'white'} />
                )}
              </View>

             
            </>
          )}
        />
      </View>

      <Error
                error={controllerProps.errors[controllerProps.name]}
                label={label ? label : textInputProps.placeholder}
            
            />
    </View>
)
