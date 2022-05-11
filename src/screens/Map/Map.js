import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Platform,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Linking,
  Pressable,
} from 'react-native';
import {Text, Button, List} from 'react-native-paper';
import MapView, {PROVIDER_GOOGLE, Marker, Overlay} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DraggablePanel from 'react-native-draggable-panel';

async function requestPermission() {
  try {
    //ios 위치 정보 수집 권한 요청
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
    //android 위치 정보 수집 권한 요청
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.log(e);
  }
}

let all;
let nearby = [];

// 서버에서 모든 수거처 데이터 로드
firestore()
  .collection('Places')
  .get()
  .then(querySnapshot => {
    // console.log(querySnapshot.size);
    all = querySnapshot;
    // querySnapshot.forEach(doc => {
    //   console.log(doc.id, doc.data().name)
    // })
  });

// 중점 기준 인근 수거처 따로 수집
function getNearby(latitude, longitude) {
  nearby = [];
  all &&
    all.forEach(doc => {
      if (
        (doc.data().latitude - latitude) ** 2 +
          (doc.data().longitude - longitude) ** 2 <=
        0.00007
      ) {
        nearby.push(doc);
      }
    });
}

// 중점 기준 인근 수거처 마커를 맵에 표시
const drawMarkers = () => {
  return nearby.map(doc => (
    <Marker
      key={doc.id}
      coordinate={{
        latitude: doc.data().latitude,
        longitude: doc.data().longitude,
      }}
      title={doc.data().name}
      description={doc.data().address + '\n' + doc.data().telephone}
    />
  ));
};

// 인근 수거처 정보를 Expanded panel에 표시
const listMarkers = () => {
  if (nearby.length === 0) {
    return (
      <View style={styles.empty_text_box}>
        <Text style={styles.empty_text}>
          주변에 폐의약품 수거처가 없습니다!
        </Text>
      </View>
    );
  }
  return (
    <View style={{marginTop: 10, marginBottom: 10}}>
      {nearby.map((item, idx) => (
        <List.Item
          key={idx}
          title={item.data().name}
          descriptionNumberOfLines={10}
          descriptionStyle={{flexShrink: 1}}
          description={
            <Text style={{fontSize: 14}}>
              {item.data().address + '\n'}
              <Pressable>
                {({pressed}) => (
                  <Text
                    style={{
                      color: pressed ? '#000000' : '#999999',
                      fontSize: 14,
                    }}
                    onPress={() =>
                      Linking.openURL(`tel:${item.data().telephone}`)
                    }>
                    {item.data().telephone}
                  </Text>
                )}
              </Pressable>
            </Text>
          }
          style={styles.list_item}
          left={props => (
            <Ionicons
              name="ios-location"
              size={30}
              style={{marginTop: 20, marginRight: 10}}
            />
          )}
        />
      ))}
    </View>
  );
  // return nearby.map(doc => (
  //   <Text key={doc.id}>
  //     {doc.data().name +
  //       '주소 : ' +
  //       doc.data().address +
  //       '\n연락처 : ' +
  //       doc.data().telephone +
  //       '\n'}
  //   </Text>
  // ));
};

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

function Map() {
  const [location, setLocation] = useState();
  const [middle, setMiddle] = useState();
  const ref = useRef();
  useEffect(() => {
    requestPermission().then(result => {
      // console.log({result});
      if (result == 'granted') {
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
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
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
          onRegionChangeComplete={region => {
            setLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
            setMiddle({
              latitude: region.latitude,
              longitude: region.longitude,
            });
            // console.log(middle.latitude, middle.longitude);
            // console.log(region.latitude, region.longitude);
            getNearby(middle.latitude, middle.longitude);
          }}>
          {drawMarkers()}
        </MapView>
        <Button
          mode="contained"
          onPress={() => {
            ref.current.show();
          }}>
          주변 수거처 목록 보기
        </Button>
        <DraggablePanel
          ref={ref}
          expandable={true}
          hideOnPressOutside={true}
          hideOnBackButtonPressed={true}
          scrl>
          <ScrollView>{listMarkers()}</ScrollView>
        </DraggablePanel>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  empty_text_box: {
    alignItems: 'center',
  },
  empty_text: {
    marginTop: 140,
    fontSize: 15,
  },
  list_item: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default Map;
