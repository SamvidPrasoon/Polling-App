import {
    CLEAR_ERRORS,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    AUTH_ERROR,
    LOGOUT,
    USER_LOADER
} from '../types'



export default  (state,action)=>{
    switch(action.type){
       case REGISTER_SUCCESS:
       case LOGIN_SUCCESS:
           localStorage.setItem('token',action.payload.token);
           return{

            ...state,
            ...action.payload,
             isAuthenticated:true
           }
            case REGISTER_FAILURE :
            case LOGIN_FAILURE:
                localStorage.removeItem('token')
             return{
                 ...state,
                 token:null,
                
                 isAuthenticated:false,
                 error:action.payload
             } 
             case CLEAR_ERRORS :
                localStorage.removeItem('token')
                return{
                    ...state,
                    error:''
                }
                case USER_LOADER:
                    return {
                        ...state,
                        isAuthenticated:true,
                      
                        user:action.payload
    
                    }
                    case AUTH_ERROR:
                 localStorage.removeItem('token')
                 return {
                     ...state,
                     token:null,
                     isAuthenticated:false,
                  
                     
                 }
                 case LOGOUT:
                    localStorage.removeItem('token')
                    return{
                        ...state,
                        token:null,
                        isAuthenticated:false,
                        user:null,
                       
                    }
                    default:
                        return state;

    }
}