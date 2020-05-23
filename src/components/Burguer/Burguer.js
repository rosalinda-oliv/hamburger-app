import React from "react";
import BurguerIngredient from "./BurguerIngredient/BurguerIngredient";
import classes from "./Burguer.module.css";

const burguer = (props) => {
  let transformIngredients = Object.keys(props.ingredients).map((igKey) => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurguerIngredient ingredient={igKey} />;
    });
  });

  return (
    <div className={classes.Burguer}>
      <BurguerIngredient ingredient="Paocima" />
      {transformIngredients}
      <BurguerIngredient ingredient="PaoBaixo" />
    </div>
  );
};

export default burguer;
