import firebase from "firebase";
// import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCrXVeMtBQvX7lPdxWVzykUvBegV0tYolU",
  authDomain: "organizely-3cf72.firebaseapp.com",
  projectId: "organizely-3cf72",
  storageBucket: "organizely-3cf72.appspot.com",
  messagingSenderId: "191666777168",
  appId: "1:191666777168:web:a80ead2b92021122c27555",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!firebase.app.length) {
      firebase.initializApp(firebaseConfig);
      
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }
  getLists(callback) {
    let ref = firebase
      .firestore()
      .collection("omaima_mariam")
      .doc(this.userId)
      .collection("lists");

    this.unsubscribe = ref.onSnapshot((snopshot) => {
      lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });
      callback(lists);
    });
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  detach(){
    this.unsubscribe();
  }
}
export default Fire;