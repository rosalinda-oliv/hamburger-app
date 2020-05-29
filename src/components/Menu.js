import React from 'react';

import classes from './Menu.module.css';

const menu = () => {
    return (
        <div className='Menu'>
            <ul className={classes.Menu}>
                <li><a class="active" href="#home">Home</a></li>
                <li><a class="active" href="#home">Home</a></li>
                <li><a class="active" href="#home">Home</a></li>
                <li><a class="active" href="#home">Home</a></li>
            </ul>
        </div>
    )
}

export default menu;