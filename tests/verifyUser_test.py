import requests
# import API call functions from callApi.py
# source: https://www.geeksforgeeks.org/python-call-function-from-another-file/
from callApi import *


# use the login url
url = "http://localhost:5000/api"
loginURL = "http://localhost:5000/api/login"
logoutURL = "http://localhost:5000/api/logout"
# login body
loginBody = {
    "email": "test8@gmail.com",
    "password": "password8"
}


# logout to have clean start for tests
requests.post(logoutURL)
# login for next test
requests.post(loginURL, loginBody)
# test being authorized
def test_verifyUser_Authorized():
    assert verifyUser(url) == {200, True, "200 - User is authorized", "Mark Pickle", True}
# logout
requests.post(logoutURL)
# test not being authorized
def test_verifyUser_NotAuthorized():
    assert verifyUser(url) == {401, False, "401 - Not authorized!", "", False}