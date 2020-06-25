import React from 'react';
import classes from './Order.module.css'

const order = (props) => {
    return(
    <div className={classes.Order}>
        <p> Tofu(1)</p>
        <p> Price: USD 4</p>
    </div>
    )
}

export default order;