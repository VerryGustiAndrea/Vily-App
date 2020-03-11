import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import MapView, {Marker, Circle, Callout} from 'react-native-maps';
import Modal, {SlideAnimation, ModalContent} from 'react-native-modals';
import Chat from './modals/Chat';
import Profile from './modals/Profile';
import FriendList from './modals/FriendList';
navigator.geolocation = require('@react-native-community/geolocation');
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '../config/firebase';
import User from '../../User';

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0,
  longitudeDelta: 0.05,
};

export default class Maps extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      visble1: false,
      visible2: false,
      visible3: false,

      currentPosition: initialState,

      users: [],
      friendList: [],
      onChat: [],
      chatInfo: {},
      markerInfo: {},
      FriendMarker: [
        {
          latitude: -6.374703,
          longitude: 106.832771,
          name: 'Udin',
          phone: '0000000000000',
          pict:
            'https://instagram.fcgk18-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c0.135.1080.1080a/s640x640/66145963_433941947201989_736978589736860900_n.jpg?_nc_ht=instagram.fcgk18-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=i0N0NbGs94cAX-rwwy2&oh=2156e94ae806b6acf92c1f86b963e994&oe=5E91514E',
        },
        {
          latitude: -6.404312,
          longitude: 106.841698,
          name: 'Handika',
          phone: '085669682467',
          pict:
            'https://pps.whatsapp.net/v/t61.24694-24/57586771_376603533196585_1678423947411980288_n.jpg?oe=5E6D5115&oh=daa1d89e346cb4914ec157ee0dc42549',
        },
      ],
    };
  }

  onTarget = () => {
    let location = this.state.currentPosition;

    this.myMap.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0.03,
    });

    // this.state.markers[index].showCallout();
  };

  logOut = () => {
    // alert('mama');
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
    this.setState({visible1: false});
  };

  back = data => {
    if (data === 'visible') {
      this.setState({visible: false});
    } else if (data === 'visible1') {
      this.setState({visible1: false});
    } else if (data === 'visible2') {
      this.setState({visible2: false});
    }
  };

  chat = data => {
    let chatInfoNew = data;
    this.setState({chatInfo: chatInfoNew});

    this.setState({visible2: false});
    this.setState({visible: true});
    if (data.name === 'Udin') {
      this.myMap.fitToCoordinates(
        [
          {
            latitude: -6.374703,
            longitude: 106.832771,
            latitudeDelta: 0,
            longitudeDelta: 0.05,
          },
        ],
        {
          edgePadding: {top: 50, right: 50, bottom: 1400, left: 50},
          animated: true,
        },
      );
    } else if (data.name === 'Handika') {
      this.myMap.fitToCoordinates(
        [
          {
            latitude: -6.404312,
            longitude: 106.841698,
            latitudeDelta: 0,
            longitudeDelta: 0.05,
          },
        ],
        {
          edgePadding: {top: 50, right: 50, bottom: 1400, left: 50},
          animated: true,
        },
      );
    }
  };

  getcoordinate = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const {longitude, latitude} = position.coords;
        let data = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0,
          longitudeDelta: 0.05,
        };
        // console.warn(data);
        this.setState({
          currentPosition: data,
        });
        // console.warn(longitude, latitude);
      },
      error => alert(error.message),
      {timeout: 20000, maximumAge: 1000},
    );
  };

  //get seluruh user kecuali dia sendiri
  getData = () => {
    let dbRef = firebase.database().ref('users');
    dbRef.on('child_added', val => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.name = person.name;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person],
          };
        });
      }
    });
  };

  data() {
    this.state.users.map(e => {
      let data = e.name;
    });
  }

  getDataFriendList = async () => {
    let dbRef = firebase
      .database()
      .ref('friend')
      .child(User.phone);
    await dbRef.on('child_added', val => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.name = person.name;
      } else {
        this.setState(prevState => {
          return {
            friendList: [...prevState.friendList, person],
          };
        });
      }
    });
    // console.warn(this.state.friendList);
  };

  componentDidMount() {
    this.getcoordinate();
    console.warn(this.state.users);
  }

  UNSAFE_componentWillMount() {
    this.getData();
    this.getDataFriendList();
  }
  render() {
    return this.state.currentPosition.latitude ? (
      <>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.container}>
          <Modal
            style={{paddingTop: 300, borderRadius: 50}}
            transparent={true}
            visible={this.state.visible}
            modalAnimation={
              new SlideAnimation({
                slideFrom: 'bottom',
              })
            }
            onBackButtonPress={() => {
              this.setState({visible: false});
            }}
            onTouchOutside={() => {
              this.setState({visible: false});
            }}
            onRequestClose={() => {
              props.back('visible');
            }}>
            <Chat
              chatInfo={this.state.chatInfo}
              back={this.back}
              data={this.state.onChat}
              key={this.state.users.name}
            />
          </Modal>

          <Modal
            style={{borderRadius: 50}}
            transparent={true}
            visible={this.state.visible1}
            modalAnimation={
              new SlideAnimation({
                slideFrom: 'right',
              })
            }>
            <Profile back={this.back} logOut={this.logOut} />
          </Modal>

          <Modal
            style={{borderRadius: 50, paddingRight: 170}}
            transparent={true}
            visible={this.state.visible2}
            modalAnimation={
              new SlideAnimation({
                slideFrom: 'left',
              })
            }
            onTouchOutside={() => {
              this.setState({visible2: false});
            }}>
            <FriendList
              back={this.back}
              dataFriend={this.state.friendList}
              dataUsers={this.state.users}
              key={this.state.users.name}
              chat={this.chat}
            />
          </Modal>
        </View>

        <View>
          <MapView
            ref={ref => (this.myMap = ref)}
            style={styles.map}
            showsTraffic
            showsMyLocationButton
            mapType={'satellite'}
            initialRegion={this.state.currentPosition}>
            <Marker
              style={styles.marker}
              coordinate={this.state.currentPosition}
              onPress={() => {
                // this.setState({chatInfo: ''});
                this.setState({visible1: true});
                this.myMap.fitToCoordinates([this.state.currentPosition], {
                  edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
                  animated: true,
                });
              }}>
              <Image
                style={{
                  marginTop: '100%',
                  width: '100%',
                  height: '45%',
                  borderRadius: 50,
                  borderWidth: 5,
                  borderColor: '#A5EACF',
                }}
                source={{
                  uri:
                    'https://www.kanal247.com/images/media/300x188/2018/03/27/14315.jpg',
                }}
              />
            </Marker>
            {this.state.FriendMarker.map(e => {
              return (
                <Marker
                  style={styles.marker}
                  coordinate={{
                    latitude: e.latitude,
                    longitude: e.longitude,
                    latitudeDelta: 0,
                    longitudeDelta: 0.05,
                  }}
                  onPress={() => {
                    let data = {
                      name: e.name,
                      phone: e.phone,
                    };
                    this.setState({chatInfo: data});
                    this.setState({visible: true});
                    this.myMap.fitToCoordinates(
                      [
                        {
                          latitude: e.latitude,
                          longitude: e.longitude,
                          latitudeDelta: 0,
                          longitudeDelta: 0.05,
                        },
                      ],
                      {
                        edgePadding: {
                          top: 50,
                          right: 50,
                          bottom: 1400,
                          left: 50,
                        },
                        animated: true,
                      },
                    );
                  }}>
                  <Image
                    style={{
                      marginTop: '100%',
                      width: '100%',
                      height: '45%',
                      borderRadius: 50,
                      borderWidth: 5,
                      borderColor: '#A5EACF',
                    }}
                    source={{
                      uri: e.pict,
                    }}
                  />
                </Marker>
              );
            })}
          </MapView>
        </View>
        <View style={{position: 'absolute', top: '52%', alignSelf: 'flex-end'}}>
          <TouchableOpacity
            style={{
              top: '394%',
              right: '15%',
              width: 80,
              height: 80,
              borderRadius: 35,
              marginVertical: 10,
              paddingVertical: 13,
            }}
            onPress={() => this.setState({visible1: true})}>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 30,
                //   borderWidth: 1,
                borderColor: '#33cccc',
              }}
              source={require('../images/profile.png')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{position: 'absolute', top: '52%', alignSelf: 'flex-start'}}>
          <TouchableOpacity
            style={{
              top: '400%',
              left: '15%',
              width: 80,
              height: 80,
              borderRadius: 35,
              marginVertical: 10,
              paddingVertical: 13,
            }}
            onPress={() => this.setState({visible2: true})}>
            <Image
              style={{
                width: 70,
                height: 70,
                borderRadius: 50,
                //   borderWidth: 1,
                borderColor: '#33cccc',
              }}
              source={require('../images/friend.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', left: '41%', top: '86%'}}>
          <TouchableOpacity
            style={{
              // top: '400%',
              width: 80,
              height: 80,
              borderRadius: 35,
              marginVertical: 10,
              paddingVertical: 13,
            }}
            onPress={() => this.onTarget()}>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                //   borderWidth: 1,
                borderColor: '#33cccc',
              }}
              source={require('../images/target.jpg')}
            />
          </TouchableOpacity>
        </View>
      </>
    ) : (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          backgroundColor: '#fcdcc8',
        }}>
        <Image
          style={{
            alignSelf: 'center',
          }}
          source={require('../images/logo.png')}
        />
        <ActivityIndicator style={{top: 100}} animating size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  marker: {
    // backgroundColor: 'red',
    width: '20%',
    height: '20%',
  },

  buttonProfile: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
});
