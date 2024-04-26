# from flask import Flask, render_template, request, redirect, url_for
# import sqlite3

# app = Flask(__name__)

# # Function to authenticate user
# def authenticate_user(email, password):
#     conn = sqlite3.connect('./database/login.sqlite')
#     cursor = conn.cursor()
#     cursor.execute('SELECT * FROM users WHERE email=?', (email,))
#     user = cursor.fetchone()
#     conn.close()

#     if user and user[1] == password:
#         return True
#     else:
#         return False

# # Route for the login page
# @app.route('/')
# def login_page():
#     return render_template('login.html')

# # Route for handling login form submission
# @app.route('/login', methods=['POST'])
# def login():
#     email = request.form['email']
#     password = request.form['password']
    
#     if authenticate_user(email, password):
#         # Redirect to index.html if login successful
#         return redirect(url_for('index'))
#     else:
#         # Display error message if login fails
#         error = 'Invalid email or password. Please try again.'
#         return render_template('login.html', error=error)

# # Route for the index page
# @app.route('/index')
# def index():
#     return render_template('index.html')

# if __name__ == '__main__':
#     app.run(debug=True)
