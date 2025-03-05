import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/', // Ensure this matches the backend port (5000)
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  console.log('Sending request:', config); // Log the request for debugging
  return config; // No token handling needed since authentication is removed
});

api.interceptors.response.use(
  (response) => {
    console.log('Received response:', response); // Log the response for debugging
    return response;
  },
  (error) => {
    console.error('API Error:', error.response ? error.response : error);
    return Promise.reject(error);
  }
);

export default api;