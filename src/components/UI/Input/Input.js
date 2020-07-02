import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
	let inputElement = null;
	const { elementConfig, changed, value, elementType } = props;
	switch (elementType) {
	case( 'input'):
		inputElement = <input
			className={classes.InputElement}
			{...elementConfig}
			value={value}
			onChange={changed}
		/>;
		break;
	case ('textarea'):
		inputElement = <textarea
			className={classes.InputElement}
			{...elementConfig}
			value={value}
			onChange={changed}
		/>;
		break;
	case('select'):
		inputElement = (
			<select
				className={classes.InputElement}
				value={value}
				onChange={changed}
			>
				{elementConfig.options.map(option => (
					<option key={option.value} value={option.value}> {option.displayValue}</option>
				))}
			</select>
		);
		break;
	default:
		inputElement = <input
			className={classes.InputElement}
			{...props.elementConfig}
			value={props.value}
			onChange={props.changed}
		/>;
	}
	return(
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default input;