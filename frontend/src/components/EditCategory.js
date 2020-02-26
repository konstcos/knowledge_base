import React, {Component} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class EditCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            content: '',
        };
        this.textAreaHandle = this.textAreaHandle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    textAreaHandle(event) {
        console.log(event.target.value);
        const content = event.target.value;
        this.setState({
            content
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        console.log('сработала кнопка обработки запроса');
    };

    render() {
        return (
            <div>
                <div>
                    введеный текст: {this.state.content}
                </div>

                <div>
                    <textarea
                        value={this.state.content}
                        cols="30"
                        rows="10"
                        placeholder={'введи текст'}
                        onChange={this.textAreaHandle}></textarea>
                </div>

                <div>
                    <button onClick={this.handleSubmit}>Сохранить</button>
                </div>
            </div>
        )
    }

}


export default EditCategory;