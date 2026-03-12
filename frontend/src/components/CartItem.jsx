import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="cart-item">
            <img 
                src={item.image_url || 'https://via.placeholder.com/100x100?text=No+Image'} 
                alt={item.name} 
                className="cart-item-image"
            />
            <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="cart-item-title-link">
                    <h4 className="cart-item-title">{item.name}</h4>
                </Link>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-actions">
                <div className="quantity-controls">
                    <button 
                        className="btn btn-icon" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                        -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                        className="btn btn-icon" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                        +
                    </button>
                </div>
                <button 
                    className="btn btn-danger btn-sm ml-4"
                    onClick={() => removeFromCart(item.id)}
                >
                    Remove
                </button>
            </div>
            <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    );
};

export default CartItem;
