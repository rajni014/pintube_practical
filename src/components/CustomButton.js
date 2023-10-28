import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../Themes/colors';

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: wp('2%'),
    backgroundColor: colors.btnColor,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: hp('5%')
  },
  title: { fontSize: wp('5%'), color: colors.white },
});
