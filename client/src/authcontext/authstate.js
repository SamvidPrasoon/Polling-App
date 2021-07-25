import React,{useReducer} from 'react';
import AuthReducer from './authreducer';
import AuthContext from './authcontext';
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios';
import {
     REGISTER_SUCCESS,
     REGISTER_FAILURE,
     LOGIN_SUCCESS,
     LOGIN_FAILURE,
     USER_LOADER,
     AUTH_ERROR,
     LOGOUT,
     CLEAR_ERRORS
    

} from "../types"



const AuthState = props=>{

    const initialstate = {

        token:localStorage.getItem('token'),
        isAuthenticated:false,
        user:null,
        error:'',

    }

    const [state,dispatch] = useReducer(AuthReducer,initialstate); 

//logout

const logout = async()=>{
    dispatch({
        type:LOGOUT
    })
}

//login
const login = async(formdata)=>{
    //console.log(name,email,password);
    const config = {
        headers:{
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": true,
            
        }    
    };
    
    try {
        const res = await axios.post('http://localhost:5000/api/auth/',formdata,config);
        console.log(res.data);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        
     } catch (err) {
         //console.log(err.response);
         if(err)
         {
            const errors = "your credentails are wrong ";
            dispatch({
                type:LOGIN_FAILURE,
                 payload:errors
             })
               
        }
        dispatch({
            type:CLEAR_ERRORS
        })
 
                       
    }
}

//register

const register = async(formdata)=>{
    console.log(formdata.name,formdata.email,formdata.password);
    const config = {
        headers:{
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": true,
            
        }    
    };
    
    try {
        const res = await axios.post('http://localhost:5000/api/auth/signin',formdata,config);
        console.log(res.data);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        
     } catch (err) {
         //console.log(err.response);
       const errors = "your credentails are wrong"
       dispatch({
        type:REGISTER_FAILURE,
         payload:errors
     })
         dispatch({
             type:CLEAR_ERRORS
         })
                       
    }
}


//load user
const loaduser = async()=>{
          
    if(localStorage.token)
    {
        setAuthToken(localStorage.token)
    }
 
    try {
        const res = await axios.get('http://localhost:5000/api/auth/');
        console.log(res.data);
        dispatch({
            type:USER_LOADER,
            payload:res.data
        })
       } catch (error) {
           dispatch({
               type:AUTH_ERROR
           })
       }

}















    return (
        <AuthContext.Provider
          value={
              {
                  register,
                  loaduser,
                  login,
                  logout,
                  authstate:state
              }
          }
        
        >
        
        
        {props.children}
        </AuthContext.Provider>
  
  
    )






}
export default AuthState;