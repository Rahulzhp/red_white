import React from 'react';
import "../Styles/Productlist.css";

const ProductList = ({ products }) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <div className="product" key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="price">${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
