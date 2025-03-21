from flask_sqlalchemy import SQLAlchemy
     
db = SQLAlchemy()
     
class Customer(db.Model):
    __tablename__ = 'customer'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
 
    def json(self):
        return {'id': self.id,'name': self.name, 'email': self.email}