import React from 'react';
import classes from './Logo.module.css';
import burguerLogo from '../../Assets/img/burger-logo.png';

const logo = (props) => (
    <div className={classes.Logo} style={{style:props.height}}>
        <img src={burguerLogo} alt='hamburguer'></img>
    </div>
)

export default logo;
