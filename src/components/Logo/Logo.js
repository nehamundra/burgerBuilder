import React from "react";
import burgerlogo from "../../assests/images/burger-logo.png";
import classes from "./Logo.module.css";

const Logo = (props)=>{
    return(
        <div className={classes.Logo}>
            <img src={burgerlogo} alt="MyBurger" />
        </div>
    )
}

export default Logo;