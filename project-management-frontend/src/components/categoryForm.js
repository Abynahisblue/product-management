import React, { useState } from 'react';
import { addCategory } from '../services/categoryService';

const CategoryForm = ({ onCategoryAdded = () => {} }) => {
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addCategory(category);
            console.log('API Response:', response); // Log the response
            if (response.status === 200 || response.status === 201) { // Check for successful status codes
                onCategoryAdded(response.data);
                setCategory('');
                setMessage('Category successfully added!');
            } else {
                setMessage('Error adding category. Please try again.');
            }
        } catch (error) {
            console.error('Error adding category:', error);
            setMessage('Error adding category. Please try again.');
        }
    };

    return (
        <div className="mb-4">
            <h2>Add New Category</h2>
            <form onSubmit={handleSubmit} className="form-inline">
                <input
                    type="text"
                    className="form-control mr-2"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter category name"
                    required
                />
                <button type="submit" className="btn btn-primary">Add Category</button>
            </form>
            {message && <p className={message.includes('Error') ? 'text-danger' : 'text-success'}>{message}</p>}
        </div>
    );
};

export default CategoryForm;
