import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-hamburger-f5381.firebaseio.com/'
});

export default instance;