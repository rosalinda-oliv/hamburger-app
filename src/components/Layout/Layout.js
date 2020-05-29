import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliar';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer:false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleHandler = () => {
        console.log('ta mal');
        
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
render(){
    return(
<Aux>
    <div>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}></Toolbar>
        <SideDrawer open={this.state.showSideDrawer}
        closed={this.sideDrawerCloseHandler}
        />
    </div>
    <main className={classes.Content}>
        {this.props.children}
    </main>
</Aux>
    )
}
}

export default Layout;
