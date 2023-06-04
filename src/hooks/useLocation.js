import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';

export default function useLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    if (Platform.OS === 'android' && !Device.isDevice) {
      setErrorMsg(
        'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
      );
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    return location;
  };

  const updateLocation = () => {
    getLocation().then((location) => {
      setLocation(location);
    });
  };

  useEffect(() => {
    updateLocation();

    const intervalFunc = setInterval(() => {
      updateLocation();
    }, 5000);

    return () => {
      clearInterval(intervalFunc);
    }
  }, []);

  return { location, errorMsg, getLocation };
}
