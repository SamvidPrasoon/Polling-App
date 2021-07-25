import React,{useReducer} from 'react';
import PollReducer from './pollreducer'
import PollContext from './pollcontext'
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'

import {
 ADD_POLLS,
 ALL_POLLS,
 POLL,
 DELETE_POLL,
 USER_POLLS,
 CLEAR_POLL,
 VOTE_POLL

} from '../types'



const PollState = props =>{

    const initialstate = {
        poll : [],
        addedpoll:{},
        singlepoll:{},
        userpolls:[],
        vote:{}
        

        

    }

    const [state,dispatch] = useReducer(PollReducer,initialstate)


    //add poll
    const addpoll = async(formdata)=>{
        const config = {
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": true,
                
            }    
        };
        try {
            const res = await axios.post('http://localhost:5000/api/poll/',formdata,config)
           
           dispatch({
               type:ADD_POLLS,
               payload:res.data
           })
           
        } catch (error) {
            console.log(error.message)
        }
        dispatch({
            type:CLEAR_POLL,

        })
    }
 //allpoll

 const allpoll = async()=>{
    try {
        const res = await axios.get('http://localhost:5000/api/poll/')
        dispatch({
            type:ALL_POLLS,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message)
    }
}

//poll by userid
const getuserpolls = async(userid)=>{
   
    try {
        const res = await axios.get(`http://localhost:5000/api/poll/user/${userid}`)
        dispatch({
            type:USER_POLLS,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message)
    } 

}
//poll by id
const poll = async(id)=>{
    try {
        const res = await axios.get(`http://localhost:5000/api/poll/${id}`)
        dispatch({
            type:POLL,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message)
    }
}

const vote = async(formdata,id)=>{
 
    const config = {
        headers:{
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": true,
            
        }    
    };
    try {
        const res = await axios.put(`http://localhost:5000/api/poll/vote/${id}`,formdata,config)
       
       dispatch({
           type:VOTE_POLL,
           payload:res.data
       })
       
    } catch (error) {
        console.log(error.message)
    }
   
}











  return(

   <PollContext.Provider
      value={
          {
              addpoll,
              allpoll,
              vote,
              poll,
              getuserpolls,
             pollstate:state
          }
      }
   >
   
   {props.children}
   </PollContext.Provider>
  )



}
export default PollState