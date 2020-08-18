import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurguerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseBurguerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
	    error: error
	};
};

export const purchaseBurgerStart = (orderData) => {
	return dispatch => {
		axios
			.post('/orders.json', orderData)
			.then((response) => {
			    console.log(response.data);
			    dispatch(purchaseBurguerSuccess(response.data, orderData));
			})
			.catch((error) => {
			    dispatch(purchaseBurguerFail(error));
			});
	};
};