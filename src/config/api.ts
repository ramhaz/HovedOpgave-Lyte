import axios from 'axios';

//const api = axios.create({
//  baseURL: 'http://172.20.10.6:5179/api',
//});

const api = axios.create({
  baseURL: 'http://192.168.50.162:5179/api',
});

export default api;