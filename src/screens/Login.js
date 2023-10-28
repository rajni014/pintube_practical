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

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(storageKeys.usersData)
      .then((res) => {
        if (res) {
          const data = JSON.parse(res);
          setUsersList(data);
        }
      })
      .catch((err) => alert(strings.unableToGetUsersList));
  }, []);

  const onSubmit = () => {
    if (!email) {
      alert(strings.pleaseEnterEmail);
    } else if (!password) {
      alert(strings.pleaseEnterPassword);
    } else {
      if (validateEmail(email)) {
        const result = usersList.find((item) => item?.email == email);
        if (result) {
          if (result?.password == password) {
            const _data = JSON.stringify(result);
            AsyncStorage.setItem(storageKeys.loggedInUser, _data)
              .then(() => {
                alert(strings.loginSuccess);
                navigation.navigate('TabNav')
              })
              .catch((err) => alert(strings.somethingWentWrong));
          } else {
            alert(strings.wrongPassword);
          }
        } else {
          alert(strings.userNotExist);
        }
      } else {
        alert(strings.pleaseEnaterValidEmail);
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.header}>{strings.login}</Text>
        <CustomInput placeholder={strings.enterEmail} onChangeText={setEmail} />
        <CustomInput
          placeholder={strings.enterPassword}
          isPassword={true}
          onChangeText={setPassword}
        />
        <CustomButton title={strings.login} onPress={onSubmit} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>{strings.newAccount}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.footerText, styles.textUl]}>
              {strings.registerHere}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: wp('4%'),
  },
  header: {
    fontSize: wp('8.5%'),
    marginBottom: hp('3%'),
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
