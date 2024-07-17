import React, { useEffect, useState } from 'react';
import { getProductsInSubcategory } from '../services/categoryService';

const ProductList = ({ category, subcategory, products }) => {

//    const [products, setProducts] = useState([]);
//
//    useEffect(() => {
//        const fetchProducts = async () => {
//            try {
//                const response = await getProductsInSubcategory(category, subcategory);
//                console.log(response)
//                setProducts(response.data);
//            } catch (error) {
//                console.error('Error fetching products:', error);
//            }
//        };
//
//        if (category && subcategory) {
//            fetchProducts();
//        }
//    }, [category, subcategory]);


    return (
        <div>
            <h2>Products in {subcategory} of {category}</h2>
            <ul className="product-list">
                {products.map((product) => (
                    <li key={product.id} className="product-card">
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product-details">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-quantity">Quantity: {product.quantity}</p>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">{product.price}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
