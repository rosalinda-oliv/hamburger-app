import React from "react";
import classes from "./BurguerIngredient.module.css";

const burguerIngredient = (props) => {
  let ingredient = null;

  switch (props.type) {
    case "bread-top":
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case "salad":
      ingredient = <div className={classes.Salad}></div>;
      break;
    case "tofu":
      ingredient = <div className={classes.Tofu}></div>;
      break;
    case "cheese":
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case "ketchup":
      ingredient = <div className={classes.Ketchup}></div>;
      break;
    case "avocadoMayo":
      ingredient = <div className={classes.AvocadoMayo}></div>;
      break;
    case "meat":
      ingredient = <div className={classes.Meat}></div>;
      break;
    case "bread-bottom":
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    default:
      ingredient = null;
  }

  return ingredient;
};

export default burguerIngredient;
