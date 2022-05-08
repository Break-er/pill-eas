import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {
  List,
  Searchbar,
  Button,
  Modal,
  Portal,
  Provider,
  FAB,
} from 'react-native-paper';
import TitleBar from '../../components/TitleBar/TitleBar';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function MedicineList({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(true);
  const [visible, setVisible] = useState(false);
  const [medicineList, setMedicineList] = useState([]);

  const onChangeSearch = query => setSearchQuery(query);

  const handlePress = () => setExpanded(!expanded);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const moveScreen = path => {
    navigation.navigate(path);
  };

  const printDate = source => {
    const date = new Date(source.seconds * 1000);
    let tempYear_s = date.getFullYear();
    let tempMonth_s = date.getMonth() + 1;
    let tempDate_s = date.getDate();
    let parsingDate_s = `${tempYear_s}-${
      tempMonth_s >= 10 ? tempMonth_s : '0' + tempMonth_s
    }-${tempDate_s >= 10 ? tempDate_s : '0' + tempDate_s}`;

    return parsingDate_s;
  };

  const printTime = source => {
    let tmp = [];
    source.forEach((value, index, source) => {
      const cur = new Date(value.seconds * 1000);
      var hours = ('0' + cur.getHours()).slice(-2);
      var minutes = ('0' + cur.getMinutes()).slice(-2);

      var timeString = hours + ':' + minutes;
      tmp.push(timeString);
    });
    return tmp;
  };

  const getTypeName = item => {
    switch (item) {
      case 'pill':
        return '알약';
      case 'powdered_medicine':
        return '가루약';
      case 'capsule':
        return '캡슐제';
      case 'liquid_medicine':
        return '물약';
      case 'oral_decomposition_film':
        return '구강분해필름';
    }
  };

  useEffect(() => {
    let tmp = [];
    auth().onAuthStateChanged(user => {
      firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('pillList')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            tmp.push(documentSnapshot.data());
          });
        })
        .then(() => {
          tmp && setMedicineList(tmp.reverse());
        });
    });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <ScrollView>
          <TitleBar
            title="복용 중 약 리스트"
            subtitle="처방 받은 약을 입력하고, 복용 중인 약품을 확인합니다."
          />
          <List.Section>
            <Searchbar
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.searchBar}
              iconColor="#8AB5E6"
              placeholder="현재 복용 중인 약 검색"
            />
            {medicineList &&
              medicineList.map((item, idx) => (
                <List.Accordion
                  title={item.name}
                  left={props => <List.Icon {...props} icon="folder" />}
                  style={{color: '#8AB5E6'}}
                  key={idx}>
                  <List.Item
                    title={() => (
                      <View style={{marginTop: -10}}>
                        <Text style={styles.listItem}>
                          약 제형 : {getTypeName(item.type)}
                        </Text>
                        <Text style={styles.listItem}>
                          복용 시작 : {printDate(item.startDate)}
                        </Text>
                        <Text style={styles.listItem}>
                          복용 종료 : {printDate(item.endDate)}
                        </Text>
                        <Text style={styles.listItem}>
                          복용 주기 : {item.cycle}일
                        </Text>
                        <Text style={styles.listItem}>
                          복용 횟수 : {item.count}번 / 일
                        </Text>
                        <Text style={styles.listItem}>
                          복용 시간 :{' '}
                          {printTime(item.periods).map((time, index) => (
                            <Text key={index}>
                              {time}
                              {'  '}
                            </Text>
                          ))}
                        </Text>
                        <View style={styles.modifyBtn}>
                          <Text>
                            <Button
                              mode="text"
                              color="#8AB5E6"
                              onPress={() => console.log('fix Pressed')}>
                              수정
                            </Button>{' '}
                            <Button
                              mode="text"
                              color="#8AB5E6"
                              onPress={showModal}>
                              삭제
                            </Button>{' '}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                </List.Accordion>
              ))}
          </List.Section>
        </ScrollView>
      </View>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
            style={styles.modalStyle}>
            <Text style={{padding: 20}}>선택한 약을 삭제하시겠습니까?</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>
                <Button
                  mode="text"
                  color="#8AB5E6"
                  onPress={() => console.log('okay Pressed')}>
                  예
                </Button>{' '}
                <Button
                  mode="text"
                  color="#8AB5E6"
                  onPress={() => console.log('no Pressed')}>
                  아니오
                </Button>
              </Text>
            </View>
          </Modal>
        </Portal>
      </Provider>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => moveScreen('AddMedicine')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
  },

  searchBar: {
    width: '94%',
    margin: 10,
  },

  listItem: {
    marginBottom: 20,
  },

  listItemButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 50,
  },

  modalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#85DEDC',
  },

  modifyBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 50,
  },
});

export default MedicineList;
