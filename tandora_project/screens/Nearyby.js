import React,{Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet,PermissionsAndroid,FlatList,Image,Dimensions} from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import { getPathFromState } from '@react-navigation/native';
import axios from 'axios';

export default class Nearby extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            data: [],
        }
    }

    componentDidMount() {

        Geolocation.getCurrentPosition((info) => {
            console.log(info)
            this.setState({latitude: info.coords.latitude,longitude: info.coords.longitude});
            getNearbyPosts()
        })

       const getNearbyPosts = async () => {
        console.log(this.state.latitude)
        if(this.state.latitude != 0 && this.state.longitude != 0) {
            await axios.get(`https://spreadora2.herokuapp.com/api/nearby/${this.state.latitude}/${this.state.longitude}`)
            .then((res) => {
                var dataURL = []
                for(var i=0;i<res.data.length;i++) {
                    dataURL.push(res.data[i][1])
                }
                console.log(dataURL)
                this.setState({data: dataURL})
            })
            .catch((e) => console.log(e))
        }
       }

       

    }


    render() {

        const Item = ({ url,desc,time,date }) => (
            
            <View style={{padding:5}}>
                <TouchableOpacity>
                    <Image
                        source={{uri: "https://spreadora2.herokuapp.com"+url}}
                        style={{width:Dimensions.get('window').width,height:200,resizeMode:'contain'}}
                    />
               </TouchableOpacity>
               <View style={{height:50,justifyContent:'center',margin:10}}>
                    <Text style={styles.desc}>{desc}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',top:5,bottom:5}}>
                        <Text style={styles.date}>{date}</Text>
                        <Text style={styles.time}>{time}</Text>
                    </View>
               </View>
            </View>
          );


        const renderItem = ({ item }) => {
            return(
                <Item
                    url={item.imageURL}
                    desc={item.description}
                    time={item.time}
                    date={item.date}
                />
            );
            
            
          };

    
        const getPos = () => {
            Geolocation.getCurrentPosition((info) => {
                console.log(info)
            })
        }
            
            
       


        return(
            <View style={styles.container}>
                 <View style={{height:50,backgroundColor:'#2ca7e0',width:'100%',justifyContent:'center'}}>
                    <Text style={{color:'#fff',fontWeight:'800',fontSize:20,left:20}}>My Posts</Text>
                </View> 
                
                <FlatList
                    data={this.state.data}
                    renderItem={renderItem}
                />
                
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1
    }
})