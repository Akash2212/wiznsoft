/*import React,{Component} from 'react'
import {View,Text} from 'react-native'
import UserModel from './src/app/models/UserModel';

const Authenticate = () => {
  const user = new UserModel('robo22', 'akashrobo');
  try {
    user.login().then(() => console.log("Logged in"));
  } catch (err) {
    console.log(err.message)
  }
  return null;
};

export default class App extends Component {
  render(){
    return(
      <Authenticate/>
    );
  }
}

*/

import React,{Component} from "react";
import {View,Linking} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from "./screens/SplashScreen";
import Login from "./screens/Login";
import Register from "./screens/Register";
import HomeScreen from "./screens/HomeScreen";
import Post from "./screens/Post";
import Trending from './screens/Trending';
import Profile from "./screens/Profile";
import AsyncStorage from "@react-native-community/async-storage";
import ResetPassw from "./screens/ResetPassw";
import ForgotPassword from "./screens/ForgotPassword";
import ViewPhoto from "./screens/ViewPhoto";
import MyPosts from "./screens/MyPosts";
import UploadProfile from './screens/UploadProfile';
import Nearby from './screens/Nearyby'

const SPLASH_SCREEN = "Splash";
const MAIN_SCREEN = "MainScreen";
const NAVIGATION_SCREEN = "navigation";
const FORGOT_SCREEN = "forgot";

const Stack = createNativeStackNavigator();



export default class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      componentToRender: SPLASH_SCREEN,
      url: ''
    };
    console.disableYellowBox = true;
  }

  componentDidMount() {

    

    Linking.getInitialURL().then(url => {
      parseUrl(url)
    });
    Linking.addEventListener('url', url => parseUrl(url));
    
    const parseUrl = url => {
      if (url) {
        this.setState({url: url})
        this.setState({componentToRender: FORGOT_SCREEN})
      }
      else{
        this.timeoutHandle = setTimeout(() => {
           
          const isLoggedIn = async () => {
            let data = await AsyncStorage.getItem('user');
            let user = JSON.parse(data);
            console.log(user)
            if(user != null) {
              this.setState({
                componentToRender: MAIN_SCREEN,
              });
            }
            else {
              this.setState({
                componentToRender: NAVIGATION_SCREEN,
              });
            }
          }
          isLoggedIn();
            
    
        }, 2000);
      }
    }

    
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
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="ResetPassw" component={ResetPassw}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Nearby" component={Nearby}/>
        <Stack.Screen name="UploadProfile" component={UploadProfile}/>
        <Stack.Screen name="MyPosts" component={MyPosts}/>
        <Stack.Screen name="Post" component={Post}/>
        <Stack.Screen name="Trending" component={Trending}/>
        <Stack.Screen name="ViewPhoto" component={ViewPhoto}/>
        </Stack.Navigator>
      </NavigationContainer>
      )
    }
    if(componentToRender === MAIN_SCREEN){
      return(
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen}/>
          <Stack.Screen name="Trending" component={Trending}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
          <Stack.Screen name="ResetPassw" component={ResetPassw}/>
          <Stack.Screen name="Register" component={Register}/>
        </Stack.Navigator>
      </NavigationContainer>
      )
    }
    if(componentToRender === FORGOT_SCREEN) {
      console.log(this.state.url)

      return(
      //    <NavigationContainer>
      //    <Stack.Navigator screenOptions={{ headerShown: false }}>
      //    <Stack.Screen name="Login" component={Login}/>
      //      <Stack.Screen name="ResetPassw" component={() => <ResetPassw url={this.state.url}/>}/>
           
      //      <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
      //      <Stack.Screen name="Register" component={Register}/>
      //      <Stack.Screen name="HomeScreen" component={HomeScreen}/>
      //    </Stack.Navigator>
      //  </NavigationContainer>
          <ResetPassw url={this.state.url}/>
          );
    }
    return <SplashScreen/>
  }
}
