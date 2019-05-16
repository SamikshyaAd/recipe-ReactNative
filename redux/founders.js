import * as ActionTypes from './ActionTypes';

export const founders = (state={
    isLoading:true,
    founders:[],
    errMess:null
}, action)=>{
    switch(action.type){
        case ActionTypes.FOUNDERS_LOADING:
            return {...state, isLoading:true, founders:[], errMess:null}
        case ActionTypes.ADD_FOUNDERS:
            return {...state, isLoading:false, founders:action.payload, errMess:null}
        case ActionTypes.FOUNDERS_FAILED:
            return {...state, isLoading:false, founders:[], errMess:action.payload}
       default:
        return state;     
    }
}