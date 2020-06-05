import React, { Component } from "react";

import Aux from "../../hoc/Auxiliar";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burguer/OrderSummary/OrderSummary";


const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.3,
    meat: 1.3,
    tofu:1.8,
    ketchup:1,
    abocadoMayo:1,
}
class BurguerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      tofu: 0,
      ketchup: 0,
      abocadoMayo: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseing: false,
    purchaseable: false,
  };

  updatePurchaseState( ingredients ) {
      const sum = Object.keys(ingredients) 
      .map(igKey => {
          return ingredients[igKey]
      })
      .reduce((sum, el) => {
          return sum + el;
      }, 0);
      this.setState({purchaseable: sum > 0});
  }


  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients,
    };
    updateIngredients[type] = updateCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredients: updateIngredients, totalPrice: newPrice});
    
console.log(newPrice);
    this.setState({ ingredients: updateIngredients });
    this.updatePurchaseState( updateIngredients );
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients,
    };
    updateIngredients[type] = updateCount;
    const priceReduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceReduction;
    console.log(newPrice);
    this.setState({ ingredients: updateIngredients, totalPrice: newPrice});
    this.updatePurchaseState( updateIngredients );
  };

  purchaseHandler = () => {
    console.log("purchaseHandler");
    this.setState({ purchaseing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchaseing: false });
  };

  purchaseContinue = () => {
      alert('Purchase continue')
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchaseing}
          modelClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            purchasedContinue={this.purchaseContinue}
            purchasedCancelled={this.purchaseCancelHandler}
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burguer ingredients={this.state.ingredients} />
        <BuildControls
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          ordered={this.purchaseHandler}
          purchaseable={this.state.purchaseable}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurguerBuilder;
