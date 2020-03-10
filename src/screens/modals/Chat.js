// Library
import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
  FlatList,
  Dimensions,
} from 'react-native';
import User from '../../../User';
import firebase from '../../config/firebase';

// Styles
// import styles from './AppStyle'

let {height, width} = Dimensions.get('window');

const Chat = props => {
  const [textMessage, setTextMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

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

  // const renderRow = ({item}) => {
  //   return (
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         width: '60%',
  //         alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
  //         backgroundColor: item.from === User.phone ? '#00897b' : '#7cb342',
  //         borderRadius: 5,
  //         marginBottom: 10,
  //       }}>
  //       <Text style={{color: '#fff', padding: 7, fontSize: 16}}>
  //         {item.message}
  //       </Text>
  //       <Text style={{color: '#eee', padding: 3, fontSize: 12}}>
  //         {item.time}
  //       </Text>
  //     </View>
  //   );
  // };
  // console.warn(props.data);
  let onChat = [];

  useEffect(() => {
    let data = [];
    firebase
      .database()
      .ref('messages')
      .child(User.phone)
      .child(props.chatInfo.phone)
      .on('child_added', value => {
        data.push(value.val());
        setMessageList(data);
      });
  }, []);

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
          // top: 30,
          height: 730,
          width: 490,
          bottom: 0,
          paddingHorizontal: 40,
          backgroundColor: '#F7E1D8',
        }}>
        {messageList.map(e => {
          return (
            <View
              style={{
                top: 30,
                flexDirection: 'row',
                width: '60%',
                alignSelf: e.from === User.phone ? 'flex-end' : 'flex-start',
                backgroundColor: e.from === User.phone ? '#00897b' : '#7cb342',
                borderRadius: 5,
                marginBottom: 30,
              }}>
              <Text style={{color: '#fff', padding: 7, fontSize: 18}}>
                {e.messages}
              </Text>
              <Text style={{color: '#eee', padding: 3, fontSize: 12}}>
                {e.time}
              </Text>
            </View>
          );
        })}

        {/* 
        <View
          
          style={{
            flexDirection: 'row',
            width: '60%',
            alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
            backgroundColor: item.from === User.phone ? '#00897b' : '#7cb342',
            borderRadius: 5,
            marginBottom: 10,
          }}>
          <Text style={{color: '#fff', padding: 7, fontSize: 16}}>
            {item.message}
          </Text>
          <Text style={{color: '#eee', padding: 3, fontSize: 12}}>
            {item.time}
          </Text>
        </View>

        <FlatList
          style={{padding: 10, height: (height = 1.8)}}
          data={messageList}
          renderItem={renderRow}
          keyExtractor={(item, index) => index.toString()}
        /> */}
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
