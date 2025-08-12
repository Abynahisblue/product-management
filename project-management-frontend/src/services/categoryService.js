import axios from 'axios';

const API_URL = 'http://localhost:8082';

export const getCategories = () => {
    return axios.get(`${API_URL}/api/categories`);
};

export const addCategory = (category) => {
    return axios.post(`${API_URL}/api/categories/add`, null, {
        params: { category }
    });
};

export const addProductToCategory = (category, product) => {
    return axios.post(`${API_URL}/api/categories/addProduct`, product, {
        params: { category },
        headers: { 'Content-Type': 'application/json' }
    });
};

export const getProductsInCategory = (category) => {
    return axios.get(`${API_URL}/api/categories/category/products?categoryName=${category}`);
};

export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_URL}/api/images/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};