import { Avatar, IconButton } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from 'react-router-dom'
import { doc, getDoc,setDoc,updateDoc } from "firebase/firestore";
import {useEffect,useState} from 'react'
import {db} from './firebase';
import SendIcon from '@material-ui/icons/Send';
import {useContext} from 'react'
import {Senduser} from'./checklogin'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './App.css'
import React  from 'react'
 import InputEmoji from 'react-input-emoji'
 import { getAuth, signOut } from "firebase/auth";
 import auth from './firebase';
 import Button from '@mui/material/Button';

 import { useNavigate } from "react-router-dom";
const {  Timestamp } = require('firebase/firestore');

let Chat=({clickchat})=>{
  let navigate=useNavigate()

  let [data,setdata]=useState({});
 let userid=useContext(Senduser)
  let {id}=useParams();
  console.log(id)
  
 let [usermessage,updateusermessage]=useState([]);
  let [messagetouser,setmessagetouser]=useState([])
  let [typemessage,updatetype]=useState('')
  let [flag,setflag]=useState()
  let [sortedarr,setsortedarr]=useState([])
  let [chosenEmoji, setChosenEmoji] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  let [text,setText]=useState('')
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 const options=[
  'profile',
  'account',
  'signout',
  
 ]
  const ITEM_HEIGHT = 48;
      useEffect(()=>{
        
        async function hello(){
          if(!id)
        return
          const docRef = doc(db, "user", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
           
            let chatdata=docSnap.data()
            setdata(chatdata)
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            // let arr=[];
            // arr.push(copytypemessage);
            
            // let obj={userid:userid.uid,content:arr,name:userid.displayName};
            // updatedmessage.push(obj)
             
            
          }
        }
        hello()
      },[id])
      useEffect(()=>{
        
        let usermessage;
        let receivermessage
        async function hello1(){
          if(!id)
        return
          const docRef = doc(db, "message", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            let data=docSnap.data()
            let totalmessage=data.message;
            usermessage=totalmessage.filter((obj)=>{
                 return obj.userid==userid.uid
           }) 
           console.log(usermessage)
          
          
            updateusermessage(usermessage)
           
           
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            updateusermessage([])
            setsortedarr([])
            let arr=[]
            await setDoc(doc(db, "message", id), {
              message:arr
            })
            
          }
        }
        hello1()
        async function hello2(){
          if(!id)
        return
          const docRef = doc(db, "message",userid.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            let data=docSnap.data()
            let totalmessage=data.message;
            receivermessage=totalmessage.filter((obj)=>{
                 return obj.userid==id
           }) 
          
          sortarr(usermessage,receivermessage)
          
            setmessagetouser(receivermessage)

          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
           setsortedarr([])
          }
        }
        hello2()

      },[id])
      function handleOnEnter (text) {
        console.log('enter', text)
        sendmessage()
      }
     
       function sendmessage(){
        let copytypemessage=text;
         function hello(){

       let message=[...usermessage];
       let count=0;
           if(message.length!=0){
            const t = Timestamp.fromDate(new Date());
            const d = t.toDate().toLocaleTimeString('en-US');
            const date2=t.toDate().toDateString('en-US');
            var date1=new Date(date2)
            let date=date1.getDate()
            let month=date1.getMonth()
           let year= date1.getFullYear()
            let textobj={
              val:copytypemessage,
              time:d,
              date:date,
              month:month,
              year:year
            }
          message[0].content.push(textobj);
          let arr=[...sortedarr]
          let obj={
            val:copytypemessage,
            time:d,
            tag:'send'
          }
          arr.push(obj)
          setsortedarr(arr)
          updateusermessage(message)
          
          
          
           }
       
          if(message.length==0){
            let arr=[];
            const t = Timestamp.fromDate(new Date());
            const d = t.toDate().toLocaleTimeString('en-US');
            const date2=t.toDate().toDateString('en-US');
            var date1=new Date(date2)
            let date=date1.getDate()
            let month=date1.getMonth()
           let year= date1.getFullYear()
            let textobj={
              val:copytypemessage,
              time:d,
              date:date,
              month:month,
              year:year
            }
            arr.push(textobj)
            
            let obj={
              userid:userid.uid,
              content:arr,
              name:userid.displayName,
           
            }
           message=[...message,obj];
           updateusermessage(message)
           let arr1=[...sortedarr]
           let obj1={
             val:copytypemessage,
             time:d,
             tag:'send'
           }
           arr1.push(obj1)
           setsortedarr(arr1)
          }
        
       
        //  updateusermessage(content)
        (async ()=>{
          const washingtonRef = doc(db, "message", id);

        // Set the "capital" field of the city 'DC'

        await updateDoc(washingtonRef, {
            message: message
        });
        clickchat({
          usermessage,
          messagetouser
        })
      
        })()
      }
        
        hello()
        
        updatetype('')
      }
   function sortarr(usermessage,messagetouser){
    console.log(usermessage,messagetouser)
    let arr=[];
    if(usermessage.length==0 && messagetouser.length==0){
      setsortedarr([])
      return
    }
    else if(usermessage.length==0){
      let receiverarr=messagetouser[0].content
      let j=0;
      while(j!=receiverarr.length){
        let obj={
          val:receiverarr[j].val,
          time:receiverarr[j].time,
          tag:'receive'
        }
        arr.push(obj)
        j++;
        
       }
      setsortedarr(arr)
      return
    }
    else if(messagetouser.length==0){
      let i=0
      let senderarr=usermessage[0].content;
      while(i!=senderarr.length){
        let obj={
          val:senderarr[i].val,
          time:senderarr[i].time,
          tag:'send'
        }
        arr.push(obj)
        i++;
       }
       setsortedarr(arr)
       return
    }
     let senderarr=usermessage[0].content;
     let receiverarr=messagetouser[0].content
    
     let i=0
     let j=0
     while(i!=senderarr.length && j!=receiverarr.length){
        if(senderarr[i].year>receiverarr[j].year){
          let obj={
            val:receiverarr[j].val,
            time:receiverarr[j].time,
            tag:'receive'
          }
          arr.push(obj)
          j++;
          
        }
      else if(senderarr[i].year<receiverarr[j].year){
          let obj={
            val:senderarr[i].val,
            time:senderarr[i].time,
            tag:'send'
          }
          arr.push(obj)
          i++;
          
        }
       else if(senderarr[i].month>receiverarr[j].month){
          let obj={
            val:receiverarr[j].val,
            time:receiverarr[j].time,
            tag:'receive'
          }
          arr.push(obj)
          j++;
          
        }
        else if(senderarr[i].month<receiverarr[j].month){
          let obj={
            val:senderarr[i].val,
            time:senderarr[i].time,
            tag:'send'
          }
          arr.push(obj)
          i++;
          
        }
        else if(senderarr[i].date>receiverarr[j].date){
          let obj={
            val:receiverarr[j].val,
            time:receiverarr[j].time,
            tag:'receive'
          }
          arr.push(obj)
          j++;
          
        }
        else if(senderarr[i].date<receiverarr[j].date){
          let obj={
            val:senderarr[i].val,
            time:senderarr[i].time,
            tag:'send'
          }
          arr.push(obj)
          i++;
          
        }
        else if(senderarr[i].time>receiverarr[j].time){
          let obj={
            val:receiverarr[j].val,
            time:receiverarr[j].time,
            tag:'receive'
          }
          arr.push(obj)
          j++;
          
        }
        else{
          let obj={
            val:senderarr[i].val,
            time:senderarr[i].time,
            tag:'send'
          }
          arr.push(obj)
          i++;
          
        }
     }
   
     while(i!=senderarr.length){
      let obj={
        val:senderarr[i].val,
        time:senderarr[i].time,
        tag:'send'
      }
      arr.push(obj)
      i++;
     }
     while(j!=receiverarr.length){
      let obj={
        val:receiverarr[j].val,
        time:receiverarr[j].time,
        tag:'receive'
      }
      arr.push(obj)
      j++;
      
     }
     setsortedarr(arr)
   }
   function signout(){
   
    signOut(auth).then(() => {
      // Sign-out successful.
        navigate('/')
    }).catch((error) => {
      // An error happened.
    });
    
      }
  console.log(typemessage)
    return(
      <>
       {
        !id?'':
       
        <div className="chat" 
        >
        <div className="chat_header">
        
      
        
            <Avatar src={data.imageurl}/>
            <div className="chat_headerinfo">
               <p style={{fontWeight:'bold',fontSize:'15px'}}>{data.name}</p>
              
            </div>
            <div className="header_right">

                <IconButton style={{border:0,outline:0}}>
                    <SearchIcon/>
                </IconButton>
                <IconButton style={{border:0,outline:0}}>
                <AttachFileIcon/>
                </IconButton>
                
       <IconButton style={{border:0,outline:0}}
       aria-label="more"
       id="long-button"
       aria-controls={open ? 'long-menu' : undefined}
       aria-expanded={open ? 'true' : undefined}
       aria-haspopup="true"
       onClick={handleClick}
                >
                    <MoreVertIcon 
            />
                </IconButton>
      
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            
          },
        }}

      >
        {options.map((option) => (
          <div style={{display:'flex',flexDirection:'column'}}>
          {
            
            option=='signout'?<MenuItem key={option} selected onClick={signout}>
            {option}
          </MenuItem>:<MenuItem key={option}  onClick={handleClose}>
          {option}
        </MenuItem>
          }
          </div>
        ))}
      </Menu>
                
            </div>
        </div>
        <div className="chat_body" onClick={()=>{
          let element=document.querySelector('.popup');
          let a=  getComputedStyle(element).getPropertyValue('display');
          if(a!='none'){
            element.style.display='none'
          }
         
        }}>
          {
            
             
                sortedarr.map((subobj)=>{
                  return(
                    <div>
                  { 
                    subobj.tag=='receive'? 
                    <div>
                    <p className="chatmessage">
                    <span className="chat_name">
                      {messagetouser[0].name}
                    </span>
                  <span style={{wordBreak:'break-word'}}> {subobj.val} </span>
                    <span className="chat_time" style={{marginLeft:8,fontSize:12}}>
                    {subobj.time}
                    </span>
                    
                </p>
                </div>
                :<div style={{wordBreak:'break-word'}}>
                    <p className="chatmessage chat_receiver">
                  <span className="chat_name">
                    You
                  </span>
                  {subobj.val}
                  <span className="chat_time" style={{marginLeft:8,fontSize:12}}>
                  {subobj.time}
                  </span>
                  
              </p>
              </div>
                
                  }
                  </div>
                  )
                 
})
              
             
            
          }
           
            
            {/* {
              usermessage.map((obj)=>{
                 return(
                  obj.content.map((subobj)=>(
                    <div>
                    <p className="chatmessage chat_receiver">
                  <span className="chat_name">
                    You
                  </span>
                  {subobj.val}
                  <span className="chat_time" style={{marginLeft:8,fontSize:12}}>
                  {subobj.time}
                  </span>
                  
              </p>
              </div>
                  ))
                 
                 )
              })
            } */}
            
        </div>
        <div className="chat_footer">
          
            {/* <IconButton>
            <EmojiEmotionsIcon/>
            </IconButton> */}
            
           <InputEmoji
            value={text}
            onChange={setText}
             cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
          style={{border:0,outline:0}}
           />
          
         
         <IconButton style={{border:0,outline:0}}>
            <AttachFileIcon />
            </IconButton>
          

          
           
           
         
            
            {/* <form> */}
                {/* <input type="text" name="" id="" placeholder="type your message" value={typemessage} onChange={(e)=>{
                    updatetype(e.target.value);
                    
                }} /> */}
             
            {/* </form> */}

            <IconButton style={{border:0,outline:0}}>
            <MicIcon/>
            </IconButton>
        </div>
        </div>
              }
              </>
    )
}
export default Chat