# source for merge dictionary syntax: https://www.geeksforgeeks.org/python-merging-two-dictionaries/

import requests
# import API call functions from callApi.py
# source: https://www.geeksforgeeks.org/python-call-function-from-another-file/
from callApi import *


def __deleteUserForCleanup(in_StrEmail):
    baseURL = "http://localhost:5000/api/users"
    userIdURL = baseURL + "?email=" + in_StrEmail
    response = requests.get(userIdURL) # make API call to get the user with the correct name
    userIDToDelete = userIDToDelete = response.json()["data"][0]["_id"] # get the correct ID to delete by deserializing until the _id is reached
    deleteURL = baseURL + "/" + userIDToDelete
    deleteResponse = requests.delete(deleteURL)
    if deleteResponse.status_code != 200:
        raise Exception("Error deleting item for cleanup!")


# use the signup url
url = "http://localhost:5000/api/signup"
# base signup body
signupBody = {
    "password": "password8",
    "name": "Beef Wellington"
}
logoutURL = "http://localhost:5000/api/logout"


# logout to have clean start for tests
requests.post(logoutURL)
# test signup
def test_signup_Success_NoRole():
    # set email for testing
    noRoleEmail = "noRole@gmail.com"
    noRoleBodyPartial = {"email": noRoleEmail}
    noRoleBodyFinal = signupBody | noRoleBodyPartial
    assert signup(url, noRoleBodyFinal) == {201, True, "201 - User successfully signed up", "guest", True}
    # delete new user and logout for cleanup
    __deleteUserForCleanup(noRoleEmail)
    requests.post(logoutURL)
def test_signup_Error_FakeRole():
    # add role="fakeRole" and set email for testing
    fakeRoleEmail = "fakeRole@gmail.com"
    fakeRoleBodyPartial = {"email": fakeRoleEmail, "role": "fakeRole"}
    fakeRoleBodyFinal = signupBody | fakeRoleBodyPartial
    assert signup(url, fakeRoleBodyFinal) == {400, False, "400 - Invalid JSON", "", False}
def test_signup_Error_MissingName():
    missingNameEmail = "missingName@gmail.com"
    missingNameBody = {
        "email": missingNameEmail,
        "password": "password8",
        "role": "guest"
    }
    assert signup(url, missingNameBody) == {400, False, "400 - Invalid JSON", "", False}
def test_signup_Success_EmployeeRole():
    # add role="employee" and set email for testing
    employeeRoleEmail = "emplyeeRole@gmail.com"
    employeeRoleBodyPartial = {"email": employeeRoleEmail, "role": "employee"}
    employeeRoleBodyFinal = signupBody | employeeRoleBodyPartial
    assert signup(url, employeeRoleBodyFinal) == {201, True, "201 - User successfully signed up", "guest", True}
    # delete new user and logout for cleanup
    __deleteUserForCleanup(employeeRoleEmail)
    requests.post(logoutURL)
def test_signup_Success_GuestRole():
    # add role="guest" and set email for testing
    guestRoleEmail = "guestRole@gmail.com"
    guestRoleBodyPartial = {"email": guestRoleEmail, "role": "guest"}
    guestRoleBodyFinal = signupBody | guestRoleBodyPartial
    assert signup(url, guestRoleBodyFinal) == {201, True, "201 - User successfully signed up", "guest", True}
    # delete new user  and logout for cleanup
    __deleteUserForCleanup(guestRoleEmail)
    requests.post(logoutURL)
def test_signup_Error_UserExists():
    userExistsBody = {
        "email": "test2@gmail.com",
        "password": "password2",
        "name": "Jane Smith"
    }
    assert signup(url, userExistsBody) == {400, False, "400 - User already exists!", "", False}
def test_signup_500():
    # set email for testing
    error500Email = "500Error@gmail.com"
    error500BodyPartial = {"email": error500Email, "testMode": True}
    error500BodyFinal = signupBody | error500BodyPartial
    assert signup(url, error500BodyFinal) == {500, False, "500 - Internal Server Error", "", False}