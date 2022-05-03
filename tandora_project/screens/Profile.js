import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image,StyleSheet} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import Entype from 'react-native-vector-icons/Entypo'

export default class Profile extends Component
{
    render(){
        return(
            <View style={styles.container}>
                <View style={{flexDirection:'row',padding:10,justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity>
                    <Ionicons
                        name="arrow-back-outline"
                        size={30}
                        color="#000"
                    />
                    </TouchableOpacity>
                    <Text style={{left:10,fontSize:20}}>Profile</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity>
                            <EvilIcons
                                name="search"
                                size={34}
                                style={{right:20}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather
                                name="more-horizontal"
                                size={30}
                                style={{right:10}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{padding:10,flexDirection:'row'}}>
                    
                        <View>
                            <Image
                                source={require('../Images/user1.jpg')}
                                style={{borderRadius:30,width:60,height:60}}
                            />
                            <View style={{width:30,height:30,bottom:20,left:40,borderRadius:25,backgroundColor:'#afcddb',justifyContent:'center',alignItems:'center'}}>
                                <Entype
                                    name="camera"
                                    size={20}
                                    color="#2ca7e0"
                                />
                            </View>
                        </View>
                        <View style={{left:20}}>
                            <Text style={{fontWeight:'600',color:'#000',fontSize:20}}>Ravi Kumar</Text>
                            <Text>Journalist</Text>
                        </View>
                        <TouchableOpacity style={styles.edit}>
                            <Text style={{color:'#2ca7e0'}}>Edit</Text>
                        </TouchableOpacity>
                </View>
                <View style={{padding:10,flexDirection:'row'}}>
                    <View>
                        <Text style={{fontWeight:'600',color:'#000',fontSize:17}}>55</Text>
                        <Text>Post</Text>
                    </View>
                    <View style={{left:30}}>
                        <Text style={{fontWeight:'600',color:'#000',fontSize:17}}>100</Text>
                        <Text>Connects</Text>
                    </View>
                    <View style={styles.connects}>
                        <Text style={{color:'#fff'}}>See all connects</Text>
                    </View>
                    <Ionicons
                        name="chatbox"
                        size={30}
                        color="#2ca7e0"
                        style={{position:'absolute',right:20,top:20}}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    edit: {
        borderWidth:3,
        borderColor:'#2ca7e0',
        borderRadius:5,
        width: 70,
        height:30,
        position:'absolute',
        right: 20,
        top:25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    connects:{
        borderRadius:5,
        backgroundColor:'#2ca7e0',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        left:50
    }
})