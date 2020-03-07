import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';
import MapView, {Marker, Circle, Callout} from 'react-native-maps';
navigator.geolocation = require('@react-native-community/geolocation');
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0,
  longitudeDelta: 0.05,
};

const App = () => {
  let myMap;
  const [currentPosition, setCurrentPosition] = useState(initialState);
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
    <View>
      <MapView
        ref={ref => (myMap = ref)}
        style={styles.map}
        showsTraffic
        showsMyLocationButton
        mapType={'satellite'}
        initialRegion={currentPosition}>
        <Circle
          center={currentPosition}
          radius={800}
          fillColor={'rgba(112, 168, 184, 0.3)'}
          strokeWidth={0}
        />
        <Marker
          style={styles.marker}
          coordinate={currentPosition}
          image={require('./src/images/pin.png')}
          onPress={() => {
            myMap.fitToCoordinates([currentPosition], {
              edgePadding: {top: 10, right: 50, bottom: 1000, left: 50},
              animateToRegion: true,
            });
          }}>
          <Callout style={styles.callout}>
            <Text
              style={{
                width: 200,
                height: '140%',
                marginTop: -43,

                // overflow: 'visible',
              }}>
              <Image
                style={{height: 100, width: 100}}
                source={{
                  uri:
                    'https://pps.whatsapp.net/v/t61.24694-24/76657284_130084001696920_1594520021441310475_n.jpg?oe=5E64FEDD&oh=42abd2f974f8b0eba37af4314ff126ac',
                }}
                resizeMode="cover"
              />
            </Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
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
    width: '100%',
  },

  callout: {
    width: 100,
    height: 120,
  },
});

export default App;
