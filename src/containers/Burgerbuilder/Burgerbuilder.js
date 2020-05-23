import React, { Component } from "react";
import Aux from "../../hoc/Auxx/Auxx"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-order";
import Spinner from "../../components/UI/spinner/spinner";
import ErrorHandler from "../../hoc/errorHandler/errorHandler";
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index'



export class Burgerbuilder extends Component {


    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        purchasing: false
    }

    componentDidMount(){
        this.props.initIngredients();
    }
  

    updatePurchaseState = (pstate) => {
        // const pstate={...this.props.ingredients};
        let sum = Object.keys(pstate)
            .map(ele => { return pstate[ele] })
            .reduce((sum, ele2) => {
                return sum + ele2
            }, 0)

        return sum >0;
    }

    purchasehandler = () => {
        if(this.props.isAuth){
            this.setState({ purchasing: true })
        }else{
            this.props.setAuthRedirect('/checkout');
            this.props.history.push('/auth')
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        //alert("You Continued!!")


        // let queryParams = [];
        // for (let i in this.props.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))
        // }
        // queryParams.push('price' + this.props.totalPrice)
        // const queryString = queryParams.join('&')
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // })
        this.props.initPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { ...this.props.ingredients };

        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }

        let orderSummary = null;

        let burger = this.props.error ? null : <Spinner />

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls ingAdded={this.props.addIngredient} 
                        ingremoved={this.props.removeIngredient}
                        disabled={disabledInfo}
                        price={this.props.totalPrice} 
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchasehandler} 
                        isAuth={this.props.isAuth}/>
                </Aux>
            );

            orderSummary = (
                <OrderSummary ingredients={this.props.ingredients}
                    price={this.props.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler} />
            )
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuth:state.auth.token!=null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        removeIngredient: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        initIngredients:()=>dispatch(burgerBuilderActions.initIngredients()),
        initPurchase:()=>dispatch(burgerBuilderActions.pinit()),
        setAuthRedirect:(path)=>dispatch(burgerBuilderActions.setAuthRedirect(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorHandler(Burgerbuilder, axios))