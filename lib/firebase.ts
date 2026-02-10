// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_pPU_1pS4eQ4-ivRa41TKtSPJgbXEfFU",
  authDomain: "crmxx-ecce2.firebaseapp.com",
  projectId: "crmxx-ecce2",
  storageBucket: "crmxx-ecce2.firebasestorage.app",
  messagingSenderId: "919444748339",
  appId: "1:919444748339:web:3f3275d5bf1a4f382c4b46",
  measurementId: "G-7Q76V4YS3B"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };