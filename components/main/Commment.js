import React,{useState,useEffect} from 'react'
import {TextInput,FlatList,View,TouchableOpacity,Text,StyleSheet,Dimensions,ToastAndroid} from 'react-native'
import {Avatar} from 'react-native-elements'
import db,{auth} from '../firebase'
import firebase from "firebase"
import CommentStructure from './CommentStructure'
const {height,width}=Dimensions.get('window')

export default function Commment(props) {
    const post=props.route.params.post;
    const [comment,setComment]=useState('');
    const [answers,getAnswer]=useState([]);
    
    
    

    // Funtion to get comments on Post
    useEffect(() => {
        db.collection("questions").doc(post.id).collection("answer")
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>{
            getAnswer(snapshot.docs.map((doc)=>
                ({
                    id:doc.id,
                    answers:doc.data()
                })
            )) 
           }) 
      }, [post.id]);

    //Add comment to Post
    const handleComment=()=>{
        if(comment!==''){
        db.collection("questions").doc(post.id).collection("answer").add({
                answer: comment,
                user: {
                    uid:auth.currentUser.uid
                },
                questionId: post.id,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          }).then(()=>setComment(''));
        }else{
            ToastAndroid.show(`Can't post an empty answer`,ToastAndroid.SHORT);
        }
    }

    return (
        <View style={styles.container}>
            
           { answers.length>0 &&
            <FlatList
                    data={answers}
                    numColumns={1}
                    horizontal={false}
                    renderItem={({item})=>
                    <CommentStructure navigation={props.navigation} item={item}/>
                    }
            />
           }
            <TextInput style={styles.input} placeholder='Answer Here...' placeholderTextColor='grey' value={comment} onChangeText={(text)=>setComment(text)}/>
            <TouchableOpacity style={styles.button} onPress={handleComment}>
                     <Text style={styles.appButtonText}>POST</Text>
            </TouchableOpacity>
            
        </View>
    )
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
          fontSize: 10,
          color: "#fff",
          fontWeight: "bold",
          alignSelf: "center",
          textTransform: "uppercase"
        },input:{
          alignSelf:'center',
          width:width*0.8,
          fontSize:15,
          fontWeight:'normal',
          color:'white',
          padding:10,
          marginVertical:15
        }
  })