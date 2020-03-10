// Library
import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  ScrollView,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import User from '../../../User';

// Styles
// import styles from './AppStyle'

const Chat = props => {
  // console.warn(props.data);
  let users = [];
  return (
    <>
      <View
        style={{
          height: '100%',
          width: 350,
          bottom: 0,
          padding: 40,
          backgroundColor: '#fcdcc8',
        }}>
        <Text
          style={{
            fontSize: 24,
            textAlign: 'center',
            fontFamily: 'monospace',
            paddingBottom: 20,
          }}>
          {' '}
          Friend List
        </Text>

        {props.data.map(e => {
          users = e.name;
          return (
            <>
              <TouchableOpacity
                onPress={() => props.chat({name: e.name, phone: e.phone})}
                style={{
                  padding: 30,
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 1,
                  //   backgroundColor: 'red',
                }}>
                <Text style={{fontSize: 20}}>{users}</Text>
              </TouchableOpacity>
            </>
          );
        })}
      </View>
    </>
  );
};

export default Chat;
