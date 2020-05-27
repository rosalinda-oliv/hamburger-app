import React from 'react';

import Aux from '../../hoc/Auxiliar';
import classes from './Layout.module.css';


const layout = (props) => (
<Aux>
    <div>
        <p>Componentes</p>
    </div>

    <main className={classes.Content}>
        {props.children}
    </main>
</Aux>
)

export default layout;