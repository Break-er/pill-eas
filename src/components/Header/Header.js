import React, {useState, useEffect} from 'react';
import {Provider as PaperProvider, Menu, Button} from 'react-native-paper';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

function Header() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const moveScreen = path => {
    closeMenu();
    if (path !== 'Login') {
      navigation.navigate(path);
    } else {
      navigation.navigate(path, {
        param: 'logout',
      });
    }
  };

  const setLoginValue = () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  };

  useEffect(() => {
    setLoginValue();
  }, []);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Ionicons
            name="ios-settings-outline"
            size={20}
            color="#000000"
            onPress={openMenu}
          />
        }>
        <Menu.Item
          onPress={() => moveScreen('Login')}
          title={loggedIn ? '로그아웃' : '로그인'}
          titleStyle={{fontSize: 15}}
        />
      </Menu>
    </View>
  );
}

export default Header;
