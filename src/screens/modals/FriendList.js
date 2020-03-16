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
  let [filterFriend, setFilterFriend] = useState([]);
  let [filterUsers, setFilterUsers] = useState({});

  const filterSubmit = () => {
    filterFriend = props.dataFriend.filter(e => {
      return e.name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1;
    });
    filterUsers = props.dataUsers.filter(e => {
      return e.name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1;
    });
    if (filterFriend[0] === undefined) {
      setFilterFriend(filterUsers);
    } else {
      setFilterFriend([]);
    }
  };

  let filterName = data => {
    // console.warn(data);
    filterUsers = props.dataUsers.filter(a => {
      return a.phone.toLowerCase().indexOf(data.toLowerCase()) !== -1;
    });
    setFilterUsers(filterUsers);
    console.warn(filterUsers);

    const datax = {
      name: filterUsers.name,
      phone: filterUsers.phone,
    };
    // props.chat(datax);
  };

  const addFriend = async data => {
    // if () {

    let updates = {};
    let messages1 = {
      name: data.name,
      status: 0,
    };
    let messages2 = {
      name: User.name,
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
          // borderTopRightRadius: 50,
          // borderBottomRightRadius: 50,
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
        <View style={{backgroundColor: '#fff', borderRadius: 10}}>
          {textSearch.length === 0
            ? props.dataFriend.map(e => {
                e.name;
                return (
                  <>
                    {() => {
                      filterName(e.phone);
                    }}
                    {/* {console.warn(filterUsers)} */}

                    <TouchableOpacity
                      onPress={() => props.chat({name: e.name, phone: e.phone})}
                      style={{
                        padding: 25,
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        //   backgroundColor: 'red',
                      }}>
                      <Text style={{fontSize: 20}}>{e.name}</Text>
                    </TouchableOpacity>
                  </>
                );
              })
            : filterFriend.map(e => {
                return (
                  <>
                    <TouchableOpacity
                      // onPress={() => addFriend({name: e.name, phone: e.phone})}
                      style={{
                        paddingVertical: 30,
                        width: 200,
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        //   backgroundColor: 'red',
                      }}>
                      <Text style={{left: 25, fontSize: 20}}>{e.name}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        top: 30,
                        right: 20,
                        position: 'absolute',
                      }}
                      onPress={() => addFriend({name: e.name, phone: e.phone})}>
                      <Image
                        style={{
                          width: 35,
                          height: 35,
                        }}
                        source={{
                          uri:
                            'https://cdn4.iconfinder.com/data/icons/eldorado-user/40/add_friend-512.png',
                        }}
                      />
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
