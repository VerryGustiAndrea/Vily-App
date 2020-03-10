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
import Logout from './modals/Logout';
navigator.geolocation = require('@react-native-community/geolocation');
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '../config/firebase';

// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0,
  longitudeDelta: 0.05,
};

const Maps = props => {
  let myMap;
  const [currentPosition, setCurrentPosition] = useState(initialState);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  const logOut = () => {
    // alert('mama');
    AsyncStorage.clear();
    props.navigation.navigate('Auth');
    setVisible1(false);
  };

  const back = data => {
    if (data === 'visible') {
      setVisible(false);
    } else if (data === 'visible1') {
      setVisible1(false);
      //   console.warn(props.navigation);
    }
  };

  const onTarget = () => {
    let location = currentPosition;

    myMap.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0.03,
    });

    // this.state.markers[index].showCallout();
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        // alert(JSON.stringify(position));
        const {longitude, latitude} = position.coords;
        setCurrentPosition({
          ...currentPosition,
          latitude,
          longitude,
        });
      },
      error => alert(error.message),
      {timeout: 20000, maximumAge: 1000},
    );
  }, []);

  return currentPosition.latitude ? (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <Modal
          style={{paddingTop: 300, borderRadius: 50}}
          transparent={true}
          visible={visible}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          onBackButtonPress={() => {
            setVisible(false);
          }}
          onTouchOutside={() => {
            setVisible(false);
          }}>
          <Chat back={back} />
        </Modal>

        <Modal
          style={{borderRadius: 50}}
          transparent={true}
          visible={visible1}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'right',
            })
          }
          onTouchOutside={() => {
            setVisible1(false);
          }}>
          <Profile back={back} logOut={logOut} />
        </Modal>

        <Modal
          style={{borderRadius: 50, paddingRight: 170}}
          transparent={true}
          visible={visible2}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'left',
            })
          }
          onTouchOutside={() => {
            setVisible2(false);
          }}>
          <View
            style={{
              height: '100%',
              width: 350,
              bottom: 0,
              padding: 40,
              backgroundColor: '000000aa',
            }}>
            <Button
              title="Back"
              onPress={() => {
                setVisible2(false);
              }}
            />
            <Text>INI FRIEND LIST</Text>
          </View>
        </Modal>
        <Modal
          style={{paddingTop: 300, borderRadius: 50}}
          transparent={true}
          visible={visible3}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          onBackButtonPress={() => {
            setVisible3(false);
          }}
          onTouchOutside={() => {
            setVisible3(false);
          }}>
          <Logout back={back} />
        </Modal>
      </View>

      <View>
        <MapView
          ref={ref => (myMap = ref)}
          style={styles.map}
          showsTraffic
          showsMyLocationButton
          mapType={'satellite'}
          initialRegion={currentPosition}>
          <Marker
            style={styles.marker}
            coordinate={currentPosition}
            onPress={() => {
              setVisible(true);
              myMap.fitToCoordinates([currentPosition], {
                edgePadding: {top: 50, right: 50, bottom: 1400, left: 50},
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
          onPress={() => setVisible1(true)}>
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

      <View style={{position: 'absolute', top: '52%', alignSelf: 'flex-start'}}>
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
          onPress={() => setVisible2(true)}>
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
          onPress={() => onTarget()}>
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
    <ActivityIndicator style={{flex: 1}} animating size="large" />
  );
};

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

export default Maps;
