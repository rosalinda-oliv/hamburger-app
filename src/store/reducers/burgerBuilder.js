import * as actionTypes from '../actions/actionTypes';

const initialState = {
	ingredients: null,
	totalPrice: 3,
	error: false
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.3,
	meat: 1.3,
	tofu: 1.8,
	ketchup: 0.2,
	avocadoMayo: 0.8,
};

const burgerBuilder = (state = initialState, action) => {
	switch (action.type) {
	case actionTypes.ADD_INGREDIENT:
		return{
			...state,
			ingredients: {
				...state.ingredients,
				[action.ingredientName]: state.ingredients[action.ingredientName] + 1
			},
			totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
		};
	case actionTypes.REMOVE_INGREDIENT:
		return{
			...state,
			ingredients: {
				...state.ingredients,
				[action.ingredientName]: state.ingredients[action.ingredientName] - 1
			},
			totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
		};
	case actionTypes.SET_INGREDIENT:
		return {
			...state,
			ingredients: action.ingredients,
			error: false,
			totalPrice: 3
		};
	case actionTypes.FETCH_INGREDIENT_FAILED:
		return {
			...state,
			error: true
		};
	default:
		return state;
	}
};

export default burgerBuilder;