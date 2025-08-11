import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CategoryForm from './components/categoryForm';
import CategoryList from './components/categoryList';
import ProductForm from './components/productForm';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="container">
                <nav className="navbar">
                    <ul className="nav-list">
                        <li><Link to="/">Categories</Link></li>
                        <li><Link to="/add-category">Add Category</Link></li>
                        <li><Link to="/add-product">Add Product</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<CategoryList />} />
                    <Route path="/add-category" element={<CategoryForm />} />
                    <Route path="/add-product" element={<ProductForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
