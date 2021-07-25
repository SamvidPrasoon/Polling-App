import React,{useState,useEffect,useContext} from 'react';
import Log from './log.png'
import setAuthToken from '../utils/setAuthToken'
import AuthContext from '../authcontext/authcontext'
import Swal from 'sweetalert2'
import {Link,Redirect} from 'react-router-dom'
import withReactContent from 'sweetalert2-react-content'

const Login2 = () => {

    const authcontext = useContext(AuthContext);
    const {login,authstate,loaduser} = authcontext;
    const [formdata,setformdata] = useState({
      email:'',
      password:''
  
  
  })
  const {email,password} = formdata;
  console.log(authstate);
  const MySwal = withReactContent(Swal)
  useEffect(()=>{
    console.log(localStorage.token);
     if(localStorage.token)
     {
        setAuthToken(localStorage.token)
        loaduser();
     }
  
  },[authstate.token])// eslint-disable-line react-hooks/exhaustive-deps
  
  const onSubmit = (e)=>{
              
    e.preventDefault();
  
  
  
        login({email,password});
    
  }
  
  if(authstate.isAuthenticated)
  {
    MySwal.fire({
      title:<p>Logged in Successfully</p>,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer:1000,
      timerProgressBar: true,
      icon: 'success',
  })
    return <Redirect to='/main'/>
  }
  
  







    return ( 
 
            <div style={{height:"100vh",backgroundImage:`url(${Log})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}} className="container-fluid animate__animated animate__fadeInDownBig">
                <div className="row">
                      
                        <div className=" mt-5 rounded-pill" style={{height:"80vh"}}>
                          <center>
                        <form  onSubmit={e=>onSubmit(e)}  className=" mt-5 text-center    rounded   " >
                         <h1 style={{letterSpacing:"10px"}} className=" text-primary display-2"><b>LOGIN</b></h1>
  <div class="mb-3 ">
    <label style={{fontSize:"40px",color:"#a015f0"}} for="exampleInputEmail1" class="form-label text-light ">Email address</label>
     <center> <input placeholder="Enter Email" required type="email" class="form-control w-50 " id="exampleInputEmail1" aria-describedby="emailHelp" value={formdata.email} onChange={e=>setformdata({...formdata,email:e.target.value})}/></center>
  
    <div  id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label style={{fontSize:"40px",color:"#a015f0"}} for="exampleInputPassword1" class="form-label text-light">Password</label>
     <center> <input placeholder="Password" required type="password" class="form-control w-50" id="exampleInputPassword1" value={formdata.password} onChange={e=>setformdata({...formdata,password:e.target.value})} />
     </center> 
  </div>

  <button type="submit" class="btn btn-dark btn-lg w-25 color-change-2x">Login</button>
  <br />
    <p className="text-light">Not Registered ? <Link style={{textDecoration:"none"}} to="/register"> Register  </Link> </p>
</form> 
</center>
                                
                        </div>
                </div>

            </div>
         


     );
}
 
export default Login2;