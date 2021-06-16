import React,{useState} from 'react';
import {FlatList,View,Text,StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import Post from './Post';
import {Avatar,ListItem} from 'react-native-elements';
import { ScrollView } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import {bindActionCreators} from 'redux';
import {fetchUser,fetchPosts,signOut} from '../../redux/actions/index'

const{height,width}=Dimensions.get('window')

function Feed(props) {
    const ref = React.useRef(null);
    const [refresh,onRefresh]=useState(false);
    
    const handleFeedRefresh=async()=>{
        onRefresh(true)
        await fetchUser()
        await fetchPosts()
        onRefresh(false)
    }
    
    
    useScrollToTop(ref);

    const{currentUser,posts,navigation}=props;
    const userProfile= currentUser && currentUser.imageUrl && currentUser.imageUrl!=''?currentUser.imageUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&usqp=CAU';
    if(!currentUser) return <View/>
    return (
        <ScrollView ref={ref} style={styles.container}>
            <ListItem>
                 <Avatar rounded source={{uri:userProfile}} size='large'/>
                    <ListItem.Content>
                        <TouchableOpacity style={styles.button} onPress={()=>navigation.push('ADD')}>
                            <Text style={styles.appButtonText}>Add Query</Text>
                        </TouchableOpacity>
                    </ListItem.Content>
            </ListItem>
          
            
            <FlatList
             data={posts}
             numColumns={1}
             horizontal={false}
             showsVerticalScrollIndicator={true}
             keyExtractor={item=>item.id}
             refreshing={refresh}
             onRefresh={handleFeedRefresh}
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
    },button:{
        alignSelf:'center',
        width:width*0.5,
        elevation: 8,
        backgroundColor: "#8f1f1b",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginVertical:20
    },appButtonText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
})
const mapStatetoProps=(store)=>({
    currentUser:store.userState.currentUser,
    posts:store.userState.posts
  })

  const mapDispatchToProps = (dispatch)=>bindActionCreators({fetchUser,signOut,fetchPosts},dispatch)

  export default connect(mapStatetoProps,mapDispatchToProps)(Feed);