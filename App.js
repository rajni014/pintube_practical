import React, { useEffect } from 'react';
import { Text, SafeAreaView, StatusBar } from 'react-native';
import RootNavigator from './src/navigations/RootNavigator';
import colors from './src/Themes/colors';

const App = () => {
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={colors.grey}
        barStyle={'light-content'}
      />
      <RootNavigator />
    </>
  );
};

export default App;
