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
            /*           

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

        */


        let usrdata = await AsyncStorage.getItem('user');
        let user = JSON.parse(usrdata);

        await axios.get('https://tandora.herokuapp.com/api/posts',{
            headers: {
                "Authorization": `Bearer ${user.jwt}`
            }
        })
        .then((res) => {
            //console.log(res.data.data)
            this.setState({data: res.data.data})
        })
        .catch((e) => console.log(e))

    }
    show();

   


}


    render() {


        const Item = ({ url,desc,time,date }) => (
            
            <View style={{padding:5}}>
                <TouchableOpacity>
                    <Image
                        source={{uri: "https://tandora.herokuapp.com"+url}}
                        style={{width:Dimensions.get('window').width,height:200}}
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
                    url={item.attributes.imageURL}
                    desc={item.attributes.description}
                    time={item.attributes.time}
                    date={item.attributes.date}
                />
            );
            
            
          };
         

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
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    desc: {
        fontSize:17,
        fontWeight: '700',
        color: '#000'
    }
});