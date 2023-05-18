// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAmR-F1pafxkHE57JB25DCzb0qFh89XHs",
  authDomain: "twitter-clone-d5889.firebaseapp.com",
  projectId: "twitter-clone-d5889",
  storageBucket: "twitter-clone-d5889.appspot.com",
  messagingSenderId: "524628437468",
  appId: "1:524628437468:web:978c08da0de13f8761c719"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage()
export {db, auth, storage}