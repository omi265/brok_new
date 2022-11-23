// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD12-ObWNHxhUOPP5UXmqOaQ6l2PuPyMbY",
  authDomain: "brok-cd265.firebaseapp.com",
  projectId: "brok-cd265",
  storageBucket: "brok-cd265.appspot.com",
  messagingSenderId: "134639188065",
  appId: "1:134639188065:web:1e639f1825ed6a0ccad220",
  databaseURL:
    "https://brok-cd265-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
