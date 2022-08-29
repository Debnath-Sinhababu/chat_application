
import './App.css';
import Appbody from './appbody';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './login'
import Checklogin from './checklogin';
import {useContext} from 'react'
import {Senduser} from'./checklogin'
import Chat from './chat';
import Sidebar from './sidebar';

function App() {
  return (
    <Checklogin>
    <Routes>
      <Route exac path='/' element={
      
      <Login/>
    
      
      }>
       
      </Route>
      {/* <Route exac path='/sidebar' element={
      
      <Provider>
      <Sidebar/>
    </Provider>
    
      
      }>
       
      </Route> */}
      <Route exact path='/chat'
       element={
        <Provider>
       <Appbody/>
     </Provider>
     }
      />
      <Route exact path="/room/:id" element={
             <Provider>
             <Appbody/>
           </Provider>
      }
      />
    <Route path="*" element={
      <Login/>
    }
     />
    
    </Routes>
    </Checklogin>
  );
}

export default App;
function Provider({children}){
  let user=useContext(Senduser);
  console.log(user)
  return(
    <div>
      {
        user==''?<Navigate exact to="/"/>:children
      }
    </div>
  )
}

  