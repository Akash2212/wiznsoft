import React,{Component} from "react";
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import axios from "axios";

export default class MyPosts extends Component {

    constructor(props) {
        super(props);
    }

    

    render() {

        const show = async () => {

            let data = await AsyncStorage.getItem('user');
            let user = JSON.parse(data);



            await axios.get('https://tandora.herokuapp.com/api/upload/files/count')
            .then((res) => console.log(res))
            .catch((e) => console.log(e))
        }


        return(
            <View>
                <TouchableOpacity>
                    <Text onPress={() => show()}>Hello</Text>
                </TouchableOpacity>
            </View>
        );
    }

}