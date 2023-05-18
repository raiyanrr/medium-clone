// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhRRnnXIJLvT7kwbGNMZETXoGIFfuqQo8",
  authDomain: "medium-clone-b2d03.firebaseapp.com",
  projectId: "medium-clone-b2d03",
  storageBucket: "medium-clone-b2d03.appspot.com",
  messagingSenderId: "859525613485",
  appId: "1:859525613485:web:ea9285576440c47fba0324"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage()
export {db, auth, storage}