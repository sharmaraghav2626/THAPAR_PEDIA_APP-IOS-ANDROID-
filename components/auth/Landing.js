import React from 'react'
import {Text,Button,View,StyleSheet,Dimensions,TouchableOpacity,Image} from 'react-native'


const{height,width}=Dimensions.get('window')

export default function Landing({navigation}) {
    return (
        <View style={styles.container}>
              <Image style={styles.image} source={{uri:'https://firebasestorage.googleapis.com/v0/b/thapar-pedia.appspot.com/o/icon-removebg-preview.png?alt=media&token=15f99b25-874d-4a05-b1c5-1efe07010655'}} />
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                     <Text style={styles.appButtonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Log In')}>
                     <Text style={styles.appButtonText}>Login</Text>
              </TouchableOpacity>  
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
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
      },image:{
          flex:0.4
      }
})
