from app import app
from config.db_config import db
from models.product_model import Product

def seed_db():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()

        products = [
            Product(name="Wireless Noise-Cancelling Headphones", price=299.99, description="Premium over-ear headphones with active noise cancellation and 30-hour battery life.", image_url="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", stock=50),
            Product(name="Smart Watch Pro", price=199.50, description="Advanced fitness tracking, heart rate monitoring, and seamless smartphone integration.", image_url="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", stock=15),
            Product(name="Minimalist Mechanical Keyboard", price=120.00, description="Tenkeyless mechanical keyboard with tactile switches and customizable RGB lighting.", image_url="https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80", stock=30),
            Product(name="Ultra HD Action Camera", price=249.99, description="Waterproof 4K action camera perfect for adventures, comes with multiple mounting accessories.", image_url="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80", stock=25),
            Product(name="Portable Bluetooth Speaker", price=89.99, description="Rugged, waterproof portable speaker with rich bass and 12-hour playtime.", image_url="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80", stock=100),
            Product(name="Ergonomic Optical Mouse", price=59.99, description="Wireless ergonomic mouse designed to reduce wrist strain during long hours of use.", image_url="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80", stock=45),
            Product(name="Gaming Laptop", price=1299.99, description="High performance gaming laptop with RTX graphics and 16GB RAM.", image_url="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", stock=20),
            Product(name="Smartphone X", price=899.99, description="Flagship smartphone with OLED display and powerful processor.", image_url="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80", stock=40),
            Product(name="Wireless Earbuds", price=149.99, description="Compact earbuds with active noise cancellation and fast charging.", image_url="https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=500&q=80", stock=60),
            Product(name="4K Monitor", price=399.99, description="Ultra HD 27-inch monitor perfect for work and gaming.", image_url="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80", stock=18),

Product(name="Gaming Chair", price=249.99, description="Comfortable ergonomic chair designed for long gaming sessions.", image_url="https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=500&q=80", stock=12)
        ]

        for p in products:
            db.session.add(p)
        
        db.session.commit()
        print("Database seeded successfully with dummy products!")

if __name__ == '__main__':
    seed_db()
