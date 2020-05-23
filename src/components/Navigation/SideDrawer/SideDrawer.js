import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems"
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop"
import Aux from "../../../hoc/Auxx/Auxx"

const SideDrawer = (props) => {
    let attachedclass=[classes.SideDrawer,classes.Close];
    if(props.open){
        attachedclass=[classes.SideDrawer,classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedclass.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer;