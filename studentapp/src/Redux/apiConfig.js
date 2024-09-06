import axios from 'axios';

let Api = null;

const API_BASE_URL = 'http://localhost:5000/api/'
Api = axios.create({
    baseURL: API_BASE_URL
})

export default Api;                
