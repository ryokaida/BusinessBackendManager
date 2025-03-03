# source for merge dictionary syntax: https://www.geeksforgeeks.org/python-merging-two-dictionaries/

import requests
# import API call functions from callApi.py
# source: https://www.geeksforgeeks.org/python-call-function-from-another-file/
from callApi import *


# use Users base URL
url = "http://localhost:5000/api/users"
successBody = {}
errorBody = {"testMode": True}
userID1 = "67b981468f9c6b6f81d509e4"
fakeUserID = "67b57964c0e781f6a1ed1e22"
userID3 = "67b981648f9c6b6f81d509ea";
addUserBody = {
    "email": "test20@gmail.com",
    "name": "Test McTestyFace",
    "role": "guest",
    "password": "password20"
}
updateUserBody = {
    "email": "test3@gmail.com",
    "name": "Jack NewLastName",
    "role": "employee"
}

# test getting all users
body = {}
def test_GetAllUsers_Success():
    assert getAllItems(url, successBody) == {200, True, "200 - Successfully retrieved all items", True, 6}
def test_GetFilteredusers_Success():
    filteredURL = url + "?role=employee"
    assert getAllItems(filteredURL, successBody) == {200, True, "200 - Successfully retrieved all items", True, 2}
def test_GetFilteredusers_NoItems():
    filteredURL = url + "?role=fakeRole"
    assert getAllItems(filteredURL, successBody) == {200, True, "200 - Successfully retrieved all items", True, 0}
def test_getAllUsers_500():
    assert getAllItems(url, errorBody) == {500, False, "500 - Internal Server Error", False, -1}


# test getting a user
def test_getUser_Success():
    assert getItemByID(url, userID1, successBody) == {200, True, "200 - Successfully retrieved item by ID", True, -1}
def test_getUser_NotFound():
    assert getItemByID(url, fakeUserID, successBody) == {404, False, "404 - Not found!", False, -1}
def test_getUser_500():
    assert getItemByID(url, userID1, errorBody) == {500, False, "500 - Internal Server Error", False, -1}


# test adding a user
def test_addUser_Success():
    assert addItem(url, addUserBody) == {201, True, "201 - Successfully added item", True, -1}
def test_AddUser_EmptyEmail():
    # change email to be blank
    emptyEmailBodyPartial = {"email": ""}
    emptyEmailBodyFinal = addUserBody | emptyEmailBodyPartial
    assert addItem(url, emptyEmailBodyFinal) == {400, False, "400 - Invalid JSON", False, -1}
def test_AddUser_NameAsNumber():
    # change name to be a Number
    nameAsNumberBodyPartial = {"name": 1234}
    nameAsNumberBodyFinal = addUserBody | nameAsNumberBodyPartial
    assert addItem(url, nameAsNumberBodyFinal) == {400, False, "400 - Invalid JSON", False, -1}
def test_AddUser_MissingName():
    missingNameBody = {
        "email": "test25@gmail.com",
        "role": "guest",
        "password": "password25"
    }
    assert addItem(url, missingNameBody) == {400, False, "400 - Invalid JSON", False, -1}
def test_AddUser_InvalidEmail():
    # change email to be invalid
    invalidEmailBodyPartial = {"email": "asdf@fake.org"}
    invalidEmailBodyFinal = addUserBody | invalidEmailBodyPartial
    assert addItem(url, invalidEmailBodyFinal) == {400, False, "400 - Invalid JSON", False, -1}
def test_AddUser_invalidRole():
    # change role to be fake
    invalidRoleBodyPartial = {"role": "fakeRole"}
    invalidRoleBodyFinal = addUserBody | invalidRoleBodyPartial
    assert addItem(url, invalidRoleBodyFinal) == {400, False, "400 - Invalid JSON", False, -1}
def test_AddUser_500_DupeEmail():
    # change email to be a duplicate email
    dupeEmailBodyPartial = {"email": "test2@gmail.com"}
    dupeEmailBodyFinal = addUserBody | dupeEmailBodyPartial
    assert addItem(url, dupeEmailBodyFinal) == {500, False, "500 - Internal Server Error", False, -1}


# test updating a user
def test_UpdateUser_Success_AllFields():
    # change 
    allFieldsBody = {
        "email": "test300@gmail.com",
        "name": "Jack Peppercorn",
        "role": "owner"
    }
    assert updateItem(url, userID3, allFieldsBody) == {200, True, "200 - Successfully updated item", True, -1}
def test_UpdateUser_Success_OneField():
    oneFieldBody = {"name": "Jack Saltcorn"}
    assert updateItem(url, userID3, oneFieldBody) == {200, True, "200 - Successfully updated item", True, -1}
def test_UpdateUser_EmptyEmail():
    # change email to be blank
    emptyEmailBodyPartial = {"email": ""}
    emptyEmailBodyFinal = updateUserBody | emptyEmailBodyPartial    
    assert updateItem(url, userID3, emptyEmailBodyFinal) == {400, False, "400 - Invalid JSON", False, -1}
def test_UpdateUser_NameAsNumber():
    # change name to be a Number
    nameAsNumberBodyPartial = {"name": 1234}
    nameAsNumberBodyFinal = updateUserBody | nameAsNumberBodyPartial        
    assert updateItem(url, userID3, nameAsNumberBodyFinal) == {400, False, "400 - Invalid JSON", False, -1}
def test_AddUser_InvalidEmail():
    # change email to be invalid
    invalidEmailBodyPartial = {"email": "asdf@fake.org"}
    invalidEmailBodyFinal = updateUserBody | invalidEmailBodyPartial
    assert updateItem(url, userID3, invalidEmailBodyFinal) == {400, False, "400 - Invalid JSON", False, -1}
def test_UpdateUser_InvalidRole():
    # change role to be fake
    invalidRoleBodyPartial = {"role": "fakeRole"}
    invalidRoleBodyFinal = updateUserBody | invalidRoleBodyPartial
    assert updateItem(url, userID3, invalidRoleBodyFinal) == {400, False, "400 - Invalid JSON", False, -1}
def test_UpdateUser_NotFound():
    assert updateItem(url, fakeUserID, updateUserBody) == {404, False, "404 - Not found!", False, -1}
def test_UpdateUser_500():
    # change email to be a duplicate email
    dupeEmailBodyPartial = {"email": "test2@gmail.com"}
    dupeEmailBodyFinal = updateUserBody | dupeEmailBodyPartial
    assert updateItem(url, userID3, dupeEmailBodyFinal) == {500, False, "500 - Internal Server Error", False, -1}
def test_UdateUser_Reset():
    # reset name to the original name
    resetBodyPartial = {"name": "Jack Smith"}
    resetBodyFinal = updateUserBody | resetBodyPartial
    assert updateItem(url, userID3, resetBodyFinal) == {200, True, "200 - Successfully updated item", True, -1}


# test deleting a user
def test_DeleteUser_Success():
    deleteURL = url + "?name=Test%20McTestyFace"
    response = requests.get(deleteURL) # make API call to get the user with the correct name
    userIDToDelete = userIDToDelete = response.json()["data"][0]["_id"] # get the correct ID to delete by deserializing until the _id is reached
    assert deleteItem(url, userIDToDelete, successBody) == {200, True, "200 - Successfully deleted item", False, -1}
def test_DeleteUser_NotFound():
    assert deleteItem(url, fakeUserID, successBody) == {404, False, "404 - Not found!", False, -1}
def test_DeleteUser_500():
    assert deleteItem(url, fakeUserID, errorBody) == {500, False, "500 - Internal Server Error", False, -1}