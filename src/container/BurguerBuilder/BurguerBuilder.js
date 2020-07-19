import React, { Component } from "react";
import { connect } from 'react-redux';

import Aux from "../../hoc/Auxiliar";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burguer/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../store/actions';


class BurguerBuilder extends Component {
  state = {
    purchaseing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    /*
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

     */
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }
 /*
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

  */
 /*
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

  */

  purchaseHandler = () => {
    console.log("purchaseHandler");
    this.setState({ purchaseing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchaseing: false });
  };

  
  purchaseContinue = () => {
       this.props.history.push('/checkout');
  };

 

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };

    let orderSummary = null;

    console.log(this.state.error);
    let burger = this.state.error ? <p> bla blah </p> : <Spinner />

    console.log(this.props.ings);

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burguer ingredients={this.props.ings} />
          <BuildControls
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientsRemoved={this.props.onIngredientRemove}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
          />
        </Aux>
      );

      orderSummary = <OrderSummary
        purchaseContinued={this.purchaseContinue}
        purchasedCancelled={this.purchaseCancelHandler}
        ingredients={this.props.ings}
        price={this.props.price}
      />
    }
    console.log(this.state.loading);
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispachToProps = dispach => {
  return {
    onIngredientAdded: (ingName) => dispach({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemove: (ingName) => dispach({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})

  }
}

export default connect(mapStateToProps, mapDispachToProps)(withErrorHandler(BurguerBuilder, axios));
