// frontend/src/pages/Checkout.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/api';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cod");

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        upiId: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const orderData = {
                customer: formData,
                items: cart,
                total: cartTotal,
                paymentMethod
            };

            // Call the fixed placeOrder
            const response = await placeOrder(orderData);
            console.log("Order Response:", response);

            if (response) {
                setSuccess(true);
                clearCart();

                setTimeout(() => navigate('/'), 3000);
            } else {
                setError(response.message || 'Failed to place order. Please try again.');
            }

        } catch (err) {
            console.error(err);
            setError('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0 && !success) {
        return (
            <div className="empty-cart-container">
                <h2>No items to checkout</h2>
                <button onClick={() => navigate('/')} className="btn btn-primary mt-4">
                    Back to Shop
                </button>
            </div>
        );
    }

    if (success) {
        return (
            <div className="success-container">
                <div className="success-icon">✓</div>
                <h2>Order Placed Successfully!</h2>
                <p>Thank you for your purchase.</p>
                <p>Redirecting you to the home page...</p>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h1 className="page-title">Checkout</h1>
            {error && <div className="error-message mb-4">{error}</div>}

            <div className="checkout-content">
                <div className="checkout-form-container">
                    <form onSubmit={handleSubmit} className="checkout-form">

                        {/* Customer Info */}
                        <div className="form-section">
                            <h3 className="section-title">Payment Information</h3>

                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group flex-1">
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group flex-1 ml-4">
                                    <label htmlFor="zipCode">Zip Code</label>
                                    <input
                                        type="text"
                                        id="zipCode"
                                        name="zipCode"
                                        required
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="form-section mt-8">
                            <h3 className="section-title">Payment Method</h3>
                            <div className="payment-options">
                                <label>
                                    <input
                                        type="radio"
                                        value="cod"
                                        checked={paymentMethod === "cod"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    /> Cash on Delivery
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        value="card"
                                        checked={paymentMethod === "card"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    /> Debit / Credit Card
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        value="upi"
                                        checked={paymentMethod === "upi"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    /> UPI Payment
                                </label>
                            </div>

                            {paymentMethod === "card" && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="cardNumber">Card Number</label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            name="cardNumber"
                                            required
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group flex-1">
                                            <label htmlFor="expiry">Expiry</label>
                                            <input
                                                type="text"
                                                id="expiry"
                                                name="expiry"
                                                required
                                                value={formData.expiry}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group flex-1 ml-4">
                                            <label htmlFor="cvv">CVV</label>
                                            <input
                                                type="text"
                                                id="cvv"
                                                name="cvv"
                                                required
                                                value={formData.cvv}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {paymentMethod === "upi" && (
                                <div className="form-group">
                                    <label htmlFor="upiId">UPI ID</label>
                                    <input
                                        type="text"
                                        id="upiId"
                                        name="upiId"
                                        required
                                        value={formData.upiId}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-full mt-6"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Sidebar Section */}
                <div className="order-summary-sidebar">
                    <h3 className="section-title">Order Summary</h3>
                    <div className="checkout-items">
                        {cart.map(item => (
                            <div key={item.id} className="checkout-item">
                                <div className="checkout-item-name">{item.name} x {item.quantity}</div>
                                <div className="checkout-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                    <div className="total-row mt-4 pt-4 border-t">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;