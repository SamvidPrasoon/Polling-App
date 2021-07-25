import React from 'react';
import { Link } from 'react-router-dom';
import land from './circle.png'

const Landing2 = () => {
   
 
    return (  
         
       <div className="container-fluid  bounce-in-top " style={{height:"100vh",backgroundImage:`url(${land})`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",position:"relative"}}>
      
    
              <div style={{position:"absolute", top:"50%",left:"50%",transform:"translate(-50%, -50%)"}}  ><h1 style={{fontSize:"77px"}}  className="   display-1  text-light ">POLLMATE</h1>  
              <br />
               <center>
              <Link to="/login" style={{fontSize:"30px"}} className="btn btn-outline-primary ">LOGIN</Link>
              <Link to='/register' style={{fontSize:"30px"}} className="btn btn-outline-success ms-2 ">REGISTER</Link> 
              </center>
              </div>
             
             
               
              
            


       </div>


    );
}
 
export default Landing2;