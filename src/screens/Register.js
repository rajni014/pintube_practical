import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../Themes/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomInput from '../components/CustomInput';
import strings from '../constants/strings';
import CustomButton from '../components/CustomButton';
import { validateEmail } from '../utils/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storageKeys from '../constants/storageKeys';

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = () => {
    AsyncStorage.getItem(storageKeys.usersData)
      .then((res) => {
        const data = { email, password, firstName, lastName };
        if (res) {
          const usersList = JSON.parse(res);
          const _usersList = [...usersList, data];
          const _data = JSON.stringify(_usersList);
          AsyncStorage.setItem(storageKeys.usersData, _data)
            .then(() => {
              alert(strings.registrationSuccessful);
              navigation.navigate('Login');
            })
            .catch((error) => alert(strings.somethingWentWrong));
        } else {
          const _usersList = [data];
          const _data = JSON.stringify(_usersList);
          AsyncStorage.setItem(storageKeys.usersData, _data)
            .then(() => {
              alert(strings.registrationSuccessful);
              navigation.navigate('Login');
            })
            .catch((error) => alert(strings.somethingWentWrong));
        }
      })
      .catch((err) => alert(strings.unableToGetUsersList));
  };

  const onSubmit = () => {
    if (!firstName) {
      alert(strings.pleaseEnterFirstName);
    }else if (!lastName) {
      alert(strings.pleaseEnterLastName);
    } else if (!email) {
      alert(strings.pleaseEnterEmail);
    } else if (!password) {
      alert(strings.pleaseEnterPassword);
    } else {
      if (validateEmail(email)) {
        if (password === confirmPassword) {
          //register
          registerUser();
        } else {
          alert(strings.passwordDoNotMatch);
        }
      } else {
        alert(strings.pleaseEnaterValidEmail);
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.header}>{strings.register}</Text>
        <CustomInput
          value={firstName}
          placeholder={strings.enterFirstName}
          onChangeText={setFirstName}
        />
        <CustomInput
          value={lastName}
          placeholder={strings.enterLastName}
          onChangeText={setLastName}
        />
        <CustomInput
          value={email}
          placeholder={strings.enterEmail}
          onChangeText={setEmail}
        />
        <CustomInput
          value={password}
          placeholder={strings.enterPassword}
          isPassword={true}
          onChangeText={setPassword}
        />
        <CustomInput
          value={confirmPassword}
          placeholder={strings.confirmPassword}
          isPassword={true}
          onChangeText={setConfirmPassword}
        />
        <CustomButton title={strings.register} onPress={onSubmit} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>{strings.haveAccount}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.footerText, styles.textUl]}>
              {strings.login}.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: wp('4%'),
  },
  header: {
    fontSize: wp('8.5%'),
    marginBottom: hp('3.5%'),
    color: colors.black,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2%'),
  },
  footerText: { colors: colors.black, fontSize: wp('3.8%') },
  textUl: { textDecorationLine: 'underline' },
});
