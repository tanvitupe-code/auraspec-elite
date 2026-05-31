import axios from 'axios';

// Create a centralized Axios instance configured for your network
const apiClient = axios.create({
  baseURL: 'http://localhost:5001/api', // Points cleanly to your local backend server
  timeout: 10000, // Safe 10-second timeout window
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor hook to catch runtime issues smoothly
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('📊 Matrix Core Network Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;