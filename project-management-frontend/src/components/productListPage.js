import React, { useState, useEffect } from 'react';
import { getProductsInSubcategory, getCategories } from '../services/categoryService';
import ProductList from './productList';
import '../App.css';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

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

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const subCat = params.get('subcatname');
        const cat = params.get('catname');
        setSelectedCategory(cat);
        setSelectedSubcategory(subCat);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            if (selectedCategory && selectedSubcategory) {
                try {
                    const response = await getProductsInSubcategory(selectedCategory, selectedSubcategory);
                    setProducts(response.data);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            }
        };

        fetchProducts();
    }, [selectedCategory, selectedSubcategory]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedSubcategory('');
    };

    const handleSubcategoryChange = (e) => {
        setSelectedSubcategory(e.target.value);
    };

    const selectedCategoryObject = categories.find((cat) => cat.category === selectedCategory);

    return (
        <div className="container">
            <h1>View Products by Category</h1>
            <div>
                <label htmlFor="categorySelect">Select Category:</label>
                <select
                    id="categorySelect"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.category}>
                            {category.category}
                        </option>
                    ))}
                </select>
            </div>
            {selectedCategory && selectedCategoryObject && selectedCategoryObject.subcategories && (
                <div>
                    <label htmlFor="subcategorySelect">Select Subcategory:</label>
                    <select
                        id="subcategorySelect"
                        value={selectedSubcategory}
                        onChange={handleSubcategoryChange}
                    >
                        <option value="">Select Subcategory</option>
                        {selectedCategoryObject.subcategories.map((subcat) => (
                            <option key={subcat.id} value={subcat.category}>
                                {subcat.category}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {selectedSubcategory && (
                <ProductList
                    category={selectedCategory}
                    subcategory={selectedSubcategory}
                    products={products}
                />
            )}
        </div>
    );
};

export default ProductListPage;
