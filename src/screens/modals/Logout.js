// Library
import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._logOut = this._logOut.bind(this);
  }

  render() {
    return (
      <>
        <View style={{width: 400, height: 200}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 24,
              padding: 20,
              fontFamily: 'monospace',
            }}>
            Konfirmasi Keluar akun
          </Text>
          <TouchableOpacity
            style={{
              top: 20,
              width: 150,
              padding: 10,
              borderRadius: 20,
            }}>
            <Text
              style={{
                padding: 10,
                textAlign: 'center',
                color: '#405233',
                fontWeight: 'bold',
                fontSize: 40,
                fontFamily: 'monospace',
                borderWidth: 2,
                borderRadius: 18,
              }}>
              No
            </Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -70,
                right: 20,
                width: 150,
                padding: 10,
                borderRadius: 20,
              }}
              onPress={this._logOut}>
              <Text
                style={{
                  padding: 10,
                  textAlign: 'center',
                  color: '#405233',
                  fontWeight: 'bold',
                  fontSize: 40,
                  fontFamily: 'monospace',
                  borderWidth: 2,
                  borderRadius: 18,
                }}>
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}
