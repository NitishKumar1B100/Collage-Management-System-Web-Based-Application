// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGTEuvLK8oSnS3y4ZwsJ7DkbwSIPIaaqg",
  authDomain: "universi-452e6.firebaseapp.com",
  databaseURL: "https://universi-452e6-default-rtdb.firebaseio.com",
  projectId: "universi-452e6",
  storageBucket: "universi-452e6.firebasestorage.app",
  messagingSenderId: "62216793502",
  appId: "1:62216793502:web:ce97647f68714fc27e7a8f",
  measurementId: "G-7QB86SN61S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)