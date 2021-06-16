import React,{useState,useEffect} from 'react';
import {View,StyleSheet,FlatList,TouchableOpacity,Dimensions,Text,Alert,ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {signOut} from '../../redux/actions/index'
import db,{ auth,storage } from '../firebase';
import Post from './Post'
import {Avatar,ListItem} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'

const{height,width}=Dimensions.get('window')
    
function Profile(props) {
    const {currentUser,user_posts,navigation}=props;
    const handleSignOut=async()=>{
            await auth.signOut().then(()=>signOut())
    }    

    const [user,setUser]=useState(null)
    const [userPost,setUserPost]=useState([]);
    const [userProfile,setUserProfile]=useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&usqp=CAU');


    // USE STATE  FOR UPLOAD PROFILE
    const handleUploadProfile=()=>{
        if( props.route.params.uid === auth.currentUser.uid){
            Alert.alert(
                "UPLOAD PROFILE",null,
                [
                  {
                    text: "Click Here",
                    onPress: UpdateProflile,
                    style: "cancel",
                  },{
                      text:"Cancel",
                      style:'cancel'
                  }
                ],
                {
                  cancelable: true,
                }
              );
        }
    }
    const UpdateProflile=()=>{
        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Image,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });  
            if (!result.cancelled) {
                const uri=result.uri;
                const response=await fetch(uri);
                const blob=await response.blob();
                storage
                  .ref(`/images/${auth.currentUser.email}`)
                  .put(blob).then((response)=>{
                      response.ref.getDownloadURL().then((link)=>{
                        db.collection("user").doc(auth.currentUser.uid).update({imageUrl:link}) 
                      })
                      setUserProfile(uri)
                  }).then(()=>ToastAndroid.show('Profile Picture Uploaded Successfully',ToastAndroid.SHORT)).catch((e)=>ToastAndroid.show(e.message,ToastAndroid.SHORT));
            }
          };
          pickImage();
    }


    // GET DATA FOR PROFILE
    useEffect(()=>{
        if(props.route.params.uid===auth.currentUser.uid){
            setUser(currentUser)
            setUserPost(user_posts)
        }else{
          db.collection("questions")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot)=>{
            var post=[];
            snapshot.docs.map((doc)=>{
                if(doc.data().user.uid==props.route.params.uid){ 
                post.push({
                  id:doc.id,
                  questions:doc.data()
                })}
              })
              setUserPost(post);    
            });
            db.collection('user').doc(props.route.params.uid)
            .get()
            .then((snapshot)=>{
                if(snapshot.exists){
                  setUser(snapshot.data());
                } 
            })
        }
      },[props.route.params.uid,user_posts])    

      useEffect(()=>{
          if(user && user.imageUrl) setUserProfile(user.imageUrl)
      },[user])

    if(!user) return <View/>
    return (
        <View style={styles.feedContainer}>
                
            <ListItem>
                <Avatar activeOpacity={0.7} size="large" rounded source={{uri:userProfile}} onPress={handleUploadProfile}/>
                    <ListItem.Content>
                        <ListItem.Title>{user.name}</ListItem.Title>
                        <ListItem.Subtitle style={{fontSize:12}}>{user.email}</ListItem.Subtitle>
                    </ListItem.Content>    
            </ListItem>
            {
                    (props.route.params.uid === auth.currentUser.uid) && 
                   <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                     <Text style={styles.appButtonText}>LOG OUT</Text>
                   </TouchableOpacity>
            }    
            <FlatList
            data={userPost}
            numColumns={1}
            horizontal={false}
            renderItem={({item})=><Post post={item} navigation={navigation}/>}
            />
        </View>
    )
}
const styles=StyleSheet.create(
    {
       
        feedContainer:{
            flex:1,
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
            fontSize: 15,
            color: "#fff",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase"
          },header:{
              backgroundColor:'#111112',
              color:'white'
          }
    }
)

const mapStatetoProps=(store)=>({
    currentUser:store.userState.currentUser,
    user_posts:store.userState.user_posts
})
const mapDispatchToProps = (dispatch)=>bindActionCreators({signOut},dispatch);
export default connect(mapStatetoProps,mapDispatchToProps)(Profile);

