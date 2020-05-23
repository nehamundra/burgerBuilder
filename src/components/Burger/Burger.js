import React from "react"
import classes from "./Burger.module.css";
import Burgeringredient from "./BurgerIngredient/Burgeringredient";
import {withRouter} from 'react-router-dom';

const Burger=props=>{

    const typeArr=[];
    Object.keys(props.ingredients).forEach(typeKey=>{
        let val=props.ingredients[typeKey];
        for(let i=0;i<val;i++){
            typeArr.push(typeKey);
        }
    })

    
    let Burgerarr=typeArr.map((type,i)=>{
        return <Burgeringredient key={i} type={type}/>
    })

    if(typeArr.length===0){
        Burgerarr=(<p>Please start adding Ingredients!!</p>)
    }

    return(
        <div className={classes.Burger}>
            <Burgeringredient type="bread-top"/>
            {/* <Burgeringredient type="cheese"/>
            <Burgeringredient type="meat"/> */}
            {Burgerarr}
            <Burgeringredient type="bread-bottom"/>
        </div>
    )
}

export default withRouter(Burger)