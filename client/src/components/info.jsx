import React,{useContext,useState} from 'react';
import PollContext from '../pollcontext/pollcontext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Info = ({setChange}) => {
    const pollcontext = useContext(PollContext)
    const {pollstate,vote,poll} = pollcontext
    console.log(pollstate)
    const [answer,setAnswer] = useState("")
    console.log(answer)
    const MySwal = withReactContent(Swal)
  
     const answers = {}
     answers.answer = answer
    const onSubmit = (e)=>{
        e.preventDefault();
        
           vote(answers,pollstate.singlepoll._id)
        
            MySwal.fire({
                title:<p>Thankyou for voting </p>,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer:1000,
                timerProgressBar: true,
                icon: 'success',
            })
           
            setChange("all")
    
       
       
         
       
      }
    return ( 
       
        <div className="animate__animated animate__fadeInDownBig ms-5 ">
             
              <h1 className="text-primary mt-5"><span className="text-danger">Questions :</span> {pollstate.singlepoll.question}?</h1> 
              <h3 className="text-warning">Vote Count  {pollstate.singlepoll.voted ===undefined ? (<h3>0</h3>):(<h3>{pollstate.singlepoll.voted.length}</h3>)}</h3>
              
             
              
            <form onSubmit={(e)=>onSubmit(e)}  className="ms-5">  
            <h1><span className="text-danger">Options:</span></h1>
                {pollstate.singlepoll.options && pollstate.singlepoll.options.map((opt)=>(
                    <React.Fragment key={opt._id}>
                         <input style={{fontSize:"20px"}} class="form-check-input mt-2 " type="radio" name="option" id={opt._id} value={opt.option} onChange={e=>setAnswer(e.target.value)}/>
                         <label class="form-check-label text-info ms-2" for="flexRadioDefault1">
                            <h3>{opt.option}</h3>
                         </label><br/>
                         </React.Fragment>
                ))} 
                <button className="btn btn-light mt-2 w-25">Submit</button>
       
        </form>    
     
        </div>
      
     );
}
 
export default Info;
