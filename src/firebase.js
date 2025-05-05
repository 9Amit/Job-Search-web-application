// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcraJv1fjbfR1rniUH32w7frGSfqQ7JJ0",
  authDomain: "job-website-abbcc.firebaseapp.com",
  projectId: "job-website-abbcc",
  storageBucket: "job-website-abbcc.firebasestorage.app",
  messagingSenderId: "690449655106",
  appId: "1:690449655106:web:16732460d78ab04b55d4db",
  measurementId: "G-TMCJBW176P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
