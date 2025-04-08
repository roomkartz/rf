// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDASwCp5V9l1MG0foxqAGvNVM7aK4bcO4Y",
  authDomain: "roomkartz.firebaseapp.com",
  projectId: "roomkartz",
  storageBucket: "roomkartz.appspot.com",
  messagingSenderId: "568160027102",
  appId: "1:568160027102:web:281f70c0be7ca6cd815d4f",
  measurementId: "G-7S80DJT69Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { auth };