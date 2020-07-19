import * as actionTypes from './actions';

const initialState = {
	ingredients: {
		salad: 0,
		cheese: 0,
		meat: 0,
		tofu: 0,
		ketchup: 0,
		avocadoMayo: 0,
	},
	totalPrice: 3
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.3,
	meat: 1.3,
	tofu: 1.8,
	ketchup: 0.2,
	avocadoMayo: 0.8,
};

const reducer = (state = initialState, action) => {
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
	default:
		return state;

	}
};

export default reducer;