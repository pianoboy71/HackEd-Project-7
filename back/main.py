from flask import *
import hashlib
import sqlite3
from emailpy import emails as ep

app = Flask(__name__)

app.secret_key = 'Egg Bag'

def get_email(email):
    conn = sqlite3.connect("group7.db")
    cursor = conn.cursor()

    cursor.execute('SELECT email FROM Users WHERE username = ?', (email,))
    com_pass = cursor.fetchone()

    if com_pass is None:
        print("Invalid Username or Password")
        return False
    else:
        return com_pass[0]



def get_user_id(username): # I chat gpt made this because i am lazy
    """
    Retrieve the user ID based on the username.

    Args:
        username (str): The username to search for.

    Returns:
        int: The user ID if found, or None if no match.
    """
    # Path to your SQLite database file
    db_path = "group7.db"

    try:
        # Connect to the SQLite database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        # Query to fetch the user ID based on the username
        query = "SELECT id FROM Users WHERE username = ?"
        cursor.execute(query, (username,))

        # Fetch one result
        result = cursor.fetchone()

        # Close the connection
        cursor.close()
        conn.close()

        # Return the user ID if found, else return None
        return result[0] if result else None
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return None

def email_password():

    try:
        with open("email_password.txt") as fp:
            lines = fp.readlines()
            for line in lines:
                if line.strip()[0] != "#":
                    setting_line = line.strip().split("=")
                    if setting_line[0] == "password":
                        return setting_line[1]

    except FileNotFoundError:
        print("File not found")
        return "Nah Huh"


def column_check(table, colum, data):
    conn = sqlite3.connect("group7.db")
    cursor = conn.cursor()

    query = f"SELECT * FROM {table} WHERE {colum} = ?"

    # Execute the query, passing the variable as a parameter
    cursor.execute(query, (data,))

    # Fetch all matching rows
    rows = cursor.fetchall()

    if len(rows) == 0:
        return True
    else:
        return False


def change_password(username, password):
    conn = sqlite3.connect("group7.db")
    cursor = conn.cursor()
    query = f"UPDATE Users SET password_hash = ? WHERE username = ?"
    cursor.execute(query, (password, username))
    conn.commit()


def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str


def hash_string(password):
    return hashlib.sha256(password.encode()).hexdigest()


def get_day():
    date_time = datetime.now()
    return date_time.strftime("%d/%m/%Y")


def from_now(days):
    now = datetime.now()
    return now + timedelta(days=days)


def register(username, email, password, currency):
    conn = sqlite3.connect("group7.db")
    cursor = conn.cursor()
    date = get_day()

    cursor.execute('''
    INSERT INTO Users (username, password_hash, email, currency, created_at) 
    VALUES (?, ?, ?, ?, ?)
    ''', (username, password, email, currency, date))

    conn.commit()



    


def login(username, password):
    conn = sqlite3.connect("group7.db")
    cursor = conn.cursor()

    cursor.execute('SELECT password_hash FROM Users WHERE username = ?', (username,))
    com_pass = cursor.fetchone()

    if com_pass is None:
        print("Invalid Username or Password")
        return False
    else:
        if com_pass[0] == password:
            return True

        else:
            print("Invalid Password")
            return False


def get_username_email(email):
    conn_2 = sqlite3.connect("group7.db")
    cursor_2 = conn_2.cursor()
    cursor_2.execute('SELECT username FROM Users WHERE email = ?', (email,))
    result = cursor_2.fetchone()

    if result is None:
        return None  # or some other appropriate value like an error message

    return result[0]


def is_user():
    if 'username' in session:
        return True
    else:
        return False


def get_username():
    if 'username' in session:
        return session['username']
    else:
        return None

