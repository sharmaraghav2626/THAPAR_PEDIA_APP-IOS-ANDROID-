import React, { Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser,fetchPosts,signOut} from '../redux/actions/index';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FeedScreen from './main/Feed';
import Profile from './main/Profile';
import SearchScreen from './main/Search';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import db,{ auth } from './firebase';

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen =()=>(null);  

export class Main extends Component {
    componentDidMount(){
        
        if(auth.currentUser.emailVerified){
            
            db.collection('user').doc(auth.currentUser.uid).get()
            .then((snapshot)=>{
                if(!snapshot.exists()){
                    db.collection('user').doc(auth.currentUser.uid).update({
                        email:auth.currentUser.email
                    })
                }
            })
            
            
            this.props.fetchUser();
            this.props.fetchPosts();
        }else{    
        auth.currentUser.sendEmailVerification();    
        auth.signOut();
        this.props.signOut();
        }
    }
    render() {      
        return (
            <Tab.Navigator initialRouteName="home"
           
            activeColor="#f0edf6"
            inactiveColor="grey"
            barStyle={{ backgroundColor: '#8f1f1b' }}
            >
                <Tab.Screen name="Feed" component={FeedScreen} navigation={this.props.navigation}
                options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26}/>
                ),}}/>
                <Tab.Screen name="Search" component={SearchScreen} navigation={this.props.navigation}
                options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                ),}}/>
                
                <Tab.Screen name="AddPost" component={EmptyScreen} 
                    listeners={({navigation})=>({
                        tabPress: event=>{
                            event.preventDefault();
                            navigation.navigate("ADD");
                            
                        }
                   })}
                options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="plus" color={color} size={26}/>
                ),}}/>
                <Tab.Screen name="Profile" component={Profile} navigation={this.props.navigation}
                listeners={({navigation})=>({
                    tabPress: event=>{
                        event.preventDefault();
                        navigation.navigate("Profile",{uid:auth.currentUser.uid});
                    }
                })}
                options={{
                tabBarIcon: ({ color, size }) => (  
                    <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                ),}}/>
            </Tab.Navigator>            
        )
    }
}
const mapStateToProps=(store)=>({
  currentUser:store.userState.currentUser,
  posts:store.userState.posts ,
  user_posts:store.userState.user_posts   
})
const mapDispatchToProps = (dispatch)=>bindActionCreators({fetchUser,signOut,fetchPosts},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(Main);
