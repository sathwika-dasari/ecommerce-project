import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
    const { cart, cartTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="empty-cart-container">
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" className="btn btn-primary mt-4 inline-block">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page-container">
            <h1 className="page-title">Your Shopping Cart</h1>
            
            <div className="cart-content">
                <div className="cart-items-list">
                    {cart.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                    
                    <div className="cart-actions mt-6">
                        <button className="btn btn-secondary" onClick={clearCart}>
                            Clear Cart
                        </button>
                        <Link to="/" className="btn btn-outline ml-4">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
                
                <div className="cart-summary">
                    <h3 className="summary-title">Order Summary</h3>
                    
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-row summary-total">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    
                    <Link to="/checkout" className="btn btn-primary btn-lg w-full mt-6 text-center block">
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
