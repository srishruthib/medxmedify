import axios from 'axios';

const BASE_URL = 'https://meddata-backend.onrender.com';

// Function to get all states
export const getStates = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/states`);
        return response.data;
    } catch (error) {
        console.error('Error fetching states:', error);
        throw error; // Re-throw to allow calling components to handle it
    }
};

// Function to get cities for a specific state
export const getCities = async (state) => {
    try {
        // Encode state names for URL parameters to handle spaces/special characters
        const encodedState = encodeURIComponent(state);
        const response = await axios.get(`${BASE_URL}/cities/${encodedState}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching cities for ${state}:`, error);
        throw error;
    }
};

// Function to get medical centers based on state and city
export const getMedicalCenters = async (state, city) => {
    try {
        // Encode state and city names for URL parameters
        const encodedState = encodeURIComponent(state);
        const encodedCity = encodeURIComponent(city);
        const response = await axios.get(`${BASE_URL}/data?state=${encodedState}&city=${encodedCity}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching medical centers for ${city}, ${state}:`, error);
        throw error;
    }
};
