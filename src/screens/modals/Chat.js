// Library
import React, {Component} from 'react';
import {Text, View, ScrollView, TextInput, Image, Button} from 'react-native';

// Styles
// import styles from './AppStyle'

const Chat = props => {
  return (
    <>
      <Button title="Back" onPress={() => props.back('visible')} />

      <ScrollView
        style={{
          height: 730,
          width: 490,
          bottom: 0,
          paddingHorizontal: 40,
          backgroundColor: '#F7E1D8',
        }}>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
        <Text>INI CHATINGAN</Text>
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
          // onChangeText={e => this.setState({email: e})}
          // value={this.state.email}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'flex-end',
          bottom: 15,
          right: 15,
        }}
        onPress={() => setVisible1(true)}>
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
      </View>
    </>
  );
};

export default Chat;
