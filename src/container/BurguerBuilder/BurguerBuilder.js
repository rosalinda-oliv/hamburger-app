import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliar';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
<<<<<<< HEAD
import Menu from '../../components/Menu';
=======
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
>>>>>>> eca667fd664e66c072adf05d53b0afa86b92a07c

class BurguerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese:0,
            tofu:0,
            ketchup:0
        },
        purchaseing:false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount +1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCount;
        this.setState({ingredients:updateIngredients});
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updateCount = oldCount -1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCount;
        this.setState({ingredients:updateIngredients});
    }

    purchaseHandler = () => {
        console.log('purchaseHandler');
this.setState({purchaseing:true})
    }


    purchaseCancelHandler = () => {
        this.setState({purchaseing:false})
            }

    render () {
        const disabledInfo ={
            ...this.state.ingredients
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
<<<<<<< HEAD
                <Menu />
=======
                <Modal show={this.state.purchaseing} modelClosed={this.purchaseCancelHandler} >
                    <OrderSummary purchasedCancelled={this.purchaseCancelHandler} ingredients={this.state.ingredients} />
                </Modal>
>>>>>>> eca667fd664e66c072adf05d53b0afa86b92a07c
                <Burguer ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientsAdded={this.addIngredientHandler}
                ingredientsRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                ordered={this.purchaseHandler}
                />
            </Aux>
        )
    }
}

export default BurguerBuilder;