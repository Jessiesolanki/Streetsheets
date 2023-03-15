import { View, Text } from 'react-native'
import React from 'react'
import CustomInput from './CustomInput'
import { useForm ,Controller} from 'react-hook-form';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ControlledPicker from './ControlledPicker';
const picker = () => {
  const {control,handleSubmit, formState: { errors }, reset, watch,} = useForm();

  return (
    <View>
    <ControlledPicker
          emptyMessage={"Please select make first."}
          // resetOn={[formValues.make_index]}
          options={options}
          controllerProps={{ name: 'model_index', control, errors, rules: { required: true }, }}
          label={'Model*'}
          containerStyle={{ marginBottom: 20, }} />
        {/* <CustomInput
          label={' Address '}
          rightIconProps={{
            name: 'chevron-down' ,
            color:'black'
            // onPress: () => setPasswordVisibility(!passwordVisible),
          }}
          textInputProps={{
            placeholder: 'Enter Address',
            keyboardType: 'email-address',
            autoCapitalize: 'none',
          }}
          controllerProps={{
            name: 'address',
            control,
            errors,
            rules: { required: true },
          }}
          bordercolor
          labelbgcolor
        /> */}

    </View>
  )
}

export default picker
const options = [
  { label: 'Option one', value: 1 },
  { label: 'Option two', value: 2 },
  { label: 'Option ', value: 3 },
  { label: 'Option 4', value: 4 },
  { label: 'Option 5', value: 5 },
  { label: 'Option one', value: 1 },
  { label: 'Option two', value: 2 },
  { label: 'Option ', value: 3 },
  { label: 'Option 4', value: 4 },
  { label: 'Option 5', value: 5 },
  { label: 'Option one', value: 1 },
  { label: 'Option two', value: 2 },
  { label: 'Option ', value: 3 },
  { label: 'Option 4', value: 4 },
  { label: 'Option 5', value: 5 },
]