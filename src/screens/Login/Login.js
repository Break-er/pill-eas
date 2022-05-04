import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

function Login({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo_image}
        source={{
          uri: 'https://i.postimg.cc/x1sZ12yq/1.png',
        }}
      />
      {/* firebase google login component */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  logo_image: {
    width: 100,
    height: 120,
    marginTop: 100,
  },
});

export default Login;
