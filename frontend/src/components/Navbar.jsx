import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = ({ onSearch }) => {
    const { cartCount } = useCart();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">

                <Link to="/" className="navbar-logo">
                    NeoCommerce
                </Link>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search products..."
                    className="search-bar"
                    value={searchTerm}
                    onChange={handleSearch}
                />

                <div className="navbar-links">
                    <Link to="/" className="nav-link">Home</Link>

                    <Link to="/cart" className="nav-link cart-link">
                        Cart
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;