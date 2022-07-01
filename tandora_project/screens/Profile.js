import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image,StyleSheet} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-crop-picker'


export default class Profile extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            jwt: '',
            mime: '',
            path: '',
            profile: false,
            edit: true,
        }
    }

    addImage() {
        
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image.path);
            this.setState({mime: image.mime,path: image.path})
          });
          
    }

    componentDidMount() {
        const getUser = async () => {

            let usrdata = await AsyncStorage.getItem('user');
            let user = JSON.parse(usrdata);
            this.setState({username: user.username, jwt: user.jwt});

        }

        getUser()
    }



    render(){



        
        const makePost = async () => {


            /*
            

            await fetch('https://tandora.herokuapp.com/api/upload/files',{
                headers: {
                    Authorization : `Bearer ${user.jwt}`
                }
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
            .catch((e) => console.log(e))
*/

            
            const formData = new FormData();

    
                formData.append('files', {
                name: 'Success.jpg',
                type: this.state.mime,
                uri: this.state.path,
                });
    

                if(this.state.path != '') {


                    



                    await fetch(`https://tandora.herokuapp.com/api/upload`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${this.state.jwt}`
                    },
                    body: formData,
                    })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response[0].url);
                        alert('Image posted successfully')
                        this.setState({path: ''})

                    
                        fetch('https://tandora.herokuapp.com/api/posts',{
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${this.state.jwt}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "data": {
                                "description": this.state.desc,
                                "imageURL": response[0].url,
                                "time": new Date().toLocaleTimeString(),
                                "date": new Date().toLocaleDateString()
                            }
                           
                        })
                    })
                    .then((res) => {
                        console.log("Post datas added",res)
                        this.textInput.clear();
                    })
                    .catch((e) => console.log(e))



                    })
                    .catch(error => {
                        console.log('error', error);
                    });
                }
                else {
                    alert('Insert image first')
                }   
        }










        return(
            <View style={styles.container}>
                { this.state.profile &&
                <View>
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
                                source={require('../Images/user_placeholder.png')}
                                style={{borderRadius:30,width:60,height:60}}
                            />
                            <TouchableOpacity style={{width:30,height:30,bottom:20,left:40,borderRadius:25,backgroundColor:'#afcddb',justifyContent:'center',alignItems:'center'}}>
                                <Entypo
                                    name="camera"
                                    size={20}
                                    color="#2ca7e0"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{left:20}}>
                            <Text style={{fontWeight:'600',color:'#000',fontSize:20}}>{this.state.username}</Text>
                            <Text></Text>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('UploadProfile')} style={styles.edit}>
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
            }

            {this.state.edit &&
                <View style={styles.container}>
                     <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity>
                            <Ionicons
                                name="close-outline"
                                size={35}
                                color="#000"
                            /> 
                        </TouchableOpacity>
                        <Text style={styles.newPost}>Edit Profile</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => makePost()} style={styles.postButton}>
                            <Text style={{color:'#fff'}}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{justifyContent:'center',alignItems:'center',top:100}}>
                            <Image
                                source={{uri: this.state.path == ''? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640': this.state.path}}
                                style={{borderRadius:30,width:100,height:100}}
                            />
                            <TouchableOpacity onPress={() => this.addImage()} style={{width:30,height:30,bottom:20,left:40,borderRadius:25,backgroundColor:'#afcddb',justifyContent:'center',alignItems:'center'}}>
                                <Entypo
                                    name="camera"
                                    size={20}
                                    color="#2ca7e0"
                                />
                            </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center',width:'100%',alignItems:'center',top:150}}>
                    <TouchableOpacity onPress={() => makePost()} style={styles.button}>
                        <Entypo
                            name="check"
                            size={40}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
                </View>
            }

             </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
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
    },
    newPost: {
        fontSize: 17,
        color:'#000'
    },
    button: {
        padding:5,
        width:"60%",
        height:50,
        backgroundColor:'#2ca7e0',
        justifyContent:'center',
        alignItems:'center'
    }
})