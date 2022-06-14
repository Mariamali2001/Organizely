import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig ={

    apiKey: "AIzaSyAMipDRXC3HqikkMkuLTy7IYf32QAbKTwc",
    authDomain: "organizely-b3a3b.firebaseapp.com",
    projectId: "organizely-b3a3b",
    storageBucket: "organizely-b3a3b.appspot.com",
    messagingSenderId: "660314554021",
    appId: "1:660314554021:web:68220fa1290e76c00a574c"
      }

class Fire {
    constructor(callback) {
        this.init(callback);
    }

   init(callback) {

    if (!firebase.apps.length)
    {
        firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged(user=>{
        if (user){
           callback(null,user)
        } else {
            firebase
               .auth()
               .signInAnonymously()
               .catch(error=>{
                  callback(error)
               })
        }
    });

   }
}



  

export default Fire;