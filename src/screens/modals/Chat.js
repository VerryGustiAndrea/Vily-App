// Library
import React, {Component, useState, useEffect, useRef} from 'react';
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

const Chat = props => {
  const [textMessage, setTextMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  let data = [];
  const scrollViewRef = useRef();
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

  // const dataChat = async () => {
  //   let data = [];
  //   await firebase
  //     .database()
  //     .ref('messages')
  //     .child(User.phone)
  //     .child(props.chatInfo.phone)
  //     .on('child_added', value => {
  //       data.push(value.val());
  //       setMessageList(data);
  //     });
  // };
  const convertTime = time => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
    }
    return result;
  };

  useEffect(() => {
    firebase
      .database()
      .ref('messages')
      .child(User.phone)
      .child(props.chatInfo.phone)
      .on('child_added', value => {
        data.push(value.val());
        setMessageList([...data]);
      });
  }, []);

  return (
    <>
      {/* <Button title={props.chatName} onPress={() => props.back('visible')} /> */}
      <View>
        <View
          style={{
            backgroundColor: '#F9F5F0',
          }}>
          <Image
            style={{
              marginTop: '3%',
              width: 50,
              height: 50,
              alignSelf: 'center',
              borderRadius: 100,
              borderWidth: 5,
              borderColor: '#A5EACF',
              paddingBottom: 10,
            }}
            source={{
              uri:
                'https://instagram.ftkg1-1.fna.fbcdn.net/v/t51.2885-15/e35/32135660_168337707179036_4421957384314814464_n.jpg?_nc_ht=instagram.ftkg1-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=lL_B49m3tpYAX8OzUZX&oh=f17dbe9c44261ccaad7cd2222d34ae7a&oe=5EA02AD2',
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              // padding: 20,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              backgroundColor: '#F9F5F0',
            }}>
            {props.chatInfo.name}
          </Text>
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={{
          height: 730,
          width: 490,
          bottom: 0,
          paddingHorizontal: 40,
          backgroundColor: '#F7E1D8',
        }}
        ref={scrollViewRef}
        onContentSizeChange={(contentWidth, contentHeight) => {
          scrollViewRef.current.scrollToEnd({animated: true});
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
              <Text
                style={{
                  color: '#eee',
                  top: 20,
                  textAlign: 'right',
                  fontSize: 12,
                }}>
                {convertTime(e.time)}
              </Text>
            </View>
          );
        })}
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
  filterName(props.dataFriend);
};

export default Chat;
