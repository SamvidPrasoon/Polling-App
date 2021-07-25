import React,{useState,useEffect,useContext} from 'react';
import AuthContext from '../authcontext/authcontext'
import {Redirect} from 'react-router-dom'
import setAuthToken from '../utils/setAuthToken'
import Log from './log.png'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Register = () => {
  const MySwal = withReactContent(Swal)
  const authcontext = useContext(AuthContext)
  const{register,authstate,loaduser} = authcontext

    const [formdata,setformdata] = useState({
           name:"",
           email:"",
           password:"",

    })
    const {name,email,password} = formdata
    const onSubmit = (e)=>{
       
      e.preventDefault();
      register({name ,email,password});
     
     
      
  }  
    useEffect(()=>{
      console.log(localStorage.token);
       if(localStorage.token)
       {
           setAuthToken(localStorage.token)
           loaduser();
       }
   
      
   },[authstate.token])// eslint-disable-line react-hooks/exhaustive-deps
     if(authstate.isAuthenticated)
     {
      MySwal.fire({
        title:<p>Registered Successfully</p>,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer:1000,
        timerProgressBar: true,
        icon: 'success',
    })
       return <Redirect to="/main"/>
     }
    





    return ( 
      <React.Fragment>
     
    
       <center>
            <form  onSubmit={e=>onSubmit(e)} style={{backgroundImage:`url(${Log})`, height:"100vh",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}} className="    animate__animated animate__fadeInDownBig container-fluid text-center  rounded " >
                <h1 style={{letterSpacing:"10px"}} className="text-primary display-3 "><b>REGISTER</b></h1>
                <div class="mb-3">
<label style={{fontSize:"40px"}} for="exampleInputEmail1" class="form-label text-light ">Name</label>
<center>  <input placeholder="Enter Name" required  type="text" class="form-control w-50" id="exampleInputEmail1" aria-describedby="emailHelp" value={formdata.name} onChange={(e=>setformdata({...formdata,name:e.target.value}))}/></center>


</div>
<div class="mb-3">
<label style={{fontSize:"40px"}} for="exampleInputEmail1" class="form-label text-light ">Email address</label>
<center>  <input placeholder="Enter Email" required type="email" class="form-control w-50 " id="exampleInputEmail1" aria-describedby="emailHelp"  value={formdata.email} onChange={e=>setformdata({...formdata,email:e.target.value})}/></center>

<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
</div>
<div class="mb-3">
<label style={{fontSize:"40px"}} for="exampleInputPassword1" class="form-label text-light ">Password</label>
<center>    <input required type="password" class="form-control w-50 " id="exampleInputPassword1" placeholder="please enter  password "  value={formdata.password} onChange={e=>setformdata({...formdata,password:e.target.value})}/></center>
<div id="emailHelp" class="form-text">Please enter a password with 6 or more characters</div>
</div>

<button type="submit" class="btn btn-light btn-lg color-change-2x w-25 p-2">Register</button>
<br />
<p className="text-light"> Registered ? <Link style={{textDecoration:"none"}} to="/login"> Login  </Link> </p>
</form> 
</center>


</React.Fragment>

 
     );
}
 
export default Register;