import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Headline, Text} from 'react-native-paper';

function TitleBar() {
  return (
    <View style={styles.titlebar}>
      <Headline style={{paddingTop: 50, fontWeight: 'bold'}}>
        내 주변 수거함
      </Headline>
      <Text style={{color: '#999999', fontSize: 12, paddingTop: 5}}>
        주변 폐의약품 수거 약국 및 수거함 위치를 안내합니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titlebar: {
    marginBottom: 30,
  },
});

export default TitleBar;
