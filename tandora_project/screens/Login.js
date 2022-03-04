import React,{Component} from "react";
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity} from 'react-native'

export default class Login extends Component {

    constructor(props){
        super(props);
    }


    send()
    {
        this.props.navigation.navigate('Trending')
    }



    render(){
        return(
            <View style={styles.container}>
                <View style={{padding: 20, alignItems:'center',top:40}}>
                    <Image source={require('../Images/logo.jpeg')} style={{width:80,height:80}}/>
                    <Text style={styles.loginText}>Log in to Tandora</Text>
                    <Text style={{top:20,fontSize:18}}>Don't have an account?  <Text style={{color:'#007aff'}}>Sign Up</Text></Text>
                    <View style={{top: 60,flexDirection:'row'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../Images/googleLogo.png')} style={{width: 30,height:30}}/>
                            <Text style={{left: 20,fontSize:18}}>Sign in with Google</Text>
                        </View>
                        <View style={{left: 40}}>
                            <Image source={require('../Images/facebookLogo.jpeg')} style={{width:60,height:60}}/>
                        </View>
                    </View>
                    <Text style={{top: 80}}>OR</Text>
                </View>
                <View style={{top: 120,left: 30}}>
                        <Text style={{fontSize:16}}>Mobile Number<Text style={{color:'rgb(255,0,0)'}}>*</Text></Text>
                        <TextInput
                           placeholder="eg: 75980xx947"
                           style={styles.input}
                        />
                </View>
                <View style={{alignItems:'center'}}>
                <TouchableOpacity style={styles.button} onPress={this.send()}>
                    <Text style={styles.buttonText}>Send OTP</Text>
                </TouchableOpacity>
                </View>
                <View style={{alignItems:'center'}}><Text style={{color: '#007aff',top: 200}}>Sign in with email</Text></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
    },
    loginText: {
        fontWeight: '700',
        fontSize: 30,
        color: '#000',
        top: 10
    },
    input: {
        color: '#000',
        width: '80%',
        backgroundColor:'#d6d6d4',
        top: 20,
        borderRadius: 10

    },
    button: {
        borderRadius: 5,
        backgroundColor:'#007aff',
        width: '80%',
        height: 60,
        top: 170,
        justifyContent: 'center',
        alignItems:'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight:'700'
    }
})