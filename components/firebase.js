import firebase from 'firebase';

const fireBase=firebase.initializeApp({
        apiKey: "...............PASTE YOUR FIREBASE BASE KEY HERE",
        authDomain: "thapar-pedia.firebaseapp.com",
        databaseURL: "https://thapar-pedia-default-rtdb.firebaseio.com",
        projectId: "thapar-pedia",
        storageBucket: "thapar-pedia.appspot.com",
        messagingSenderId: "762144958410",
        appId: "1:762144958410:web:80032097a9bb56886f5133",
        measurementId: "G-E3RH7PWZ5V"
})

const auth=fireBase.auth();
const provider=new firebase.auth.GoogleAuthProvider();
const db=fireBase.firestore();
const storage=fireBase.storage();

export {auth,provider,storage};
export default db;


