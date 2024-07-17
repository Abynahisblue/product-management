import React, { useEffect, useState } from 'react';
import { addSubcategory, getCategories } from '../services/categoryService'; // Make sure to export fetchCategories

const SubcategoryForm = ({ onSubcategoryAdded = () => {} }) => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [isLeft, setIsLeft] = useState(true);
    const [message, setMessage] = useState('')

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setMessage('Error fetching categories ')
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addSubcategory(category, subcategory, isLeft);
            onSubcategoryAdded(response.data);
            setCategory('');
            setSubcategory('');
            setMessage('subcategory successfully added!')
        } catch (error) {
            console.error('Error adding subcategory:', error);
            setMessage('Error adding subcategory!')
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Subcategory</h2>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.category}>
                        {cat.category}
                    </option>
                ))}
            </select>
            <input
                type="text"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                placeholder="Enter subcategory name"
            />
            <div>
                <label>
                    <input
                        type="radio"
                        value="true"
                        checked={isLeft}
                        onChange={() => setIsLeft(true)}
                    />
                    Left
                </label>
                <label>
                    <input
                        type="radio"
                        value="false"
                        checked={!isLeft}
                        onChange={() => setIsLeft(false)}
                    />
                    Right
                </label>
            </div>
            <button type="submit">Add Subcategory</button>
            {message && <p className={message.includes('Error') ? 'text-danger' : 'text-success'}>{message}</p>}
        </form>
    );
};

export default SubcategoryForm;
