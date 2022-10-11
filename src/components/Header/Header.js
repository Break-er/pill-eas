import React, {useState, useEffect} from 'react';
import {Provider, Menu, Modal, Text, Portal} from 'react-native-paper';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

function Header() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const containerStyle = {backgroundColor: 'white', margin: 20, padding: 20};

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
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Portal>
              <Modal
                visible={modalVisible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}>
                <View>
                  <Text style={{color: '#999999', fontSize: 18}}>
                    <Ionicons
                      name="help-circle-outline"
                      size={15}
                      color="#999999"
                    />{' '}
                    올바른 의약품 보관 및 폐기법{'\n'}
                  </Text>
                  <Text style={{color: '#999999', fontSize: 16}}>
                    폐의약품이란 가정에서 먹다 남은 약 중에서 유효기한이
                    지났거나 변질, 부패 등으로 사용할 수 없는 의약품입니다.
                    {'\n'}
                  </Text>
                  <Text style={{color: '#999999', fontSize: 16}}>
                    - 약은 필요한 만큼 처방/구매하고, 유통기한을 반드시
                    확인하기!{'\n'}
                    상비약은 적시에 필요한 역할을 하지만, 이것저것 필요 이상으로
                    구입해 놓는 경우도 많습니다. 더불어 약의 기본 유통기한은 약
                    1년, 개봉된 알약 및 시럽은 일주일만 지나도 효과가 떨어진다고
                    하니 습기가 없고 서늘한 곳에 두며 기한 내에 알맞게 복용하는
                    점 잊지 마세요!{'\n'}
                  </Text>
                  <Text style={{color: '#999999', fontSize: 16}}>
                    - 남은 약들은 모아 가까운 약국에 가져다주기!{'\n'}
                    폐의약품 발생 시 유리 및 플라스틱 용기, 종이상자 등은 자체
                    분리수거 후 내용물만 배출해 알약은 알약끼리, 캡슐은
                    캡슐끼리, 가루약은 가루약끼리 모아서 봉투에 담고,
                    물약(시럽)은 물약(시럽)끼리, 연고는 연고끼리 모아서 하나의
                    플라스틱 병 등에 담아 폐의약품 수거함이 있는 약국 또는
                    보건소에 가져다주면 됩니다.{'\n'}
                  </Text>
                  <Text style={{color: '#999999', fontSize: 16}}>
                    - 약을 제외한 약봉투 및 포장 케이스는 분리수거법에 따라 각각
                    알맞게 버리기!{'\n'}월 1회 보건소 및 구청 청소차가
                    거점약국을 다니며 약국에 모인 폐의약품을 수거,
                    전문소각처리업체로 가져가 안전하게 소각처리한다고 합니다.
                  </Text>
                </View>
              </Modal>
            </Portal>
            <Ionicons
              name="help-circle-outline"
              size={24}
              color="#000000"
              onPress={showModal}
            />
            <Ionicons
              name="ios-settings-outline"
              size={20}
              color="#000000"
              onPress={openMenu}
              style={{marginLeft: 10, marginTop: 2}}
            />
          </View>
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
