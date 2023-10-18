import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {useLoadFonts} from './src/hooks/useLoadFonts';
import {AppNavigation} from './src/navigation/AppNavigation';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

SplashScreen.preventAutoHideAsync();

function App(): JSX.Element {
  const fontsLoaded = useLoadFonts();

  useEffect(() => {
    (async () => {
      fontsLoaded && (await SplashScreen.hideAsync());
    })();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <ActivityIndicator style={styles.activity} size="large" />;
  }

  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <AppNavigation />
      </GluestackUIProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
