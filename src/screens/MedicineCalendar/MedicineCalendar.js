import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {Calendar, Agenda} from 'react-native-calendars';
import {List} from 'react-native-paper';

const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key: 'workout', color: 'green'};

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

function MedicineCalendar() {
  return (
    <View style={styles.container}>
      {/* <Calendar
        style={{}}
        onDayPress={day => {
            console.log('day pressed', day);
        }}
        onDayLongPress={day => {
            console.log('selected day', day);
        }}
        onMonthChange={month => {
            console.log('month changed', month);
        }}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        enableSwipeMonths={true}

        markingType={'multi-dot'}
        markedDates={{
          '2022-05-05': {dots: [vacation, massage, workout], selected: true, selectedColor: '#8AB5E6'},
          '2022-05-07': {dots: [massage, workout]}
        }}
    />
    <List.Section>
        <ScrollView>
            <List.Item title="감기약" left={() => <List.Icon color='#8AB5E6' icon="folder" />} />
            <List.Item title="허리 디스크 약" left={() => <List.Icon color="#8AB5E6" icon="folder" />} />
            <List.Item title="우울증 약" left={() => <List.Icon color="#8AB5E6" icon="folder" />} />
            <List.Item title="두통약" left={() => <List.Icon color="#8AB5E6" icon="folder" />} />
            <List.Item title="여튼 아플 때 먹는 약" left={() => <List.Icon color="#8AB5E6" icon="folder" />} />
            <List.Item title="루테인" left={() => <List.Icon color="#8AB5E6" icon="folder" />} />
            <List.Item title="밀크씨슬" left={() => <List.Icon color="#8AB5E6" icon="folder" />} />
            <List.Item title="비타민 C" left={() => <List.Icon color="#8AB5E6" icon="folder" />} />
            <List.Item title="수면제" left={() => <List.Icon color="#8AB5E6" icon="folder" />} />
            <List.Item title="피로회복제" left={() => <List.Icon color="#8AB5E6" icon="folder" />} />
            <List.Item title="플라시보" left={() => <List.Icon color="#8AB5E6" icon="folder" />} />
        </ScrollView>
    </List.Section> */}
      <Agenda
        // The list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key has to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={{
          '2022-05-01': [{name: '감기악'}],
          '2022-05-02': [{name: '두통약'}],
          '2022-05-04': [{name: '허리 디스크 약'}],
        }}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={month => {
          console.log('trigger items loading');
        }}
        // Callback that fires when the calendar is opened or closed
        onCalendarToggled={calendarOpened => {
          console.log(calendarOpened);
        }}
        // Callback that gets called on day press
        onDayPress={day => {
          // console.log('day pressed', day);
        }}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={day => {
          console.log('day changed');
        }}
        // Initially selected day

        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // Specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => {
          return (
            <View>
              {/* <List.Section>
                        <List.Item title={item['name']} left={() => <List.Icon color='#8AB5E6' icon="folder" />} />
                </List.Section> */}
              {/* <Text>{Object.keys(item)}</Text> */}
            </View>
          );
        }}
        // Specify how each date should be rendered. day can be undefined if the item is not first in that day
        renderDay={(day, item) => {
          // console.log('day :', day.getDate());
          // console.log('item :', day.getTime());
          // console.log('day_key :', Object.keys(day));
          // console.log("day :", day.getDate(), typeof(day.getDate().toString()));

          return (
            <View>
              <List.Section>
                <List.Item
                  title="아무말"
                  left={() => <Text>{item['name']}</Text>}
                  right={() => <Text>{day['name']}</Text>}
                />
              </List.Section>
            </View>
          );
        }}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return <View />;
        }}
        // Specify how agenda knob should look like
        renderKnob={() => {
          return <View />;
        }}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return <View />;
        }}
        // Specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        // Hide knob button. Default = false
        // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={{}}
        // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        // Agenda theme
        theme={{
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue',
        }}
        // Agenda container style
        style={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MedicineCalendar;
