import * as ActionTypes from './ActionTypes';

export const recipes = (state={
    isLoading:true,
    recipes:[],
    errMess:null
}, action)=>{
    switch(action.type){
        case ActionTypes.RECIPE_LOADING:
            return {...state, isLoading:true, recipes:[], errMess:null}
        case ActionTypes.ADD_RECIPE:
            return {...state, isLoading:false, recipes:action.payload, errMess:null}
        case ActionTypes.ADD_SINGLERECIPE:
            var recipe = action.payload;
            return {...state, isLoading:false, recipes:state.recipes.concat(recipe), errMess:null}
        case ActionTypes.RECIPE_FAILED:
            return {...state, isLoading:false, recipes:[], errMess:action.payload}
        default:
        return state;     
    }
}