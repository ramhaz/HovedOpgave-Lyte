import axios from 'axios';
import { Platform } from 'react-native';

const api = axios.create({
  baseURL: Platform.OS === 'web'
    ? 'http://localhost:5179/api'
   //  'http://192.168.50.162:5179/api',
    : 'http://172.20.10.6:5179/api',
});

export default api;