import React, {Component} from "react";
import Aux from "../Auxx/Auxx";
import classes from "./Layout.module.css"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from'react-redux'

class Layout extends Component{
    state={
        showSideDrawer:true
    }

    sdCloseHandler=()=>{
        this.setState({
            showSideDrawer:false
        })
    }

    sdToggleHandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }

    render(){
        let sideDrawer=window.screen.width<700?
        (<SideDrawer 
            closed={this.sdCloseHandler} 
            isAuth={this.props.isAuthenticated}
            open={this.state.showSideDrawer}/>):
        null;
        return(
            <Aux>
            {/* <div>Toolbar, sidedrawer, backdrop</div> */}
            <Toolbar 
            sdClicked={this.sdToggleHandler} 
            isAuth={this.props.isAuthenticated}
            />
            {sideDrawer}
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token!==null
    }
}

export default connect(mapStateToProps)(Layout)