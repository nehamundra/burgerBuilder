import React, { Component, Fragment } from "react";
import CheckoutSummary from '../../components/Order/CheckOutSummary/checkOutSummary'
import { Route, Redirect } from 'react-router-dom';
import ContactData from './contactDataFolder/contactData'
import { connect } from 'react-redux';

class Checkout extends Component {
    // state={
    //     ingredients:null,
    //     totalPrice:0
    // }

    // componentWillMount(){
    //     const query =new URLSearchParams(this.props.location.search);
    //     const ingredients={};
    //     let price=0;
    //     for(let params of query.entries()){

    //         if(params[0]==='price'){
    //             price=params[1]
    //         }else{
    //             ingredients[params[0]]= +params[1];
    //         }

    //     }

    //     this.setState({ingredients:ingredients, totalPrice:price});
    // }


    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        let summary = <Redirect to='/' />
        
        if (this.props.ingredients) {
            const purchasedRedirect=this.props.purchased?<Redirect to="/"/>:null;

            summary = (
                <Fragment>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued} />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </Fragment>
            )
        }
        return (
            <div>

                {summary}
                {/* <Route path={this.props.match.path+ '/contact-data'} 
                render={(props)=>(<ContactData 
                ingredients={this.props.ingredients}
                price={this.props.totalPrice} {...props}/>)}/> */}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased:state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);