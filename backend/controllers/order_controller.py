import sqlite3
from config.db_config import DB_PATH

def create_order(order_data):
    """
    Saves the order in the database.
    """
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT,
            email TEXT,
            address TEXT,
            city TEXT,
            zipCode TEXT,
            paymentMethod TEXT,
            cardNumber TEXT,
            expiry TEXT,
            cvv TEXT,
            upiId TEXT,
            items TEXT,
            total REAL
        )
    """)

    customer = order_data.get("customer", {})
    paymentMethod = order_data.get("paymentMethod", "cod")
    items = order_data.get("items", [])
    total = order_data.get("total", 0)

    items_str = str(items)

    cursor.execute("""
        INSERT INTO orders (
            customer_name, email, address, city, zipCode,
            paymentMethod, cardNumber, expiry, cvv, upiId,
            items, total
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        customer.get("name", ""),
        customer.get("email", ""),
        customer.get("address", ""),
        customer.get("city", ""),
        customer.get("zipCode", ""),
        paymentMethod,
        customer.get("cardNumber", ""),
        customer.get("expiry", ""),
        customer.get("cvv", ""),
        customer.get("upiId", ""),
        items_str,
        total
    ))

    conn.commit()
    conn.close()

    # ✅ ADD THIS PART
    return {
        "success": True,
        "message": "Order placed successfully"
    }