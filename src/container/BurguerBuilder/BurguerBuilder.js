import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliar';
import Burguer from '../../components/Burguer/Burguer';

class BurguerBuilder extends Component {
    render () {
        return (
            <Aux>
                <Burguer />
                <p> Controlador Hamburguer</p>
            </Aux>
        )
    }
}

export default BurguerBuilder;