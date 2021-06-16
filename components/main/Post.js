import React,{useEffect,useState} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image,Dimensions} from 'react-native'
import {Avatar} from 'react-native-elements'
import db,{auth} from '../firebase'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase'
import Comment from './Commment'

const{height,width}=Dimensions.get('window')

export default function Post({post,navigation}) {
    const [userProfile,setUserProfile]=useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&usqp=CAU');
    const [userName,setUserName]=useState('');
    const [isPostLiked,setPostLiked]=useState(false);
    const [isPostDisLiked,setPostDisLiked]=useState(false);
    const questionId=post.id    
    const uid=post.questions.user.uid
    const currentUserId=auth.currentUser.uid


    useEffect(() => {

        // GET USER DATA    
        db.collection('user').doc(uid).onSnapshot((snapshot)=>{
                if(snapshot.data()){
                setUserName(snapshot.data().name?snapshot.data().name:snapshot.data.email)
                if(snapshot.data().imageUrl) setUserProfile(snapshot.data().imageUrl)
                }
            })

        // GET LIKE AND UNLIKE STATUS
        db.collection('user').doc(currentUserId).collection('liked_post').doc(questionId).onSnapshot((data)=>{
            if(data.data()===undefined || data.data().isLiked===false){
                setPostLiked(false);   
            }else setPostLiked(true);
        })

        db.collection('user').doc(currentUserId).collection('unliked_post').doc(questionId).onSnapshot((data)=>{
            if(data.data()===undefined || data.data().isLiked===false){
                setPostDisLiked(false);   
            }else setPostDisLiked(true);
        })
    }, [])
    
    //Funtion to like Post
    const likePost=async(e)=>{
        if(questionId!==""){
        var isLike=true;
        var likestatus=await db.collection('user').doc(currentUserId).collection('liked_post').doc(questionId).get();
        if(likestatus.data()===undefined ||  likestatus.data().isLiked===false){
            isLike=false;
            if(likestatus.data()===undefined){
                db.collection("user").doc(currentUserId).collection("liked_post").doc(questionId).set({
                    isLiked:false
                })
            }
        }
        if(isLike===false){
            await db.collection("questions").doc(questionId).update({
                likes:firebase.firestore.FieldValue.increment(1)
            })
            db.collection("user").doc(currentUserId).collection("liked_post").doc(questionId).update({
                isLiked:true
            })
            setPostLiked(true);
            if(isPostDisLiked===true){
                db.collection("questions").doc(questionId).update({
                    dislikes:firebase.firestore.FieldValue.increment(-1)
                })
                db.collection("user").doc(currentUserId).collection("unliked_post").doc(questionId).update({
                    isLiked:false
                })
                setPostDisLiked(false);    
            }

        }else{
            db.collection("questions").doc(questionId).update({
                likes:firebase.firestore.FieldValue.increment(-1)
            })
            db.collection("user").doc(currentUserId).collection("liked_post").doc(questionId).update({
                isLiked:false
            })
            setPostLiked(false);
        }
        }
    }


     //Funtion to Dislike Post
     const dislikePost=async(e)=>{
        if(questionId!==""){
        var isLike=true;
        
        var likestatus=await db.collection('user').doc(currentUserId).collection('unliked_post').doc(questionId).get();
        if(likestatus.data()===undefined ||  likestatus.data().isLiked===false){
            isLike=false;
            if(likestatus.data()===undefined){
                db.collection("user").doc(currentUserId).collection("unliked_post").doc(questionId).set({
                    isLiked:false
                })
            }
        }
        if(isLike===false){
            await db.collection("questions").doc(questionId).update({
                dislikes:firebase.firestore.FieldValue.increment(1)
            })
            db.collection("user").doc(currentUserId).collection("unliked_post").doc(questionId).update({
                isLiked:true
            })   
            setPostDisLiked(true);
            if(isPostLiked){
                db.collection("questions").doc(questionId).update({
                    likes:firebase.firestore.FieldValue.increment(-1)
                })
                db.collection("user").doc(currentUserId).collection("liked_post").doc(questionId).update({
                    isLiked:false
                })
                setPostLiked(false);
            }
        }else{
            db.collection("questions").doc(questionId).update({
                dislikes:firebase.firestore.FieldValue.increment(-1)
            })
            db.collection("user").doc(currentUserId).collection("unliked_post").doc(questionId).update({
                isLiked:false
            })
            setPostDisLiked(false);
        }
        }   
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.push("Profile",{uid:uid})} style={{flexDirection:'row',borderBottomColor:'white',borderBottomWidth:0.5,padding:4}}>
                <Avatar rounded  activeOpacity={0.7} source={{uri:userProfile}}/>
                <Text style={{marginLeft:15,marginTop:5,color:'white'}}>{userName}</Text>
            </TouchableOpacity>
            <Text style={styles.question}>{post.questions.question}</Text>
            {(post.questions.imageUrl!=='') && <Image style={styles.image} source={{uri:post.questions.imageUrl}} />}
            <View style={styles.bottomSection}> 
                <TouchableOpacity style={styles.icon}>
                    <Text style={styles.likesCount}>{post.questions.likes==0?'':post.questions.likes}</Text>
                    <MaterialCommunityIcons name="thumb-up" color={isPostLiked?'red':'grey'}  size={26} onPress={likePost}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                    <Text style={styles.likesCount}>{post.questions.dislikes==0?'':post.questions.dislikes}</Text>
                <MaterialCommunityIcons name="thumb-down" color={isPostDisLiked?'red':'grey'} size={26} onPress={dislikePost} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                    <MaterialCommunityIcons name="comment" color='grey' size={26} onPress={()=>navigation.push("Comment",{post:post})}/>
                </TouchableOpacity>
            </View>
        </View>        
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        marginVertical:20,
        marginHorizontal:0.1*width,
        alignContent:'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },image:{
        flex:1,
        height:width*0.8,
        width:width*0.8,
        borderRadius:20,
    },bottomSection:{
        flexDirection:'row',
        flex:1,
        marginTop:10,
        justifyContent:'space-evenly',
    },question:{
        color:'white',
        fontSize:18,
        fontWeight:"bold",
        margin:15
     },likesCount:{
         color:'white',
         fontSize:10,
         marginTop:10,
         marginRight:5
     },icon:{
         marginVertical:10,
         flexDirection:'row',
     }
})