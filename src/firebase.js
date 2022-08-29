// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDq79cN2G15Cq6gGA72IENf3pMGvbnDKQ",
  authDomain: "whatsapp-clone-41685.firebaseapp.com",
  projectId: "whatsapp-clone-41685",
  storageBucket: "whatsapp-clone-41685.appspot.com",
  messagingSenderId: "865520399674",
  appId: "1:865520399674:web:321818479c7358822ccc03",
  measurementId: "G-RQDRG1Y6KH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);
export {provider};
export default auth;
export {db}