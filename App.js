import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -5.388723,
            longitude: 105.254152,
            latitudeDelta: 0,
            longitudeDelta: 0.05,
          }}>
          <Marker
            coordinate={{
              latitude: -5.388723,
              longitude: 105.254152,
            }}
            title="Demo"
            description="A location to test"
          />
        </MapView>
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
});
