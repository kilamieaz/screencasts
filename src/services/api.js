import axios from 'axios';

export default () => {
    let token = JSON.parse(window.localStorage.accessToken);
    return axios.create({
        baseURL: 'http://localhost:8000/api/v1',
        withCredentials: false,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token
        }
    });
}