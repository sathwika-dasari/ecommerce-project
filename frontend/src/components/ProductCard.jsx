import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-image-container">
                <img 
                    src={product.image_url || 'https://via.placeholder.com/250x250?text=No+Image'} 
                    alt={product.name} 
                    className="product-image"
                />
            </Link>
            <div className="product-info">
                <Link to={`/product/${product.id}`} className="product-title-link">
                    <h3 className="product-title">{product.name}</h3>
                </Link>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button 
                    className="btn btn-primary w-full" 
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
