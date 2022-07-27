import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passw: '',
            button: true,
            buttonFade: false
        }
        this.login = this.login.bind(this)
    }

    login() {
       
    }

    gosignup() {
        console.log("Props")
        this.props.navigation.navigate('Signup')
    }

    forgotPassw() {
        this.props.navigation.navigate('ForgotPassword')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <Text style={styles.title}>Invest APP</Text>
                    <View style={{ flexDirection: 'row', top: 80 }}>
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
                    <View style={{ flexDirection: 'row', top: 100 }}>
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

                    <Text onPress={() => this.forgotPassw()} style={{ color: '#fff', top: 120, fontSize: 15 }}>Forgot Password</Text>

                    {
                        this.state.buttonFade &&
                        <View style={styles.buttonFade}>
                            <Text style={styles.buttonTextFade}>Login</Text>
                        </View>
                    }

                    {
                        this.state.button &&
                        < TouchableOpacity style={styles.button} onPress={() => this.login()}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity style={{flexDirection: 'row'}}><Text style={{ color: '#fff', top: 180, fontSize: 14 }}>Already have an account?  </Text><Text onPress={() => this.gosignup()} style={{ color: '#fff', top: 180, fontSize: 14 }}>Signup</Text></TouchableOpacity>

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
        alignItems: 'center'
    },
    loginContainer: {
        width: '80%',
        height: '50%',
        alignItems: 'center'
    },
    title: {
        fontSize: 40,
        fontWeight: '800',
        color: '#fb5b5a',
    },
    email: {
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