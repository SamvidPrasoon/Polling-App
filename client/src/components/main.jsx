import React,{useContext,useState} from 'react';
import Nav from './nav';
import All from './allpolls';
import Add from './addpoll'
import circle from './log.png'
import Userpolls from './userpolls'
import Info from './info'
import Chart from './charts'
import AuthContext from '../authcontext/authcontext'
import {Redirect,Link} from 'react-router-dom'

const Main = () => {
  const [change,setChange] = useState('all')
  const authcontext = useContext(AuthContext)
  const {authstate,logout} = authcontext
  console.log(authstate)
  if(!authstate.isAuthenticated)
  {
     return <Redirect to='/login'/>
  }

    const getcomp = ()=>{
            if(change==='add'){
              return <Add change={change} setChange={setChange}/>
            }else if(change==='all'){
              return  <All change={change} setChange={setChange}/>
            }
            else if(change==='user'){
              return  <Userpolls change={change} setChange={setChange}/>
            }
            else if(change==='info'){
              return <Info change={change} setChange={setChange}/>
            }else if(change==='charts'){
              return <Chart change={change} setChange={setChange}/>
            }
    }



    return (
      
        <React.Fragment>
                 
        
         <div style={{backgroundImage:`url(${circle})`,backgroundSize:"cover",backgroundPosition:"50% 50%",backgroundAttachment:"fixed"}}  class="container-fluid bg-light">
         
    <div class="row">
        <div class="col-sm-auto  rounded-pill sticky-top ">
           <Nav change={change} setChange={setChange}/>



        </div>
              <div  class="col-sm p-3 min-vh-100 ">
                <center>
             <i class="fab fa-pushed fs-1 text-danger"></i>
                 <span className="text-light" style={{fontSize:"30px"}}>Welcome {authstate.user && authstate.user.name}</span> 
          
                </center>
               
                    {getcomp()}
                   
                  </div>
      
    </div>
    </div>
        </React.Fragment>
         
     
      );
}
 
export default Main;