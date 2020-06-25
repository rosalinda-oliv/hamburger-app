import React, { Component } from "react";

import Button from "../../../UI/Button/Button";
import axios from '../../../../axios-order'
import Spinner from '../../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        loading: false
    }

  orderHandler = (event) => {
      event.preventDefault();

      this.setState({ loading: true });
      const order = {
        ingredients: this.state.ingredients,
        price: this.state.price,
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
        .then((responde) => {
          this.setState({ purchaseing: false });
          this.setState({ loading: false });
        })
        .catch((error) => {
          this.setState({ purchaseing: false });
          this.setState({ loading: false });
        });
  }

  render() {
      let form = (
        <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your Email" />
        <input type="text" name="zipcode" placeholder="Zip code" />
        <input type="text" name="street" placeholder="Street" />
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
