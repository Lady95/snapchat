import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import {  StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ViewImageScreen from './screens/ViewImageScreen';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'; 

const AppStack = createStackNavigator({
  Home :{
    screen: HomeScreen
  },
  ViewImageScreen :{
    screen : ViewImageScreen
  }
})

const AuthStack =  createStackNavigator ({
  Login : {
    screen: LoginScreen
  },
  SignUpScreen :{
    screen : SignUpScreen
  }
})

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading : AuthLoadingScreen,
    App : AppStack, 
    Auth : AuthStack
  },{
    initialRouteName: 'AuthLoading',
  }
));

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <AppContainer/>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in LoginScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

