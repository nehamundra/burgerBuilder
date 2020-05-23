import * as actionTypes from './actionsTypes';
import axios from '../../axios-order'

export const addIngredient=(ingName)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientname:ingName
    }
};

export const removeIngredient=(ingName)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientname:ingName
    }
}

export const setIngredients=(ingredients)=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const fetchFailed=()=>{
    return{
        type:actionTypes.FETCH_FAILED
    }
}

export const initIngredients=()=>{
    return dispatch=>{
        axios.get('ingredients.json').then(res => {
            dispatch(setIngredients(res.data))
        }).catch(err=>{
            fetchFailed()
        })
    }
}