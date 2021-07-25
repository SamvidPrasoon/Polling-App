import React,{useState,useContext} from 'react';
import PollContext from '../pollcontext/pollcontext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Add = ({setChange}) => {
    const pollcontext = useContext(PollContext)
    const {pollstate,addpoll} = pollcontext
     console.log(pollstate)
     const MySwal = withReactContent(Swal)
   
    const [question,setQuestion] = useState("")
   const [options,setOptions] = useState([""])
   console.log(question)
   console.log(options)

     const formdata = {};
     formdata.question = question
     formdata.options = options


      const onSubmit = (e)=>{
        e.preventDefault();
        addpoll(formdata)
        if(pollstate.addedpoll!==null)
        {
          MySwal.fire({
            title:<p>Poll Added</p>,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer:1000,
            timerProgressBar: true,
            icon: 'success',
        })
         setChange("all")
        }
       
      }

     const handleAnswer=(e, index)=> {
        const optionss = [...options];
        optionss[index] = e.target.value;
        setOptions( optionss );
      }
    
      const addanswer =()=>{
        setOptions([...options, ''] );
      }
      const deleteanswer =()=>{
        const optionss = [...options];
        optionss.pop()
        setOptions( optionss );
      }



      const optionfield = options.map((option, i) => (
        <React.Fragment key={i}>
          <label className="form-label text-light">Option{i+1}</label>
          <input
            className="form-control w-50"
            type="text"
            value={option}
            key={i}
            placeholder="Enter Option"
            onChange={e => handleAnswer(e, i)}
          />
        </React.Fragment>
      ));
    return ( 
        <center>
        <form onSubmit={(e)=>onSubmit(e)}  className="  animate__animated animate__fadeInDownBig mt-5 container   rounded position-absolute ">
            <div class="mb-3">
          <label style={{fontSize:"40px",color:"#a015f0"}} for="exampleInputEmail1" class="form-label">ADD POLL</label>
          <center>
          <input type="text" placeholder="Enter Title" class="form-control w-50" id="exampleInputEmail1" aria-describedby="emailHelp" value={question} onChange={e=>setQuestion(e.target.value)}/>
          </center>
        </div> 
        <div className="container">{optionfield}</div>
        <div className="buttons_center m-3">
          <button className="btn btn-primary" type="button" onClick={addanswer}>
            Add options
          </button>
          <button className="btn btn-danger ms-3" type="button" onClick={deleteanswer}>
            delete options
          </button>
          <br/>
          <button className="btn btn-info mt-2" type="submit">
            Submit
          </button>
          </div>
                 
            
        </form>
        </center>


     );
}
 
export default Add;