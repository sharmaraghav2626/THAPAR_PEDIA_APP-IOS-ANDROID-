import db,{auth,provide} from '../firebase';
import {ToastAndroid} from 'react-native'


// SIGN UP 
  const SignUp=(email,password,name)=>{

    if(email===''){
        ToastAndroid.show('Please enter a valid Email',ToastAndroid.SHORT);
    }else if(password===''){
        ToastAndroid.show('Please enter a valid Password',ToastAndroid.SHORT);
    }if(name===''){
        ToastAndroid.show('Please enter your Name',ToastAndroid.SHORT);
    }else {
    auth.createUserWithEmailAndPassword(email,password)
    .then( async(data)=>{
        await db.collection('user').doc(auth.currentUser.uid).set({
          email:auth.currentUser.email,
          name:name
        })  
      data.user.sendEmailVerification(); 
      ToastAndroid.show('Email Sent Please Verify',ToastAndroid.SHORT)
    }).then(()=>{
      auth.currentUser.updateProfile({
        displayName:name
      })
    })
      .then(()=>{
        ToastAndroid.show('Validation link has been sent to ' + email + '.', ToastAndroid.SHORT);
      }).catch((e)=>ToastAndroid.show(e.message,ToastAndroid.SHORT));    
    }

}
export default SignUp;
