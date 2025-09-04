// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 🔥 YAHAN APNA REAL CONFIG PASTE KAREIN (jo aapne copy kiya)
const firebaseConfig = {
    apiKey: "AIzaSyB4zR-J-aL_DCYDulHy8Azy2j89bPGZGkg",
    authDomain: "budgetmein-ece88.firebaseapp.com",
    projectId: "budgetmein-ece88",
    storageBucket: "budgetmein-ece88.firebasestorage.app",
    messagingSenderId: "788387168557",
    appId: "1:788387168557:web:3365ba769132bc241453a4",
    measurementId: "G-DL2PEXV82R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signInWithPhone = async (phoneNumber, appVerifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return confirmationResult;
  } catch (error) {
    throw error;
  }
};

export default app;