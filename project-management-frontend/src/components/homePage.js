import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, searchProductsByName, deleteProduct } from '../services/categoryService';
import Products from './products';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [currentCategory, setCurrentCategory] = useState(''); // add current category state
    const [currentSubcategory, setCurrentSubcategory] = useState(''); // add current subcategory state
    const navigate = useNavigate();

    useEffect(() => {
        if (searchTerm) {
            fetchSearchedProducts(searchTerm, page, size);
        } else {
            fetchAllProducts(page, size);
        }
    }, [searchTerm, page, size]);

    const fetchAllProducts = async (page, size) => {
        try {
            const response = await getAllProducts(page, size);
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
            setCurrentCategory(response.data.category); // set current category
            setCurrentSubcategory(response.data.subcategory); // set current subcategory
            console.log(response)
        } catch (error) {
            console.error('Error fetching all products:', error);
        }
    };

    const fetchSearchedProducts = async (searchTerm, page, size) => {
        try {
            const response = await searchProductsByName(searchTerm, page, size);
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
            setCurrentCategory(response.data.category); // set current category
            setCurrentSubcategory(response.data.subcategory); // set current subcategory
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const handleSearch = () => {
        setPage(0); // Reset to first page on new search
        fetchSearchedProducts(searchTerm, 0, size);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSizeChange = (newSize) => {
        setSize(newSize);
        setPage(0); // Reset to first page on size change
    };

    const handleEdit = (product) => {
        navigate('/edit-product', { state: { product } });
    };

    const handleDelete = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(productId).then(() => {
                setProducts(products.filter(p => p.id !== productId));
            }).catch((error) => {
                console.error('Error deleting product:', error);
            });
        }
    };

    return (
        <div>
            <h1>Product Management System</h1>
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name"
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <Products products={products} category={currentCategory} subcategory={currentSubcategory} onEdit={handleEdit} onDelete={handleDelete} />
            <div>
                <button onClick={() => handlePageChange(Math.max(page - 1, 0))} disabled={page === 0}>
                    Previous
                </button>
                <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}>
                    Next
                </button>
            </div>
            <div>
                <label>
                    Items per page:
                    <select value={size} onChange={(e) => handleSizeChange(parseInt(e.target.value))}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default HomePage;
