import React,{useContext,useEffect} from 'react';
import { Link } from 'react-router-dom';
import PollContext from '../pollcontext/pollcontext'
const All = ({change,setChange}) => {
    const pollcontext = useContext(PollContext)
    const {pollstate,allpoll,poll} = pollcontext
    console.log(pollstate)
    useEffect(()=>{
         allpoll()
    },[pollstate.vote])
    pollstate.vote = {}
    const info =(id)=>{
             poll(id)
            if(pollstate.singlepoll){
                setChange('info')
            }
    }
    return (
        <div class="row m-2 ">
            
            {pollstate.poll.map((poll)=>(
                <div  class="col-lg-6 zoom col-md-12 col-sm-12 w-90 container mt-2  ">
                <div style={{height:"220px"}} class="card rounded-pill"  >
     <div class="card-body text-center rounded-pill bg-dark">
       <h2 class="card-title text-danger">{poll.question}</h2>
       <p style={{fontSize:"20px"}} class="card-text rounded-pill badge bg-primary"> Live Vote Count {poll.voted && poll.voted.length}</p>
        <br/>
       <Link onClick={()=>{info(poll._id)}} class="btn btn-info btn-lg">view</Link>
     </div>
   </div>
   
                </div>
            ))}
             
        </div>     
            
      );
}
 
export default All;