import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../images/logo.jpeg')}s
                    style={{width: 50,height: 50}}
                />
            </View>
        );
    }
}