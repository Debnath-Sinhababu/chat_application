 import {useEffect} from 'react'
 import {createContext,useState,Provider} from 'react'
 import { getAuth, onAuthStateChanged } from "firebase/auth";
 import {Navigate} from 'react-router-dom'
 import auth from './firebase'
 let Senduser=createContext();
let Checklogin=({children})=>{
   let [use,setuser]=useState(''); 
   
   useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setuser(user);
          
          console.log(1)
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
      
   },[])
   
 console.log(use)
   return(
    <Senduser.Provider value={use}>
       {
       
        children
       }
    </Senduser.Provider>
   )
}
export default Checklogin
export {Senduser}