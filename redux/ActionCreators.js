import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';



export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});
export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});
export const fetchRecipes = () => (dispatch) => {

        dispatch(recipeLoading(true));

        return fetch(baseUrl+'recipes')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error ('Error: '+response.status+': '+response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(recipes => dispatch(addRecipes(recipes)))
        .catch(error => dispatch(recipeFailed(error.message)))
  
}
export const recipeLoading = () => ({
    type : ActionTypes.RECIPE_LOADING
  
});
export const addRecipes = (recipes) => ({
    type : ActionTypes.ADD_RECIPE,
    payload : recipes
});
export const recipeFailed = (errmess) => ({
    type : ActionTypes.RECIPE_FAILED,
    payload : errmess
});
export const fetchFeedbacks = () => (dispatch) => {

    dispatch(recipeLoading(true));

    return fetch(baseUrl+'feedbacks')
    .then(response=>{
        if(response.ok){
            return response;
        }
        else {
            var error = new Error('Error'+response.status+ ': '+response.statusText);
            error.response = response;
            throw error;   
        } 
    },
    error=> {
        var errmess = new Error (error.message);
        throw errmess;
    })
    .then(response=> response.json())
    .then(feedbacks=> dispatch(addFeedbacks(feedbacks)))
    .catch(error => dispatch(feedbacksFailed(error.message)));
}
export const feedbacksFailed = (errmess) => ({
    type: ActionTypes.FEEDBACKS_FAILED,
    payload: errmess
});
export const addFeedbacks = (feedbacks) => ({
    type: ActionTypes.ADD_FEEDBACKS,
    payload: feedbacks
});
export const postFeedback = (recipeId, rating, comment,  author)  => (dispatch) => {
    const newFeedback = {
        recipeId:recipeId,
        rating:rating, 
        comment:comment,
        author:author
    }
    newFeedback.date=new Date().toISOString();
    return fetch(baseUrl+'feedbacks',{
        method:'POST',
        body:JSON.stringify(newFeedback),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    })
    .then(response=>{
        if(response.ok){
            return response;
        }
        else {
            var error = new Error('Error'+response.status+ ': '+response.statusText);
            error.response = response;
            throw error;   
        } 
    },
    error=> {
        var errmess = new Error (error.message);
        throw errmess;
    })
    .then(response=> response.json())
    .then(response=> dispatch(addFeedback(response)))
    .catch(error => {console.log('Post feedback: '+ error.message)});
}

export const addFeedback = (newFeedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: newFeedback
});
export const postFavorite = (recipeId)  => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorite(recipeId));
    }, 2000);
};
export const postGeneralFeedback = (firstname, lastname, telnum, email, agree, contactType, message)=> (dispatch) => {
    const feedback = {
        firstname:firstname,
        lastname:lastname, 
        telnum:telnum,
        email:email,
        agree:agree,
        contactType:contactType,
        message:message
    }
    feedback.date=new Date().toISOString();
    return fetch(baseUrl+'generalfeedback',{
        method:'POST',
        body:JSON.stringify(feedback),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    })
    .then(response=>{
        if(response.ok){
            return response;
        }
        else {
            var error = new Error('Error'+response.status+ ': '+response.statusText);
            error.response = response;
            throw error;   
        } 
    },
    error=> {
        var errmess = new Error (error.message);
        throw errmess;
    })
    .catch(error => {console.log('Feedback error message: '+ error.message)});
}
export const addFavorite = (recipeId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: recipeId
});
export const deleteFavorite = (recipeId) => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: recipeId
});
export const fetchFounders = () => (dispatch) => {
    
    dispatch(foundersLoading());

    return fetch(baseUrl + 'founders')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(founders => dispatch(addFounders(founders)))
    .catch(error => dispatch(foundersFailed(error.message)));
};
export const foundersLoading = () => ({
    type: ActionTypes.FOUNDERS_LOADING
});
export const foundersFailed = (errmess) => ({
    type: ActionTypes.FOUNDERS_FAILED,
    payload: errmess
});

export const addFounders = (founders) => ({
    type: ActionTypes.ADD_FOUNDERS,
    payload: founders
});
export const postRecipe = (name, image, category, ingredients, direction, description)=> (dispatch) => {
    const recipe = {
        name:name,
        image:image,
        category:category, 
        ingredients:ingredients,
        direction:direction,
        description:description,
    }
    return fetch(baseUrl+'recipes',{
        method:'POST',
        body:JSON.stringify(recipe),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    })
    .then(response=>{
        if(response.ok){
            return response;
        }
        else {
            var error = new Error('Error'+response.status+ ': '+response.statusText);
            error.response = response;
            throw error;   
        } 
    },
    error=> {
        var errmess = new Error (error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(recipe => dispatch(concatRecipes(recipe)))
    .catch(error => {console.log('Post recipe: '+ error.message)});
}
export const concatRecipes = (recipe)=> ({
    type:ActionTypes.ADD_SINGLERECIPE,
    payload:recipe
});