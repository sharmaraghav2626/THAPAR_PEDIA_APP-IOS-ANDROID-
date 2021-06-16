import React,{useState} from 'react';
import {View,TextInput,Image,TouchableOpacity,Text,StyleSheet,Dimensions} from 'react-native';
import db,{storage,auth} from '../firebase';
import firebase from "firebase";

const {height,width}=Dimensions.get('window')

export default function saveImage(props) {
    const [question,setQuestion]=useState('');
    const image=props.route.params.image;
    const uploadPost=async()=>{
        props.navigation.popToTop();
        db.collection("questions").add({
            user:{
                uid:auth.currentUser.uid
            },
            question: question,
            imageUrl:'',
            likes:+0,
            dislikes:+0,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          }).then(async(data)=>{
            if(image){
                const questionId=data.id;
                const uri=image;
                const response=await fetch(uri);
                const blob=await response.blob();
                storage
                  .ref(`post_images/${questionId}`)
                  .put(blob).then((response)=>{
                      response.ref.getDownloadURL().then((link)=>{
                        db.collection("questions").doc(questionId).update({imageUrl:link}) 
                      })
                  })
            }
          })
          
      };
    

    return (
    <View style={{flex:1,alignContent:'center',justifyContent:'center',backgroundColor:'#212121'}}> 
        {image && <Image source={{uri:image}} style={{flex:1}}/>}
        <TextInput style={styles.input} placeholder='Write Your Query Here' placeholderTextColor='grey' onChangeText={(ques)=>setQuestion(ques)}/>
        <TouchableOpacity style={styles.button} onPress={()=>uploadPost()}>
                     <Text style={styles.appButtonText}>Post</Text>
        </TouchableOpacity>
    </View>
    )
}

const styles=StyleSheet.create({
  input:{
    alignSelf:'center',
    width:width*0.8,
    fontSize:20,
    fontWeight:'normal',
    color:'white',
    padding:10,
    marginVertical:15
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
  }
})