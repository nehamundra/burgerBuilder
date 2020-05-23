import React, {Component} from 'react';
import Input from '../../components/UI/Input/input';
import Button from '../../components/UI/Button/button';
import './Auth.css';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/spinner/spinner';
import {Redirect} from 'react-router-dom';
import {checkValidation} from '../../store/utility'

class Auth extends Component{

    state={
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                valid:false,
                touched:false,
                validation:{
                    required:true,
                    isEmail:true
                }
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                valid:false,
                touched:false,
                validation:{
                    required:true,
                    minLength:6
                }
            }
        },
        isSignup:false
    }

    inputChanged=(event,controlName)=>{

        const updatedForm={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:checkValidation(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        }

        this.setState({controls:updatedForm})
    }

    componenDidMount(){
        if(this.props.buildingBurger && this.props.authRedirect!=='/'){
            this.props.onSetAuthRedirect();
        }
    }


    submit=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,
                this.state.controls.password.value,this.state.isSignup)
    }

    switchAuthModeHandler=()=>{
        
        this.setState(prevState=>{            
            return{
                isSignup:!prevState.isSignup
            }
        })
    }

    render(){
        const formElementsArray=[];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        let form=formElementsArray.map(ele=>{
            return(
                <Input 
                    key={ele.id} 
                    elementType={ele.config.elementType}
                    elementConfig={ele.config.elementConfig}
                    value={ele.config.value}
                    invalid={!ele.config.valid}
                    shouldValidate={ele.config.validation}
                    touched={ele.config.touched}
                    changed={(event)=>this.inputChanged(event,ele.id)}/>

                
            )
        })

        if(this.props.loading){
            form=<Spinner/>
        }

        let errorMsg=null;
        if(this.props.error){
            errorMsg=(
                <p>{this.props.error.message}</p>
            )
        }
        let authRedirect=null;
        if(this.props.isAuth){
            authRedirect=<Redirect to={this.props.authRedirect}/>
        }
        return(
            <div className="Auth">
                {authRedirect}
                {errorMsg}
                <form onSubmit={this.submit}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler}
                btnType="Danger">Switch to {this.state.isSignup?'SIGNIN':'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token!=null,
        buildingBurger:state.burgerBuilder.building,
        authRedirect:state.auth.authRedirect
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirect:()=>dispatch(actions.setAuthRedirect('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);