import React, {useState, useEffect} from 'react';
import {Provider as PaperProvider, Menu, Button} from 'react-native-paper';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Header() {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const moveScreen = path => {
    closeMenu();
    navigation.navigate(path);
  };
  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Ionicons
            name="ios-settings-outline"
            size={20}
            color="#0000000"
            onPress={openMenu}
          />
        }>
        {/* <Menu.Item
          onPress={() => moveScreen('Settings')}
          title="환경설정"
          titleStyle={{fontSize: 15}}
        /> */}
        <Menu.Item
          onPress={() => moveScreen('Login')}
          title="로그인" // 로그아웃
          titleStyle={{fontSize: 15}}
        />
      </Menu>
    </View>
  );
}

export default Header;
