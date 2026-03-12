from flask import Blueprint
from controllers.product_controller import get_all_products, get_product, create_product

product_bp = Blueprint('product_bp', __name__)

@product_bp.route('/', methods=['GET'])
def fetch_products():
    return get_all_products()

@product_bp.route('/<int:product_id>', methods=['GET'])
def fetch_product(product_id):
    return get_product(product_id)

@product_bp.route('/', methods=['POST'])
def add_product():
    return create_product()