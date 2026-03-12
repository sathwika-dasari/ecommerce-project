import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';


const Home = ({ searchTerm }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="loader">Loading products...</div>;
    if (error) return <div className="error-message">{error}</div>;

    // Filter products based on search
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes((searchTerm || "").toLowerCase())
    );

    return (
        <>
            {/* Navbar with search */}


            <div className="home-container">
                <header className="hero-section">
                    <h1 className="hero-title">Discover Amazing Products</h1>
                    <p className="hero-subtitle">Shop the latest trends with exclusive deals.</p>
                </header>

                <section className="products-grid">
                    {filteredProducts.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </section>
            </div>
        </>
    );
};

export default Home;