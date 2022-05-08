import React, {useState, useEffect} from 'react';
import {View, Platform, PermissionsAndroid, Button} from 'react-native';
import {Text} from 'react-native-paper';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";
import firestore from '@react-native-firebase/firestore';

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

let all;
let nearby = []

firestore().collection('Places').get()
  .then(querySnapshot => {
    console.log(querySnapshot.size);
    all = querySnapshot;
  });

function getNearby(latitude, longitude) {
  nearby = []
  all.forEach(doc => {
    if (((doc.data().latitude - latitude)**2 + (doc.data().longitude - longitude)**2) <= 0.00005) {
      nearby.push(doc);
    }
  })
}

drawMarkers = () => {
  return nearby.map((doc) =>
  <Marker
    key={doc.id}
    coordinate={{latitude: doc.data().latitude, longitude: doc.data().longitude}}
    title={doc.data().name}
    description={doc.data().address}
  >
  </Marker>)
}

// for Batch Write
/* const db = firebase.firestore()
const batch = firestore().batch()

function batchWrite() {
  state.forEach((doc) => {
    let docRef = db.collection("Places").doc();
    batch.set(docRef, doc);
  });
  console.log("Ready to Commit...")
}

function batchCommit() {
  batch.commit().then(()=>console.log("Successfully Added!"));
} */

// 서버에서 모든 수거처 데이터 로드
// firestore().collection('Places').get()
//   .then(querySnapshot => {
//     console.log("Total data : ", querySnapshot.size);
//     querySnapshot.forEach(documentSnapshot => {
//       all.push(documentSnapshot.data());
//     });
//   });

function Map() {
  const [location, setLocation] = useState();
  const [middle, setMiddle] = useState();
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
            setMiddle({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
          onRegionChangeComplete={region=> {
            setLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
            setMiddle({
              latitude: region.latitude,
              longitude: region.longitude,
            });
            console.log(middle.latitude, middle.longitude)
            console.log(region.latitude, region.longitude)
            getNearby(middle.latitude, middle.longitude);
          }}
          >
          {this.drawMarkers()}
        </MapView>
      </View>
    </>
  );
}

export default Map;
