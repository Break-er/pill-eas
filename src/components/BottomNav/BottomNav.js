import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../../screens/Home/Home';
import MapScreen from '../../screens/Map/Map';

function BottomNav({navigation}) {
  function CalendarScreen() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Calendar!</Text>
      </View>
    );
  }

  function ListScreen() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>List!</Text>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'List') {
            iconName = focused ? 'ios-list-circle' : 'ios-list-circle-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'ios-map' : 'ios-map-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#85DEDC',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
        }}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Main');
          },
        })}
      />
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          title: '복용 중',
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: '복용 기록',
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: '수거함',
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNav;
