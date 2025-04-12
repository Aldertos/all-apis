# invite api This works without token

import requests

vanity = input("Enter Vanity URL: ")
invite_api = f"https://discord.com/api/v9/invites/{vanity}"


response = requests.get(invite_api)
print(response.text)


# API to get more detailed user information

