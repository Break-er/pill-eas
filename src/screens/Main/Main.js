import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {IconButton, Surface, Text, Menu, Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Main({navigation}) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const moveScreen = path => {
    if (path === 'Settings') closeMenu();
    navigation.navigate(path);
  };

  return (
    <View style={styles.container}>
      <View style={styles.main_header}>
        <View style={styles.settings_icon}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                icon={{
                  uri: 'https://i.postimg.cc/kghVWxRn/settings-outline.png',
                }}
                color="#808080"
                size={25}
                onPress={openMenu}
              />
            }>
            <Menu.Item
              onPress={() => moveScreen('Settings')}
              title="환경설정"
              titleStyle={{fontSize: 15}}
            />
            <Menu.Item
              onPress={() => moveScreen('Login')}
              title="로그인" // 로그아웃
              titleStyle={{fontSize: 15}}
            />
          </Menu>
        </View>
        <View style={styles.header_textbox}>
          <Text style={styles.header_title}>어떤 코너를</Text>
          <Text style={styles.header_title}>이용하시겠습니까?</Text>
        </View>
      </View>
      <View style={styles.surface_set}>
        <TouchableOpacity onPress={() => moveScreen('List')}>
          <Surface style={styles.surface}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{width: '85%'}}>
                <Text style={styles.textbox_title}>복용 중 약 리스트</Text>
                <Text style={styles.textbox}>
                  처방 받은 약을 입력하고, 복용 중인 약품을 확인합니다.
                </Text>
              </View>
              <View style={styles.icon}>
                <Ionicons
                  name="ios-list-circle-outline"
                  style={{fontSize: 45}}
                />
              </View>
            </View>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => moveScreen('Calendar')}>
          <Surface style={styles.surface}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{width: '85%'}}>
                <Text style={styles.textbox_title}>복용 기록</Text>
                <Text style={styles.textbox}>
                  누적된 복용 기록을 캘린더 형식으로 확인합니다.
                </Text>
              </View>
              <View style={styles.icon}>
                <Ionicons name="ios-calendar-outline" style={{fontSize: 45}} />
              </View>
            </View>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => moveScreen('Map')}>
          <Surface style={styles.surface}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{width: '85%'}}>
                <Text style={styles.textbox_title}>내 주변 수거함</Text>
                <Text style={styles.textbox}>
                  주변 폐의약품 수거 약국 및 수거함 위치를 안내합니다.
                </Text>
              </View>
              <View style={styles.icon}>
                <Ionicons name="ios-map-outline" style={{fontSize: 45}} />
              </View>
            </View>
          </Surface>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  main_header: {
    height: '40%',
    backgroundColor: '#85DEDC',
  },
  settings_icon: {
    marginTop: 10,
    marginLeft: 360,
  },
  header_textbox: {
    paddingTop: 120,
    paddingLeft: 20,
  },
  header_title: {
    fontSize: 25,
    color: '#fff',
  },
  surface_set: {
    height: '60%',
    display: 'flex',
  },
  surface: {
    paddingTop: 35,
    height: 120,
    justifyContent: 'center',
    elevation: 3,
    paddingLeft: 30,
    paddingRight: 30,
  },
  textbox_title: {
    fontSize: 18,
  },
  textbox: {
    color: '#999999',
    fontSize: 12,
    paddingTop: 5,
  },
  icon: {
    width: '15%',
    alignItems: 'center',
  },
});

export default Main;
