import {USER_STATE_CHANGE,USER_POSTS_STATE_CHANGE,SIGN_OUT} from '../constants/index';

const intialState={
    currentUser:null,
    posts: [],
    user_posts:[]
}

export const user=(state=intialState,action)=>{
    switch(action.type){
     case USER_STATE_CHANGE:   
        return {
            ...state,
            currentUser:action.currentUser
        }
     case USER_POSTS_STATE_CHANGE:
         return {
             ...state,
             posts:action.posts,
             user_posts:action.user_posts
         }
     case SIGN_OUT:
         return{
             currentUser:null,
             posts:[],
             user_posts:[]
         }
     default: return state;       
    }
}