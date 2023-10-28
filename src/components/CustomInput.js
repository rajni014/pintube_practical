import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../Themes/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';

const CustomInput = ({ placeholder, value, onChangeText, isPassword }) => {
  const [passwordShown, setPasswordShown] = useState(isPassword);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={passwordShown}
        placeholderTextColor={colors.grey}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setPasswordShown(prev => !prev)}>
          <Feather name={passwordShown ? "eye" : "eye-off"} size={wp('5.5%')} color={colors.grey} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginBottom: hp('1.5%'),
    borderRadius: 10,
    paddingHorizontal: wp('3%'),
    paddingVertical: wp('2%'),
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: { fontSize: wp('5%'), color: colors.black },
});
