import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, StyleSheet, Alert} from 'react-native';
import {IconButton, Surface, Text, Menu, Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

function Main({navigation}) {
  const [loggedIn, setLoggedIn] = useState(false);

  const moveScreen = path => {
    if (loggedIn) {
      navigation.navigate('BottomNav', {screen: path});
    } else {
      if (path !== 'Map') {
        Alert.alert(
          '로그인 후 이용가능합니다. 로그인 페이지로 이동합니다.',
          '',
          [
            {
              text: '취소',
              onPress: () => navigation.navigate('Main'),
              style: 'cancel',
            },
            {
              text: '확인',
              onPress: () =>
                navigation.navigate('Login', {
                  param: 'login',
                }),
            },
          ],
        );
      } else {
        navigation.navigate('BottomNav', {screen: path});
      }
    }
  };

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.main_header}>
        <View style={styles.header_textbox}>
          <Text style={styles.header_title_2}>
            환경을 생각한 복용부터 처리까지
          </Text>
          <Text style={styles.header_title}>Pill:ease</Text>
        </View>
      </View>
      <View style={styles.surface_set}>
        <TouchableOpacity onPress={() => moveScreen('List')}>
          <Surface style={styles.surface}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{width: '85%'}}>
                {loggedIn ? (
                  <Text style={styles.textbox_title}>복용 중인 약</Text>
                ) : (
                  <Text style={styles.textbox_title_disabled}>
                    복용 중인 약
                  </Text>
                )}
                <Text style={styles.textbox}>
                  처방 받은 약을 입력하고, 복용 중인 약품을 확인합니다.
                </Text>
              </View>
              <View style={styles.icon}>
                <Ionicons
                  name="ios-list-circle-outline"
                  style={{fontSize: 45}}
                />
              </View>
            </View>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => moveScreen('Calendar')}>
          <Surface style={styles.surface}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{width: '85%'}}>
                {loggedIn ? (
                  <Text style={styles.textbox_title}>복용 기록</Text>
                ) : (
                  <Text style={styles.textbox_title_disabled}>복용 기록</Text>
                )}
                <Text style={styles.textbox}>
                  누적된 복용 기록을 캘린더 형식으로 확인합니다.
                </Text>
              </View>
              <View style={styles.icon}>
                <Ionicons name="ios-calendar-outline" style={{fontSize: 45}} />
              </View>
            </View>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => moveScreen('Map')}>
          <Surface style={styles.surface}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{width: '85%'}}>
                <Text style={styles.textbox_title}>내 주변 수거함</Text>
                <Text style={styles.textbox}>
                  주변 폐의약품 수거 약국 및 수거함 위치를 안내합니다.
                </Text>
              </View>
              <View style={styles.icon}>
                <Ionicons name="ios-map-outline" style={{fontSize: 45}} />
              </View>
            </View>
          </Surface>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  main_header: {
    height: '40%',
    backgroundColor: '#85DEDC',
  },

  header_textbox: {
    paddingTop: 140,
    paddingLeft: 20,
  },
  header_title: {
    fontSize: 25,
    color: '#fff',
  },
  header_title_2: {
    fontSize: 20,
    color: '#fff',
  },
  surface_set: {
    height: '60%',
    display: 'flex',
  },
  surface: {
    paddingTop: 35,
    height: 120,
    justifyContent: 'center',
    elevation: 3,
    paddingLeft: 30,
    paddingRight: 30,
  },
  textbox_title: {
    fontSize: 18,
  },
  textbox_title_disabled: {
    fontSize: 18,
    color: '#999999',
  },
  textbox: {
    color: '#999999',
    fontSize: 12,
    paddingTop: 5,
  },
  icon: {
    width: '15%',
    alignItems: 'center',
  },
});

export default Main;
