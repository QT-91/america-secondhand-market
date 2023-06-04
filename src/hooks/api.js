import { REACT_APP_API_URL, REACT_APP_DB_URL } from '@env';
import axios from 'axios';

const dbURL = REACT_APP_DB_URL;

const api = axios.create({
    baseURL: REACT_APP_API_URL,
});

export { dbURL };
export default api;