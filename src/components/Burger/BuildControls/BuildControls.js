import React from "react";
import BuildControl from "./BuildControl/BuildControl"
import classes from "./BuildControls.module.css"
import Aux from "../../../hoc/Auxx/Auxx"

const BuildControls=props=>{

    const controls=[
        {label:'Salad',type:'salad'},
        {label:'Cheese',type:'cheese'},
        {label:'Bacon',type:'bacon'},
        {label:'Meat',type:'meat'}
    ]

    const controlArr=controls.map((build,i)=>{
        return <BuildControl key={i} label={build.label} 
            added={()=>props.ingAdded(build.type)}
            removed={()=>props.ingremoved(build.type)}
            disabled={props.disabled[build.type]}
        />
    })

    return (
        <Aux>
            <div className={classes.BuildControls}>
                <p className={classes.price}>Current Price: {props.price.toFixed(2)}</p>
                {controlArr}
                <button type="button" disabled={ !props.purchasable} className={classes.OrderButton}
                 onClick={props.ordered}>
                      {props.isAuth?'ORDER NOW':'Sign Up To Order'}
                      </button>
            </div>
        </Aux>
    )

}

export default BuildControls