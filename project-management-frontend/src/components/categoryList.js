import React, { useEffect, useState } from 'react';
import { getCategories, getProductsInCategory } from '../services/categoryService';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);

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

    const handleCategoryClick = async (category) => {
        setSelectedCategory(category);
        try {
            const response = await getProductsInCategory(category.category);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        }
    };

    return (
        <div>
            <h2>Categories & Products</h2>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h3>Categories</h3>
                    <ul>
                        {Array.isArray(categories) && categories.map((category) => (
                            <li 
                                key={category.id} 
                                onClick={() => handleCategoryClick(category)}
                                style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ccc', margin: '5px 0' }}
                            >
                                {category.category}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 1 }}>
                    {selectedCategory && (
                        <div>
                            <h3>Products in {selectedCategory.category}</h3>
                            {Array.isArray(products) && products.length > 0 ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                                    {Array.isArray(products) && products.map((product) => (
                                        <div key={product.id} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                                            {product.image && (
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name}
                                                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }}
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            )}
                                            <h4 style={{ margin: '0 0 10px 0' }}>{product.name}</h4>
                                            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#007bff', margin: '5px 0' }}>${product.price}</p>
                                            <p style={{ margin: '5px 0', color: '#666' }}>{product.description}</p>
                                            <p style={{ margin: '5px 0', fontSize: '14px' }}>Quantity: {product.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No products in this category.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryList;