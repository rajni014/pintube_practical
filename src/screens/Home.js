import React, { useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import TopHeadLines from '../components/TopHeadLine';
import { getTopHeadLines } from '../api/getTopHeadlines';
import { newsAPIKey } from '../constants/config';
import colors from '../Themes/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Home = ({ navigation }) => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const newsAPICall = async () => {
    setIsLoading(true);
    const data = await getTopHeadLines('in', newsAPIKey);
    if (data?.articles) {
      setNewsData(data?.articles);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    newsAPICall();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('NewsDetails', {data: item})}>
        <ImageBackground
          source={{ uri: item?.urlToImage }}
          style={styles.headlineImage}>
          <Text numberOfLines={3} style={styles.newsTitle}>
            {item?.title}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <TopHeadLines />
      <View style={styles.container}>
        {!isLoading ? (
          <FlatList
            data={newsData}
            style={styles.listContainer}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapperStyle}
            keyExtractor={(_, i) => i.toString()}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.listSeprator} />}
          />
        ) : (
          <View style={styles.loader}>
            <ActivityIndicator color={colors.black} size={'large'} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: wp('3%'),
  },
  loader: {
    height: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: { paddingTop: wp('3%') },
  columnWrapperStyle: { justifyContent: 'space-between' },
  headlineImage: {
    width: wp('46%'),
    height: wp('46%'),
    padding: wp('3%'),
    justifyContent: 'flex-end',
  },
  listSeprator: { height: 10 },
  newsTitle: { color: colors.white, fontSize: wp('4.3%'), fontWeight: 'bold' },
});
