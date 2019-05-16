import * as ActionTypes from './ActionTypes';

export const feedbacks = (state={
    isLoading:true,
    feedbacks:[],
    errMess:null
}, action)=>{
    switch(action.type){
        case ActionTypes.FEEDBACKS_LOADING:
            return {...state, isLoading:true, feedbacks:[], errMess:null}
        case ActionTypes.ADD_FEEDBACKS:
            return {...state, isLoading:false, feedbacks:action.payload, errMess:null}
        case ActionTypes.FEEDBACKS_FAILED:
            return {...state, isLoading:false, feedbacks:[], errMess:action.payload}
       case ActionTypes.ADD_FEEDBACK:
            var feedback = action.payload;
            return {...state, isLoading:false, feedbacks:state.feedbacks.concat(feedback), errMess:null} 
       default:
        return state;     
    }
}