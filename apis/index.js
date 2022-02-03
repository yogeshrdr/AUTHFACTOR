import axios from 'axios';

const API = axios.create({ baseURL: 'https://authfactor.herokuapp.com'})

export const emaillogin = (requestbody) => API.post('/login', requestbody);
export const matchotp = (requestbody) => API.post('/', requestbody);

