import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError('Product not found.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="loader">Loading product details...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!product) return <div className="error-message">Product not found.</div>;

    return (
        <div className="product-details-container">
            <div className="back-link-container">
                <Link to="/" className="back-link">&larr; Back to Shop</Link>
            </div>
            
            <div className="product-details-content">
                <div className="product-details-image">
                    <img 
                        src={product.image_url || 'https://via.placeholder.com/500x500?text=No+Image'} 
                        alt={product.name} 
                    />
                </div>
                
                <div className="product-details-info">
                    <h1 className="product-details-title">{product.name}</h1>
                    <p className="product-details-price">${product.price.toFixed(2)}</p>
                    
                    <div className="product-details-status">
                        Status: {product.stock > 0 ? (
                            <span className="in-stock">In Stock ({product.stock} available)</span>
                        ) : (
                            <span className="out-of-stock">Out of Stock</span>
                        )}
                    </div>
                    
                    <p className="product-details-description">
                        {product.description || 'No description available for this product.'}
                    </p>
                    
                    <button 
                        className="btn btn-primary btn-lg mt-6"
                        onClick={() => addToCart(product)}
                        disabled={product.stock <= 0}
                    >
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
