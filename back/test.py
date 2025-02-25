import requests

url = "http://egg.fractaldev.co/signup"  # Flask endpoint
data = {"username": "Test234", "password": '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', "email":'Test234'}

response = requests.post(url, json=data)  # `json=data` automatically sets the correct headers
print(response.json()) 