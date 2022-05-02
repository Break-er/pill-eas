import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {IconButton, Surface, Text, Menu, Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Login({navigation}) {
  const moveScreen = path => {
    navigation.navigate(path);
  };

  return (
    <View style={styles.container}>
      <View style={styles.main_header}>
        <View style={styles.header_textbox}>
          <Text style={styles.header_title}>어떤 코너를</Text>
          <Text style={styles.header_title}>이용하시겠습니까?</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  main_header: {
    height: '40%',
    backgroundColor: '#85DEDC',
  },
  settings_icon: {
    marginTop: 10,
    marginLeft: 360,
  },
  header_textbox: {
    paddingTop: 120,
    paddingLeft: 20,
  },
  header_title: {
    fontSize: 25,
    color: '#fff',
  },
});

export default Login;
