// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEkA4tqMfFISkVTGOJWmfIPkrAbvdhxnc",
  authDomain: "pantry-tracker-5720b.firebaseapp.com",
  projectId: "pantry-tracker-5720b",
  storageBucket: "pantry-tracker-5720b.appspot.com",
  messagingSenderId: "672493421770",
  appId: "1:672493421770:web:28591c57db50c1525b6033",
  measurementId: "G-HL5V90EMXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export{firestore};