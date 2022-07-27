import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import HomeScreen from "./screens/HomeScreen";
import Splash from "./screens/Splash";
import Invest from "./screens/Invest";
import Signup from "./screens/Signup";
import Login from "./screens/Login";

const SPLASH_SCREEN = "splashScreen";
const MAIN_SCREEN = "mainScreen";
const NAVIGATION_SCREEN = "navigation";

const Stack = createNativeStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentToRender: SPLASH_SCREEN,
    };
    console.disableYellowBox = true;
  }

  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      const isLoggedIn = async () => {
        let data = await AsyncStorage.getItem('user');
        let user = JSON.parse(data);
        console.log(user)
        if (user != null) {
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
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    const { componentToRender } = this.state;

    if (componentToRender === MAIN_SCREEN) {
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Invest" component={Invest} />

        </Stack.Navigator>
      </NavigationContainer>
    }

    if (componentToRender === NAVIGATION_SCREEN) {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Invest" component={Invest} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />


          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return <Splash />;
  }
}