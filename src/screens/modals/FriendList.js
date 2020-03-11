// Library
import React, {Component, useState} from 'react';
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
import firebase from '../../config/firebase';

// Styles
// import styles from './AppStyle'

const FriendList = props => {
  let [textSearch, setTextSearch] = useState('');
  let [filter, setFilter] = useState([]);

  const filterSubmit = () => {
    filter = props.data.filter(e => {
      return e.name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1;
    });
    setFilter(filter);
  };

  const addFriend = async data => {
    // if () {

    let updates = {};
    let messages1 = {
      name: data.name,
      status: 0,
    };
    let messages2 = {
      name: data.name,
      status: 1,
    };
    updates['friend/' + User.phone + '/' + data.phone] = messages1;
    updates['friend/' + data.phone + '/' + User.phone] = messages2;
    firebase
      .database()
      .ref()
      .update(updates);
    // setTextMessage('');
    // }
  };
  // console.warn(props.data);

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
        <View>
          <TextInput
            style={{
              width: 240,
              marginLeft: 0,
              backgroundColor: '#F9F5F0',
              borderRadius: 25,
              paddingHorizontal: 16,
              fontSize: 16,
              color: 'blue',
              marginVertical: 18,
            }}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Search Friend"
            placeholderTextColor="#rgb(163, 163, 163)"
            selectionColor="#fff"
            keyboardType="default"
            value={textSearch}
            onChangeText={e => setTextSearch(e)}
            onSubmitEditing={() => filterSubmit()}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              bottom: 23,
              right: -17,
            }}
            onPress={() => filterSubmit()}>
            <Image
              style={{
                width: 35,
                height: 35,
              }}
              source={{
                uri: 'https://i.dlpng.com/static/png/6486890_preview.png',
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          {textSearch.length === 0
            ? props.data.map(e => {
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
              })
            : filter.map(e => {
                users = e.name;
                return (
                  <>
                    <TouchableOpacity
                      onPress={() => addFriend({name: e.name, phone: e.phone})}
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
      </View>
    </>
  );
};

export default FriendList;
