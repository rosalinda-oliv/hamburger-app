import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Tofu', type: 'tofu'},
    {label: 'Ketchup', type: 'ketchup'},
    {label: 'Cheese', type: 'cheese'},
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map( ctrl => {
            return <BuildControl 
            key={ctrl.label}
            added={() => props.ingredientsAdded(ctrl.type)}
            removed={() => props.ingredientsRemoved(ctrl.type)}
            label={ctrl.label}
            disabled={props.disabled[ctrl.type]}/>
        })}
    </div>
);

export default buildControls;