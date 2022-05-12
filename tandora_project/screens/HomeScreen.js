import React,{Component, Profiler} from 'react'
import {View} from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Login from './Login';
import Profile from './Profile';
import Post from './Post';
import Trending from './Trending';
import SplashScreen from './SplashScreen';
import InsertDelete from './InsertDelete';

const Tab = createMaterialBottomTabNavigator();

const More = () => {
  return(<View></View>)
}

const BuySell = () => {
  return(<View></View>)
}


export default class HomeScreen extends Component {
  render()
  {
    return(
      <Tab.Navigator 
        initialRouteName='Login'
        activeColor="#2ca7e0"
        barStyle={{ backgroundColor: '#fff' }}> 
        <Tab.Screen
          name="Location"
          component={Post}
          options={{
            tabBarLabel: 'Location',
            tabBarIcon: ({ color }) => (
              <Entypo name="location-pin" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Trending'
          component={Trending}
          options={{
            tabBarLabel: 'Trending',
            tabBarIcon: ({ color }) => (
              <Entypo name="flash" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='More'
          component={InsertDelete}
          options={{
            tabBarLabel: 'More',
            tabBarIcon: ({ color }) => (
              <Entypo name="menu" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='BuySell'
          component={BuySell}
          options={{
            tabBarLabel: 'Buy/Sell',
            tabBarIcon: ({ color }) => (
              <Entypo name="shopping-cart" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='NearMe'
          component={More}
          options={{
            tabBarLabel: 'Near Me',
            tabBarIcon: ({ color }) => (
              <Fontisto name="compass-alt" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}