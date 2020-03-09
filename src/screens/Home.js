// Library
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import User from '../../User';

// Styles
// import styles from './AppStyle'

export default class Home extends React.Component {
  // constructor(){
  //     super();
  //     this.state={}
  // }
  // componentDidMount(){
  //
  // }
  static navigationOptions = {
    headerShown: false,
  };

  _logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  render() {
    return (
      <View>
        <Text>{User.phone}</Text>
        <TouchableOpacity onPress={this._logOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
