import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CategoryForm from './components/categoryForm';
import CategoryList from './components/categoryList';
import ProductListPage from './components/productListPage';
import SubcategoryForm from './components/subcategoryForm';
import ProductForm from './components/productForm';
import EditProduct from './components/editProduct';
import HomePage from './components/homePage';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="container">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/add-category">Add Category</Link></li>
                        <li><Link to="/add-subcategory">Add Subcategory</Link></li>
                        <li><Link to="/add-product-to-subcategory">Add Product to Subcategory</Link></li>
                        <li><Link to="/view-categories">View Categories</Link></li>
                        <li><Link to="/view-products">View Products</Link></li>
                        <li><Link to="/edit-products">Edit Products</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} /> {/* Use HomePage for the home route */}
                    <Route path="/add-category" element={<CategoryForm />} />
                    <Route path="/view-categories" element={<CategoryList />} />
                    <Route path="/view-products" element={<ProductListPage />} />
                    <Route path="/add-subcategory" element={<SubcategoryForm />} />
                    <Route path="/add-product-to-subcategory" element={<ProductForm />} />
                    <Route path="/edit-product" element={<EditProduct />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
