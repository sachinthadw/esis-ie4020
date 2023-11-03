import axios from 'axios';

const axiosInstance = axios.create();


// Fetch CSRF token from your Node.js server
axios.get('http://localhost:8070/api/csrf-token')
    .then(response => {
        axiosInstance.defaults.headers.common['CSRF-Token'] = response.data.csrfToken
    })
    .catch(error => {
        console.error('Error fetching CSRF token:', error);
    });



export default axiosInstance;
