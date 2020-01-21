import React, {Component} from 'react';
import ReactDOM from "react-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CategoryIcon from '@material-ui/icons/Category';
import HomeWorkIcon from '@material-ui/icons/HomeWork';


import {MemoryRouter as Router} from 'react-router';
import {
    BrowserRouter,
    Link as RouterLink
} from "react-router-dom";
import Link from '@material-ui/core/Link';


class MainListItems extends Component {

    constructor(props) {
        super(props);
        this.location = window.location.pathname;

        this.state = {
            loading: false,
            categories: [],
            location: window.location.pathname
        };

        this.setLocation = this.setLocation.bind(this);
    }

    setLocation(loc) {
        this.setState({
            location: loc,
        });
    }

    render() {
        return (
            <div>
                <ListItem button component={RouterLink} to="/react"
                          selected={this.state.location === '/react'}
                          onClick={() => this.setLocation('/react')}>

                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Главная"/>
                </ListItem>
                <ListItem button component={RouterLink} to="/react/category"
                          selected={this.state.location === '/react/category'}
                          onClick={() => this.setLocation('/react/category')}>

                    <ListItemIcon>
                        <CategoryIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Категория"/>
                </ListItem>
                <ListItem button component={Link} href="/">
                    <ListItemIcon>
                        <HomeWorkIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Основная страница"/>
                </ListItem>
            </div>
        );
    }
}

export default MainListItems;

