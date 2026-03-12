from flask import Flask, jsonify
from flask_cors import CORS
from config.db_config import init_db
from routes.product_routes import product_bp
from routes.order_routes import order_bp

app = Flask(__name__)
CORS(app)

# Initialize database
init_db(app)

# Register Blueprints
app.register_blueprint(product_bp, url_prefix='/api/products')
app.register_blueprint(order_bp, url_prefix='/api/orders')

@app.route('/')
def health_check():
    return jsonify({"status": "healthy", "message": "Ecommerce API is running"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
