// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB27yIFEFmzomR0t_JueGpxIewlswW57B8",
  authDomain: "fir-project1-c060b.firebaseapp.com",
  projectId: "fir-project1-c060b",
  storageBucket: "fir-project1-c060b.firebasestorage.app",
  messagingSenderId: "455927878333",
  appId: "1:455927878333:web:a7eb711cb2fe9c5dda5dd4",
  measurementId: "G-RQ77Q4CGTL",
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  //   databaseURL: process.env.FIREBASE_DATABASE_URL,
  //   projectId: process.env.FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;
