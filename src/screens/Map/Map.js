import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import TitleBar from '../../components/TitleBar/TitleBar';

function Map() {
  return (
    <View style={styles.container}>
      <TitleBar
        title="내 주변 수거함"
        subtitle="주변 폐의약품 수거 약국 및 수거함 위치를 안내합니다."
      />
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
