import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import TitleBar from '../../components/TitleBar/TitleBar';

function Map() {
  return (
    <View style={styles.container}>
      <TitleBar />
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
  },
});

export default Map;
