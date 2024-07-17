import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/categoryService';
import CategoryTree from './categoryTree';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <div>
            <h2>Category List</h2>
            <CategoryTree categories={categories} />
        </div>
    );
};

export default CategoryList;
