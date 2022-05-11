import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import TitleBar from '../../components/TitleBar/TitleBar';
import Swiper from 'react-native-swiper';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function MedicineCalendar() {

  let data = [];

  const [periodState, setPeriodState] = useState({});
  const [currentDate, setCurrentDate] = useState('');
  const [usingData, setUsingData] = useState([]);

  let dateArr = [];
  let startDate = ''
  let endDate = ''
  let duringDate = []
  let todayDate = '';
  const monthDate = [31, 30, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const pickColor = ["#8AB5E6", "#85DEDC", "#8EDAAB", "#FAB7E3", "#E6BBFA", "#FAF1AC"]

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      const pillList = firestore().collection('Users').doc(user.uid).collection('pillList').get();
      pillList.then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          data.push(documentSnapshot.data());
        });
      })
        .then(() => {
          let today = new Date();
          let year = today.getFullYear(); // 년도
          let month = today.getMonth() + 1;  // 월
          let date = today.getDate();  // 날짜
          todayDate = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;

          if (currentDate == todayDate) {
            setCurrentDate(todayDate);
          }

          duringDate = calDuringDate();

          let tempArr = []

          for (let i = 0; i < data.length; i++) {

            let tempStart = new Date((data[i].startDate.seconds) * 1000);
            let tempYear_s = tempStart.getFullYear(); // 년도
            let tempMonth_s = tempStart.getMonth() + 1;  // 월
            let tempDate_s = tempStart.getDate();  // 날짜
            let parsingDate_s = `${tempYear_s}-${tempMonth_s >= 10 ? tempMonth_s : '0' + tempMonth_s}-${tempDate_s >= 10 ? tempDate_s : '0' + tempDate_s}`;

            let tempEnd = new Date((data[i].endDate.seconds) * 1000);
            let tempYear_e = tempEnd.getFullYear(); // 년도
            let tempMonth_e = tempEnd.getMonth() + 1;  // 월
            let tempDate_e = tempEnd.getDate();  // 날짜
            let parsingDate_e = `${tempYear_e}-${tempMonth_e >= 10 ? tempMonth_e : '0' + tempMonth_e}-${tempDate_e >= 10 ? tempDate_e : '0' + tempDate_e}`;

            const tempData = {
              name: data[i].name,
              start: parsingDate_s,
              end: parsingDate_e,
            }
            tempArr.push(tempData)
          }
          setUsingData(tempArr);
        });
    });


  }, [])

  function clickList(idx) {
    startDate = usingData[idx].start;
    endDate = usingData[idx].end;
    
    setCurrentDate(startDate);
    duringDate = calDuringDate();
    makingPeriods();
  }

  function clearPeriods() {
    startDate = '';
    endDate = '';
    duringDate = [];
    setCurrentDate('');
    setPeriodState({});
  }

  function calDuringDate() {

    var tempStartDate = new Date(startDate);
    var tempEndDate = new Date(endDate);

    if (tempStartDate.getMonth() + 1 !== tempEndDate.getMonth() + 1) {

      let calDate = tempStartDate

      let currentStartMonth = tempStartDate.getMonth() + 1;
      let currentEndMonth = tempEndDate.getMonth() + 1;

      for (let i = currentStartMonth; i <= currentEndMonth; i++) {

        if (currentStartMonth === i) {

          for (let j = tempStartDate.getDate() + 1; j <= monthDate[i - 1]; j++) {

            calDate.setDate(j);

            const year = calDate.getFullYear();
            const month = i;
            const date = calDate.getDate();

            let stringDate = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;

            dateArr.push(stringDate);
          }
        }
        else if (currentEndMonth === i) {

          calDate.setMonth(i);

          for (let k = 1; k <= tempEndDate.getDate() - 1; k++) {

            calDate.setDate(k);

            const year = calDate.getFullYear();
            const month = i
            const date = calDate.getDate();

            let stringDate = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;

            dateArr.push(stringDate);
          }
        }
        else if ((currentStartMonth !== i) && (currentEndMonth !== i)) {

          calDate.setMonth(i);

          for (let n = 1; n <= monthDate[i - 1]; n++) {

            calDate.setDate(n);

            const year = calDate.getFullYear();
            const month = i;
            const date = calDate.getDate();

            let stringDate = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;

            dateArr.push(stringDate);
          }
        }
      }
    }
    else {
      var x = 0;
      var limit = tempEndDate.getDate() - tempStartDate.getDate();

      while (x < limit - 1) {
        let calDate = tempStartDate
        calDate.setDate(calDate.getDate() + 1);

        const year = calDate.getFullYear();
        const month = calDate.getMonth() + 1;
        const date = calDate.getDate();

        let stringDate = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;

        dateArr.push(stringDate);
        x++;
      }
    }
    return dateArr;
  }

  function makingPeriods() {

    let markPeriods = {};

    const randNum = Math.floor(Math.random() * 6);

    new Promise((resolve, reject) => {

      let addPeriods = null;

      if (startDate !== undefined) {
        addPeriods = {
          'temp': { startingDay: null, endingDay: null, color: '' }
        }
        const NEW_NAME = startDate;
        const OLD_NAME = 'temp';
        Object.defineProperty(addPeriods, NEW_NAME, Object.getOwnPropertyDescriptor(addPeriods, OLD_NAME));
        delete addPeriods[OLD_NAME];
        Object.assign(markPeriods, addPeriods);
      }

      if (duringDate !== undefined) {
        for (let i = 0; i < duringDate.length; i++) {
          addPeriods = {
            'temp': { startingDay: null, endingDay: null, color: '' }
          }
          const NEW_NAME = duringDate[i];
          const OLD_NAME = "temp";
          Object.defineProperty(addPeriods, NEW_NAME, Object.getOwnPropertyDescriptor(addPeriods, OLD_NAME));
          delete addPeriods[OLD_NAME];
          Object.assign(markPeriods, addPeriods);
        }
      }

      if (endDate !== undefined) {
        addPeriods = {
          'temp': { startingDay: null, endingDay: null, color: '' }
        }

        const NEW_NAME = endDate;
        const OLD_NAME = "temp";
        Object.defineProperty(addPeriods, NEW_NAME, Object.getOwnPropertyDescriptor(addPeriods, OLD_NAME));
        delete addPeriods[OLD_NAME];
        Object.assign(markPeriods, addPeriods);

        markPeriods[startDate]["startingDay"] = true;
        markPeriods[startDate]["endingDay"] = false;
        markPeriods[startDate]["color"] = pickColor[randNum];

        for (let i = 0; i < duringDate.length; i++) {
          markPeriods[duringDate[i]]["startingDay"] = false;
          markPeriods[duringDate[i]]["endingDay"] = false;
          markPeriods[duringDate[i]]["color"] = pickColor[randNum];
        }

        markPeriods[endDate]["startingDay"] = false;
        markPeriods[endDate]["endingDay"] = true;
        markPeriods[endDate]["color"] = pickColor[randNum];

      }
      resolve();
    })
      .then(() => {
        setPeriodState(markPeriods);
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <TitleBar title="캘린더" subtitle="복용 중인 약의 기록을 확인합니다." />
      </View>
      <Calendar
        current={currentDate}
        maxDate={'2023-12-31'}
        style={{ marginTop: -15 }}
        onDayPress={(day) => {
          console.log('day pressed', day);
        }}

        onMonthChange={month => {
          console.log('month changed', month);
        }}

        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        enableSwipeMonths={true}

        markingType={'period'}
        markedDates={periodState}
      />

      <Swiper showsButtons={true} showsPagination={false} loop={false} onIndexChanged={() => { clearPeriods(); }}>
        {usingData && usingData.map((item, idx) => (
          <View style={styles.slide} key={idx}>
            <Button contentStyle={styles.listDesign} labelStyle={styles.listText} mode="contained" onPress={() => clickList(idx)}>
              {item.name}
            </Button>
          </View>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleBar: {
    marginLeft: 30,
    marginRight: 30,
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  listDesign: {
    width: '100%',
    height: 50,
    backgroundColor: '#8AB5E6'
  },

  listText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: -10,
    marginLeft: -10,

  }
});

export default MedicineCalendar;