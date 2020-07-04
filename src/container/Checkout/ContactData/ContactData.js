import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your name'
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
                    placeholder: 'street'
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
                    placeholder: 'zip code'
                },
                value:'',
                validation: {
                    required: true,
                    minlength: 5,
                    maxlength: 5
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
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                   options: [
                       {value: 'fastest', displayValue:'fastest'},
                       {value: 'fa', displayValue:'fastest'},
                   ]
                },
                value: 'fastest',
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
      this.setState({ loading: true });
      const formData = {};
      for(let formElementIdentifier in this.state.orderForm) {
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
      }
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        orderData: formData
      };
      console.log(formData)
      axios
        .post("/orders.json", order)
        .then((response) => {
          this.setState({ purchaseing: false });
          this.setState({ loading: false });

          this.props.history.push('/')
        })
        .catch((error) => {
          this.setState({ purchaseing: false });
          this.setState({ loading: false });
        });
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

export default withRouter(ContactData);

