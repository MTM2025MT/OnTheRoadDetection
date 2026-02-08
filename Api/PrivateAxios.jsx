import axios from 'axios';
const Url='https://localhost:7099/api';
const PrivateAxios = axios.create({
  baseURL: Url, // Replace with your API base URL
    // timeout: 10000, // Set a timeout limitS
    headers: {
        'Content-Type': 'application/json',
        // Add other custom headers if needed
    },
    withCredentials: true, // Include cookies for cross-site requests
});

export default PrivateAxios;