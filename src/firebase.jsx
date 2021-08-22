import firebase from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDkIyusNBddI9dB9N5yewqpWWPv_BReCbc",
    authDomain: "utube-clone-1.firebaseapp.com",
    projectId: "utube-clone-1",
    storageBucket: "utube-clone-1.appspot.com",
    messagingSenderId: "828572513558",
    appId: "1:828572513558:web:22f9aef87cf67ccd794c37"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.auth();