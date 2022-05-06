import React from 'react';
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

let data = [];
auth().onAuthStateChanged(user => {
  const pillList = firestore().collection('Users').doc(user.uid).collection('pillList').get();
  pillList.then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
      //console.log(documentSnapshot.data());
      data.push(documentSnapshot.data());
      console.log(data);
    });
  });
});
console.log(data);

function MedicineList({navigation}) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const moveScreen = path => {
    navigation.navigate(path);
  };

  return (
    <View style={styles.container}>
      <View>
        <TitleBar
          title="복용 중 약 리스트"
          subtitle="처방 받은 약을 입력하고, 복용 중인 약품을 확인합니다."
        />
        <ScrollView>
          <List.Section>
            <Searchbar
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.searchBar}
              iconColor="#8AB5E6"
              placeholder="현재 복용 중인 약 검색"
            />
            <List.Accordion
              title="감기약"
              left={props => <List.Icon {...props} icon="folder" />}
              style={{color: '#8AB5E6'}}>
              <List.Item
                title={() => (
                  <View style={{marginTop: -10}}>
                    <Text style={styles.listItem}>약 형태 : 물약</Text>
                    <Text style={styles.listItem}>약 종류 : 감기약</Text>
                    <Text style={styles.listItem}>복용 주기 : 주 3회</Text>
                    <Text style={styles.listItem}>총 복용 횟수 : 30회</Text>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 50,
                      }}>
                      <Text>
                        <Button
                          mode="text"
                          color="#8AB5E6"
                          onPress={() => console.log('fix Pressed')}>
                          수정
                        </Button>{' '}
                        <Button mode="text" color="#8AB5E6" onPress={showModal}>
                          삭제
                        </Button>{' '}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </List.Accordion>
            <List.Accordion
              title="감기약"
              left={props => <List.Icon {...props} icon="folder" />}
              style={{color: '#8AB5E6'}}>
              <List.Item
                title={() => (
                  <View style={{marginTop: -10}}>
                    <Text style={styles.listItem}>약 형태 : 물약</Text>
                    <Text style={styles.listItem}>약 종류 : 감기약</Text>
                    <Text style={styles.listItem}>복용 주기 : 주 3회</Text>
                    <Text style={styles.listItem}>총 복용 횟수 : 30회</Text>
                    <View style={styles.listItemButton}>
                      <Text>
                        <Button
                          mode="text"
                          color="#8AB5E6"
                          onPress={() => console.log('fix Pressed')}>
                          수정
                        </Button>{' '}
                        <Button mode="text" color="#8AB5E6" onPress={showModal}>
                          삭제
                        </Button>{' '}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </List.Accordion>

            <List.Accordion
              title="허리 디스크 약"
              left={props => <List.Icon {...props} icon="folder" />}
              style={{color: '#8AB5E6'}}>
              <List.Item
                title={() => (
                  <View style={{marginTop: -10}}>
                    <Text style={styles.listItem}>약 형태 : 알약</Text>
                    <Text style={styles.listItem}>
                      약 종류 : 허리 디스크 약
                    </Text>
                    <Text style={styles.listItem}>복용 주기 : 주 5회</Text>
                    <Text style={styles.listItem}>총 복용 횟수 : 100회</Text>
                    <View style={styles.listItemButton}>
                      <Text>
                        <Button
                          mode="text"
                          color="#8AB5E6"
                          onPress={() => console.log('fix Pressed')}>
                          수정
                        </Button>{' '}
                        <Button mode="text" color="#8AB5E6" onPress={showModal}>
                          삭제
                        </Button>{' '}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </List.Accordion>
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
});

export default MedicineList;
