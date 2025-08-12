import React, { useState, useEffect } from 'react';
import { getCategories } from '../services/categoryService';
import axios from 'axios';

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        description: '',
        image: '',
        quantity: 0,
        imageFile: null
    });
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('category', selectedCategory);
            formData.append('name', product.name);
            formData.append('description', product.description);
            formData.append('price', product.price);
            formData.append('quantity', product.quantity);
            if (product.imageFile) {
                formData.append('image', product.imageFile);
            }
            
            await axios.post('http://localhost:8082/api/categories/addProduct', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setProduct({ name: '', price: 0, description: '', image: '', quantity: 0, imageFile: null });
            setSelectedCategory('');
            setMessage('Product successfully added!');
        } catch (error) {
            console.error('Error adding product:', error);
            setMessage('Error adding product. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.category}>
                            {category.category}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Product Price"
                    required
                />
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Product Description"
                    required
                />
                <input
                    type="text"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    placeholder="Image URL or upload file below"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setProduct(prev => ({ ...prev, imageFile: file }));
                        }
                    }}
                />
                <input
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    required
                />
                <button type="submit">Add Product</button>
            </form>
            {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
        </div>
    );
};

export default ProductForm;