
import 'react-native-gesture-handler';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Navigation from './src/navigation/Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

GoogleSignin.configure({
  webClientId:
    '110660272190-mn3h1e20mubm803cbto1keqs0vbkpcm7.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
  offlineAccess: false,
  iosClientId:
    '110660272190-og78voivslgfvg1ohj4f86po3j9j3hd9.apps.googleusercontent.com',
});
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar translucent={Platform.OS  ===  'ios'}
      backgroundColor="transparent"
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Navigation/>
        </PersistGate>
     </Provider> 
       </GestureHandlerRootView>


  );

};

export default App;

