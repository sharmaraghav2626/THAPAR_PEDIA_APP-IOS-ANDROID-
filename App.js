import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login';
import {auth} from './components/firebase';
import Main from './components/Main';
import AddPost from './components/main/AddPost';
import Upload from './components/main/Upload';
import Profile from './components/main/Profile';
import Comment from './components/main/Commment';

// Redux Store Creation
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
const store=createStore(rootReducer,applyMiddleware(thunk));


const Stack=createStackNavigator();

export default function App() {
  
  // FOR CHECKING INITIAL AUTHERISATION
  const [isUser,setIsUser]=useState(false);
  useEffect(() => {
      auth.onAuthStateChanged((auth)=>{
        if(auth){
          setIsUser(true);
        }else{
          setIsUser(false);  
        }
      })    
  }, []);
  if(!isUser){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing" 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#111111',
          }, headerTintColor: 'white',          
          headerTitleStyle: {
            marginLeft:50,
            fontWeight: 'bold',
            color:'white',
            
          },
        }}
      >
         <Stack.Screen name="Landing"  component={LandingScreen} options={{headerShown:false}} ></Stack.Screen> 
         <Stack.Screen name="Register" options={{title:'SIGN UP'}} component={Register} ></Stack.Screen>
         <Stack.Screen name="Log In" options={{title:'LOG IN'}} component={Login} ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing"
       screenOptions={{
        headerStyle: {
          backgroundColor: '#111111',
        },   headerTintColor: 'white',
               headerTitleStyle: {
          marginLeft:100,
          fontWeight: 'bold',
          fontSize:16,
          color:'white',
        },
      }}>
         <Stack.Screen name="ThaparPedia" component={Main}  options={{title:'THAPAR PEDIA'}}></Stack.Screen>
         <Stack.Screen name="ADD" component={AddPost} options={{title:'POST'}} ></Stack.Screen>
         <Stack.Screen name="Upload"  component={Upload}  options={{title:'POST'}} ></Stack.Screen> 
         <Stack.Screen name="Profile" component={Profile} options={{title:'PROFILE'}}></Stack.Screen>
         <Stack.Screen name="Comment" component={Comment} options={{title:'ANSWERS'}}></Stack.Screen> 
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
