import React, { Component } from 'react';
import Button from '../../../components/UI/Button/button';
import classes from './contactData.module.css';
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/spinner/spinner";
import Input from "../../../components/UI/Input/input";
import {connect} from 'react-redux'
import errorHandler from '../../../hoc/errorHandler/errorHandler'
import * as actions from "../../../store/actions";
import {checkValidation} from '../../../store/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                valid:false,
                touched:false,
                validation:{
                    required:true
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'street'
                },
                value: '',
                touched:false,
                validation:{
                    required:true
                },
                valid:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: '',
                touched:false,
                validation:{
                    required:true,
                    minlength:5,
                    maxlength:5
                },
                valid:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                touched:false,
                validation:{
                    required:true
                },
                valid:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'your email'
                },
                value: '',
                touched:false,
                validation:{
                    required:true
                },
                valid:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ],
                    placeholder:'delivery method'
                },
                value: 'fastest',
                validation:{},
                valid:true
            }
        },
        formIsValid:false,
    }

    checkValidation=(value,rules)=>{
        let isValid=true;
        if(rules.required){
            isValid=value.trim()!=='' && isValid;
        }

        if(rules.minlength){
            isValid=value.length>=rules.minlength && isValid;
        }

        if(rules.maxlength){
            isValid=value.length<=rules.maxlength && isValid;
        }
        return isValid
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData={}
        for(let formElement in this.state.orderForm){
            formData[formElement]=this.state.orderForm[formElement].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData:formData,
            userId:this.props.userId
        }
        
        this.props.onOrderBurger(order,this.props.token);
    }

    inputChanged=(event,inputIdentifier)=>{
        const updatedOrderForm={
            ...this.state.orderForm
        }
        const updatedElement={...updatedOrderForm[inputIdentifier]};
        updatedElement.value=event.target.value;
        updatedElement.valid=checkValidation(updatedElement.value,updatedElement.validation);
        updatedElement.touched=true;
        updatedOrderForm[inputIdentifier]=updatedElement;
        let formIsValid=true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid=updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({orderForm:updatedOrderForm, formIsValid:formIsValid});
    }

    render() {
        const formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {/* <Input elementType="..." elementConfig="..." value="..." /> */}
                {formElementsArray.map(formElement=>{
                    return <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event)=>this.inputChanged(event,formElement.id)}/>
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDisptachToProps=(dispatch)=>{
    return{
        onOrderBurger:(orderData,token)=>dispatch(actions.purchase(orderData,token))
    }
}

export default connect(mapStateToProps,mapDisptachToProps)(errorHandler(ContactData,axios));