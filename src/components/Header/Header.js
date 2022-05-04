import React, {useState, useEffect} from 'react';
import {
  IconButton,
  Provider as PaperProvider,
  Menu,
  Button,
} from 'react-native-paper';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

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
          <IconButton
            icon={{
              uri: 'https://i.postimg.cc/kghVWxRn/settings-outline.png',
            }}
            color="#000"
            size={20}
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
