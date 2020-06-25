import React, { Component } from "react";

import Aux from "../../hoc/Auxiliar";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burguer/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.3,
  meat: 1.3,
  tofu: 1.8,
  ketchup: 0.2,
  avocadoMayo: 0.8,
};
class BurguerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseing: false,
    purchaseable: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("https://react-hamburger-f5381.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data })
      })
      .catch( error => {
        console.log('entrou no catch');
        
        this.setState({error: true})
        console.log('dentro do catch' + this.state.error);
        
      })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
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
    this.setState({ ingredients: updateIngredients, totalPrice: newPrice });

    console.log(newPrice);
    this.setState({ ingredients: updateIngredients });
    this.updatePurchaseState(updateIngredients);
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
    this.setState({ ingredients: updateIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updateIngredients);
  };

  purchaseHandler = () => {
    console.log("purchaseHandler");
    this.setState({ purchaseing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchaseing: false });
  };

  
  purchaseContinue = () => {
    /*
    //alert('Purchase continue');
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      proce: this.state.totalPrice,
      customer: {
        name: "Rosi",
        address: {
          street: "dcjd",
          zipCode: "1111",
          country: "Portugal",
        },
        email: "test@hhh.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((responde) => {
        this.setState({ purchaseing: false });
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ purchaseing: false });
        this.setState({ loading: false });
      });
       */

       this.props.history.push('/checkout');
  };

 

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    let orderSummary = null;

    console.log(this.state.error);
    

    let burger = this.state.error ? <p> bla blah </p> : <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
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

      orderSummary = <OrderSummary
        purchaseContinued={this.purchaseContinue}
        purchasedCancelled={this.purchaseCancelHandler}
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
      />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchaseing}
          modelClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurguerBuilder, axios);
