import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from "@react-native-community/async-storage";
import ImagePicker from 'react-native-image-crop-picker';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mime: '',
            path: '',
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
    

    render() {


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
let data = await AsyncStorage.getItem('user');
let user = JSON.parse(data);
console.log(user.jwt)
            
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
                    Authorization: `Bearer ${user.jwt}`
                },
                body: formData,
            })
                .then(response => response.json())
                .then(response => {
                    console.log('response', response);
                    alert('Image posted successfully')
                    this.setState({path: ''})
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
                        source = {require("../Images/user1.jpg")}
                        style={styles.userImage}
                    />
                    <Text style={styles.username}>Ravi Kumar</Text>
                </View>
                <View style={{top:100,justifyContent: 'center',alignItems:'center'}}> 
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
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
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
        width: 50
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