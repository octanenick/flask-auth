import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  auth: {
    username: 'bobs',
    password: 'bobs'
  }
});

export default api;
