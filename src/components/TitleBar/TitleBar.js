import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Headline, Text} from 'react-native-paper';

function TitleBar({title, subtitle}) {
  return (
    <View style={styles.titlebar}>
      <Headline style={{paddingTop: 50, fontWeight: 'bold'}}>{title}</Headline>
      <Text style={{color: '#999999', fontSize: 12, paddingTop: 5}}>
        {subtitle}
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
