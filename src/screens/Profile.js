import React, { useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../Themes/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import strings from '../constants/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storageKeys from '../constants/storageKeys';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    AsyncStorage.getItem(storageKeys.loggedInUser)
      .then((res) => {
        if (res) {
          const data = JSON.parse(res);
          setUserData(data);
        }
      })
      .catch((err) => alert(strings.unableToGetUsersList));
  }, []);

  const onLogout = () => {
    AsyncStorage.removeItem(storageKeys.loggedInUser)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((err) => alert(strings.somethingWentWrong));
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FontAwesome
          name="user-circle-o"
          size={wp('25%')}
          color={colors.black}
          style={{ marginBottom: hp('3%') }}
        />
        <Text style={styles.nameText}>
          {userData?.firstName} {userData?.lastName}
        </Text>
        <Text style={styles.nameText}>{userData?.email}</Text>
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.background,
    paddingTop: hp('10%'),
    paddingHorizontal: wp('2%'),
    alignItems: 'center',
  },
  nameText: { marginBottom: hp('1%'), fontSize: wp('5%') },
  logoutText: {
    color: colors.black,
    fontSize: wp('4.5%'),
    marginTop: hp('5%'),
  },
});
