import React, {Component} from "react"

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            category: {},
        };

        this.getCategory = this.getCategory.bind(this);
    }

    getCategory() {
        console.log('запрос на получение категорий');
    }

    render() {
        return (
          <div>
              данные по одной категории
          </div>
        );
    }
}

export default Category;