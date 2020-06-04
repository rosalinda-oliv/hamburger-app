import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliar';
import Button from '../../UI/Button/Button';


class orderSummary extends Component {

    shouldComponentUpdate() {
        return true // false
    }

componentDidUpdate() {
    console.log('orderSummary')
}

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return(
                <li key={igKey}>
                   <span style={{textTransform:'capitalize'}}></span> {igKey}: {this.props.ingredients[igKey]}
                </li>
            )
        })
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>Delicious Burguer</p>
                <ul>
                    {ingredientSummary}
                </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button buttonType="Danger" clicked={this.props.purchasedCancelled}>Cancel</Button>
                <Button buttonType="Success" clicked={this.purchasedContinue}>Continue</Button>
            </Aux>
        )
    }
    
    }
    
export default orderSummary;