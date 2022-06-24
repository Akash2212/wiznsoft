import React,{Component} from "react";
import {View,Text,StyleSheet,TouchableOpacity,FlatList,Image, Dimensions} from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";


export default class MyPosts extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataurl: [],
        }
    }

    componentDidMount() {

        const show = async () => {

            let usrdata = await AsyncStorage.getItem('user');
            let user = JSON.parse(usrdata);

            var urldata = [];

            await axios.get('https://tandora.herokuapp.com/api/upload/files/')
            .then(res => {
                for(let i=res.data.length-1;i>=0;i--) {
                    urldata.push({title:"https://tandora.herokuapp.com"+res.data[i].url})
                   // urldata['title'] = "https://tandora.herokuapp.com"+res.data[i].url;
                    
                }
                //console.log(res.data[0].url)
            })
            .catch((e) => console.log(e))
            this.state.data.push(urldata)
            this.setState({dataurl: this.state.data})
        }
        show();

    }

    

    render() {

        const Item = ({ url }) => (
            <View style={{padding:5}}>
                <Image
                    source={{uri: url}}
                    style={{width:Dimensions.get('window').width,height:200}}
                />
            </View>
          );


        const renderItem = ({ item }) => {
            return(
                <Item
                    url={item.title}
                />
            );
            
            
          };

          console.log(this.state.dataurl[0])

        return(
            <View style={styles.container}>
                <View style={{height:50,backgroundColor:'#2ca7e0',width:'100%',justifyContent:'center'}}>
                    <Text style={{color:'#fff',fontWeight:'800',fontSize:20,left:20}}>My Posts</Text>
                </View>
                <FlatList
                    data={this.state.dataurl[0]}
                    renderItem={renderItem}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
});