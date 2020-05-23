import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utility'
const initialState={
    orders:[],
    loading:false,
    purchased:false,
    error:null
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_BURGER:
            const newOrder={
                ...action.ordersData,
                id:action.orderId,
                
            }
            return updateObject(state,{
                loading:false,
                purchased:true,
                orders:state.orders.concat(newOrder)
            })

        case actionTypes.PURCHASE_FAILED:
            return updateObject(state,{
                loading:false
            })

        case actionTypes.PURCHASE_START:
            return updateObject(state,{
                loading:true
            })

        case actionTypes.PURCHASE_INIT:
            return updateObject(state,{
                purchased:false
            })

        case actionTypes.FETCH_ORDER_START:
            return updateObject(state,{
                loading:true,
                error:null
            })

        case actionTypes.FETCH_ORDER_SUCCESS:
            return updateObject(state,{
                orders:action.orders,
                loading:false,
                error:null
            })

        case actionTypes.FETCH_ORDERS_FAILED:
            return updateObject(state,{
                loading:false,
                error:action.error
            })
        default: return state;
    }
}

export default reducer;