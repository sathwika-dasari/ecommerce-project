from flask import jsonify, request
from models.product_model import Product
from config.db_config import db

def get_all_products():
    try:
        products = Product.query.all()
        return jsonify([product.to_dict() for product in products]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def get_product(product_id):
    try:
        product = Product.query.get(product_id)
        if product:
            return jsonify(product.to_dict()), 200
        return jsonify({"error": "Product not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def create_product():
    try:
        data = request.json

        new_product = Product(
            name=data['name'],
            description=data.get('description', ''),
            price=data['price'],
            image_url=data.get('image_url', ''),
            stock=data.get('stock', 10)
        )

        db.session.add(new_product)
        db.session.commit()

        return jsonify(new_product.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500