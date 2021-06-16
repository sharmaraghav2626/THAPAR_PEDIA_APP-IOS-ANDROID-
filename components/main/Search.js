import React,{useState} from 'react'
import {TextInput,FlatList,StyleSheet,Dimensions} from 'react-native'
import db from '../firebase';
import Post from './Post'
import { ScrollView } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';


const {height,width}=Dimensions.get('window');

export default function Search({navigation}) {
    const ref = React.useRef(null);
    useScrollToTop(ref);

    const [search,setSearch]=useState([])

    const fetchSearch=(searchTerm)=>{
        if(searchTerm==='') setSearch([])
        else {
           var post=[]
           db.collection("questions").orderBy("timestamp","desc").onSnapshot((snapshot)=>{
            snapshot.docs.map((doc)=>{
              var question=doc.data().question+" "+doc.data().user.email+" "+doc.data().user.displayName;
              if(question.toLowerCase().includes(searchTerm.toLowerCase())){
                 post.push({
                   id:doc.id,
                   questions:doc.data()
                 }) 
              }
            })
            setSearch(post);
          }) 
        }       
    }
    return (
             <ScrollView ref={ref} style={styles.container}>
                <TextInput placeholder='Search Here...' placeholderTextColor='grey' style={styles.input} onChangeText={(search)=>fetchSearch(search)}/>
                <FlatList
                  data={search}
                  numColumns={1}
                  horizontal={false}
                  showsVerticalScrollIndicator={true}
                  renderItem={({item})=><Post post={item} navigation={navigation}/>}
                />
             </ScrollView>   
    )
}



const styles=StyleSheet.create({
  container:{
      flex:1,
      alignContent:'center',
      backgroundColor:'#212121'
  },
  input:{
        alignSelf:'center',
        width:width*0.9,
        fontSize:14,
        fontWeight:'normal',
        color:'white',
        paddingVertical:10,
        paddingHorizontal:23,
        marginVertical:15,
        borderWidth:0.5,
        borderColor:'white',
        borderRadius:10,
      }
})