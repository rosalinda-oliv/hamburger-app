import React from 'react';
import BurguerIngredient from './BurguerIngredient/BurguerIngredient';
import classes from './Burguer.module.css';

const burguer = (props) => {
    return (
      <div className={classes.Burguer}> 
  <BurguerIngredient />
      </div>
    
    )
}

export default burguer;