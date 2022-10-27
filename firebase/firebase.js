// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9LZ9YyUiDWOSoyc6WyvySktIAMghiIPU",
  authDomain: "fir-console-test-6afef.firebaseapp.com",
  projectId: "fir-console-test-6afef",
  storageBucket: "fir-console-test-6afef.appspot.com",
  messagingSenderId: "356489527214",
  appId: "1:356489527214:web:cd666c0958ec8ffe1d523f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { db };
