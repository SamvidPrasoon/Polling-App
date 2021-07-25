import React,{useContext} from 'react';

import AuthContext from '../authcontext/authcontext'
import {Redirect,Link} from 'react-router-dom'

const Nav = ({change,setChange}) => {
  const authcontext = useContext(AuthContext)
  const {authstate,logout} = authcontext
  console.log(authstate)
  if(!authstate.isAuthenticated)
  {
     return <Redirect to='/login'/>
  }
    return ( 
    
            <div className=" bg-dark d-flex  flex-sm-column flex-row flex-nowrap align-items-center sticky-top  mt-3  rounded-pill">
                <Link to="/" class="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                <i style={{fontSize:"60px"}} class="fab fa-pushed text-danger "></i>
                </Link>
                <center>
                <ul  class="  nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                    <li  class="nav-item zoom  me-2">
                        <Link onClick={()=>setChange('all')}    class="nav-link py-3 px-2" title="ALL POLLS" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                            <i class="bi-house fs-1 text-light"></i>
                        </Link>
                    </li>
                    <li className="me-2">
                        <Link onClick={()=>setChange('add')} class=" zoom  nav-link py-3 px-2" title="Add poll" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Orders">
                        <i class="bi bi-plus-square-dotted text-light fs-1"></i>
                        </Link>
                    </li>
                
                    <li className="me-2">
                        <Link onClick={()=>setChange('user')} class=" zoom  nav-link py-3 px-2" title="Your Polls" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Orders">
                            <i class="bi-table fs-1 text-light"></i>
                        </Link>
                    </li>
             
                 
   
                    <li className="me-2 zoom ">
                        <Link onClick={logout} class="nav-link py-3 px-2 " title="Logout" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Customers">
                    <i class=" bi bi-door-closed fs-1 text-light "></i>
                    </Link>
                    </li>
                   

                   
                </ul>
                </center>
            
            </div>
     
     );
}
 
export default Nav;