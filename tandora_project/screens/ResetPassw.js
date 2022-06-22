import React,{Component} from "react";
import {View,Text,TouchableOpacity,StyleSheet,TextInput} from 'react-native';
import url from 'url';
import axios from "axios";

export default class ResetPassw extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //console.log(this.props.url);
        const obj = url.parse(this.props.url.url);
        let verifyCode = '';
        for(let i=0;i<this.props.url.url.length;i++) {
            if(this.props.url.url[i] == '='){
                for(let j=i+1;j<this.props.url.url.length;j++) {
                    verifyCode += this.props.url.url[j];
                }
            }
        }
        console.log(verifyCode);
        const reset = async () => {

            axios.post('https://tandora.herokuapp.com/api/auth/reset-password', {
                code: verifyCode,
                password: 'myNewPassword',
                passwordConfirmation: 'myNewPassword'
              })
              .then(response => {
                console.log(response);
              })
              .catch(error => {
                console.log('An error occurred:', error);
              })
        }

        return (
            <View>
                <View><Text onPress={() => reset()}>reset</Text></View>
            </View>
        );

    }


        
}
