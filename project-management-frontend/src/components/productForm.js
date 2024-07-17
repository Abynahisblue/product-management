import React, { useState, useEffect } from 'react';
import { addProductToSubcategory, getCategories, subcategoryResponse } from '../services/categoryService';

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        description: '',
        image: '',
        quantity: 0
    });
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setMessage('Error fetching categories');
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const fetchSubcategories = async () => {
                try {
                    const response = await subcategoryResponse(selectedCategory);
                    setSubcategories(response.data);
                } catch (error) {
                    console.error('Error fetching subcategories:', error);
                    setMessage('Error fetching subcategories');
                }
            };

            fetchSubcategories();
        } else {
            setSubcategories([]);
        }
    }, [selectedCategory]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProduct(prevProduct => ({ ...prevProduct, image: reader.result }));
            };
            reader.readAsDataURL(file); // Convert to base64
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            ...product,
            image: imageURL || product.image, // Use imageURL if provided, otherwise use the uploaded image
            category: selectedCategory,
            subcategory: selectedSubcategory
        };
        try {
            await addProductToSubcategory(selectedCategory, selectedSubcategory, productData);
            setProduct({ name: '', price: 0, description: '', image: '', quantity: 0 });
            setImageURL('');
            setSelectedCategory('');
            setSelectedSubcategory('');
            setMessage('Product successfully added!');
        } catch (error) {
            console.error('Error adding product:', error);
            setMessage('Error adding product. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Product</h2>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.category}>
                        {category.category}
                    </option>
                ))}
            </select>
            <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                disabled={!selectedCategory}
            >
                <option value="">Select Subcategory</option>
                {subcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.category}>
                        {subcategory.category}
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
            ></textarea>
            <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
            />
            <input
                type="text"
                name="image"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="Image URL"
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
            {message && <p className={message.includes('Error') ? 'text-danger' : 'text-success'}>{message}</p>}
        </form>
    );
};

export default ProductForm;
