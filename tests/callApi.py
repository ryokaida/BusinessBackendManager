import requests

# private helper function to parse out the API response and return it back to the test functions
# source for private syntax: https://www.geeksforgeeks.org/private-methods-in-python/
def __parseApiResult(in_Response):
        out_IntStatusCode = in_Response.status_code
        data = in_Response.json()
        # retrieve success status
        out_BoolSuccess = data["success"]
        # retrieve message
        out_StrMessage = data["message"].split(":")[0]
        # only check for the prescence of the data key
        if "data" in data:
            out_BoolData = True
        else:
            out_BoolData = False
        # retrieve numberOfItems if it is present - ensure that 0 items can be returned
        # source for syntax of and: https://stackoverflow.com/questions/2485466/what-is-pythons-equivalent-of-logical-and-in-an-if-statement
        if ("numberOfItems" in data) and (data["numberOfItems"] > -1):
            out_IntNumberOfItems = data["numberOfItems"]
        else:
            out_IntNumberOfItems = -1
        return {out_IntStatusCode, out_BoolSuccess, out_StrMessage, out_BoolData, out_IntNumberOfItems}


# make API call to get all items
def getAllItems(in_StrURL, in_JsonBody):
    try:
        # make the API call
        response = requests.get(in_StrURL, json=in_JsonBody)
        # parse response and return results
        return __parseApiResult(response)
    except requests.exceptions.RequestException as e:
        return {e}


# make API call to get an item by ID
def getItemByID(in_StrURL, in_StrID, in_JsonBody):
    try:
        # make the URL for the API call
        url = in_StrURL + "/" + in_StrID
        # make the API call
        response = requests.get(url, json=in_JsonBody)
        # parse response and return results
        return __parseApiResult(response)
    except requests.exceptions.RequestException as e:
        return {e}


# make API call to add an item
def addItem(in_StrURL, in_JsonBody):
    try:
        # make the API call
        response = requests.post(in_StrURL, json=in_JsonBody)
        # parse response and return results
        return __parseApiResult(response)
    except requests.exceptions.RequestException as e:
        return {e}


# make API call to update an item - item found by ID
def updateItem(in_StrURL, in_StrID, in_JsonBody):
    try:
        # make the URL for the API call - in_StrURL must end with "/"
        url = in_StrURL + "/" + in_StrID
        # make the API call
        response = requests.put(url, json=in_JsonBody)
        # parse response and return results
        return __parseApiResult(response)
    except requests.exceptions.RequestException as e:
        return {e}


# make API call to update an item - item found by ID
def deleteItem(in_StrURL, in_StrID, in_JsonBody):
    try:
        # make the URL for the API call - in_StrURL must end with "/"
        url = in_StrURL + "/" + in_StrID
        # make the API call
        response = requests.delete(url, json=in_JsonBody)
        # parse response and return results
        return __parseApiResult(response)
    except requests.exceptions.RequestException as e:
        return {e}


# make API call to sign up
def signup(in_StrURL, in_JsonBody):
    try:
        # make the API call
        response = requests.post(in_StrURL, json=in_JsonBody)

        # retrieve the status code
        out_IntStatusCode = response.status_code
        # retrieve JSON so it can be parsed
        data = response.json()
        # retrieve success status
        out_BoolSuccess = data["success"]
        # retrieve message
        out_StrMessage = data["message"].split(":")[0]
        # check the role assigned ot the new user
        if "data" in data:
            out_StrRole = data["data"]["role"] # get the role by deserializing until the role is reached
        else:
            out_StrRole = ""
        # check if the token exists
        # source for syntax of and: https://stackoverflow.com/questions/2485466/what-is-pythons-equivalent-of-logical-and-in-an-if-statement
        if ("Set-Cookie" in response.headers) and (len(response.headers["Set-Cookie"].split(";")[0].replace("token=", "")) > 0):
            out_BoolTokenExists = True
        else:
            out_BoolTokenExists = False
        return {out_IntStatusCode, out_BoolSuccess, out_StrMessage, out_StrRole, out_BoolTokenExists}
    except requests.exceptions.RequestException as e:
        return {e}


# make API call to login
def login(in_StrURL, in_JsonBody):
    try:
        # make the API call
        response = requests.post(in_StrURL, json=in_JsonBody)

        # retrieve the status code
        out_IntStatusCode = response.status_code
        # retrieve JSON so it can be parsed
        data = response.json()
        # retrieve success status
        out_BoolSuccess = data["success"]
        # retrieve message
        out_StrMessage = data["message"].split(":")[0]
        # only check for the prescence of the data key
        if "data" in data:
            out_BoolData = True
        else:
            out_BoolData = False
        # check if the token exists
        # source for syntax of and: https://stackoverflow.com/questions/2485466/what-is-pythons-equivalent-of-logical-and-in-an-if-statement
        if ("Set-Cookie" in response.headers) and (len(response.headers["Set-Cookie"].split(";")[0].replace("token=", "")) > 0):
            out_BoolTokenExists = True
        else:
            out_BoolTokenExists = False
        return {out_IntStatusCode, out_BoolSuccess, out_StrMessage, out_BoolData, out_BoolTokenExists}
    except requests.exceptions.RequestException as e:
        return {e}


# make API call to verify user
def verifyUser(in_StrURL):
    try:
        # make the API call
        response = requests.post(in_StrURL)

        # retrieve the status code
        out_IntStatusCode = response.status_code
        # retrieve JSON so it can be parsed
        data = response.json()
        # retrieve success status
        out_BoolSuccess = data["success"]
        # retrieve message
        out_StrMessage = data["message"].split(":")[0]
        # only check for the prescence of the data key
        if "user" in data:
            out_StrUser = data["user"]
        else:
            out_StrUser = ""
        # check if the token exists
        # source for syntax of and: https://stackoverflow.com/questions/2485466/what-is-pythons-equivalent-of-logical-and-in-an-if-statement
        if ("Set-Cookie" in response.headers) and (len(response.headers["Set-Cookie"].split(";")[0].replace("token=", "")) > 0):
            out_BoolTokenExists = True
        else:
            out_BoolTokenExists = False
        return {out_IntStatusCode, out_BoolSuccess, out_StrMessage, out_StrUser, out_BoolTokenExists}
    except requests.exceptions.RequestException as e:
        return {e}