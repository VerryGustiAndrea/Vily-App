// Library
import React, {Component} from 'react';
import {ActivityIndicator, StatusBar, Text, View} from 'react-native';
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
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
