// API-klient konfiguration med Axios.
// Axios er et HTTP-bibliotek der bruges til at kalde vores .NET backend API.
// baseURL sættes afhængigt af om appen kører på web eller mobil (forskellige IP-adresser).

import axios from 'axios';
import { Platform } from 'react-native';

// Opret en axios-instans med den rigtige base-URL for platformen
const api = axios.create({
  baseURL: Platform.OS === 'web'
    ? 'http://localhost:5179/api'       // Web: lokal backend
   //  'http://192.168.50.162:5179/api',
    : 'http://172.20.10.6:5179/api',    // Mobil: backend via netværks-IP
});

export default api;