import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
	console.log('order' + JSON.stringify(props.ingredients));
    
	const ingredients = []
	for(let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName]
		});
	}

	const ingredientOutput = ingredients.map(ig => {
		return <span style={{
			textTransfor: 'capitalize',
			display: 'inline-block',
			margin: '0 8px',
			border: '1px solid #ccc',
			padding: '10px'

		}} key= {ig.name}> {ig.name} ({ig.amount})</span>;
	});

	return(
		<div className={classes.Order}>
			{ingredientOutput}
			<p> Price: <strong> USD {Number.parseFloat(props.price.toFixed(2))}</strong></p>
		</div>
	)
}

export default order;