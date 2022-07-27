import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>

                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={styles.username}>Hi Akash!</Text>
                            <Text style={styles.balance}>Here's your balance</Text>
                        </View>
                        <View style={{ backgroundColor: '#3d4c5b', width: 150, height: 150, bottom: 50, borderRadius: 70 }} />

                    </View>


                    <View style={{ backgroundColor: '#3d4c5b', width: 150, height: 150, right: 30, bottom: 30, borderRadius: 70 }}></View>
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.activity}>Activities</Text>
                    <View style={{ height: 180 }}>
                        <ScrollView
                            horizontal={true}
                            style={{ paddingTop: 20, paddingLeft: 10 }}
                        >


                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Invest')} style={styles.card}>
                                <MaterialIcons
                                    name="monetization-on"
                                    size={40}
                                    color="#344151"
                                />
                                <Text style={{ top: 10, fontSize: 16, fontWeight: '800' }}>Invest</Text>

                            </TouchableOpacity>
                            <View style={{ width: 20 }} />


                            <TouchableOpacity style={styles.card}>
                                <FontAwesome
                                    name="money"
                                    size={35}
                                    color="#344151"
                                />
                                <Text style={{ top: 10, fontSize: 16, fontWeight: '800' }}>Withdraw</Text>

                            </TouchableOpacity>
                            <View style={{ width: 20 }} />


                            <TouchableOpacity style={styles.card}>
                                <Octicons
                                    name="graph"
                                    size={35}
                                    color="#344151"
                                />
                                <Text style={{ top: 10, fontSize: 16, fontWeight: '800' }}>Statistics</Text>
                            </TouchableOpacity>
                            <View style={{ width: 20 }} />
                            <TouchableOpacity style={styles.card}>
                                <FontAwesome
                                    name="history"
                                    size={35}
                                    color="#344151"
                                />
                                <Text style={{ top: 10, fontSize: 16, fontWeight: '800' }}>History</Text>
                            </TouchableOpacity>
                            <View style={{ width: 20 }} />


                        </ScrollView>
                    </View>
                    <View>
                        <Text style={styles.activity}>Statistics</Text>

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#344151'
    },

    top: {
        height: '30%',
        padding: 30
    },

    bottom: {
        height: '70%',
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: '#fff'
    },
    username: {
        fontSize: 28,
        fontWeight: '800',
        color: '#fff'
    },
    balance: {
        fontSize: 28,
        fontWeight: '300',
        color: '#fff'
    },
    activity: {
        color: '#000',
        fontWeight: '800',
        fontSize: 19
    },

    card: {
        height: 130,
        width: 120,
        borderRadius: 8,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }


})