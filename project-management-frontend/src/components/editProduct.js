import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProduct } from '../services/categoryService';

const EditProduct = () => {
    const [message, setMessage] = useState('')
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state;
    const [formData, setFormData] = useState({
        name: product.name || '',
              description: product.description || '',
              price: product.price || '',
              image: product.image || '',
              quantity: product.quantity || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(product.id, formData);
            navigate('/');
            setMessage('Product updated successfully')
        } catch (error) {
            console.error('Error updating product:', error);
            setMessage('Error updating product!')
        }
    };

    return (
        <div>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleChange} />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={formData.price} onChange={handleChange} />
                </label>
                <label>
                    Image:
                    <input type="text" name="image" value={formData.image} onChange={handleChange} />
                </label>
                <label>
                    Quantity:
                    <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
                </label>
                <button type="submit">Update Product</button>
            </form>
           {message && <p className={message.includes('Error') ? 'text-danger' : 'text-success'}>{message}</p>}
        </div>
    );
};

export default EditProduct;
