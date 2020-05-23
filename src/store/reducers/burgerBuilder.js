import * as actionType from '../actions/actionsTypes';
import { updateObject } from '../utility'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredient = (state, action) => {
    const updatedIng = { [action.ingredientname]: state.ingredients[action.ingredientname] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIng)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientname],
        building:true
    }
    return updateObject(state, updatedState);
}

const removeIngredient=(state, action) => {
    const updatedIng = { [action.ingredientname]: state.ingredients[action.ingredientname] - 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIng)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientname],
        building:true
    }
    return updateObject(state, updatedState);
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT: return addIngredient(state,action);

        case actionType.REMOVE_INGREDIENT: return removeIngredient(state,action);

        case actionType.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building:false
            })

        case actionType.FETCH_FAILED: return updateObject(state, {
            error: true
        })

        default: return state
    }
}

export default reducer