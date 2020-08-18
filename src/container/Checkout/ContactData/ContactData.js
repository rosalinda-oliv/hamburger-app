import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
            },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
        },
            zipCode:{
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: 'ZIP code'
                },
                value:'',
                validation: {
                    required: true,
                    minlength: 5,
                    maxlength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                   options: [
                       {value: 'fastest', displayValue:'Fastest'},
                       {value: 'cheapest', displayValue:'Cheapest'},
                   ]
                },
                value: '',
                validation:{},
                valid: true,
                touched: false
            }
        },
        formIsValid: false,
        loading:false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if( !rules ) {
            return true;
        }

        if( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if( rules.minLength && isValid ) {
            isValid = value.length >= rules.minLength;
        }

        if( rules.maxLength && isValid ) {
            isValid = value.length <= rules.maxLength;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updateFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updateFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

  orderHandler = (event) => {
      event.preventDefault();

      const formData = {};
      for(let formElementIdentifier in this.state.orderForm) {
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
      }
      const order = {
        ingredients: this.props.ings,
        price: this.props.price,
        orderData: formData
      };
      //console.log(formData)
      this.props.onOrderBurger(order);
  }

  render() {
        const formsElementArray = [];
        for (let key in this.state.orderForm) {
            formsElementArray.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
      let form = (
        <form onSubmit={this.orderHandler}>
            {formsElementArray.map(formElement => (
                <Input
                key={formElement.id}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                value={formElement.config.value}
                />
            ))}
        <Button buttonType="Success" disabled={!this.state.formIsValid}> Order </Button>
      </form>
      )
      if(this.state.loading) {
          form = <Spinner/>
      }

    return (
      <div className={classes.ContactData}>
       <h4> Enter your contact Data</h4>
       {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    oneOrderBurger: (orderData) => dispatch(actions.purchaseBurgerStart(orderData));
}

export default connect(mapStateToProps)(withErrorHandler(ContactData, axios));

