import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class Invest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: ''
        }
    }

    render() {

        return (
            <View style={styles.container}>


                <Image
                    source={require('../images/inv.gif')}
                    style={{ width: '100%', height: 200,overflow:'hidden' }}
                />


                <View style={{
                    width: '100%', alignItems: 'center', top:100
                }}>
                    <TextInput
                        keyboardType='numeric'
                        style={styles.amt}
                        placeholder='₹ 0'
                        placeholderTextColor={'#fff'}
                        onChangeText={(txt) => this.setState({ amount: txt })}
                    />

                    <TouchableOpacity style={styles.next}>
                        <FontAwesome
                            name="arrow-right"
                            size={30}
                            color='#fff'
                        />
                    </TouchableOpacity>
                </View>

            </View>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#344151',
        alignItems: 'center',

    },
    amt: {
        borderStyle: 'solid',
        height: 90,
        width: 140,
        color: '#fff',
        fontSize: 50,
        fontWeight: '800',
        textAlign: 'center'
    },
    next: {
        backgroundColor: '#2ca',
        borderRadius: 25,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        top: 50
    }
})

//7e8287