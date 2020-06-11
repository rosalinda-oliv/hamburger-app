import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'

import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
<ul className={classes.NavigationItems}>
    <NavigationItem link="/" active> Burguer Builder</NavigationItem>
    <NavigationItem link="/"> Burguer Builder</NavigationItem>
</ul>
)

export default navigationItems;