import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../../components/Order/CheckoutSummary/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            cheese: 1,
            meat:1,
            tofu: 1,
            ketchup: 1,
            avocadoMayo: 1,
        }
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
       this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                />   
                <Route 
                path={this.props.match.path + '/contact-data'} 
                render = {() => (<ContactData ingredients={this.state.ingredients} price='4'/>)}
                />
            </div>
        )
    }


}

export default Checkout; 