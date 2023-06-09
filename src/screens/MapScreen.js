import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Button } from 'react-native';
import useLocation from '@/hooks/useLocation';

export default function MapScreen() {
  const { location, errorMsg } = useLocation();
  const [isMapReady, setIsMapReady] = useState(false);
  const [markers, setMarkers] = useState([]);
  const MapViewRef = useRef(null);

  useEffect(() => {
    if (location && isMapReady) {
      animateToUserRegion()
    }
  }, [isMapReady])

  handleOnMapReady = () => {
    setIsMapReady(true);
  }

  animateToUserRegion = () => {
    if (MapViewRef.current) {
      MapViewRef.current.getCamera().then((camera) => {
        const distance = Math.sqrt(
          Math.pow(camera.center.latitude - location.coords.latitude, 2) + Math.pow(camera.center.longitude - location.coords.longitude, 2)
        )

        // 1 distance = 111km, so convert it to kilometers
        const distanceInKilometers = distance * 111;

        // Define duration as 1 second per 10 kilometers
        let duration = distanceInKilometers / 10;

        if (duration > 3) {
          duration = 3;
        } else if (duration < 0.5) {
          duration = 0.5;
        }

        MapViewRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922 / 10,
          longitudeDelta: 0.0421 / 10,
        }, duration * 1000)
      })
    }
  }

  return (
    <View style={styles.container}>
      {location ? (
        <>
        <MapView
          ref={MapViewRef}
          style={styles.map}
          onMapReady={handleOnMapReady}
          provider='google'
          showsUserLocation={true}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>

        <View style={styles.sideMenuContainer}>
          <Button title='Current' onPress={animateToUserRegion} />
        </View>
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 24 }}>{ errorMsg ? errorMsg : 'Loading...' }</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  sideMenuContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 100,
    right: 10,
  },
});
