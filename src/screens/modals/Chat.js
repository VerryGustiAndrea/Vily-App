// Library
import React, {Component, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import User from '../../../User';
import firebase from '../../config/firebase';

// Styles
// import styles from './AppStyle'

const Chat = props => {
  const [textMessage, setTextMessage] = useState('');

  const sendMessage = async () => {
    if (textMessage.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(User.phone)
        .child(props.chatInfo.phone)
        .push().key;
      let updates = {};
      let messages = {
        messages: textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: User.phone,
      };
      updates[
        'messages/' + User.phone + '/' + props.chatInfo.phone + '/' + msgId
      ] = messages;
      updates[
        'messages/' + props.chatInfo.phone + '/' + User.phone + '/' + msgId
      ] = messages;
      firebase
        .database()
        .ref()
        .update(updates);
      setTextMessage('');
    }
  };
  // console.warn(props.data);
  let onChat = [];

  return (
    <>
      {/* <Button title={props.chatName} onPress={() => props.back('visible')} /> */}
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            padding: 20,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            backgroundColor: '#F9F5F0',
          }}>
          {props.chatInfo.name}
        </Text>
      </View>
      <ScrollView
        style={{
          height: 730,
          width: 490,
          bottom: 0,
          paddingHorizontal: 40,
          backgroundColor: '#F7E1D8',
        }}>
        {props.data.map(e => {
          onChat = e.name;
          return <Text>{onChat}</Text>;
        })}
        <Text>{textMessage}</Text>
      </ScrollView>
      <View style={{backgroundColor: '#F7E1D8'}}>
        <TextInput
          style={{
            width: 400,
            marginLeft: 20,
            backgroundColor: '#F9F5F0',
            borderRadius: 25,
            paddingHorizontal: 16,
            fontSize: 16,
            color: 'blue',
            marginVertical: 18,
          }}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Ketik Pesan"
          placeholderTextColor="#rgb(163, 163, 163)"
          selectionColor="#fff"
          keyboardType="email-address"
          value={textMessage}
          onChangeText={e => setTextMessage(e)}
        />
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          alignSelf: 'flex-end',
          bottom: 15,
          right: 15,
        }}
        onPress={() => sendMessage()}>
        <Image
          style={{
            width: 45,
            height: 45,
          }}
          source={{
            uri:
              'https://cdn1.iconfinder.com/data/icons/real-estate-line-color-3/256/Send-512.png',
          }}
        />
      </TouchableOpacity>
    </>
  );
};

export default Chat;
