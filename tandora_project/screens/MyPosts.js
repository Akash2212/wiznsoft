import React,{Component} from "react";
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

export default class MyPosts extends Component {

    constructor(props) {
        super(props);
    }

    

    render() {

        const show = async () => {

            let data = await AsyncStorage.getItem('user');
            let user = JSON.parse(data);



            await axios.get('https://tandora.herokuapp.com/api/upload/files/')
            .then(res => {
                for(let i=0;i<res.data.length;i++) {
                    console.log(res.data[i].url)
                }
                //console.log(res.data[0].url)
            })
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