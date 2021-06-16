import db,{auth,provide} from '../firebase';
import {ToastAndroid} from 'react-native'

const Login=(email,password)=>{
    if(email===''){
        ToastAndroid.show('Please enter a valid Email',ToastAndroid.SHORT);
    }else if(password===''){
        ToastAndroid.show('Please enter a valid Password',ToastAndroid.SHORT);
    }else {
    auth.signInWithEmailAndPassword(email,password)
    .then((data)=>{
            if(!data.user.emailVerified){
                ToastAndroid.show('Please verify your account before Log In',ToastAndroid.SHORT)
            }    
    }).catch((e)=>ToastAndroid.show(e.message,ToastAndroid.SHORT));
    }
}
export default Login;