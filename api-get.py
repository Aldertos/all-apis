# invite api This works without token

import requests

vanity = input("Enter Vanity URL: ")
invite_api = f"https://discord.com/api/v9/invites/{vanity}"


response = requests.get(invite_api)
print(response.text)


# API to get more detailed user information

import requests

user_id = input("Enter target ID: ")
api_url = f"https://discord.com/api/v9/users/{user_id}/profile"
token = "your account token"


headers = {
     "Authorization": token,
}



response = requests.get(api_url, headers=headers)
print(response.text) 
