import React from 'react';
import Aux from '../../../hoc/Auxiliar';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return(
            <li key={igKey}>
               <span style={{textTransform:'capitalize'}}></span> {igKey}: {props.ingredients[igKey]}
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
            <p>Continue to Checkout?</p>
            <Button buttonType="Danger" clicked={props.purchasedCancelled}>Cancel</Button>
        </Aux>
    )
}

export default orderSummary;