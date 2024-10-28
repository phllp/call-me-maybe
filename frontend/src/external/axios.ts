import axios from 'axios';

const api = axios.create({
  //   headers: { 'Access-Control-Allow-Origin': '*' },
  baseURL: import.meta.env.VITE_API_HOST || 'https://localhost:3000',
});

export default api;
