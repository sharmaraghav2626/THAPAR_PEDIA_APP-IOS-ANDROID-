import React, { Component } from 'react';
import {View,Text,TextInput,ToastAndroid,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import LoginUser from './firebaseLogIn';

const{height,width}=Dimensions.get('window')

export class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            email:'',
            password:'',
        }
        this.onLogIn=this.onLogIn.bind(this);
    }
    
    // FUNTION THAT WILL SIGN UP
    onLogIn(){
        const{email,password}=this.state;
        LoginUser(email,password);
    }

    render() {
        return (
            <View style={styles.container}>
                
                <TextInput placeholder="EMAIL" placeholderTextColor='grey' style={styles.input} onChangeText={(email)=>this.setState({email})}/>
                <TextInput placeholder="PASSWORD" placeholderTextColor='grey' style={styles.input} onChangeText={(password)=>this.setState({password})} secureTextEntry={true}/>
                <TouchableOpacity style={styles.button} onPress={()=>this.onLogIn()}>
                     <Text style={styles.appButtonText}>LOG IN</Text>
                </TouchableOpacity>
           
            </View>
        )
    }
}
const styles=StyleSheet.create({
  container:{
      flex:1,
      alignContent:'center',
      justifyContent:'center',
      backgroundColor:'#212121'
  },
  button:{
        alignSelf:'center',
        width:0.8*width,
        elevation: 8,
        backgroundColor: "#8f1f1b",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginVertical:20
    },appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },input:{
        alignSelf:'center',
        width:width*0.8,
        fontSize:25,
        fontWeight:'normal',
        color:'white',
        padding:10,
        marginVertical:15
      }
})
export default Login