@app.route('/', methods=['GET'])
def index():
    return render_template('home.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        if login(request.form['username'], hash_string(request.form['password'])):
            session['username'] = request.form['username']
            resp = make_response(redirect("/dashboard"))
            resp.set_cookie('Joshua',
                            value=f"{session['username']}|{hash_string(request.form['password'])}",
                            expires=from_now(3))
            return resp
        else:
            return render_template('landing.html', response="Username or Password is incorrect", username=get_username())
    else:
        joshua = request.cookies.get('Joshua', 'David')


        if joshua == "David":
            return render_template('landing.html', response="", username=get_username())

        else:
            username_password = joshua.split("|")
            if login(username_password[0], username_password[1]):
                session['username'] = username_password[0]
                resp = make_response(redirect("/dashboard"))
                resp.set_cookie('Joshua',
                                value=f"{session['username']}|{username_password[1]}",
                                expires=from_now(3))
                return resp

            else:
                return render_template('landing.html', response="Code error - 34", username=get_username())



@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'GET':
        return render_template('sign_up.html', response='', username=get_username())

    if request.method == 'POST':
        user_name = request.form['Username']
        password = request.form['Password']
        email = request.form['Email']
        format = request.form['Format']

        if column_check("Users", "username", user_name) and column_check("Users", "email", email):
            while True:
                com_code = get_random_string(12)
                if com_code not in auth_codes:
                    break

            subject = "Confirm your email address - Eastern Eggs"

            ep.send_email(email_address, email_password(), email, subject,
                          f"""Hi to verify your email for Eastern Eggs please open the link in the same browser.
(If you did not request this link do not click on it and delete this email)
{webserver_address}/email_verify/{com_code}
-Eastern Eggs
                          """)

            auth_codes[com_code] = {}
            auth_codes[com_code]['email'] = email
            auth_codes[com_code]['password'] = hash_string(password)
            auth_codes[com_code]['username'] = user_name
            auth_codes[com_code]['format'] = format

            session['auth_code'] = com_code

            return render_template('sign_up.html', response='Email sent', username=get_username())

        else:
            return render_template('sign_up.html', response='Email Or Username in Use', username=get_username())



@app.route('/email_verify/<code>', methods=['GET'])
def email_verify(code):
    if code in auth_codes:
        if 'auth_code' in session:
            register(auth_codes[code]["username"], auth_codes[code]['email'], auth_codes[code]['password'], auth_codes[code]['format'])
            login(auth_codes[code]["username"], auth_codes[code]['password'])

            session['username'] = auth_codes[code]["username"]
            resp = make_response(redirect("/dashboard"))
            resp.set_cookie('Joshua',
                            value=f"{session['username']}|{auth_codes[code]['password']}",
                            expires=from_now(3))

            auth_codes.pop(code)
            return resp
        else:
            return "This code is either expired or not being opened in the same browser!"
    else:
        return "Code Error 621"

@app.route('/forgot', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        if not column_check("users", "email", request.form['email']):
            while True:
                com_code = get_random_string(12)
                if com_code not in forgot_password_codes:
                    break

            email = request.form["email"]

            subject = "Forgot your email address - Eastern Eggs"

            user_name = get_username_email(email)

            ep.send_email(email_address, email_password(), email, subject,
                          f"""Hi, {user_name} You have requested to reset your password 
just click on the link in the same browser.
(If you did not request this link do not click on it and delete this email)
            {webserver_address}/password-reset/{com_code}
-Eastern Eggs
                                      """)

            forgot_password_codes[com_code] = {}
            forgot_password_codes[com_code]['email'] = email
            forgot_password_codes[com_code]['username'] = user_name

            session['auth_code'] = com_code

            return render_template('forgot.html', response='Email sent', username=get_username())

        else:
            return render_template("forgot.html", response='Email Sent!', username=get_username())
    else:
        return render_template("forgot.html", response='', username=get_username())


@app.route('/password-reset/<code>', methods=['GET', 'POST'])
def password_reset(code):
    if code in forgot_password_codes:
        if request.method == 'GET':
            if 'auth_code' in session:
                return render_template("password_reset.html")
            else:
                return "This code is either expired or not being opened in the same browser!"

        else:
            if 'auth_code' in session:
                new_password = hash_string(request.form['password'])
                change_password(forgot_password_codes[code]["username"], new_password)
                forgot_password_codes.pop(code)
                session.clear()
                return redirect("/")

            else:
                return "This code is either expired or not being opened in the same browser!"

    else:
        return "Code Error 1998"  # Lol i am bad


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.clear()
    resp = make_response(redirect("/"))
    resp.set_cookie('Joshua', '', expires=0)
    return resp

@app.route('/add-category', methods=['GET', 'POST'])
def add_category_web():
    if is_user():  # check if the browsers session is logged in with a account
        categories = get_transaction_categories()
        
        if request.method == 'POST':

            description = request.form['description']
            name = request.form['name']
           
            if description != '':
                if name != '':
                    if add_category( name, description):
                        message = 'Added pookie Bear'
                    else:
                        message = "Something ain't right here. if this keeps recurring Contact support"
                else:
                    message = 'Enter a name!'
            else:
                message = 'Enter a Description!'
            
            
            return render_template('add_category.html', username=get_username(), categories=categories, currency=get_user_currency(), message=message)

        else:
            return render_template('add_category.html', username=get_username(), categories=categories, currency=get_user_currency())

    else:
        return redirect('/') # if not return to sign

if __name__ == '__main__':
    app.run()
