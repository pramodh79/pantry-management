// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8knTasaYI10vj59GEL-FKJiR2eyTLHJA",
  authDomain: "pantry-management-21a3b.firebaseapp.com",
  projectId: "pantry-management-21a3b",
  storageBucket: "pantry-management-21a3b.appspot.com",
  messagingSenderId: "411468002434",
  appId: "1:411468002434:web:0d70eb433b85524d45709b",
  measurementId: "G-Z6SD3XM4E5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}