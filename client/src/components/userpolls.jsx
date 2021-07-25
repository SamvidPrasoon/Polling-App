import React,{useContext,useEffect} from 'react';
import PollContext from '../pollcontext/pollcontext'
import AuthContext from '../authcontext/authcontext'
import Moment from 'react-moment';
const Userpolls = ({setChange}) => {
    const pollcontext = useContext(PollContext)
    const {pollstate,getuserpolls,poll} = pollcontext
    console.log(pollstate)
    const authcontext = useContext(AuthContext)
  const {authstate} = authcontext
  console.log(authstate)
    useEffect(()=>{
       getuserpolls(authstate.user._id)
    },[])

    const info =(id)=>{
      poll(id)
     if(pollstate.singlepoll){
         setChange('charts')
     }
}
    return (
        <center>
        <div style={{width:"250px"}} class="card text-center rounded-pill">
        <div class=" rounded card-header text-primary bg-dark rounded-pill">
          <h2>POLLS</h2>
        </div>
        <div class="card-body">
          <h5 class="card-title display-2 text-dark rounded-pill  ">{pollstate.userpolls && pollstate.userpolls.length}</h5>
          <p class="card-text"></p>
          
        </div>
       
      </div>
          <table class="table table-dark table-hover mt-3 rounded">
        <thead>
            <tr>
            <th scope="col">Question</th>
            <th scope="col"> Total Votes</th>
            <th scope="col">Created At</th>
            
            </tr>
        </thead>
        <tbody>
               {pollstate.userpolls.map((poll)=>(
                       <tr>
                       <th scope="row">{poll.question}</th>
                     
                       <td>{poll.voted && poll.voted.length}</td>
                       

                       <td><Moment format="YYYY/MM/DD">{poll.created}</Moment></td>
                       <td>
                         <button onClick={()=>{info(poll._id)}} class="btn btn-primary">View</button>
                       </td>
                       
                     </tr>
               ))}
                      
        
   
    </tbody>
         </table>
      </center>

            
      );
}
 
export default Userpolls;