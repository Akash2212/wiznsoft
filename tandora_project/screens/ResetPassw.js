import React,{Component} from "react";
import {View,Text,TouchableOpacity,StyleSheet,TextInput} from 'react-native';

export default class ResetPassw extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const reset = async () => {

            fetch('https://tandora.herokuapp.com/api/auth/reset-password', {
                code: '12345',
                password: 'myNewPassword',
                passwordConfirmation: 'myNewPassword'
              })
              .then(response => {
                console.log('Your user\'s password has been changed.');
              })
              .catch(error => {
                console.log('An error occurred:', error);
              })
        }

        return (
            <View>
                <View><Text onPress={() => reset()}>Reset</Text></View>
            </View>
        );

    }


        
}
