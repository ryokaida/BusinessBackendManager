# source for merge dictionary syntax: https://www.geeksforgeeks.org/python-merging-two-dictionaries/

import requests
# import API call functions from callApi.py
# source: https://www.geeksforgeeks.org/python-call-function-from-another-file/
from callApi import *


# use the login url
url = "http://localhost:5000/api/login"
# base login body
loginBody = {
    "email": "test8@gmail.com",
    "password": "password8"
}
logoutURL = "http://localhost:5000/api/logout"


# logout to have clean start for tests
requests.post(logoutURL)
# test login success, missing email, missing password, incorrecdt meail, incorrect password
def test_login_Success():
    assert login(url, loginBody) == {200, True, "200 - User successfully logged in", True, True}
    # logout for cleanup
    requests.post(logoutURL)
def test_login_MissingEmail():
    missingEmailBody = {
        "password": "password8"
    }
    assert login(url, missingEmailBody) == {400, False, "400 - Not all of the required fields were included!", False, False}
def test_login_MissingPassword():
    missingPasswordBody = {
        "email": "test8@gmail.com"
    }
    assert login(url, missingPasswordBody) == {400, False, "400 - Not all of the required fields were included!", False, False}
def test_login_IncorrectEmail():
    # change email to be invalid
    incorrectEmailBodyPartial = {"email": "fakeEmail@gmail.com"}
    incorrectEmailBodyFinal = loginBody | incorrectEmailBodyPartial
    assert login(url, incorrectEmailBodyFinal) == {401, False, "401 - Incorrect email or password!", False, False}
def test_login_IncorrectPassword():
    # change password to be invalid
    incorrectPasswordBodyPartial = {"password": "fakePassword"}
    incorrectPasswordBodyFinal = loginBody | incorrectPasswordBodyPartial
    assert login(url, incorrectPasswordBodyFinal) == {401, False, "401 - Incorrect email or password!", False, False}
def test_login_500():
    # add testMode to body
    error500BodyPartial = {"testMode": True}
    error500BodyFinal = loginBody | error500BodyPartial
    assert login(url, error500BodyFinal) == {500, False, "500 - Internal Server Error", False, False}