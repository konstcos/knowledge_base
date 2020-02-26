import React, {Component} from "react"
import PropTypes from "prop-types"

class TextComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    render() {
        return (
            <div>
                тестовый роут
            </div>
        )
    }

}

export const TestFunc = props => {

    const [test, setTest] = React.useState('это тестовые данные');

    return (
        <div>
            <div>
                тестовая функция -> {test}
            </div>
            <div onClick={props.set_test}>
                это пропс -> {props.test_p}
            </div>
        </div>
    )
};


export default TextComponent;

