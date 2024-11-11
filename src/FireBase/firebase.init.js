// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB27yIFEFmzomR0t_JueGpxIewlswW57B8",
  authDomain: "fir-project1-c060b.firebaseapp.com",
  projectId: "fir-project1-c060b",
  storageBucket: "fir-project1-c060b.firebasestorage.app",
  messagingSenderId: "455927878333",
  appId: "1:455927878333:web:a7eb711cb2fe9c5dda5dd4",
  measurementId: "G-RQ77Q4CGTL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
