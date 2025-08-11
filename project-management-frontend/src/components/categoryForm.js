import React, { useState } from 'react';
import { addCategory } from '../services/categoryService';

const CategoryForm = () => {
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCategory(category);
            setCategory('');
            setMessage('Category successfully added!');
        } catch (error) {
            console.error('Error adding category:', error);
            setMessage('Error adding category. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add New Category</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter category name"
                    required
                />
                <button type="submit">Add Category</button>
            </form>
            {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
        </div>
    );
};

export default CategoryForm;