import axios from 'axios';

class API {

    host;

    constructor() {

    }

    receive(point, requestData = {}) {
        console.log('гет из api');
        console.log(point);

        return new Promise(result => {

            axios.post(point, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                }
            })
                .then((data) => {
                    console.log(data);

                    result(data.data);

                })
                .catch(err => {
                    console.log('запрос с ошибкой');
                    console.log(err);

                    result({
                        status: 'exception',
                        data: err
                    });
                });
        });
    }

}

export default API;