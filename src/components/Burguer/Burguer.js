import React from "react";

import BurguerIngredient from "./BurguerIngredient/BurguerIngredient";
import classes from "./Burguer.module.css";

const burguer = (props) => {
  let transformIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return  <BurguerIngredient key={igKey + i} type={igKey} />
      })
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformIngredients.length === 0) {
    transformIngredients = <p> Please select ingredients.</p>
  }

  return (
    <div className={classes.Burguer}>
      <BurguerIngredient type="bread-top" />
      {transformIngredients}
      <BurguerIngredient type="bread-bottom" />
    </div>
  );
};

export default burguer;
