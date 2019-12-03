import axios from 'axios';

export default () => {
    let token = window.localStorage.getItem('accessToken');
    token = token === null ? null : JSON.parse(token)
    // axios.interceptors.response.use(undefined, error => {
    //     const originalRequest = error.config;

    //     if (error.response.status === 401 && !originalRequest._retry) {

    //         originalRequest._retry = true;

    //         return axios.post('http://localhost:8000/api/v1/refresh')
    //             .then(({
    //                 data
    //             }) => {
    //                 window.localStorage.setItem('accessToken', data.access_token);
    //                 axios.defaults.headers.common['Authorization'] = 'brader ' + data.access_token;
    //                 originalRequest.headers['Authorization'] = 'brader ' + data.access_token;
    //                 return axios(originalRequest);
    //             });
    //     }
    //     return Promise.reject(error)
    // })
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