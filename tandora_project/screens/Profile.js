import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image,StyleSheet} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-crop-picker'
import axios from 'axios'


export default class Profile extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            username: '',
            jwt: '',
            mime: '',
            path: '',
            url: '',
            profile: true,
            edit: false,
            button: true,
            buttonFade: false
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

            await axios.get('https://tandora.herokuapp.com/api/profiles',{
                headers: {
                    'Authorization': `Bearer ${user.jwt}`,
                },
            })
            .then((res) => {
                if(res.data.data.length != 0) {
                    console.log(res.data.data[0])
                for(var i=0;i<res.data.data.length;i++) {
                    if(res.data.data[i].attributes.username == user.username){
                        this.setState({url: res.data.data[i].attributes.url, id: res.data.data[i].id})
                    }
                }
            }
            })
            .catch((e) => console.log(e))
        }

        getUser()
        
    }



    render(){



        
        const makePost = async () => {

            this.setState({buttonFade: true,button:false});

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
                        this.setState({path: ''})

                        if(this.state.url == '') {

                        fetch('https://tandora.herokuapp.com/api/profiles',{
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${this.state.jwt}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "data": {
                                "username": this.state.username,
                                "url": "https://tandora.herokuapp.com"+response[0].url,
                            }
                           
                        })
                    })
                    .then((res) => {
                        console.log("Profile uploaded successfully",res)
                        alert('Profile uploaded successfully')
                        this.setState({edit: false,profile: true});
                    })
                    .catch((e) => {
                        console.log(e)
                        this.setState({buttonFade: false,button:true});
                    })

                    }

                    else {
                        if(this.state.id != null) {
                        fetch(`https://tandora.herokuapp.com/api/profiles/${this.state.id}`,{
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${this.state.jwt}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "data": {
                                "username": this.state.username,
                                "url": "https://tandora.herokuapp.com"+response[0].url,
                            }
                           
                        })
                    })
                    .then((res) => {
                        console.log("Profile uploaded successfully",res)
                        alert('Profile uploaded successfully')
                        this.setState({edit: false,profile: true});
                    })
                    .catch((e) => {
                        console.log(e)
                        this.setState({buttonFade: false,button:true});
                    })
                    }
                    }


                    })
                    .catch(error => {
                        console.log('error', error);
                    });
                }
                else {
                    alert('Insert image first')
                    this.setState({button:true,buttonFade: false})
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
                                source={{uri: this.state.url == ''? 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640': this.state.url}}
                                style={{borderRadius:30,width:60,height:60,resizeMode:'contain'}}
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
                        <TouchableOpacity onPress={() => this.setState({edit:true,profile:false})} style={styles.edit}>
                            <Text style={{color:'#2ca7e0'}}>Edit</Text>
                        </TouchableOpacity>
                </View>
                <View style={{padding:10,flexDirection:'row'}}>
                    <View>
                        <Text style={{fontWeight:'600',color:'#000',fontSize:17}}>0</Text>
                        <Text>Post</Text>
                    </View>
                    <View style={{left:30}}>
                        <Text style={{fontWeight:'600',color:'#000',fontSize:17}}>0</Text>
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
                        <TouchableOpacity onPress={() => this.setState({edit:false,profile:true})}>
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
                    {this.state.button &&
                    <TouchableOpacity onPress={() => makePost()} style={styles.button}>
                        <Entypo
                            name="check"
                            size={40}
                            color="#fff"
                        />
                    </TouchableOpacity>
                    }
                    {this.state.buttonFade &&
                    <View style={styles.buttonFade}>
                    <Entypo
                        name="check"
                        size={40}
                        color="#fff"
                    />
                </View>
                    }
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
    },
    buttonFade: {
        padding:5,
        width:"60%",
        height:50,
        backgroundColor:'#599feb',
        justifyContent:'center',
        alignItems:'center'
    }
})