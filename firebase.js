import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// import {getFirestore} from "firebase/firestore";


// import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592


// Initialize Firebase
// const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);





const firebaseConfig = {
  apiKey: "AIzaSyBod2oA39fR9VP2k2aWgbDwpuOa3zuZyws",
  authDomain: "laundry-app-6aba8.firebaseapp.com",
  projectId: "laundry-app-6aba8",
  storageBucket: "laundry-app-6aba8.appspot.com",
  messagingSenderId: "679551310492",
  appId: "1:679551310492:web:b7fc7c0c72a201073feb59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);

const db=getFirestore(app);

export{auth,db};