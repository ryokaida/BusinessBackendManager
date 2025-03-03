import requests


# make API call to logout
def logout():
    # make URLl for API call
    url = "http://localhost:5000/api/logout"
    
    try:
        # make the API call
        response = requests.post(url)
        
        # retrieve the status code
        out_StatusCode = response.status_code
        out_StrToken = response.headers["Set-Cookie"].split(";")[0].replace("token=", "") # retrieve only the token from the response headers
        #
        data = response.json()
        # retrieve success
        out_Success = data["success"]  
        # if message was returned then, pass the message out.  Otherwise, pass out the Empty String,
        if "message" in data:
            if (data["message"]):
                out_message = data["message"].split(":")[0]
            else:
                out_message = ""    
        else:
            out_message = ""

        return {out_StatusCode, out_Success, out_message, out_StrToken}
    except requests.exceptions.RequestException as e:
        return {e}


# test logout
def test_logout_Successs():
    assert logout() == {200, True, "200 - Logged out successfully", ""}