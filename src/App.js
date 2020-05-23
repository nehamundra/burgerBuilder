import React, { Component } from 'react';
import Layout from "./hoc/Layout/Layout"
import Burgerbuilder from "./containers/Burgerbuilder/Burgerbuilder"
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux'
import * as actions from './store/actions';
import asycComponent from './hoc/asyncComponent/asyncComponent';

const asycCheckout=asycComponent(()=>{
  return import('./containers/Checkout/checkout')
});

const asycOrders=asycComponent(()=>{
  return import('./containers/Orders/Orders')
});

const asycAuth=asycComponent(()=>{
  return import('./containers/Auth/Auth')
});


class App extends Component {

  componentDidMount() {
    this.props.onAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Burgerbuilder} />
        <Route path="/auth" component={asycAuth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (<Switch>
        <Route path="/" exact component={Burgerbuilder} />
        <Route path="/auth" component={asycAuth} />
        <Route path="/orders" component={asycOrders} />
        <Route path="/checkout" component={asycCheckout} />
        <Route path='/logout' component={Logout} />
        <Redirect to="/" />
      </Switch>)
    }
    return (
      <Layout>
        {/* <Burgerbuilder/>
        <Checkout/> */}
        {routes}
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token != null
  }
}

const mapDipatchToProps = dispatch => {
  return {
    onAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDipatchToProps)(App));