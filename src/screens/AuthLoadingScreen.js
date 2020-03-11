// Library
import React, {Component} from 'react';
import {ActivityIndicator, StatusBar, Text, View, Image} from 'react-native';
import firebase from '../config/firebase';
import User from '../../User';
import AsyncStorage from '@react-native-community/async-storage';
// Styles
// import styles from './AppStyle'

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    // this.state = {};
  }
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('userPhone');
    this.props.navigation.navigate(User.phone ? 'Home' : 'Auth');
  };

  componentDidMount() {
    firebase;
  }
  render() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          backgroundColor: '#fcdcc8',
        }}>
        <Image
          style={{
            alignSelf: 'center',
          }}
          source={require('../images/logo.png')}
        />
        <ActivityIndicator style={{top: 100}} animating size="large" />
      </View>
    );
  }
}
