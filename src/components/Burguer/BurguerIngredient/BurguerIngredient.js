import React from "react";
import classes from "./BurguerIngredient.module.css";
import Aux from "../../../hoc/Auxiliar";

const burguerIngredient = (props) => {
  let ingredient = null;

  switch (props.ingredient) {
      case "Paocima":
        ingredient = <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
        </div>
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
      case "PaoBaixo":
        ingredient = <div className={classes.BreadBottom}>
        </div>
        break;
    default:
      ingredient = null;
  }

  return (
   ingredient
  );
};

export default burguerIngredient;
