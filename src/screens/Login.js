// Library
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from './../config/firebase';

import User from '../../User';
// Styles
// import styles from './AppStyle'

export default class Login extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    phone: '',
    name: '',
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  //   UNSAFE_componentWillMount() {
  //     AsyncStorage.getItem('userPhone').then(val => {
  //       if (val) {
  //         this.setState({phone: val});
  //       }
  //     });
  //   }

  submitForm = async () => {
    if (this.state.phone.length < 10) {
      Alert.alert('Error', 'Wrong phone number');
    } else if (this.state.name.length < 3) {
      Alert.alert('Error', 'Wrong name');
    } else {
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      User.name = this.state.name;
      firebase
        .database()
        .ref('users/' + User.phone)
        .set({name: this.state.name});
      this.props.navigation.navigate('Home');
    }
  };

  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            alignSelf: 'center',
            width: 118,
            height: 200,
            top: -200,
            paddingBottom: 100,
          }}
          source={require('../images/logo.png')}
        />
        <TextInput
          placeholder="Phone Number"
          keyboardType="number-pad"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
        />
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <TouchableOpacity onPress={this.submitForm}>
          <Text style={styles.btnText}>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcdcc8',
  },
  input: {
    padding: 10,
    borderWidth: 3,
    borderColor: '#ccc',
    width: '90%',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    top: -50,
  },
  btnText: {
    top: 20,
    width: 200,
    textAlign: 'center',
    color: 'darkblue',
    fontSize: 20,
    borderWidth: 3,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
});
