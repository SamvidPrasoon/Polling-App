import {
    ADD_POLLS,
    ALL_POLLS,
    POLL,
    DELETE_POLL,
    USER_POLLS,
    CLEAR_POLL,
    VOTE_POLL
   
   } from '../types'



   export default (state,action)=>{
       switch(action.type){
           case ADD_POLLS:
               return{
                   ...state,
                   addedpoll:action.payload
               }
               case ALL_POLLS:
                return{
                    ...state,
                    poll:action.payload
                }
                case USER_POLLS:
                    return{
                        ...state,
                        userpolls:action.payload
                    }
                    case POLL:
                        return{
                            ...state,
                            singlepoll:action.payload
                        }
                        case VOTE_POLL:
                            return{
                                ...state,
                                vote:action.payload
                            }
               default:
                return state
       }
   }