import React,{useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import {Avatar} from 'react-native-elements'
import db from '../firebase'
export default function CommentStructure({navigation,item}) {
    const [user,setUser]=useState(null);
    const [userProfile,setUserProfile]=useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&usqp=CAU');
    useEffect(()=>{
        db.collection('user').doc(item.answers.user.uid)
            .get()
            .then((snapshot)=>{
                if(snapshot.exists){
                  setUser(snapshot.data());
                  if(snapshot.data().imageUrl!==undefined){
                  setUserProfile(snapshot.data().imageUrl);
                  }
                } 
            })
    },[])
    if(!user) return <View/>
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.push("Profile",{uid:item.answers.user.uid})} style={{flexDirection:'row',borderBottomColor:'white',padding:10,borderBottomWidth:0.5,marginVertical:10,marginHorizontal:15}}>
                <Avatar rounded  activeOpacity={0.7} source={{uri:userProfile}}/>
                 <Text style={{marginLeft:15,marginTop:5,color:'white'}}>{user.name}</Text>
            </TouchableOpacity>
            <Text style={{marginLeft:15,marginVertical:5,paddingHorizontal:25,color:'white'}}>{item.answers.answer}</Text>
         </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        backgroundColor:'#212121'
    }
})
