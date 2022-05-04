import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {TextInput, Button, RadioButton} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';

function AddMedicine() {
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
  const [timeOpen, setTimeOpen] = useState([]);
  const [periodicList, setPeriodicList] = useState([]);
  const [medicineMemo, setMedicineMemo] = useState();

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

  useEffect(() => {
    if (medicineCount > 0) {
      let tmp = Array.from({length: parseInt(medicineCount, 10)}, () => false);
      setTimeOpen(tmp);
      let tmp2 = [];
      for (var i = 0; i < medicineCount; i++) {
        tmp2.push(new Date());
      }
      setPeriodicList(tmp2);
    }
  }, [medicineCount]);

  const getTimeSelectElementOpen = index => {
    setTimeOpen[index] = true;
  };

  const getTimeSelectElementClose = index => {
    setTimeOpen[index] = false;
  };

  const setTimeSelectElement = (index, date) => {
    setPeriodicList[index] = date;
  };

  const onSubmit = () => {
    const res = {
      name: medicineName,
      type: medicineType,
      startDate: startDate,
      endDate: endDate,
      cycle: medicineCycle,
      count: medicineCount,
      periods: periodicList,
      memo: medicineMemo,
    };
    console.log(res);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.input_text}>약 이름을 입력하세요</Text>
        <TextInput
          value={medicineName}
          onChangeText={text => setMedicineName(text)}
          mode="flat"
          style={styles.text_input}
        />
        <Text style={styles.input_text}>약 제형을 선택하세요</Text>
        <RNPickerSelect
          onValueChange={value => setMedicineType(value)}
          items={types}
          placeholder={{}}
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
            {startChecked ? getDateFormat(startDate) : '시작 날짜'}
          </Button>
          <DatePicker
            modal
            open={startOpen}
            date={startDate}
            mode="date"
            onConfirm={date => {
              setStartOpen(false);
              setStartDate(date);
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
            {endChecked ? getDateFormat(endDate) : '종료 날짜'}
          </Button>
          <DatePicker
            modal
            open={endOpen}
            date={endDate}
            mode="date"
            onConfirm={date => {
              setEndOpen(false);
              setEndDate(date);
              setEndChecked(true);
            }}
            onCancel={() => {
              setEndOpen(false);
            }}
            title="복용 종료 날짜를 선택하세요"
            confirmText="확인"
            cancelText="취소"
          />
        </View>
        <Text style={styles.input_text}>복용 주기를 선택하세요 (단위: 일)</Text>
        <RNPickerSelect
          onValueChange={value => setMedicineCycle(value)}
          items={cycle}
          placeholder={{}}
          useNativeAndroidPickerStyle={false}
        />
        <Text style={styles.input_text}>하루에 몇 번 복용하시나요?</Text>
        <RNPickerSelect
          onValueChange={value => setMedicineCount(value)}
          items={counts}
          placeholder={{}}
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
                  복용 시간
                </Button>
                {/* {periodicList[idx] && (
                  <DatePicker
                    modal
                    open={timeOpen[idx]}
                    date={periodicList[idx]}
                    mode="time"
                    onConfirm={date => {
                      getTimeSelectElementClose(idx);
                      setPeriodicList(idx, date);
                      getTimeSelectElementClose(idx);
                    }}
                    onCancel={() => {
                      getTimeSelectElementClose(idx);
                    }}
                    title="복용 시작 날짜를 선택하세요"
                    confirmText="확인"
                    cancelText="취소"
                  />
                )} */}
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
          //   color="white"
          onPress={() => onSubmit()}
          style={styles.submit_btn}>
          저장하기
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

export default AddMedicine;
