import React from 'react';

import classes from './Buildcontrol.module.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
    <button 
    disabled={props.disabled}
    onClick={props.removed}
    className={classes.Less}
    > Less </button>
    <button
    onClick={props.added}
    className={props.More}
    >More</button>
</div>
)   

export default buildControl;