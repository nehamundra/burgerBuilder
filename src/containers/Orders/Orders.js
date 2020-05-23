import React, {Component} from 'react';
import axios from "../../axios-order"
import Order from "../../components/Order/order"
import ErrorHandler from '../../hoc/errorHandler/errorHandler'
import * as actions from "../../store/actions";
import {connect} from 'react-redux';
import Spinner from "../../components/UI/spinner/spinner"

class Orders extends Component{
    
    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }
    render(){
        let orders=<Spinner/>;
        if(!this.props.loading){
            orders=this.props.orders.map(order=>{
                return <Order key={order.id}
                ingredients={order.ingredients}
                price={order.price}/>
            })
        }
        if(this.props.error){
            orders=(<p>{this.props.error}</p>)
        }
        return(
            <div>
                {orders} 
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        orders:state.order.orders,
        loading:state.order.loading,
        error:state.order.error,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDipatchToProps=dispatch=>{
    return{
        onFetchOrders:(token,userId)=>dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDipatchToProps)(ErrorHandler(Orders,axios));