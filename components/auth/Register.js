import React, { Component } from 'react';
import {View,Text,TextInput,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import SignUp from './firebaseSignUp';

const{height,width}=Dimensions.get('window')

export class Register extends Component {
    constructor(props){
        super(props);
        this.state ={
            email:'',
            password:'',
            name:''
        }
        this.onSignUp=this.onSignUp.bind(this);
    }
    
    // FUNTION THAT WILL SIGN UP
    onSignUp(){
        const{email,password,name}=this.state;
        SignUp(email,password,name);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder="NAME" placeholderTextColor='grey' style={styles.input} onChangeText={(name)=>this.setState({name})}/>
                
                <TextInput placeholder="EMAIL" placeholderTextColor='grey' style={styles.input} onChangeText={(email)=>this.setState({email})}/>
                
                < TextInput secureTextEntry={true} placeholderTextColor='grey' style={styles.input} placeholder="PASSWORD" onChangeText={(password)=>this.setState({password})}/>
                <TouchableOpacity style={styles.button} onPress={()=>this.onSignUp()}>
                     <Text style={styles.appButtonText}>Sign UP</Text>
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
    },button:{
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
export default Register
