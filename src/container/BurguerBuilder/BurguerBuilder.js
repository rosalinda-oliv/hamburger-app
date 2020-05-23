import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliar';
import Burguer from '../../components/Burguer/Burguer';

class BurguerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            cheese:1,
            tofu:1,
            ketchup:0
        }
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

    deleteIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount < 0){
            return;
        }
        const updateCount = oldCount -1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCount;
        this.setState({ingredients:updateIngredients});

        
    }


    render () {
        return (
            <Aux>
                <Burguer ingredients={this.state.ingredients} />
                <p> Controlador Hamburguer</p>
            </Aux>
        )
    }
}

export default BurguerBuilder;