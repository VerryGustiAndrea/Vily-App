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
import User from '../../../User';

const Profile = props => {
  return (
    <>
      <View
        style={{
          height: '100%',
          width: 495,
          bottom: 0,
          padding: 40,
          backgroundColor: '#fcdcc8',
        }}>
        <View style={{backgroundColor: '#fff', top: 85, borderRadius: 25}}>
          <Image
            style={{
              marginTop: '3%',
              width: 200,
              height: 200,
              left: '25%',
              borderRadius: 100,
              borderWidth: 5,
              borderColor: '#A5EACF',
            }}
            source={{
              uri:
                'https://www.kanal247.com/images/media/300x188/2018/03/27/14315.jpg',
            }}
          />
          <View style={{borderRadius: 20}}>
            <Text
              style={{
                padding: 20,
                textAlign: 'center',
                color: '#405233',
                fontWeight: 'bold',
                fontSize: 40,
                fontFamily: 'monospace',
              }}>
              {User.name}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignSelf: 'center',
            top: '10%',
            width: '80%',

            // borderWidth: 2,
            // borderRadius: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              padding: 5,
              color: '#405233',
              fontWeight: 'bold',
              fontSize: 23,
              fontFamily: 'monospace',
              borderBottomColor: '#ccc',
              borderBottomWidth: 3,
              backgroundColor: '#f7f7f7',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            {props.dataFriend.length} Friend~ 📍Kedaton
          </Text>
        </View>
        <View
          style={{
            top: '12%',
            height: '40%',
            borderRadius: 30,
            backgroundColor: '#fff',
          }}>
          <Text
            style={{
              top: 20,
              left: 20,
              color: '#405233',
              fontWeight: 'bold',
              fontSize: 23,
              fontFamily: 'monospace',
            }}>
            BirthDay
          </Text>
          <Text
            style={{
              textAlign: 'right',
              right: 20,
              color: '#405233',
              fontWeight: 'bold',
              fontSize: 23,
              fontFamily: 'monospace',
            }}>
            08-08-1997
          </Text>
          <Text
            style={{
              top: 10,
              left: 20,
              color: '#405233',
              fontWeight: 'bold',
              fontSize: 23,
              fontFamily: 'monospace',
            }}>
            Phone
          </Text>
          <Text
            style={{
              top: -20,
              textAlign: 'right',
              right: 20,
              color: '#405233',
              fontWeight: 'bold',
              fontSize: 23,
              fontFamily: 'monospace',
            }}>
            {User.phone}
          </Text>
          <Text
            style={{
              top: -20,
              paddingTop: 10,
              textAlign: 'center',
              color: '#405233',
              fontWeight: 'bold',
              fontSize: 27,
              fontFamily: 'monospace',
            }}>
            Bio
          </Text>
        </View>
        <Text
          style={{
            color: '#405233',
            top: -120,
            fontSize: 22,
            fontFamily: 'monospace',
            textAlign: 'center',
            paddingHorizontal: 10,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
        {/* <TouchableOpacity style={{backgroundColor=}} title="Back" onPress={() => props.back('visible1')} /> */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => props.back('visible1')}>
          <Text style={styles.buttonText}>««</Text>
        </TouchableOpacity>
      </View>

      <View></View>
      <View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 40,
            left: '10%',
            width: '80%',
            height: 55,
            backgroundColor: '#1c313a',
            borderRadius: 15,

            paddingVertical: 13,
          }}
          // onPress={() => props._logOut()}>
          onPress={() => props.logOut()}>
          <Text style={{fontSize: 23, color: '#fcdcc8', textAlign: 'center'}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: '0%',
    width: '20%',
    height: '90%',
    // backgroundColor: '#1c313a',
    borderRadius: 15,
    // borderWidth: 2,

    top: '5%',

    paddingVertical: 13,
  },

  buttonText: {
    top: -10,
    left: '10%',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1c313a',
    textAlign: 'center',
  },
});

export default Profile;
