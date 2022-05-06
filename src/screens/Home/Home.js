import React, {useEffect} from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Home() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.navigate('Main');
  });

  return (
    <View style={styles.container}>
      <Text>Home!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
