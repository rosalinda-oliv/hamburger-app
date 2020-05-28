import React from 'react';

import Aux from '../../../hoc/Auxiliar';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    return (
        <Aux>
            <div style={{
                transform:props.show ? 'translateY(0)' : 'translateY(100vh)',
                opacity:props.show ? '1' : '0'
            }} className={classes.Modal}>
                {props.children}
            </div>
            <Backdrop clicked={props.modelClosed} show= {props.show} />
        </Aux>

    );
}

export default modal