import { Avatar } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import './App.css';
import {Senduser} from'./checklogin';
import {useContext, useState,useEffect} from 'react'
import { doc, setDoc,getDoc } from "firebase/firestore"; 
import {db} from './firebase'
import { query, orderBy, limit } from "firebase/firestore";  
function Sidebarchat({value,tempobj}){
  console.log(tempobj)
   let navigate=useNavigate();
    let apidata=useContext(Senduser);
  let {id,data}=value
  let [lastmessageofuser,setlastmessageofuser]=useState('')
  let [lastmessagetouser,setlastmessagetouser]=useState('')
  let [findlarge,setfindlarge]=useState('')
  
  //  useEffect(()=>{
  //      db.collection("message").doc(id).orderBy("time")
  //  },[])
  
   useEffect(()=>{
    
    async function hello1(){
      
      const docRef = doc(db, "message", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let data=docSnap.data()
        let totalmessage=data.message;
       let usermessage=totalmessage.filter((obj)=>{
             return obj.userid==apidata.uid
       }) 
       console.log(usermessage)
       if(usermessage.length==0)
       return
      let messagearr=usermessage[0].content;
      let clonelastmessage=messagearr[messagearr.length-1];
      console.log(clonelastmessage)
       setlastmessageofuser(clonelastmessage)
       
      
       
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
       
        
      }
    }
   
  hello1()
  async function hello2(){
    const docRef = doc(db, "message",apidata.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data=docSnap.data()
      let totalmessage=data.message;
     let usermessage=totalmessage.filter((obj)=>{
           return obj.userid==id
     }) 
     if(usermessage.length==0)
       return
      let messagearr=usermessage[0].content;
      let clonelastmessage=messagearr[messagearr.length-1];
      console.log(clonelastmessage)
    setlastmessagetouser(clonelastmessage)
    
      
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
     
    }
  }
  hello2();

   },[tempobj.usermessage,tempobj.messagetouser])

  
   
 
   
   
    return(
        <div className="sidebar__chat" onClick={()=>{
         
           navigate(`/room/${id}`)
        }}>
          <Avatar className='avatar' src={data.imageurl}/>
          
         
          <div className="sidebar__chatinfo">
          <h3>{data.name}</h3>
          <div style={{'wordBreak':'break-all'}}>
          { 
            (lastmessageofuser || lastmessagetouser)?
            lastmessageofuser==''?lastmessagetouser.val:lastmessagetouser==''?lastmessageofuser.val:
           lastmessageofuser.year>lastmessagetouser.year? <p>{lastmessageofuser.val}</p>:
           lastmessageofuser.year<lastmessagetouser.year?
           <p>{lastmessagetouser.val}</p>:lastmessageofuser.month>lastmessagetouser.month? <p>{lastmessageofuser.val}</p>:
           lastmessageofuser.month<lastmessagetouser.month? <p>{lastmessagetouser.val}</p>:lastmessageofuser.date>lastmessagetouser.date? <p>{lastmessageofuser.val}</p>:
           lastmessageofuser.date<lastmessagetouser.date? <p>{lastmessagetouser.val}</p>:lastmessageofuser.time>lastmessagetouser.time? <p>{lastmessageofuser.val}</p>:
          <p>{lastmessagetouser.val}</p>:''
      
      
          }
          </div>
          </div>
        </div>
    )
}
export default Sidebarchat