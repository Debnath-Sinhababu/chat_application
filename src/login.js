 import { Avatar } from '@material-ui/core'
 import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";
import {provider} from './firebase.js'
import auth from './firebase.js';
import './login.css'
 import {Navigate, useNavigate} from 'react-router-dom'
 import {useContext, useState,useEffect} from 'react'
 import { doc, setDoc,getDoc } from "firebase/firestore"; 
import {Senduser} from'./checklogin'
import {db} from './firebase'
let Login=()=>{
 let navigate=useNavigate();
 let [user,setuser]=useState('');
 let data=useContext(Senduser)
useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
       
        setuser(uid)
        console.log(1)
        // ...
      } else {
        // User is signed out
        // ...
      
        console.log('hello')
      }
    });
    
 },[])

    function signin(){
      
        signInWithPopup(auth, provider)
          .then( async(result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const docRef = doc(db, "user", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              console.log('heuuii')
            } else {
              // doc.data() will be undefined in this case
               console.log(user)
              await setDoc(doc(db, "user", user.uid), {
                name: user.displayName,
                email:user.email,
                imageurl:user.photoURL
              })
            }
            
              navigate('/chat')

           
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
           
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          })
 }
  console.log(user)
    return (
      <>
      {
      user!=''? <Navigate to='/chat'/>:
      
<div class="wrapper fadeInDown">
  
    
  
  <div id="formContent">
   
    <div class="fadeIn first">
      <h3> Log In </h3>
       </div>

    
   

   
    <div id="formFooter">
    <div class="google-btn">
  <div class="google-icon-wrapper">
    <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
  </div>
  <p class="btn-text" onClick={signin} style={{cursor:'pointer'}} ><b>Sign in with google</b></p>
</div>  </div>

  </div>

</div>
      }
      </>
)
}
export default Login
