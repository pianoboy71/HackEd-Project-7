import requests

url = "http://127.0.0.1:5000/signup"  # Flask endpoint
data = {"username": "Test2", "password": '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', "email":'Test2'}

response = requests.post(url, json=data)  # `json=data` automatically sets the correct headers
print(response.json()) 