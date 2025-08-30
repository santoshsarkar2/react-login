import API from './api';

// Helper function to handle errors consistently
const handleApiError = (error) => {
    if (error.response) {
        // Server responded with a status code outside 2xx
        throw new Error(error.response.data.message || 'Server error');
    } else if (error.request) {
        // No response received
        throw new Error('Network error: No response from server');
    } else {
        // Error setting up the request
        throw new Error(`Request error: ${error.message}`);
    }
};


export const login = async (email, password) => {
    try {
        console.log("AuthService login called", email, password);
        const response = await API.post('/auth/login', { email, password });
        return response;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const signup = async (first_name, last_name, email, password, avatar) => {
    try {
        const response = await API.post('/auth/signup', { first_name, last_name, email, password, avatar });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
};


export const getProfile = async () => {    
    try {        
        const response = await API.get('/auth/profile');
        console.log("Profile called");        
        return response;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }   
};

export const updateProfile = async (name, email, password, avatar) => {
    try {
        const response = await API.put('/auth/profile', { name, email, password, avatar });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
};
export const updateUser = async (userId, userData) => {
    try {
        //const response = await API.put('/users', { userData });
        const response = await API.put(`/users/${userId}`, userData);     

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
}
