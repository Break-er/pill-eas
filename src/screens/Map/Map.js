import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform, PermissionsAndroid} from 'react-native';
import {Text} from 'react-native-paper';
import TitleBar from '../../components/TitleBar/TitleBar';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";

async function requestPermission() {
  try {
    //ios 위치 정보 수집 권한 요청
    if (Platform.OS === "ios") {
      return await Geolocation.requestAuthorization("always");
    }
    //android 위치 정보 수집 권한 요청
    if (Platform.OS === "android") {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    } 
  }
  catch (e) {
    console.log(e);
  }
}

// state = { reports: [] } 

// nearbyMarkers = () => {
//   return this.state.reports.map((report) =>
//    <Marker
//     key={report.id}
//     coordinate={{latitude: report.lat, longitude: report.lon}}
//     title={report.location}
//     description={report.comments}
//    >
//    </Marker>)
// } 

function Map() {
  const [location, setLocation] = useState();
  useEffect(() => {
    requestPermission().then(result => {
      console.log({result});
      if (result == "granted") {
        Geolocation.getCurrentPosition(
          pos => {
            setLocation(pos.coords);
          },
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      }
    });
  }, []);

  if (!location) {
    return(
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onRegionChange={region => {
            setLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
          onRegionChangeComplete={region=> {
            setLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
          >
          {/* {this.nearbyMarkers()} */}
        </MapView>
      </View>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     marginLeft: 30,
//   },
// });

export default Map;
