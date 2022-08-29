import {Avatar, IconButton} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Sidebarchat from './sidebarchat';
import { getAuth, signOut } from "firebase/auth";
import auth from './firebase'; 
import {Navigate, useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import { collection, getDocs } from "firebase/firestore";
import {db} from './firebase';
import {useContext} from 'react'
import {Senduser} from'./checklogin'


//  import {Avatar} from '@mui/icons-material'
function Sidebar({tempobj}){
  let user=useContext(Senduser);
  let [state,setstate]=useState('')
  
  let [arr,updatearr]=useState([])
  console.log(1,'sidebar')
  useEffect(()=>{
    async function hello(){
      
      const querySnapshot = await getDocs(collection(db, "user"));
      let temparr=[]
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        
      
        let d=doc.data();
        let obj={id:doc.id,data:d}
        temparr.push(obj)
          
      });
      let modifyarr=temparr.filter((x)=>{
               return x.id!=user.uid
      })
      updatearr(modifyarr)
    }
      
   hello()
    
    
  },[])
   console.log(user.photoURL)
    return(
      
        <div className="sidebar">
         <div className="sidebar_header">
         <Avatar className='avatar' src={user.photoURL}/>
          <div className='sidebar_headerright'>
            <IconButton style={{border:0,outline:0}}>
          <DonutLargeIcon/>
          </IconButton>
          <IconButton style={{border:0,outline:0}}>
               <ChatIcon/>
               </IconButton>
               <IconButton style={{border:0,outline:0}}>
               <MoreVertIcon/>
               </IconButton>
          </div>
          
         </div>
         
         <div className="sidebar_search">
            <div className='sidebar_searchContainer'>
            <SearchIcon style={{border:0,outline:0}}/>
            <input type="text" name="" id=""  />
            </div>
          </div>
          <div className='sidebar_chats'>
            {
              arr.map((obj)=>{
               return(
                <Sidebarchat value={obj} tempobj={tempobj}/>
               )
              })
            }
          
            
            
          </div>
        </div>
    
    
    )
}
export default Sidebar