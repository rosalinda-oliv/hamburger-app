import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your name'
                },
                value:''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'street'
            },
                value:''
        },
            zipCode:{
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: 'zip code'
                },
                value:''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value:''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                   options: [
                       {value: 'fastest', displayValue:'fastest'},
                       {value: 'fa', displayValue:'fastest'},
                   ]
                }
            }
        },
        loading:false
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updateFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updateFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedOrderForm;
        this.setState({orderForm: updatedOrderForm});
    }

  orderHandler = (event) => {
      event.preventDefault();
      this.setState({ loading: true });
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        customer: {
          name: "Rosi",
          address: {
            street: "dcjd",
            zipCode: "1111",
            country: "Portugal",
          },
          email: "test@hhh.com",
        },
        deliveryMethod: "fastest",
      };
      axios
        .post("/orders.json", order)
        .then((response) => {
          this.setState({ purchaseing: false });
          this.setState({ loading: false });
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
        <form>
            {formsElementArray.map(formElement => (
                <Input
                key={formElement.id}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                />
            ))}
        <Button clicked={this.orderHandler} buttonType="Success"> Order </Button>
      </form>
      )
      if(this.state.loading) {
          form = <Spinner/>
      }

    return (
      <div>
       <h4> Enter your contact Data</h4>
       {form}
      </div>
    );
  }
}

export default ContactData;
