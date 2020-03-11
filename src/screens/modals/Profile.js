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
        <Image
          style={{
            marginTop: '30%',
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
        <View
          style={{
            alignSelf: 'center',
            top: 10,
            width: '80%',
            borderWidth: 2,
            borderRadius: 30,
          }}>
          <Text
            style={{
              textAlign: 'center',
              padding: 10,
              color: '#405233',
              fontWeight: 'bold',
              fontSize: 30,
              fontFamily: 'monospace',
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi amet,
            blandit ut malesuada aliquet. Tempus sem neque eget rutrum cras in.
            Nisi, orci odio aliquet ultricies in.
          </Text>
        </View>
        <View
          style={{
            top: 30,
            width: '45%',
            alignSelf: 'flex-start',
            borderWidth: 2,
            borderRadius: 30,
          }}>
          <Text
            style={{
              textAlign: 'center',
              padding: 10,
              color: '#405233',
              fontWeight: 'bold',
              fontSize: 30,
              fontFamily: 'monospace',
            }}>
            08-08-1997
          </Text>
        </View>
        <View
          style={{
            top: -30,
            width: '45%',
            alignSelf: 'flex-end',
            borderWidth: 2,
            borderRadius: 30,
          }}>
          <Text
            style={{
              textAlign: 'center',
              padding: 10,
              color: '#405233',
              fontWeight: 'bold',
              fontSize: 30,
              fontFamily: 'monospace',
            }}>
            Girl
          </Text>
        </View>
        <Text
          style={{
            color: '#405233',
            fontWeight: 'bold',
            fontSize: 22,
            fontFamily: 'monospace',
            textAlign: 'center',
          }}>
          Lorem ipsum dolor sit amet,
        </Text>
        {/* <TouchableOpacity style={{backgroundColor=}} title="Back" onPress={() => props.back('visible1')} /> */}
        <View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              marginTop: 10,
              left: '10%',
              width: '80%',
              height: 70,
              backgroundColor: '#1c313a',
              borderRadius: 15,

              paddingVertical: 13,
            }}
            // onPress={() => props._logOut()}>
            onPress={() => props.logOut()}>
            <Text style={{fontSize: 40, color: '#fcdcc8', textAlign: 'center'}}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.back('visible1')}>
          <Text style={styles.buttonText}>«</Text>
        </TouchableOpacity>
      </View>

      <View></View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: '5%',
    width: 70,
    height: 70,
    // backgroundColor: '#1c313a',
    borderRadius: 15,
    borderWidth: 2,

    top: '5%',

    paddingVertical: 13,
  },

  buttonText: {
    top: -42,
    fontSize: 90,
    fontWeight: 'bold',
    color: '#1c313a',
    textAlign: 'center',
  },
});

export default Profile;
