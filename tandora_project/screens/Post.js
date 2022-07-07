import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from "@react-native-community/async-storage";
import ImagePicker from 'react-native-image-crop-picker';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import axios from 'axios';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mime: '',
            path: '',
            desc: '',
            jwt: '',
            username: '',
            url: ''
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

            await axios.get('https://spreadora2.herokuapp.com/api/profiles',{
                headers: {
                    'Authorization': `Bearer ${user.jwt}`,
                },
            })
            .then((res) => {
                if(res.data.data.length != 0) {
                for(var i=0;i<res.data.data.length;i++) {
                    if(res.data.data[i].attributes.username == user.username){
                        this.setState({url: res.data.data[i].attributes.url})
                    }
                }
            }
            })
            .catch((e) => console.log(e))

        }

        getUser()
    }


    render() {

       


        const makePost = async () => {


            /*
            

            await fetch('https://spreadora2.herokuapp.com/api/upload/files',{
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


                    



                    await fetch(`https://spreadora2.herokuapp.com/api/upload`, {
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

                    
                        fetch('https://spreadora2.herokuapp.com/api/posts',{
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
                                "date": new Date().toLocaleDateString(),
                                "username": this.state.username
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
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        {/* <TouchableOpacity>
                            <Ionicons
                                name="close-outline"
                                size={35}
                                color="#000"
                            /> 
                        </TouchableOpacity> */}
                        <Text style={styles.newPost}>New Post</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => makePost()} style={styles.postButton}>
                            <Text style={{color:'#fff'}}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',left:20}}>
                    <Image
                        source={this.state.url == '' ? require('../Images/user_placeholder.png') : {uri: this.state.url}}
                        style={styles.userImage}
                    />
                    <Text style={styles.username}>{this.state.username}</Text>
                </View>
                <View style={{top:10,justifyContent: 'center',alignItems:'center'}}> 
                    <TouchableOpacity onPress={() => this.addImage()} style={styles.addButton}>
                        <AntDesign
                            name="plus"
                            size={20}
                            color="#000"
                        />
                        <Text style={{color: '#0a79ed',fontSize:17,fontWeight:'700'}}>Add</Text>
                    </TouchableOpacity>
                    <View style={styles.uplaodedImage}>
                        
                        <Image 
                            source={{uri: this.state.path == ''? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640': this.state.path}}
                            style={{width: 300,height:190}}
                        />
                    </View>
                    <View style={{width:'100%',top:40}}>
                        <TextInput
                            style={{ left: 25,fontSize:17,width:'85%' }} 
                            placeholder="Description"
                            multiline={true}
                            editable={true}
                            maxHeight={150}
                            maxLength={100}
                            ref={input => { this.textInput = input }}
                            onChangeText={(e) => this.setState({desc: e})}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
    },
    newPost: {
        fontSize: 17,
        color:'#000'
    },
    postButton: {
        borderRadius: 5,
        width: 70,
        height: 30,
        backgroundColor:'#2ca7e0',
        justifyContent:'center',
        alignItems:'center'
    },
    userImage: {
        borderRadius: 30,
        height: 50,
        width: 50,
    },
    username: {
        left: 20,
        color:'#000',
        fontSize: 17
    },
    addButton: {
        flexDirection:'row',
        backgroundColor:'#b9d6ed',
        padding:10,
        borderRadius: 10
    },
    uplaodedImage: {
        top: 30,
        borderStyle: 'dashed',
        borderRadius: 10,
        width: '85%',
        height: '50%',
        borderColor:'#000',
        borderWidth: 2,
        justifyContent:'center',
        alignItems: 'center'
    }
});