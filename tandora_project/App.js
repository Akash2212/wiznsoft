import React,{Component} from "react";
import {View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from "./screens/SplashScreen";
import Login from "./screens/Login";
import HomeScreen from "./screens/HomeScreen";
import Trending from './screens/Trending';

const SPLASH_SCREEN = "Splash";
const MAIN_SCREEN = "MainScreen";
const NAVIGATION_SCREEN = "navigation";

const Stack = createNativeStackNavigator();

export default class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      componentToRender: SPLASH_SCREEN,
    };
    console.disableYellowBox = true;
  }

  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
           
        this.setState({
          componentToRender: NAVIGATION_SCREEN,
        });

    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }



  render(){

    const { componentToRender } = this.state;

    if (componentToRender === NAVIGATION_SCREEN) {
      return(
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Trending" component={Trending}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="SplashScreen" component={SplashScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
      )
    }
    if(componentToRender === MAIN_SCREEN){
      return(
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Trending" component={Trending}/>
          <Stack.Screen name="SplashScreen" component={SplashScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
      )
    }
    return <SplashScreen/>
  }
}
