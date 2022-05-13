import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function EditMedicine({route}) {
  const {param} = route.params;
  const navigation = useNavigation();
  const today = new Date();
  const [medicineName, setMedicineName] = useState('');
  const [medicineType, setMedicineType] = useState('pill');
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startChecked, setStartChecked] = useState(false);
  const [endChecked, setEndChecked] = useState(false);
  const [medicineCycle, setMedicineCycle] = useState(1);
  const [medicineCount, setMedicineCount] = useState(1);
  const [timeOpen, setTimeOpen] = useState(
    Array.from({length: parseInt(20, 10)}, () => false),
  );
  const [periodicList, setPeriodicList] = useState(
    Array.from(
      {length: 20},
      () =>
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDay(),
          0,
          0,
          0,
        ),
    ),
  );
  const [timeChecked, setTimeChecked] = useState(
    Array.from({length: parseInt(20, 10)}, () => false),
  );
  const [medicineMemo, setMedicineMemo] = useState('');

  const types = [
    {label: '알약', value: 'pill'},
    {label: '가루약', value: 'powdered_medicine'},
    {label: '캡슐제', value: 'capsule'},
    {label: '물약', value: 'liquid_medicine'},
    {label: '구강분해필름', value: 'oral_decomposition_film'},
  ];

  const cycle = [
    {label: '1일', value: 1},
    {label: '2일', value: 2},
    {label: '3일', value: 3},
    {label: '4일', value: 4},
    {label: '5일', value: 5},
    {label: '6일', value: 6},
    {label: '7일', value: 7},
    {label: '8일', value: 8},
    {label: '9일', value: 9},
    {label: '10일', value: 10},
  ];

  const counts = [
    {label: '1번', value: 1},
    {label: '2번', value: 2},
    {label: '3번', value: 3},
    {label: '4번', value: 4},
    {label: '5번', value: 5},
    {label: '6번', value: 6},
    {label: '7번', value: 7},
    {label: '8번', value: 8},
    {label: '9번', value: 9},
    {label: '10번', value: 10},
    {label: '11번', value: 11},
    {label: '12번', value: 12},
    {label: '13번', value: 13},
    {label: '14번', value: 14},
    {label: '15번', value: 15},
    {label: '16번', value: 16},
    {label: '17번', value: 17},
    {label: '18번', value: 18},
    {label: '19번', value: 19},
    {label: '20번', value: 20},
  ];

  const getDateFormat = input_date => {
    let year = input_date.getFullYear();
    let month = input_date.getMonth() + 1;
    let date = input_date.getDate();

    return `${year}-${month >= 10 ? month : '0' + month}-${
      date >= 10 ? date : '0' + date
    }`;
  };

  const getTimeSelectElementOpen = index => {
    let tmp = Array.from({length: 20}, () => false);
    tmp[index] = true;
    tmp & setTimeOpen(tmp);
  };

  const getTimeSelectElementClose = index => {
    let tmp = Array.from({length: 20}, () => false);
    tmp[index] = false;
    tmp && setTimeOpen(tmp);
  };

  const setTimeSelectElement = (index, date) => {
    setTimeChecked(index);

    let tmp = [
      ...periodicList.slice(0, index),
      getKRtime(new Date(date)),
      ...periodicList.slice(index + 1),
    ];
    tmp && setPeriodicList(tmp);
  };

  const getKRtime = curr => {
    return new Date(curr.setHours(curr.getHours() + 9));
  };

  const getIncorrectKRtime = curr => {
    return new Date(curr.setHours(curr.getHours() - 9));
  };

  const printTime = cur => {
    var hours = ('0' + cur.getHours()).slice(-2);
    var minutes = ('0' + cur.getMinutes()).slice(-2);

    var timeString = hours + ':' + minutes;

    return timeString;
  };

  const onSubmit = () => {
    let tmp = periodicList.slice(0, medicineCount);
    const res = {
      name: medicineName,
      type: medicineType,
      startDate: getKRtime(startDate),
      endDate: getKRtime(endDate),
      cycle: medicineCycle,
      count: medicineCount,
      periods: tmp,
      memo: medicineMemo,
    };

    res && console.log(res);

    auth().onAuthStateChanged(user => {
      firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('pillList')
        .doc(res.name)
        .update({
          type: res.type,
          startDate: res.startDate,
          endDate: res.endDate,
          cycle: res.cycle,
          count: res.count,
          periods: res.periods,
          memo: res.memo,
        })
        .then(() => {
          Alert.alert('저장되었습니다');
          navigation.navigate('List');
        });
    });
  };

  useEffect(() => {
    setMedicineName(param.name);
    setMedicineType(param.type);
    setStartDate(new Date(param.startDate.seconds * 1000));
    setEndDate(new Date(param.endDate.seconds * 1000));
    setMedicineCycle(param.cycle);
    setMedicineCount(param.count);

    let tmp = Array.from(
      {length: 20},
      () =>
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDay(),
          0,
          0,
          0,
        ),
    );
    param.periods.forEach((item, index, param) => {
      tmp[index] = new Date(item.seconds * 1000);
    });

    tmp && setPeriodicList(tmp);
    setMedicineMemo(param.memo);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.input_text}>약 이름을 입력하세요</Text>
        <TextInput
          value={medicineName}
          onChangeText={text => setMedicineName(text)}
          mode="flat"
          style={styles.text_input}
          disabled={true}
        />
        <Text style={styles.input_text}>약 제형을 선택하세요</Text>
        <RNPickerSelect
          onValueChange={value => setMedicineType(value)}
          items={types}
          placeholder={{}}
          value={medicineType}
          useNativeAndroidPickerStyle={false}
        />
        <Text style={styles.input_text}>
          복용 시작 날짜와 종료 날짜를 선택하세요
        </Text>
        <View style={styles.datebutton_outer}>
          <Button
            mode="text"
            onPress={() => setStartOpen(true)}
            style={styles.datebutton}>
            {getDateFormat(startDate)}
          </Button>
          <DatePicker
            modal
            open={startOpen}
            date={startDate}
            mode="date"
            onConfirm={date => {
              setStartOpen(false);
              setStartDate(new Date(date.setHours(0, 0, 0)));
              setStartChecked(true);
            }}
            onCancel={() => {
              setStartOpen(false);
            }}
            title="복용 시작 날짜를 선택하세요"
            confirmText="확인"
            cancelText="취소"
          />
          <Button
            mode="text"
            onPress={() => setEndOpen(true)}
            style={styles.datebutton}>
            {getDateFormat(endDate)}
          </Button>
          <DatePicker
            modal
            open={endOpen}
            date={endDate}
            mode="date"
            onConfirm={date => {
              setEndOpen(false);
              setEndDate(new Date(date.setHours(0, 0, 0)));
              setEndChecked(true);
            }}
            onCancel={() => {
              setEndOpen(false);
            }}
            title="복용 종료 날짜를 선택하세요"
            confirmText="확인"
            cancelText="취소"
            minimumDate={new Date()}
          />
        </View>
        <Text style={styles.input_text}>복용 주기를 선택하세요 (단위: 일)</Text>
        <RNPickerSelect
          onValueChange={value => setMedicineCycle(value)}
          items={cycle}
          placeholder={{}}
          value={medicineCycle}
          useNativeAndroidPickerStyle={false}
        />
        <Text style={styles.input_text}>하루에 몇 번 복용하시나요?</Text>
        <RNPickerSelect
          onValueChange={value => setMedicineCount(value)}
          items={counts}
          placeholder={{}}
          value={medicineCount}
          useNativeAndroidPickerStyle={false}
        />
        {medicineCount > 0 && (
          <Text style={styles.input_text}>언제 복용하실 예정인가요?</Text>
        )}
        {medicineCount > 0 &&
          !!periodicList &&
          Array.from({length: parseInt(medicineCount, 10)}, () => 0).map(
            (item, idx) => (
              <View key={idx}>
                <Button
                  mode="text"
                  onPress={() => getTimeSelectElementOpen(idx)}
                  style={styles.timebutton}>
                  {new Date().getTime !== periodicList[idx] ? (
                    printTime(periodicList[idx])
                  ) : (
                    <Text>복용 시간</Text>
                  )}
                </Button>
                {!!periodicList[idx] && timeOpen[idx] && (
                  <DatePicker
                    modal
                    open={timeOpen[idx]}
                    date={
                      periodicList[idx]
                        ? getIncorrectKRtime(periodicList[idx])
                        : new Date(
                            today.getFullYear(),
                            today.getMonth(),
                            today.getDay(),
                            0,
                            0,
                            0,
                          )
                    }
                    mode="time"
                    onConfirm={date => {
                      setTimeSelectElement(idx, date);
                      getTimeSelectElementClose(idx);
                    }}
                    onCancel={() => {
                      getTimeSelectElementClose(idx);
                    }}
                    title="복용 시작 날짜를 선택하세요"
                    confirmText="확인"
                    cancelText="취소"
                    minuteInterval={30}
                  />
                )}
              </View>
            ),
          )}
        <Text style={styles.input_text}>약에 대한 메모를 입력하세요</Text>
        <TextInput
          label=""
          value={medicineMemo}
          onChangeText={text => setMedicineMemo(text)}
          multiline={true}
          numberOfLines={10}
          mode="outlined"
          style={styles.text_input}
        />
        <Button
          mode="contained"
          onPress={() => onSubmit()}
          style={styles.submit_btn}>
          수정하기
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
  },
  type_radio_group: {
    flexDirection: 'row',
    flex: 1,
  },
  input_text: {
    paddingTop: 20,
  },
  datebutton_outer: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  datebutton: {
    width: '50%',
  },
  timebutton: {
    width: '100%',
  },
  text_input: {
    backgroundColor: '#fff',
  },
  submit_btn: {
    marginTop: 30,
  },
});

export default EditMedicine;
