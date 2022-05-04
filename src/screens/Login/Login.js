import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

//구글 로그인 기능 사용 위해 webClientId 가져오는 함수
export const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId: 
      '860482411414-jkjpsfm0vqumrqsqkjue98e62stb3soj.apps.googleusercontent.com',
  })
};

//로그인하는 함수
export const onGoogleButtonPress = async () => {
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};

//로그인 여부 확인하는 함수
export const checkLoggedIn = () => { 
  const [loggedIn, setLoggedIn] = useState(false);

  auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true)
      console.log("Logged In")
    }
    else{
      setLoggedIn(false)
      console.log("Logged Out")
    }
  })
  
  return (loggedIn)
};


function Login({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo_image}
        source={{
          uri: 'https://i.postimg.cc/x1sZ12yq/1.png',
        }}
      />
      <GoogleSigninButton onPress={() => onGoogleButtonPress()} />
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
