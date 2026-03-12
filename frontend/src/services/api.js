// frontend/src/services/api.js

import axios from 'axios';

// Backend base URL
const API_URL = 'http://localhost:5000'; // make sure your backend is running here

// Fetch all products
export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/products`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products", error);
        throw error;
    }
};

// Fetch product by ID
export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/api/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${id}`, error);
        throw error;
    }
};

// Place an order
export const placeOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/api/orders`, orderData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Return backend response directly
        return response.data;

    } catch (error) {
        console.error("Error placing order", error);

        let message = "Failed to place order. Please try again.";
        if (error.response && error.response.data && error.response.data.message) {
            message = error.response.data.message;
        }

        return { success: false, message };
    }
};