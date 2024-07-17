import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getCategories = () => {
    return axios.get(`${API_URL}/api/categories`);
};

export const addCategory = (category) => {
    return axios.post(`${API_URL}/api/categories/add`, null, {
        params: {
            category: category
        }
    });
};

export const addSubcategory = (category, subcategory, isLeft = true) => {
    return axios.post(`${API_URL}/api/categories/addSubcategory`, null, {
        params: { category, subcategory, isLeft },
    });
}
export const subcategoryResponse = (category) =>{
return axios.get(`${API_URL}/api/categories/subcategories?category=${category}`)
}
export const addProductToSubcategory = (category, subcategory, product) => {
    return axios.post(`${API_URL}/api/categories/addProductToSubcategory`, product, {
    params: {
                category: category,
                subcategory: subcategory
            },
    headers: {
                   'Content-Type': 'application/json'
               }
    });
    }
export const getProductsInSubcategory = (category, subcategory) => {
    return axios.get(`${API_URL}/api/categories/products?category=${category}&subcategory=${subcategory}`);
};

export const getAllProducts = (page, size) => {
    return axios.get(`${API_URL}/products?page=${page}&size=${size}`);
};
export const searchProductsByName = (name, page, size) => {
    const url = `${API_URL}/products/search?name=${name}&page=${page}&size=${size}`;
    console.log('Search URL:', url);
    return axios.get(url);
};


export const getProductsByPrice = (price, sortField, sortDirection) => {
    return axios.get(`${API_URL}/price`, {
        params: { price, sortField, sortDirection }
    });
};

export const updateProduct = (id, productDTO) => {
    return axios.put(`${API_URL}/products/updateProduct?id=${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: productDTO,
    });
};

export const deleteProduct = (id) => {
    return axios.delete(`${API_URL}/products/${id}`);
};
