import React, {Component} from "react";
import axios from 'axios';


class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            categories: [],
        };

        this.getCategories = this.getCategories.bind(this);

    }

    getCategories() {
        // alert('getCat');

        console.log('get categories')

        // this.setState({
        //     loading: true,
        //     categories: [],
        // });
        //
        // axios.get(categoriesUrl, {})
        //     .then((data) => {
        //         console.log('все хорошо');
        //         console.log(data);
        //         this.setState({
        //             loading: false,
        //             categories: data.data,
        //         });
        //     })
        //     .catch(err => {
        //         console.log('запрос с ошибкой');
        //         console.log(err);
        //         this.setState({
        //             loading: false,
        //         });
        //
        //     });
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
                                this.state.categories.length && (
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
                                )
                            }
                        </div>
                    )

                }

                <br/>
                <br/>
                <div onClick={this.getCategories}>
                    обновить категории
                </div>
            </div>

        );
    }

}

export default Categories;