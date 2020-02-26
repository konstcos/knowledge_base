import React, {Component} from "react";
import PropTypes from 'prop-types'

class Tags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        // this.props = {
        //     tag
        // }
    }

    static propTypes = {

    };

    render() {
        return (
            <div>Таги</div>
        );
    }
}

export default Tags;