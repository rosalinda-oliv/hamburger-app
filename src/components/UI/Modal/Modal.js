import React, { Component } from "react";

import Aux from "../../../hoc/Auxiliar";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentDidUpdate() {
    console.log("Modal WillUpdate");
  }

  render() {
    return (
      <Aux>
        <div
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
          className={classes.Modal}
        >
          {this.props.children}
        </div>
        <Backdrop clicked={this.props.modelClosed} show={this.props.show} />
      </Aux>
    );
  }
}

export default Modal;
