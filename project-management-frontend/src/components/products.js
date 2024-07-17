import React from 'react';

const Products = ({ products, category, subcategory, onEdit, onDelete }) => {
    if (!Array.isArray(products) || products.length === 0) {
        return <p>No products available.</p>;
    }

    return (
        <div>
            <ul className="product-list">
                {products.map((product) => (
                    <li key={product.id} className="product-card">
                        <div className="product-image">
                            <img
                                src={product.image}
                                alt={product.name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/150'; // Fallback image URL
                                }}
                            />
                        </div>
                        <div className="product-details">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-quantity">Quantity: {product.quantity}</p>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">${product.price}</p>
                        </div>
                        <div className="product-actions">
                            <button onClick={() => onEdit(product, category, subcategory)}>Edit</button>
                            <button onClick={() => onDelete(product.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
