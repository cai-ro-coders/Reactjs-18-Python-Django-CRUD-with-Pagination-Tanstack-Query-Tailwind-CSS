from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin #ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
from models import db, Customer
  
app = Flask(__name__)
  
app.config['SECRET_KEY'] = 'cairocoders-ednalan'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
# Databse configuration mysql                             Username:password@hostname/databasename
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost:8889/reactjsdb'
    
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
    
CORS(app, supports_credentials=True)
 
db.init_app(app)
       
with app.app_context():
    db.create_all()
 
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# create a customer
@app.route('/api/customer', methods=['POST'])
def create_customer():
    try:
        data = request.get_json()
        new_customer = Customer(name=data['name'], email=data['email'])
        db.session.add(new_customer)
        db.session.commit()  
  
        return jsonify({
            'id': new_customer.id,
            'name': new_customer.name,
            'email': new_customer.email
        }), 201
  
    except Exception as e:
        return make_response(jsonify({'message': 'error creating customer', 'error': str(e)}), 500)
    
# get all customer
@app.route('/api/customer', methods=['GET'])
def get_customer():
    try:
        customer = Customer.query.all()
        customer_data = [{'id': customer.id, 'name': customer.name, 'email': customer.email} for customer in customer]
        return jsonify(customer_data), 200
    except Exception as e:
        return make_response(jsonify({'message': 'error getting customer', 'error': str(e)}), 500)

@app.route('/api/customerpagination/<int:page>/<int:per_page>', methods=['GET'])
def customerpagination(page=1, per_page=3):
   
    total = Customer.query.count()
    print(total)
   
    customers = Customer.query.order_by(Customer.id.asc())  
    customers = customers.paginate(page=page, per_page=per_page)
   
    return jsonify({
        'total': total,
        'page': page,
        'per_page': per_page,
        'has_next': customers.has_next,
        'has_prev': customers.has_prev,
        'page_list': [iter_page if iter_page else '...' for iter_page in customers.iter_pages()],
        'customers': [{
            'id': p.id,
            'name': p.name,
            'email': p.email
        } for p in customers.items]
    })
 
# get a customers by id
@app.route('/api/customer/<id>', methods=['GET'])
def get_customerid(id):
    try:
        customer = Customer.query.filter_by(id=id).first() # get the first customer with the id
        if customer:
            return make_response(jsonify({'customer': customer.json()}), 200)
        return make_response(jsonify({'message': 'customer not found'}), 404) 
    except Exception as e:
        return make_response(jsonify({'message': 'error getting customer', 'error': str(e)}), 500)
    
# update a customer by id
@app.route('/api/customer/<id>', methods=['PUT'])
def update_customer(id):
    try:
        customer = Customer.query.filter_by(id=id).first()
        if customer:
            data = request.get_json()
            customer.name = data['name']
            customer.email = data['email']
            db.session.commit()
            return make_response(jsonify({'message': 'customer updated'}), 200)
        return make_response(jsonify({'message': 'customer not found'}), 404)  
    except Exception as e:
        return make_response(jsonify({'message': 'error updating customer', 'error': str(e)}), 500)

# delete a customer by id
@app.route('/api/customer/<id>', methods=['DELETE'])
def delete_customer(id):
    try:
        customer = Customer.query.filter_by(id=id).first()
        if customer:
            db.session.delete(customer)
            db.session.commit()
            return make_response(jsonify({'message': 'customer deleted'}), 200)
        return make_response(jsonify({'message': 'customer not found'}), 404) 
    except Exception as e:
        return make_response(jsonify({'message': 'error deleting customer', 'error': str(e)}), 500)
    
if __name__ == "__main__":
    app.run(debug=True)