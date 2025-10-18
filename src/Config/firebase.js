// src/Config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADOk-MuA57LkMK_lOQfQq9VaCc1kcpUxw",
  authDomain: "smit-hackthon-7ed13.firebaseapp.com",
  projectId: "smit-hackthon-7ed13",
  storageBucket: "smit-hackthon-7ed13.firebasestorage.app",
  messagingSenderId: "869982239697",
  appId: "1:869982239697:web:2b316b6d0e59b7168abef0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
