import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'

import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
<ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact> Burguer Builder</NavigationItem>
    <NavigationItem link="/orders"> Orders </NavigationItem>
</ul>
)

export default navigationItems;