from flask import Blueprint, request, jsonify
from controllers.order_controller import create_order

order_bp = Blueprint('order_bp', __name__)

@order_bp.route('/', methods=['POST'])
def place_order():
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "No order data provided"}), 400

    try:
        result = create_order(data)   # capture result
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500