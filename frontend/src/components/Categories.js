import React, {Component} from "react";
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {
    BrowserRouter,
    Link as RouterLink
} from "react-router-dom";
import API from './shared/api'
import {loaded, loading} from "../actions/loading";

class Categories extends Component {

    api;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            categories: [],
        };

        this.api = new API();

        this.getCategories = this.getCategories.bind(this);

    }

    getCategories() {

        // store.dispatch(loading());
        // this.props.store.dispatch(loading());

        this.api.receive(categoriesUrl, {})
            .then(
                result => {

                    this.setState({
                        loading: false,
                    });

                    // store.dispatch(loaded());

                    if (result.status === 'success') {

                        console.log('success');

                        this.setState({
                            categories: result.articles,
                        });

                    } else if (result.status === 'fail') {
                        console.log('fail');
                    } else {
                        console.log('except');
                    }

                }
            );
    }

    componentDidMount() {
        this.getCategories();
    }

    render() {
        return (
            <div>

                {this.state.loading ?
                    (
                        <div>идет загрузка</div>
                    ) :
                    (
                        <div>
                            {

                                this.state.categories.length ?
                                    (
                                        <div>
                                            {
                                                this.state.categories.map(category => (
                                                        <div id={"category_" + category.id} key={"category_" + category.id}>
                                                            {category.name}
                                                        </div>
                                                    )
                                                )
                                            }

                                        </div>
                                    ) :
                                    (
                                        'нет категорий'
                                    )
                            }
                        </div>
                    )
                }

                <br/>
                <br/>

                <Box component='span' m={1}>
                    <Button variant="contained" onClick={this.getCategories}>
                        обновить категории
                    </Button>
                </Box>

                <Box component='span' m={1}>

                    <Button variant="contained" component={RouterLink} to='/react/edit/category' color="primary">
                        создать новую категорию
                    </Button>
                </Box>

            </div>

        );
    }
}

export default Categories;