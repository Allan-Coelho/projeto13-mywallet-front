import axios from "axios";

const ENDPOINT = "http://localhost:5000";

function postSignUp(body) {
    const promise = axios.post(`${ENDPOINT + "/authentication"}`, body);
    return promise;
}

function postSignIn(body) {
    const promise = axios.post(`${ENDPOINT + "/authentication"}`, body);
    return promise;
}

function postTransactions(body, config) {
    const promise = axios.post(`${ENDPOINT + "/transactions"}`, body, config);
    return promise;
}

function getTransactions(config) {
    const promise = axios.get(`${ENDPOINT + "/transactions"}`, config);
    return promise;
}

export {
    postSignUp,
    postSignIn,
    postTransactions,
    getTransactions
}