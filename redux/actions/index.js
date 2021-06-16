import db,{auth} from '../../components/firebase';
import {USER_STATE_CHANGE,USER_POSTS_STATE_CHANGE,SIGN_OUT} from '../constants/index';

// FETCH USER INFORMATION
export function fetchUser(){
    return ((dispatch)=>{
      db.collection('user').doc(auth.currentUser.uid)
        .get()
        .then((snapshot)=>{
            if(snapshot.exists){
                dispatch({type:USER_STATE_CHANGE,currentUser:snapshot.data()});
            } 
        })
     
    })
}

// FETCH POSTS
export function fetchPosts(){
    return ((dispatch)=>{   
        db.collection("questions")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot)=>{
            var post=[];
            var mypost=[];
            snapshot.docs.map((doc)=>{
                post.push({
                  id:doc.id,
                  questions:doc.data()
                })
                if(doc.data().user.uid==auth.currentUser.uid ){ mypost.push({
                  id:doc.id,
                  questions:doc.data()
                })}
              })
              dispatch({type:USER_POSTS_STATE_CHANGE,posts:post,user_posts:mypost});    
            });
    })
  }



// USER SIGNOUT
export function signOut(){
  return ((dispatch)=>{        
            dispatch({type:SIGN_OUT});    
  })
}