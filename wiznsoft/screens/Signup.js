import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class Signup extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passw: '',
            button: true,
            buttonFade: false,
            username: '',
            phonenumber: ''
        }
        this.signup = this.signup.bind(this)
    }

    signup() {
       

    }

    gologin() {
        console.log("Props")
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.signupContainer}>
                    <Text style={styles.title}>Invest APP</Text>
                    <View style={{ flexDirection: 'row', top: 50 }}>
                        <MaterialIcons
                            name="account-circle"
                            size={33}
                            color="#fff"
                            style={{ top: 5, right: 10 }}
                        />
                        <TextInput
                            style={styles.username}
                            placeholder="Enter username"
                            placeholderTextColor="#000"
                            onChangeText={nameText => this.setState({ username: nameText })}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', top: 80 }}>
                        <Ionicons
                            name="call"
                            size={28}
                            color="#fff"
                            style={{ top: 5, right: 10 }}
                        />
                        <TextInput
                            style={styles.phonenumber}
                            placeholder="Enter phone number"
                            placeholderTextColor="#000"
                            onChangeText={nameText => this.setState({ phonenumber: nameText })}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', top: 100 }}>
                        <Fontisto
                            name="email"
                            size={28}
                            color="#fff"
                            style={{ top: 5, right: 10 }}
                        />
                        <TextInput
                            style={styles.email}
                            placeholder="Enter email"
                            placeholderTextColor="#000"
                            onChangeText={emailText => this.setState({ email: emailText })}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', top: 120 }}>
                        <Ionicons
                            name="lock-closed"
                            size={28}
                            color="#fff"
                            style={{ top: 5, right: 10 }}
                        />
                        <TextInput
                            style={styles.passw}
                            placeholder="Enter password"
                            placeholderTextColor="#000"
                            secureTextEntry={true}
                            onChangeText={passwText => this.setState({ passw: passwText })}
                        />
                    </View>

                    {
                        this.state.buttonFade &&
                        <View style={styles.buttonFade}>
                            <Text style={styles.buttonTextFade}>Signup</Text>
                        </View>
                    }

                    {
                        this.state.button &&
                        < TouchableOpacity style={styles.button} onPress={() => this.signup()}>
                            <Text style={styles.buttonText}>Signup</Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity style={{flexDirection: 'row'}}><Text style={{ color: '#fff', top: 180, fontSize: 14 }}>Don't have an account?</Text><Text onPress={() => this.gologin()} style={{ color: '#fff', top: 180, fontSize: 14 }}> Login</Text></TouchableOpacity>

                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#344151',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupContainer: {
        width: '80%',
        height: '70%',
        alignItems: 'center'
    },
    title: {
        fontSize: 40,
        fontWeight: '800',
        color: '#fb5b5a',
    },
    username: {
        width: '90%',
        height: 50,
        backgroundColor: '#7e8287',
        borderRadius: 20,
        color: '#fff',
    },
    email: {
        width: '90%',
        height: 50,
        backgroundColor: '#7e8287',
        borderRadius: 20,
        color: '#fff',
    },
    phonenumber: {
        width: '90%',
        height: 50,
        backgroundColor: '#7e8287',
        borderRadius: 20,
        color: '#fff',
    },
    passw: {
        width: '90%',
        height: 50,
        backgroundColor: '#7e8287',
        borderRadius: 20,
        color: '#fff',
    },
    button: {
        backgroundColor: '#fb5b5a',
        width: '90%',
        height: 50,
        top: 150,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '500'
    },
    buttonTextFade: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 25,
        fontWeight: '500'
    },
    buttonFade: {
        backgroundColor: 'rgba(251, 91, 90, 0.5)',
        width: '90%',
        height: 50,
        top: 150,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
})