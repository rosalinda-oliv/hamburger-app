import React from 'react';
import classes from './BurguerIngredient.module.css';
import Aux from '../../../hoc/Auxiliar';


const burguerIngredient = (props) => {
    return(
        <Aux>
            <div className={classes.BreadTop}>
                <div className={classes.Seeds1}></div>
                <div className={classes.Seeds2}></div>
            </div>
            <div className={classes.Ketchup}></div>
            <div className={classes.AbocadoMayo}></div>
            <div className={classes.Cheese}></div>
            <div className={classes.Tofu}></div>
            <div className={classes.Salad}></div>
            <div className={classes.BreadBottom}></div>
        </Aux>
    )
}

export default burguerIngredient;



