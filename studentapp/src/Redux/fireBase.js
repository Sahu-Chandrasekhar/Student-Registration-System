// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBxKYqHPAqDAImL27LENnon-FR9sSh_neU",
    authDomain: "student-app-ab94d.firebaseapp.com",
    projectId: "student-app-ab94d",
    storageBucket: "student-app-ab94d.appspot.com",
    messagingSenderId: "975826825250",
    appId: "1:975826825250:web:62fa4b518d77f39b291a7b"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
