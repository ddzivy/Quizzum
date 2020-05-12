import React from 'react';
import{createAppContainer, createSwitchNavigator} from 'react-navigation';
import{createStackNavigator} from 'react-navigation-stack';
import Home from './Home';
import Quiz from './Quiz';
import Score from './Score';
import Instructions from './Instructions';
import LoadingScreen from './LoadingScreen';
import LoginScreen from './LoginScreen';
import * as firebase from 'firebase';
import {firebaseConfig} from './config';

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component{
  render(){
    return(
      <AppContainer />
    );
  }
}

const stacknavi=createStackNavigator({
  Home: {screen: Home},
  Quiz: {screen: Quiz},
  Score: {screen: Score},
  Instructions: {screen: Instructions} 
}, {headerLayoutPreset: 'center'}
); 

const switchnavi=createSwitchNavigator({
  LoadingScreen: {screen: LoadingScreen},
  LoginScreen: {screen: LoginScreen},
  Home: {screen: Home},
  stack: {screen: stacknavi}
}
);

const AppContainer=createAppContainer(switchnavi);