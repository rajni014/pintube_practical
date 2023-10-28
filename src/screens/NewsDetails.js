import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import strings from '../constants/strings';
import colors from '../Themes/colors';

const NewsDetails = ({ route }) => {
  const navigation = useNavigation();
  const { params } = route;

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="md-arrow-back-sharp" size={wp('8%')} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerText}>{strings.newsDetail}</Text>
      </View>
      <Image
        style={styles.topImage}
        source={{ uri: params?.data?.urlToImage }}
      />
      <View style={styles.container}>
        <Text style={styles.titleText}>{params?.data?.title}</Text>
        <Text style={styles.subText}>
          Author: {params?.data?.author}, {params?.data?.source?.name}
        </Text>
        <Text style={styles.subText}>{params?.data?.content}</Text>
      </View>
    </SafeAreaView>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: colors.headerBg,
    alignItems: 'center',
    padding: wp('2%'),
  },
  headerText: {
    color: colors.black,
    fontSize: wp('5.3%'),
    fontWeight: 'bold',
    marginLeft: wp('2.5%'),
  },
  topImage: {
    width: '100%',
    height: hp('35%'),
  },
  container: {
    backgroundColor: colors.background,
    height: '100%',
    paddingHorizontal: wp('5%'),
  },
  titleText: {
    color: colors.black,
    fontSize: wp('5.3%'),
    fontWeight: 'bold',
    marginVertical: hp('3.5%'),
  },
  subText: {
    color: colors.black,
    fontSize: wp('4.2%'),
    marginBottom: hp('1.5%'),
  },
});
