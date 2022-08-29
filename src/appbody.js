import Sidebar from './sidebar'
import Chat from './chat'
import auth from './firebase';
import {Navigate, useNavigate} from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import {useState,useEffect} from 'react'

let Appbody=()=>{
    let [render,updaterender]=useState({
      usermessage:'',
      messagetouser:''
    })
    console.log(render)
    let navigate=useNavigate()
    useEffect(()=>{  
      const handleTabClose = event => {
       event.preventDefault()
       let pageReloaded = window.performance
                 .getEntriesByType('navigation')
                 .map((nav) => (nav.type))
                 .includes('reload');

                 console.log(pageReloaded)
              
        console.log('beforeunload event triggered');
  
        return (event.returnValue = 'Are you sure you want to exit?');
      };
  
      document.addEventListener('beforeunload', handleTabClose);
  
      // return () => {
      //   window.removeEventListener('beforeunload', handleTabClose);
      // };
    })
    
  
   
          function clickchat(obj){
           
            updaterender(obj)
          }
    return(
        <div className="app">
       <div className="app_body">
        <Sidebar tempobj={render}/>
        <Chat clickchat={clickchat} />
       </div>
     </div>
    )
}
export default Appbody