import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Tofu', type: 'tofu'},
    {label: 'Ketchup', type: 'ketchup'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'AvocadoMayo', type: 'avocadoMayo'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p> Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map( ctrl => {
            return <BuildControl 
            key={ctrl.label}
            added={() => props.ingredientsAdded(ctrl.type)}
            removed={() => props.ingredientsRemoved(ctrl.type)}
            label={ctrl.label}
            disabled={props.disabled[ctrl.type]}/>
        })}
        <button className={classes.OrderButton}
        onClick={props.ordered}
        disabled={!props.purchaseable}
        >Order Now
        </button>
    </div>
);

export default buildControls;