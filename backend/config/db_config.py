from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()

# Base directory of backend
basedir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

# Database file path (for sqlite3 orders)
DB_PATH = os.path.join(basedir, "database", "ecommerce.db")

def init_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + DB_PATH
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)

    # Ensure database folder exists
    db_dir = os.path.join(basedir, "database")
    os.makedirs(db_dir, exist_ok=True)

    with app.app_context():
        db.create_all()