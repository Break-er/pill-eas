import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, Alert} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

function Login({route}) {
  const {param} = route.params;
  const navigation = useNavigation();

  //구글 로그인 기능 사용 위해 webClientId 가져오는 함수
  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      webClientId:
        '860482411414-jkjpsfm0vqumrqsqkjue98e62stb3soj.apps.googleusercontent.com',
    });
  };

  //로그인하는 함수
  const onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const res = auth().signInWithCredential(googleCredential);
    const userCollection = firestore().collection('Users');

    auth().onAuthStateChanged(user => {
      let userDoc = null;
      userDoc = userCollection.doc(user.uid).get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          console.log("exist!!");
        }
        else {
          console.log("new");
          userCollection.doc(user.uid).set({fillList : []});
        }
      });
    });
    if (checkLoggedIn) {
      Alert.alert('로그인 되었습니다.');
      navigation.navigate('Main');
    } else {
      Alert.alert('로그인에 실패하였습니다.');
    }
    return res;
  };

  const checkLoggedIn = () => {
    let loggedIn = false;

    auth().onAuthStateChanged(user => {
      if (user) {
        loggedIn = true;
      } else {
        loggedIn = false;
      }
    });

    return loggedIn;
  };

  useEffect(() => {
    googleSigninConfigure();
    let loggedIn = false;
    auth().onAuthStateChanged(user => {
      if (user) {
        loggedIn = true;
        console.log(user);
      } else {
        loggedIn = false;
      }
    });

    if (!!param && param === 'logout') {
      auth()
        .signOut()
        .then(() => {
          Alert.alert('로그아웃 되었습니다.');
          navigation.navigate('Main');
        });
    }
  });

  return (
    <View style={styles.container}>
      <View style={{marginTop: -80}}>
        <Image
          source={require('../../assets/images/appname.png')}
          style={styles.app_name_image}
          resizeMode="contain"
        />
        <GoogleSigninButton
          onPress={() => onGoogleButtonPress()}
          style={styles.login_btn}
          // color={GoogleSigninButton.Color.Dark}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  app_name_image: {
    width: 200,
    marginLeft: 15,
  },
  login_btn: {
    marginTop: 0,
  },
});

export default Login;
