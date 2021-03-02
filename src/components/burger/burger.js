import React from "react";
import './burger.module.scss';

const Burger = (props) => {
    const classes = ['burger']
    if(props.isOpen === true) {
        classes.push('burger_active')
    }
    if(props.isClicked %2 == 0 && props.isClicked !== 0) {
        classes.push('burger_close')
    }
    if(props.dark === true){
        classes.push('dark')
    }
    
    return(
        <div className={classes.join(' ')} onClick={props.onClick}>
            <span style={props.style}></span>
        </div>
    )
}
export default Burger;