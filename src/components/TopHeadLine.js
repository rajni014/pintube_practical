import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import strings from '../constants/strings';
import colors from '../Themes/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

const TopHeadLines = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{strings.topHeadLines}</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="ios-search" size={wp('6.5%')} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="list-circle-outline"
            size={wp('6.5%')}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopHeadLines;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3.5%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: { color: colors.black, fontSize: wp('6%'), fontWeight: 'bold' },
  iconsContainer: { flexDirection: 'row' },
  searchIcon: {marginRight: wp('4%')}
});
