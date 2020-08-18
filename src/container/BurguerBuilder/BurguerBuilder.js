import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from '../../axios-order';

import Aux from "../../hoc/Auxiliar";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burguer/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from '../../store/actions/index';

class BurguerBuilder extends Component {
  state = {
    purchaseing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
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

  purchaseHandler = () => {
    //console.log("purchaseHandler");
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
    //console.log(this.state.error);
    let burger = this.props.error ? <p> Ingredients can't be loaded! </p> : <Spinner />;

    //console.log(this.props.ings);
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
    price: state.totalPrice,
    error:state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemove: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));
