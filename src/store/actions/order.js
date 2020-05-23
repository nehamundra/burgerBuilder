import * as actionTypes from './actionsTypes';
import axios from '../../axios-order'
export const purchaseBurger=(id,orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseFailed=(error)=>{
    return{
        type:actionTypes.PURCHASE_FAILED,
        error:error
    }
}

export const purchaseStart=()=>{
    return{
        type:actionTypes.PURCHASE_START
    }
}

export const purchase=(orderData,token)=>{
return dispatch=>{
    dispatch(purchaseStart());
    axios.post('/orders.json?auth='+token,orderData).then(res=>{
        
        dispatch(purchaseBurger(res.data.name,orderData))
    }).catch(err=>{
        dispatch(purchaseFailed(err))
    })
}
}

export const pinit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess=(orders)=>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}

export const fetchOrdersFailed=(error)=>{
    return{
        type:actionTypes.FETCH_ORDERS_FAILED,
        error:error.response.data.error
    }
}

export const fetchOrdersStart=()=>{
    return{
        type:actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrders=(token,userId)=>{
    return dispatch=>{
        dispatch(fetchOrdersStart())
        const queryParam='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        // const queryParam='?auth='+token
        
        axios.get('/orders.json'+queryParam).then(res=>{
            const fetchedOrders=[];

            for(let key in res.data){
                fetchedOrders.push({...res.data[key], id:key});
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
            
        }).catch(err=>{
            dispatch(fetchOrdersFailed(err))
            
        })
    }
}